import React, {useCallback, useRef, useState, useEffect} from 'react';
import {Text, View, FlatList} from 'react-native';
import GilroyMedium from '../../../components/Wrappers/Text/GilroyMedium';
import GilroyRegular from '../../../components/Wrappers/Text/GilroyRegular';
import {styles} from './styles';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {showToast} from '../../../Api/HelperFunction';
import {getNotification} from '../../../Redux/Actions/rider';
import actionTypes from '../../../Redux/Actions/actionTypes';
import UserDetailsCard from '../../../components/userDetailCard';
import PickDropLocation from '../../../components/PickDropLocation';
import Ripple from '../../../components/Wrappers/Ripple';
import GilroyBold from '../../../components/Wrappers/Text/GilroyBold';
import {TripRequestStyles} from '../Home/tripRequestStyles';
import {Dimensions} from 'react-native';
import {
  acceptRideAction,
  pendingRideAction,
  rejectRideAction,
} from '../../../Redux/Actions/rideAction';
import GeneralModal from '../../../popups/GeneralModal';
import {images} from '../../../assets';
import {getRiderDetails} from '../../../Redux/Actions/auth';
import {useNavigation} from '@react-navigation/native';
import SocketService from '../../../services/socket';
import {base_url} from '../../../Api/configs';

const {width, height} = Dimensions.get('window');

