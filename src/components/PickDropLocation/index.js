import React, {useCallback, useState} from 'react';
import {View, Image} from 'react-native';
import {icons} from '../../assets';
import {styles} from './styles';
import {getCity, showToast} from '../../Api/HelperFunction';
import {useFocusEffect} from '@react-navigation/native';
import GilroyMedium from '../Wrappers/Text/GilroyMedium';
import GilroyRegular from '../Wrappers/Text/GilroyRegular';
import RobotoMedium from '../Wrappers/Text/RobotoMedium';

const CalendarCart = ({imgSource, title}) => {
  return (
    <View style={styles.calendarCartContainer}>
      <Image source={imgSource} style={styles.calendarIcon} />
      <GilroyMedium style={styles.dateText}>{title || 'N/A'}</GilroyMedium>
    </View>
  );
};

const PickDropLocation = data => {
  // Handle multiple data structure formats:
  // 1. data.data.ride (nested structure)
  // 2. data.data (direct structure)
  // 3. data.ride (if passed directly)
  // 4. data (if passed directly)
  const rideData = data?.data?.ride || data?.data || data?.ride || data;
  
  console.log('[PickDropLocation] 📍 Full data received:', JSON.stringify(data, null, 2));
  console.log('[PickDropLocation] 📍 Extracted rideData:', JSON.stringify(rideData, null, 2));
  
  const [pickuptext, setPickuptext] = useState('');
  const [dropofftext, setdropofftext] = useState('');
  
  // Get createdAt/timestamp from multiple possible locations
  const dataForDate = rideData?.timestamp || 
                     rideData?.createdAt || 
                     data?.data?.timestamp ||
                     data?.data?.createdAt || 
                     data?.timestamp ||
                     data?.createdAt;
  const date = dataForDate ? new Date(dataForDate) : new Date();

  const getDropOffLocation = async () => {
    try {
      console.log('[PickDropLocation] 🔍 Searching for dropoff location...');
      console.log('[PickDropLocation] 📍 rideData:', JSON.stringify(rideData, null, 2));
      
      // NEW STRUCTURE: Check for routeSummary.stops array (first stop is pickup, second is dropoff)
      const routeSummary = rideData?.routeSummary || data?.data?.routeSummary || data?.routeSummary;
      const stops = routeSummary?.stops;
      
      if (stops && Array.isArray(stops) && stops.length >= 2) {
        // Second stop is dropoff location
        const dropoffStop = stops[1];
        const dropoffDescription = dropoffStop?.description;
        
        if (dropoffDescription && dropoffDescription.trim()) {
          console.log('[PickDropLocation] ✅ Dropoff address from routeSummary:', dropoffDescription);
          setdropofftext(dropoffDescription);
          return;
        }
      }
      
      // OLD STRUCTURE: Try multiple possible coordinate paths
      const dropoffCoords = rideData?.dropofflocation?.coordinates || 
                           rideData?.dropoffLocation?.coordinates ||
                           rideData?.dropoff_location?.coordinates ||
                           data?.data?.dropofflocation?.coordinates ||
                           data?.data?.dropoffLocation?.coordinates ||
                           data?.data?.dropoff_location?.coordinates ||
                           data?.dropofflocation?.coordinates ||
                           data?.dropoffLocation?.coordinates;
      
      console.log('[PickDropLocation] 📍 Dropoff coordinates found:', dropoffCoords);
      
      // Check if dropoff coordinates exist and are valid
      if (!dropoffCoords || !Array.isArray(dropoffCoords) || dropoffCoords.length < 2) {
        console.warn('[PickDropLocation] ⚠️ Dropoff coordinates not found or invalid');
        console.warn('[PickDropLocation] ⚠️ rideData keys:', rideData ? Object.keys(rideData) : 'null');
        // Show a user-friendly message that dropoff will be available once backend provides it
        setdropofftext('Dropoff location will be available soon');
        return;
      }
      
      // GeoJSON format: [longitude, latitude]
      const lon = dropoffCoords[0];
      const lat = dropoffCoords[1];
      
      console.log('[PickDropLocation] 📍 Extracted dropoff - lon:', lon, 'lat:', lat);
      
      // Validate coordinates
      if (!lat || !lon || isNaN(lat) || isNaN(lon) || lat === 0 || lon === 0) {
        console.warn('[PickDropLocation] ⚠️ Invalid dropoff coordinates:', {lat, lon});
        setdropofftext('Invalid dropoff coordinates');
        return;
      }
      
      // Fetch address
      console.log('[PickDropLocation] ✅ Valid dropoff coordinates, fetching address...');
      const address = await getCity(lat, lon);
      
      if (address && address.trim()) {
        console.log('[PickDropLocation] ✅ Dropoff address received:', address);
        setdropofftext(address);
      } else {
        console.warn('[PickDropLocation] ⚠️ No address returned from getCity for dropoff');
        // Try to show coordinates as fallback
        setdropofftext(`Location: ${lat.toFixed(6)}, ${lon.toFixed(6)}`);
      }
    } catch (error) {
      console.error('[PickDropLocation] ❌ Error getting dropoff location:', error);
      console.error('[PickDropLocation] ❌ Error stack:', error.stack);
      setdropofftext('Error loading dropoff location');
    }
  };
  
  const getPickUpLocation = async () => {
    try {
      console.log('[PickDropLocation] 🔍 Searching for pickup location...');
      console.log('[PickDropLocation] 📍 rideData:', JSON.stringify(rideData, null, 2));
      
      // NEW STRUCTURE: Check for routeSummary.stops array (first stop is pickup, second is dropoff)
      const routeSummary = rideData?.routeSummary || data?.data?.routeSummary || data?.routeSummary;
      const stops = routeSummary?.stops;
      
      if (stops && Array.isArray(stops) && stops.length >= 1) {
        // First stop is pickup location
        const pickupStop = stops[0];
        const pickupDescription = pickupStop?.description;
        
        if (pickupDescription && pickupDescription.trim()) {
          console.log('[PickDropLocation] ✅ Pickup address from routeSummary:', pickupDescription);
          setPickuptext(pickupDescription);
          return;
        }
      }
      
      // OLD STRUCTURE: Try multiple possible coordinate paths
      const pickupCoords = rideData?.pickuplocation?.coordinates || 
                          rideData?.pickupLocation?.coordinates ||
                          rideData?.pickup_location?.coordinates ||
                          data?.data?.pickuplocation?.coordinates ||
                          data?.data?.pickupLocation?.coordinates ||
                          data?.data?.pickup_location?.coordinates ||
                          data?.pickuplocation?.coordinates ||
                          data?.pickupLocation?.coordinates;
      
      console.log('[PickDropLocation] 📍 Pickup coordinates found:', pickupCoords);
      
      // Check if pickup coordinates exist and are valid
      if (!pickupCoords || !Array.isArray(pickupCoords) || pickupCoords.length < 2) {
        console.warn('[PickDropLocation] ⚠️ Pickup coordinates not found or invalid');
        console.warn('[PickDropLocation] ⚠️ rideData keys:', rideData ? Object.keys(rideData) : 'null');
        setPickuptext('Pickup coordinates not available');
        return;
      }
      
      // GeoJSON format: [longitude, latitude]
      const lon = pickupCoords[0];
      const lat = pickupCoords[1];
      
      console.log('[PickDropLocation] 📍 Extracted pickup - lon:', lon, 'lat:', lat);
      
      // Validate coordinates
      if (!lat || !lon || isNaN(lat) || isNaN(lon) || lat === 0 || lon === 0) {
        console.warn('[PickDropLocation] ⚠️ Invalid pickup coordinates:', {lat, lon});
        setPickuptext('Invalid pickup coordinates');
        return;
      }
      
      // Fetch address
      console.log('[PickDropLocation] ✅ Valid pickup coordinates, fetching address...');
      const address = await getCity(lat, lon);
      
      if (address && address.trim()) {
        console.log('[PickDropLocation] ✅ Pickup address received:', address);
        setPickuptext(address);
      } else {
        console.warn('[PickDropLocation] ⚠️ No address returned from getCity for pickup');
        console.warn('[PickDropLocation] ⚠️ This might be due to API key issues or no results from geocode API');
        // Try to show coordinates as fallback
        setPickuptext(`Location: ${lat.toFixed(6)}, ${lon.toFixed(6)}`);
      }
    } catch (error) {
      console.error('[PickDropLocation] ❌ Error getting pickup location:', error);
      console.error('[PickDropLocation] ❌ Error message:', error?.message);
      console.error('[PickDropLocation] ❌ Error stack:', error.stack);
      setPickuptext('Error loading pickup location');
    }
  };

  useFocusEffect(
    useCallback(() => {
      console.log('[PickDropLocation] 🔄 useFocusEffect triggered');
      console.log('[PickDropLocation] 📍 rideData changed, fetching locations...');
      getPickUpLocation();
      getDropOffLocation();
    }, [
      rideData?.routeSummary?.stops, 
      rideData?.pickuplocation?.coordinates, 
      rideData?.dropofflocation?.coordinates, 
      data
    ]),
  );
  
  // Get total bill from multiple possible locations
  const totalBill = rideData?.totalbill || 
                    rideData?.totalBill || 
                    rideData?.total_amount ||
                    data?.data?.totalbill || 
                    data?.data?.totalBill ||
                    data?.data?.ride?.totalbill ||
                    data?.data?.ride?.totalBill ||
                    data?.ride?.totalbill ||
                    data?.ride?.totalBill ||
                    data?.totalbill ||
                    data?.totalBill ||
                    0;
  
  console.log('[PickDropLocation] 💰 Price extraction:', {
    'rideData?.totalbill': rideData?.totalbill,
    'rideData?.totalBill': rideData?.totalBill,
    'data?.ride?.totalbill': data?.ride?.totalbill,
    'data?.ride?.totalBill': data?.ride?.totalBill,
    'final totalBill': totalBill
  });
  
  // Format date and time safely
  const formattedDate = date && !isNaN(date.getTime()) ? date.toLocaleDateString() : 'N/A';
  const formatTime = (hours, minutes) => {
    const h = String(hours || 0);
    const m = String(minutes || 0);
    return `${h.length === 1 ? '0' + h : h}:${m.length === 1 ? '0' + m : m}`;
  };
  const formattedTime = date && !isNaN(date.getTime()) 
    ? formatTime(date.getHours(), date.getMinutes())
    : 'N/A';
  
  return (
    <View>
      <View style={styles.contentMainContainer}>
        <View style={styles.destinationImageContainer}>
          <Image source={icons.destination} style={styles.destination} />
          <View style={styles.verticalHr} />
          <Image source={icons.locationOn} style={styles.destination} />
        </View>
        <View style={styles.locationContentContainer}>
          <RobotoMedium style={styles.pickupText}>
            Pick up Location:
          </RobotoMedium>
          <GilroyRegular style={styles.addressText}>
            {(() => {
              // NEW STRUCTURE: Check for routeSummary.stops
              const routeSummary = rideData?.routeSummary || data?.data?.routeSummary || data?.routeSummary;
              const stops = routeSummary?.stops;
              if (stops && Array.isArray(stops) && stops.length >= 1) {
                const pickupStop = stops[0];
                if (pickupStop?.description) {
                  return pickupStop.description;
                }
              }
              // OLD STRUCTURE: Fallback to other sources
              return rideData?.pickup_address || 
                     data?.data?.pickup_address || 
                     pickuptext || 
                     'Loading location...';
            })()}
          </GilroyRegular>
          <RobotoMedium style={styles.pickupText}>
            Drop off Location:
          </RobotoMedium>
          <GilroyRegular style={styles.addressText}>
            {(() => {
              // NEW STRUCTURE: Check for routeSummary.stops
              const routeSummary = rideData?.routeSummary || data?.data?.routeSummary || data?.routeSummary;
              const stops = routeSummary?.stops;
              if (stops && Array.isArray(stops) && stops.length >= 2) {
                const dropoffStop = stops[1];
                if (dropoffStop?.description) {
                  return dropoffStop.description;
                }
              }
              // OLD STRUCTURE: Fallback to other sources
              return rideData?.dropoff_address || 
                     data?.data?.dropoff_address || 
                     dropofftext || 
                     'Loading location...';
            })()}
          </GilroyRegular>
        </View>
      </View>
      <View style={styles.userServicesContainer}>
        <CalendarCart
          imgSource={icons.calendar}
          title={formattedDate}
        />
        <CalendarCart
          imgSource={icons.clockIcon}
          title={formattedTime}
        />
        <CalendarCart
          imgSource={icons.cash}
          title={`$${totalBill || 0}`}
        />
      </View>
    </View>
  );
};
export default PickDropLocation;
