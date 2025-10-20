import React, {useCallback, useState} from 'react';
import {View, Image} from 'react-native';
import {icons} from '../../assets';
import {styles} from './styles';
import {getCity, showToast} from '../../Api/HelperFunction';
import {useFocusEffect} from '@react-navigation/native';

const CalendarCart = ({imgSource, title}) => {
  return (
    <View style={styles.calendarCartContainer}>
      <Image source={imgSource} style={styles.calendarIcon} />
      <GilroyMedium style={styles.dateText}>{title}</GilroyMedium>
    </View>
  );
};

const PickDropLocation = data => {
  console.log('data?.datfffa ===>', data?.data?.dropoff_address);
  const [pickuptext, setPickuptext] = useState('');
  const [dropofftext, setdropofftext] = useState('');
  let dataForDate = data?.data?.createdAt
    ? data?.data?.createdAt
    : data?.data?.ride?.createdAt;
  const date = new Date(dataForDate);

  const getDropOffLocation = async () => {
    await getCity(
      data?.data?.ride?.dropofflocation?.coordinates[1],
      data?.data?.ride?.dropofflocation?.coordinates[0],
    ).then(a => {
      setdropofftext(a);
    });
  };
  const getPickUpLocation = async () => {
    await getCity(
      data?.data?.ride?.pickuplocation?.coordinates[1],
      data?.data?.ride?.pickuplocation?.coordinates[0],
    ).then(a => {
      setPickuptext(a);
    });
  };

  useFocusEffect(
    useCallback(() => {
      getPickUpLocation();
      getDropOffLocation();
    }, []),
  );
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
            {data?.data?.pickup_address
              ? data?.data?.pickup_address
              : pickuptext}
          </GilroyRegular>
          <RobotoMedium style={styles.pickupText}>
            Drop off Location:
          </RobotoMedium>
          <GilroyRegular style={styles.addressText}>
            {data?.data?.dropoff_address
              ? data?.data?.dropoff_address
              : dropofftext}
          </GilroyRegular>
        </View>
      </View>
      <View style={styles.userServicesContainer}>
        <CalendarCart
          imgSource={icons.calendar}
          title={date?.toLocaleDateString()}
        />
        <CalendarCart
          imgSource={icons.clockIcon}
          title={date?.getHours() + ':' + date?.getMinutes()}
        />
        <CalendarCart
          imgSource={icons.cash}
          title={`$ ${
            data?.data?.totalbill
              ? data?.data?.totalbill
              : data?.data?.ride?.totalbill
          }`}
        />
      </View>
    </View>
  );
};
export default PickDropLocation;