const itemSeparate = () => <View style={styles.horizontalLine} />;
const renderEmptyContent = () => {
  return (
    <View style={styles.emptyContainer}>
      <GilroyMedium style={styles.emptyContainertext}>
        No Rides Request
      </GilroyMedium>
    </View>
  );
};
const CustomButton = props => {
  return (
    <Ripple
      style={[TripRequestStyles.buttonContainer, props.customButtonStyle]}
      onPress={props.onPress}>
      <GilroyBold style={[TripRequestStyles.buttonText, props.textstyle]}>
        {props.children}
      </GilroyBold>
    </Ripple>
  );
};
const RidesRequest = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [pendingRides, setPendingRides] = useState([]);
  const [rideId, setRideId] = useState('');
  const modalRef = useRef();
  const rejectRef = useRef();
  const socketRef = useRef(null);
  const socketInitializedRef = useRef(false);
  const socketListenersSetupRef = useRef(false);
  const connectionCallbackUnsubscribeRef = useRef(null);
  
  // Get driver ID from Redux store
  const userData = useSelector(state => state.UserReducer?.userData);
  const driverId = userData?._id;
  
  // Log driverId and userData on component mount and when it changes
  useEffect(() => {
    console.log('[RidesRequest] ========== DRIVER ID VERIFICATION ==========');
    console.log('[RidesRequest] 📍 Full userData from Redux:', userData);
    console.log('[RidesRequest] 📍 Driver ID extracted:', driverId);
    console.log('[RidesRequest] 📍 Driver ID type:', typeof driverId);
    console.log('[RidesRequest] 📍 Driver ID is truthy?', !!driverId);
    console.log('[RidesRequest] 📍 Driver ID length:', driverId?.length);
    console.log('[RidesRequest] ============================================');
  }, [driverId, userData]);

  const getData = async () => {
    try {
      console.log('[RidesRequest] ========== FETCHING RIDE DATA ==========');
      console.log('[RidesRequest] 📍 Driver ID before fetching rides:', driverId);
      console.log('[RidesRequest] 📍 Driver ID exists?', !!driverId);
      
      const response = await dispatch(pendingRideAction());
      
      console.log('[RidesRequest] ========== FULL API RESPONSE ==========');
      console.log('[RidesRequest] 📍 Full response object:', JSON.stringify(response, null, 2));
      console.log('[RidesRequest] 📍 Response type:', typeof response);
      console.log('[RidesRequest] 📍 Response keys:', response ? Object.keys(response) : 'null');
      console.log('[RidesRequest] =========================================');
      
      console.log('[RidesRequest] ========== RIDES DATA ==========');
      console.log('[RidesRequest] 📍 Rides array:', response?.rides);
      console.log('[RidesRequest] 📍 Number of rides:', response?.rides?.length || 0);
      console.log('[RidesRequest] 📍 Rides type:', typeof response?.rides);
      console.log('[RidesRequest] 📍 Is array?', Array.isArray(response?.rides));
      console.log('[RidesRequest] =================================');
      
      setPendingRides(response?.rides);
      
      // Log detailed ride information if rides are available
      if (response?.rides && response.rides.length > 0) {
        console.log('[RidesRequest] ========== RIDE DETAILS ==========');
        response.rides.forEach((ride, index) => {
          console.log(`[RidesRequest] 📍 Ride #${index + 1}:`);
          console.log(`[RidesRequest]   - ID: ${ride?._id || ride?.id || 'N/A'}`);
          console.log(`[RidesRequest]   - Full ride object:`, JSON.stringify(ride, null, 2));
          console.log(`[RidesRequest]   - User data:`, JSON.stringify(ride?.user || ride?.ride?.user, null, 2));
          console.log(`[RidesRequest]   - Pickup location:`, JSON.stringify(ride?.pickuplocation || ride?.pickupLocation || ride?.ride?.pickuplocation, null, 2));
          console.log(`[RidesRequest]   - Dropoff location:`, JSON.stringify(ride?.dropofflocation || ride?.dropoffLocation || ride?.ride?.dropofflocation, null, 2));
          console.log(`[RidesRequest]   - Ride status:`, ride?.rideStatus || ride?.ride?.rideStatus || 'N/A');
          console.log(`[RidesRequest]   - Created at:`, ride?.createdAt || ride?.ride?.createdAt || 'N/A');
          console.log(`[RidesRequest]   - Total bill:`, ride?.totalbill || ride?.totalBill || ride?.ride?.totalbill || 'N/A');
          console.log(`[RidesRequest]   - All keys:`, ride ? Object.keys(ride) : 'null');
        });
        console.log('[RidesRequest] ======================================');
      } else {
        console.log('[RidesRequest] ⚠️ No rides available');
      }
    } catch (err) {
      console.log('[RidesRequest] ========== ERROR ==========');
      console.log('[RidesRequest] ❌ Error fetching pending rides:', err);
      console.log('[RidesRequest] ❌ Error type:', typeof err);
      console.log('[RidesRequest] ❌ Error message:', err?.message || err);
      console.log('[RidesRequest] ❌ Full error:', JSON.stringify(err, null, 2));
      console.log('[RidesRequest] ===========================');
      showToast(err);
    }
  };
  const handleAcceptButton = async () => {
    try {
      console.log('[RidesRequest] 🎯 Accept button pressed');
      console.log('[RidesRequest] Ride ID:', rideId);
      console.log('[RidesRequest] Driver ID:', driverId);
      console.log('[RidesRequest] Timestamp:', new Date().toISOString());
      
      // Validate rideId before proceeding
      if (!rideId) {
        console.error('[RidesRequest] ❌ Ride ID is undefined!');
        showToast('Ride ID is missing. Please try again.');
        modalRef.current?.hide();
        return;
      }
      
      // Close modal first
      modalRef.current?.hide();
      
      // Emit socket event for ride acceptance
      const socket = SocketService.getSocket();
      if (socket && SocketService.isSocketConnected() && rideId && driverId) {
        const emitData = {
          rideId: rideId,
          driverId: driverId,
        };
        console.log('[RidesRequest] 🔵 Socket EMIT: ride:accept');
        console.log('[RidesRequest] Emit data:', emitData);
        
        socket.emit('ride:accept', emitData);
        console.log('[RidesRequest] ✅ Socket emit sent successfully');
      } else {
        console.warn('[RidesRequest] ⚠️ Cannot emit ride:accept - Missing data:', {
          hasSocket: !!socket,
          isConnected: SocketService.isSocketConnected(),
          hasRideId: !!rideId,
          hasDriverId: !!driverId,
        });
      }
      
      // Also call the API action (keeping existing functionality)
      console.log('[RidesRequest] Calling API acceptRideAction with ID:', rideId);
      const response = await dispatch(acceptRideAction(rideId));
      console.log('[RidesRequest] API response:', response);
      showToast(response?.message);
      
      // Note: Navigation will be handled by 'ride:accept:success' socket listener
    } catch (err) {
      console.error('[RidesRequest] ❌ Error accepting ride:', err);
      showToast(err);
    }
  };
  
  const handleRejectButton = async () => {
    try {
      console.log('[RidesRequest] 🎯 Reject button pressed');
      console.log('[RidesRequest] Ride ID:', rideId);
      console.log('[RidesRequest] Driver ID:', driverId);
      console.log('[RidesRequest] Timestamp:', new Date().toISOString());
      
      // Validate rideId before proceeding
      if (!rideId) {
        console.error('[RidesRequest] ❌ Ride ID is undefined!');
        showToast('Ride ID is missing. Please try again.');
        rejectRef.current?.hide();
        return;
      }
      
      // Close modal first
      rejectRef.current?.hide();
      
      // Emit socket event for ride rejection
      const socket = SocketService.getSocket();
      if (socket && SocketService.isSocketConnected() && rideId && driverId) {
        const emitData = {
          rideId: rideId,
          driverId: driverId,
          reason: 'Not available',
        };
        console.log('[RidesRequest] 🔵 Socket EMIT: ride:reject');
        console.log('[RidesRequest] Emit data:', emitData);
        
        socket.emit('ride:reject', emitData);
        console.log('[RidesRequest] ✅ Socket emit sent successfully');
      } else {
        console.warn('[RidesRequest] ⚠️ Cannot emit ride:reject - Missing data:', {
          hasSocket: !!socket,
          isConnected: SocketService.isSocketConnected(),
          hasRideId: !!rideId,
          hasDriverId: !!driverId,
        });
      }
      
      // Also call the API action (keeping existing functionality)
      console.log('[RidesRequest] Calling API rejectRideAction with ID:', rideId);
      const response = await dispatch(rejectRideAction(rideId));
      console.log('[RidesRequest] API response:', response);
      
      // Show toast message
      if (response?.message) {
        showToast(response?.message);
      } else {
        showToast('Ride rejected successfully');
      }
      
      // Remove the rejected ride from the list immediately after API call
      setPendingRides(prevRides => {
        console.log('[RidesRequest] 📍 Current pending rides before removal:', prevRides.length);
        console.log('[RidesRequest] 📍 Ride ID to remove:', rideId);
        console.log('[RidesRequest] 📍 All ride IDs in list:', prevRides.map(r => ({
          _id: r?._id,
          id: r?.id,
          rideId: r?.rideId,
          ride: r?.ride?._id || r?.ride?.id || r?.ride?.rideId
        })));
        
        const filteredRides = prevRides.filter(ride => {
          // Check multiple possible ID field names
          const rideIdToCheck = ride?._id || ride?.id || ride?.rideId || ride?.ride?._id || ride?.ride?.id || ride?.ride?.rideId;
          const shouldKeep = rideIdToCheck !== rideId;
          
          if (!shouldKeep) {
            console.log('[RidesRequest] ✅ Found matching ride to remove:', {
              rideIdToCheck,
              rideId,
              ride: JSON.stringify(ride, null, 2)
            });
          }
          
          return shouldKeep;
        });
        
        console.log('[RidesRequest] ✅ Removed rejected ride. Remaining rides:', filteredRides.length);
        console.log('[RidesRequest] 📍 Remaining ride IDs:', filteredRides.map(r => r?._id || r?.id || r?.rideId));
        
        return filteredRides;
      });
    } catch (err) {
      console.error('[RidesRequest] ❌ Error rejecting ride:', err);
      showToast(err);
    }
  };
  // Initialize socket connection
  useEffect(() => {
    // Store current values in refs to avoid dependency issues
    const currentDriverId = driverId;
    const currentBaseUrl = base_url;

    console.log('[RidesRequest] ========== SOCKET CONNECTION useEffect RUNNING ==========');
    console.log('[RidesRequest] 📍 Component mounted');
    console.log('[RidesRequest] 📍 Driver ID:', currentDriverId);
    console.log('[RidesRequest] 📍 Driver ID exists?', !!currentDriverId);
    console.log('[RidesRequest] 📍 Base URL:', currentBaseUrl);
    
    const setupSocketListeners = (socketInstance) => {
      if (!socketInstance) {
        console.error('[RidesRequest] ❌ Cannot setup listeners - socket instance is null');
        return;
      }

      console.log('[RidesRequest] ========== SETTING UP SOCKET LISTENERS ==========');
      console.log('[RidesRequest] 📍 Socket instance:', !!socketInstance);
      console.log('[RidesRequest] 📍 Socket connected:', socketInstance?.connected);
      console.log('[RidesRequest] 📍 Socket ID:', socketInstance?.id);
      
      // Remove old listeners to prevent duplicates
      socketInstance.off('ride:request');
      socketInstance.off('ride:accepted_by_other');
      socketInstance.off('ride:accept:success');
      socketInstance.off('ride:reject:success');
      socketInstance.off('ride:rejected');
      socketInstance.off('ride:error');
      socketInstance.off('connect');
      socketInstance.off('disconnect');
      socketInstance.off('connect_error');
      socketInstance.off('reconnect');
      
      console.log('[RidesRequest] ✅ Old listeners removed');
      
      // Listen for incoming ride requests
      socketInstance.on('ride:request', (rideData) => {
        console.log('[RidesRequest] 📨 New ride request received:', rideData);
        
        // Add new ride to the list
        setPendingRides(prevRides => {
          // Check if ride already exists to avoid duplicates
          const rideExists = prevRides.some(ride => ride._id === rideData?._id || ride._id === rideData?.rideId);
          if (rideExists) {
            console.log('[RidesRequest] ⏭️ Skipping duplicate ride');
            return prevRides;
          }
          console.log('[RidesRequest] ✅ Adding new ride to list. Total rides:', prevRides.length + 1);
          return [...prevRides, rideData];
        });
        // showToast('New ride request received!');
      });

      // Listen if ride was accepted by another driver
      socketInstance.on('ride:accepted_by_other', (data) => {
        console.log('[RidesRequest] 🚗 Ride accepted by another driver:', data);
        
        const removedRideId = data?.rideId || data?._id;
        if (removedRideId) {
          // Remove that ride from the list
          setPendingRides(prevRides => {
            const filteredRides = prevRides.filter(ride => ride._id !== removedRideId);
            console.log('[RidesRequest] ✅ Removed ride. Remaining rides:', filteredRides.length);
            return filteredRides;
          });
          showToast('Ride was accepted by another driver');
        }
      });

      // Listen for acceptance success
      socketInstance.on('ride:accept:success', (data) => {
        console.log('[RidesRequest] ✅ Ride acceptance confirmed:', data);
        
        const acceptedRideId = data?.rideId || data?._id || rideId;
        if (acceptedRideId) {
          // Remove accepted ride from the list
          setPendingRides(prevRides => {
            const filteredRides = prevRides.filter(ride => ride._id !== acceptedRideId);
            console.log('[RidesRequest] ✅ Removed accepted ride. Remaining rides:', filteredRides.length);
            return filteredRides;
          });
          
          // Get rider details and navigate
          dispatch(getRiderDetails(acceptedRideId));
          dispatch({
            type: actionTypes.rideId,
            currentRideId: acceptedRideId,
          });
          
          // Navigate to Home screen
          navigation.navigate('Home');
          showToast('Ride accepted successfully!');
        }
      });

      // Listen for rejection success
      socketInstance.on('ride:reject:success', (data) => {
        console.log('[RidesRequest] ✅ Ride rejection confirmed:', data);
        
        const rejectedRideId = data?.rideId || data?._id || data?.id;
        if (rejectedRideId) {
          // Remove rejected ride from the list
          setPendingRides(prevRides => {
            const filteredRides = prevRides.filter(ride => {
              const rideIdToCheck = ride?._id || ride?.id || ride?.rideId || ride?.ride?._id || ride?.ride?.id || ride?.ride?.rideId;
              return rideIdToCheck !== rejectedRideId;
            });
            console.log('[RidesRequest] ✅ Removed rejected ride from socket. Remaining rides:', filteredRides.length);
            return filteredRides;
          });
        }
      });

      // Listen for rejection (alternative event name)
      socketInstance.on('ride:rejected', (data) => {
        console.log('[RidesRequest] ✅ Ride rejected event received:', data);
        
        const rejectedRideId = data?.rideId || data?._id || data?.id;
        if (rejectedRideId) {
          // Remove rejected ride from the list
          setPendingRides(prevRides => {
            const filteredRides = prevRides.filter(ride => {
              const rideIdToCheck = ride?._id || ride?.id || ride?.rideId || ride?.ride?._id || ride?.ride?.id || ride?.ride?.rideId;
              return rideIdToCheck !== rejectedRideId;
            });
            console.log('[RidesRequest] ✅ Removed rejected ride from socket. Remaining rides:', filteredRides.length);
            return filteredRides;
          });
        }
      });

      // Listen for errors
      socketInstance.on('ride:error', (error) => {
        console.error('[RidesRequest] ❌ Ride error:', error);
        const errorMessage = error?.message || error?.error || 'An error occurred';
        showToast(errorMessage);
      });
      
      // Listen for socket connection events
      socketInstance.on('connect', () => {
        console.log('[RidesRequest] ✅ Socket connected event received!');
        console.log('[RidesRequest] 📍 Socket ID:', socketInstance.id);
      });
      
      socketInstance.on('disconnect', (reason) => {
        console.log('[RidesRequest] ❌ Socket disconnected:', reason);
      });
      
      socketInstance.on('connect_error', (error) => {
        console.error('[RidesRequest] ❌ Socket connection error:', error);
      });

      // Listen for reconnection to re-register listeners
      socketInstance.on('reconnect', (attemptNumber) => {
        console.log('[RidesRequest] 🔄 Socket reconnected, re-registering listeners...');
        // Re-register listeners after reconnection
        setupSocketListeners(socketInstance);
      });
      
      socketListenersSetupRef.current = true;
      console.log('[RidesRequest] ✅ All socket listeners set up successfully');
      console.log('[RidesRequest] ============================================');
    };

    const connectSocket = async () => {
      try {
        console.log('[RidesRequest] 🔌 Starting socket connection process...');
        
        if (!currentDriverId) {
          console.log('[RidesRequest] ⚠️ Driver ID not available, skipping socket connection');
          return;
        }

        // Check if socket is already connected
        const existingSocket = SocketService.getSocket();
        const isAlreadyConnected = SocketService.isSocketConnected();
        
        console.log('[RidesRequest] 📍 Existing socket:', !!existingSocket);
        console.log('[RidesRequest] 📍 Is already connected?', isAlreadyConnected);
        
        // Connect socket (will reuse existing connection if already connected)
        console.log('[RidesRequest] 🔌 Calling SocketService.connect...');
        const socket = SocketService.connect(currentDriverId, 'driver', currentBaseUrl);
        
        console.log('[RidesRequest] 📍 Socket instance returned:', !!socket);
        
        if (socket) {
          socketRef.current = socket;
          socketInitializedRef.current = true;
          console.log('[RidesRequest] ✅ Socket instance stored in ref');
          
          // Register connection state change callback
          if (connectionCallbackUnsubscribeRef.current) {
            connectionCallbackUnsubscribeRef.current();
          }
          
          connectionCallbackUnsubscribeRef.current = SocketService.onConnectionChange((event, data) => {
            console.log('[RidesRequest] 📡 Connection state changed:', event, data);
            
            if (event === 'reconnect' && socket) {
              console.log('[RidesRequest] 🔄 Reconnection detected, re-registering listeners...');
              // Reset listener setup flag to allow re-registration
              socketListenersSetupRef.current = false;
              setupSocketListeners(socket);
            } else if (event === 'connect' && socket) {
              console.log('[RidesRequest] ✅ Connection established, setting up listeners...');
              socketListenersSetupRef.current = false;
              setupSocketListeners(socket);
            }
          });
          
          // Set up listeners - handle both cases: already connected or connecting
          if (isAlreadyConnected || socket.connected) {
            console.log('[RidesRequest] ✅ Socket already connected, setting up listeners...');
            setupSocketListeners(socket);
          } else {
            console.log('[RidesRequest] ⏳ Socket not yet connected, waiting...');
            // Set up listeners when socket connects
            socket.once('connect', () => {
              console.log('[RidesRequest] ✅ Socket connected! Setting up listeners...');
              setupSocketListeners(socket);
            });
          }
        } else {
          console.error('[RidesRequest] ❌ Socket instance is null!');
        }
      } catch (error) {
        console.error('[RidesRequest] ❌ Error connecting socket:', error);
        console.error('[RidesRequest] ❌ Error stack:', error.stack);
      }
    };

    // Only initialize once, but allow re-initialization if driverId or baseUrl changes
    if (!socketInitializedRef.current) {
      connectSocket();
    }

    // Cleanup on unmount - only remove listeners, don't disconnect (socket is shared)
    return () => {
      console.log('[RidesRequest] 🧹 Cleaning up socket listeners...');
      
      // Remove listeners from socket
      const socket = socketRef.current || SocketService.getSocket();
      if (socket) {
        console.log('[RidesRequest] 📍 Removing socket listeners...');
        socket.off('ride:request');
        socket.off('ride:accepted_by_other');
        socket.off('ride:accept:success');
        socket.off('ride:reject:success');
        socket.off('ride:rejected');
        socket.off('ride:error');
        socket.off('connect');
        socket.off('disconnect');
        socket.off('connect_error');
        socket.off('reconnect');
        socketListenersSetupRef.current = false;
        console.log('[RidesRequest] ✅ Socket listeners removed');
      }
      
      // Unsubscribe from connection callbacks
      if (connectionCallbackUnsubscribeRef.current) {
        connectionCallbackUnsubscribeRef.current();
        connectionCallbackUnsubscribeRef.current = null;
      }
      
      // Don't disconnect the socket here as it might be used by other screens
      // Just clear the ref
      socketRef.current = null;
      socketInitializedRef.current = false;
      console.log('[RidesRequest] ✅ Cleanup complete');
    };
  }, [driverId, base_url]); // Include dependencies that should trigger re-initialization

  useFocusEffect(
    useCallback(() => {
      console.log('[RidesRequest] ========== SCREEN FOCUSED ==========');
      console.log('[RidesRequest] 📍 Driver ID when screen focuses:', driverId);
      console.log('[RidesRequest] 📍 Driver ID exists?', !!driverId);
      console.log('[RidesRequest] 📍 Current rideId state:', rideId);
      console.log('[RidesRequest] 📍 Pending rides count:', pendingRides.length);
      console.log('[RidesRequest] =====================================');
      
      getData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );
  
  // Log when driverId changes
  useEffect(() => {
    console.log('[RidesRequest] ========== DRIVER ID CHANGED ==========');
    console.log('[RidesRequest] 📍 New Driver ID:', driverId);
    console.log('[RidesRequest] 📍 Driver ID exists?', !!driverId);
    console.log('[RidesRequest] 📍 Full userData:', userData);
    console.log('[RidesRequest] =======================================');
  }, [driverId, userData]);
  
  // Log when rideId changes
  useEffect(() => {
    if (rideId) {
      console.log('[RidesRequest] ========== RIDE ID CHANGED ==========');
      console.log('[RidesRequest] 📍 New Ride ID:', rideId);
      console.log('[RidesRequest] 📍 Ride ID type:', typeof rideId);
      console.log('[RidesRequest] 📍 Current Driver ID:', driverId);
      console.log('[RidesRequest] 📍 Both IDs available?', !!(rideId && driverId));
      console.log('[RidesRequest] =======================================');
    }
  }, [rideId, driverId]);
  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={pendingRides}
        renderItem={({item, index}) => {
          console.log('[RidesRequest] ========== RENDERING RIDE ITEM ==========');
          console.log('[RidesRequest] 📍 Item index:', index);
          console.log('[RidesRequest] 📍 Full ride item:', item);
          console.log('[RidesRequest] 📍 Ride ID from item._id:', item?._id);
          console.log('[RidesRequest] 📍 Ride ID type:', typeof item?._id);
          console.log('[RidesRequest] 📍 Ride ID is truthy?', !!item?._id);
          console.log('[RidesRequest] 📍 Current Driver ID:', driverId);
          console.log('[RidesRequest] 📍 Driver ID is truthy?', !!driverId);
          console.log('[RidesRequest] 📍 Both IDs available for this ride?', !!(item?._id && driverId));
          console.log('[RidesRequest] ==========================================');
          
          // Handle multiple data structure formats:
          // 1. item.ride (if wrapped in ride object)
          // 2. item (if ride object directly)
          const rideData = item?.ride || item;
          const userData = rideData?.user || item?.user;
          
          console.log('[RidesRequest] ========== RIDE ITEM DETAILS ==========');
          console.log('[RidesRequest] 📍 Full item structure:', JSON.stringify(item, null, 2));
          console.log('[RidesRequest] 📍 Extracted rideData:', JSON.stringify(rideData, null, 2));
          console.log('[RidesRequest] 📍 Extracted userData:', JSON.stringify(userData, null, 2));
          console.log('[RidesRequest] 📍 Pickup coordinates:', rideData?.pickuplocation?.coordinates || rideData?.pickupLocation?.coordinates || 'Not found');
          console.log('[RidesRequest] 📍 Dropoff coordinates:', rideData?.dropofflocation?.coordinates || rideData?.dropoffLocation?.coordinates || 'Not found');
          console.log('[RidesRequest] 📍 User name:', userData?.firstName || 'N/A', userData?.lastName || 'N/A');
          console.log('[RidesRequest] 📍 User phone:', userData?.phone || 'N/A');
          console.log('[RidesRequest] 📍 User email:', userData?.email || 'N/A');
          console.log('[RidesRequest] 📍 Ride status:', rideData?.rideStatus || 'N/A');
          console.log('[RidesRequest] 📍 Total bill:', rideData?.totalbill || rideData?.totalBill || 'N/A');
          console.log('[RidesRequest] 📍 Created at:', rideData?.createdAt || 'N/A');
          console.log('[RidesRequest] =========================================');
          
          return (
            <View style={{alignItems: 'center', flex: 1}}>
              <View
                style={{
                  height: height / 1.9,
                  width: '100%',
                  // backgroundColor: 'green',
                }}>
                <UserDetailsCard data={userData} />
                <PickDropLocation data={rideData} />
                <View style={TripRequestStyles.ButtonsStyle}>
                  <CustomButton
                    customButtonStyle={TripRequestStyles.acceptBtn}
                    onPress={() => {
                      // Try multiple possible ID field names
                      const selectedRideId = item?._id || item?.id || item?.rideId;
                      console.log('[RidesRequest] ========== ACCEPT BUTTON PRESSED ==========');
                      console.log('[RidesRequest] 📍 Full item:', JSON.stringify(item, null, 2));
                      console.log('[RidesRequest] 📍 Selected Ride ID:', selectedRideId);
                      console.log('[RidesRequest] 📍 Ride ID type:', typeof selectedRideId);
                      console.log('[RidesRequest] 📍 Ride ID is truthy?', !!selectedRideId);
                      console.log('[RidesRequest] 📍 Current Driver ID:', driverId);
                      console.log('[RidesRequest] 📍 Driver ID is truthy?', !!driverId);
                      console.log('[RidesRequest] 📍 Both IDs available?', !!(selectedRideId && driverId));
                      console.log('[RidesRequest] ============================================');
                      
                      if (!selectedRideId) {
                        console.error('[RidesRequest] ❌ Selected Ride ID is undefined!');
                        console.error('[RidesRequest] ❌ Item structure:', item);
                        showToast('Invalid ride ID. Please try again.');
                        return;
                      }
                      console.log('[RidesRequest] ✅ Setting Ride ID:', selectedRideId);
                      setRideId(selectedRideId);
                      modalRef.current.show();
                    }}>
                    Accept
                  </CustomButton>
                  <CustomButton
                    customButtonStyle={TripRequestStyles.rejectBtn}
                    onPress={() => {
                      // Try multiple possible ID field names
                      const selectedRideId = item?._id || item?.id || item?.rideId;
                      console.log('[RidesRequest] ========== REJECT BUTTON PRESSED ==========');
                      console.log('[RidesRequest] 📍 Full item:', JSON.stringify(item, null, 2));
                      console.log('[RidesRequest] 📍 Selected Ride ID:', selectedRideId);
                      console.log('[RidesRequest] 📍 Ride ID type:', typeof selectedRideId);
                      console.log('[RidesRequest] 📍 Ride ID is truthy?', !!selectedRideId);
                      console.log('[RidesRequest] 📍 Current Driver ID:', driverId);
                      console.log('[RidesRequest] 📍 Driver ID is truthy?', !!driverId);
                      console.log('[RidesRequest] 📍 Both IDs available?', !!(selectedRideId && driverId));
                      console.log('[RidesRequest] ============================================');
                      
                      if (!selectedRideId) {
                        console.error('[RidesRequest] ❌ Selected Ride ID is undefined!');
                        console.error('[RidesRequest] ❌ Item structure:', item);
                        showToast('Invalid ride ID. Please try again.');
                        return;
                      }
                      console.log('[RidesRequest] ✅ Setting Ride ID:', selectedRideId);
                      setRideId(selectedRideId);
                      rejectRef.current.show();
                    }}>
                    Reject
                  </CustomButton>
                </View>
              </View>
            </View>
          );
        }}
        ItemSeparatorComponent={itemSeparate}
        ListEmptyComponent={() => renderEmptyContent()}
      />
      <GeneralModal //screen 7
        reference={modalRef}
        icon={images.exclamationMark}
        // text1={'Logout'}
        text2={'Are you sure you want to accept\nthis ride ?'}
        text2Style={{height: null}}
        button1Text={'Yes'}
        onButton1Press={() => {
          handleAcceptButton();
        }}
        button2Text={'No'}
      />
      <GeneralModal //screen 7
        reference={rejectRef}
        icon={images.exclamationMark}
        // text1={'Logout'}
        text2={'Are you sure you want to reject\nthis ride ?'}
        text2Style={{height: null}}
        button1Text={'Yes'}
        onButton1Press={() => {
          //   props.navigation.navigate('AuthStack');
          // modalRef2.current.show();
          handleRejectButton();
        }}
        button2Text={'No'}
      />
    </View>
  );
};
export default RidesRequest;
