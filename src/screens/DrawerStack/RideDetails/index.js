import React, {useRef, useEffect, useCallback, useState} from 'react';

import {Text, View, Image, ImageBackground} from 'react-native';
import GilroyBold from '../../../components/Wrappers/Text/GilroyBold';
import MapView, {Marker} from 'react-native-maps';
import vh from '../../../utils/units/vh';
// import BottomSheet from 'reanimated-bottom-sheet';
import {Rating} from 'react-native-ratings';
import {styles} from './styles';
import GilroyRegular from '../../../components/Wrappers/Text/GilroyRegular';
import {images, icons} from '../../../assets';
import GilroyMedium from '../../../components/Wrappers/Text/GilroyMedium';
import {useDispatch} from 'react-redux';
import vw from '../../../utils/units/vw';
import {getRideDetail} from '../../../Redux/Actions/rider';
import {useFocusEffect} from '@react-navigation/native';
import {image_url} from '../../../Api/configs';
import {showToast} from '../../../Api/HelperFunction';
import MapViewDirections from 'react-native-maps-directions';
import {WaveIndicator} from 'react-native-indicators';
import {apikey} from '../../../Api/configs';

const PricesOfServices = props => {
  return (
    <View style={styles.totalFairContainer}>
      <View style={styles.TopupContainer}>
        <Image source={props.imgSrc} style={styles.walletImage} />
        <GilroyRegular style={styles.topUpText}>{props.title}</GilroyRegular>
      </View>
      <GilroyMedium>{props.amount}</GilroyMedium>
    </View>
  );
};

const renderContent = rideDetails => {
  const date = new Date(rideDetails?.ride?.createdAt);
  console.log(rideDetails, 'Ride details');
  return (
    <View style={styles.bottomContainer}>
      <View style={styles.datePriceContainer}>
        <GilroyBold>{date?.toLocaleDateString()}</GilroyBold>
        <GilroyBold>$ {rideDetails?.ride?.recievedAmount}</GilroyBold>
      </View>
      <View style={styles.row}>
        <View style={styles.imageContainer}>
          <Image
            source={
              rideDetails?.user?.userImage
                ? {uri: image_url + rideDetails?.user?.userImage}
                : images.userProfileImage
            }
            style={styles.driverImage}
          />
        </View>
        <View style={styles.driverDetails}>
          <View style={styles.row2}>
            <GilroyRegular style={styles.text}>
              {rideDetails?.user?.firstName + ' ' + rideDetails?.user?.lastName}
            </GilroyRegular>
          </View>
          <View style={styles.ratingContainer}>
            <Image source={icons.Stars} style={styles.starStyle} />
            <GilroyBold style={styles.text}>{rideDetails?.rating}</GilroyBold>
          </View>
          <GilroyRegular style={styles.text}>
            +{rideDetails?.user?.phone}
          </GilroyRegular>
        </View>
      </View>
      <PricesOfServices
        amount={`$ ${rideDetails?.ride?.topupAmount}`}
        title="TopUp Amount"
        imgSrc={icons.wallet}
      />
      <PricesOfServices
        amount={`$ ${rideDetails?.ride?.discountedfare}`}
        title="Discounted Fare"
        imgSrc={icons.discount}
      />

      <View style={styles.horizontalLine} />
      <View style={styles.totalFairContainer}>
        <GilroyRegular style={styles.totalFairText}>Total Fare</GilroyRegular>
        <GilroyMedium>$ {rideDetails?.ride?.totalbill}</GilroyMedium>
      </View>
      {/* <View style={styles.totalFairContainer}>
        <GilroyRegular style={styles.totalFairText}>Discounted Fare</GilroyRegular>
        <GilroyMedium>$23.6</GilroyMedium>
      </View> */}
      {/* <View style={styles.cancelUserContainer}>
      <GilroyBold style={styles.cancelUserText}>
        Cancelled By User
      </GilroyBold>
      </View> */}
      {/* <GilroyMedium style={styles.reasonText}>Reason</GilroyMedium> */}
      <GilroyBold style={styles.ratingText}>Rating and Review</GilroyBold>

      {/* <GilroyBold style={styles.ratingText}>{rideDetails?.review}</GilroyBold> */}
      <Rating
        type="star"
        ratingCount={rideDetails?.rating}
        style={styles.starRating}
        // ratingImage={require("../../assets/images/star.png")}
        readonly={true}
        imageSize={14}
        startingValue={rideDetails?.rating}
      />
      <GilroyRegular style={styles.reviewText}>
        {rideDetails?.review}
      </GilroyRegular>
    </View>
  );
};
const RideDetails = props => {
  const mapViewRef = useRef();
  const [rideDetails, setRideDetails] = useState('');

  console.log('Ride Details ====>', rideDetails);
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      console.log(
        'props?.route?.params?.data ===>',
        props?.route?.params?.data,
      );
      const response = await dispatch(
        getRideDetail(props?.route?.params?.data),
      );
      console.log('Response ===>', response);
      setRegion({
        latitude: response?.rating?.ride?.pickuplocation?.coordinates[1],
        longitude: response?.rating?.ride?.pickuplocation?.coordinates[0],
      }),
        setdropOffLocation({
          latitude: response?.rating?.ride?.dropofflocation?.coordinates[1],
          longitude: response?.rating?.ride?.dropofflocation?.coordinates[0],
        });
      mapViewRef?.current?.animateToRegion({
        latitude: response?.rating?.ride?.pickuplocation?.coordinates[1],
        longitude: response?.rating?.ride?.pickuplocation?.coordinates[0],
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setRideDetails(response?.rating);
    } catch (err) {
      showToast(err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getData();
    }, []),
  );
  const [initialRegion, setIntialRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const [dropOffLocation, setdropOffLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });

  const sheetRef = useRef(null);
  return (
    <View style={styles.container}>
      <MapView
        ref={mapViewRef}
        style={styles.mapView}
        initialRegion={{
          ...initialRegion,
          ...region,
        }}>
        <Marker coordinate={region}>
          <Image
            source={icons.circle}
            resizeMode="contain"
            style={styles.destinationMarkerStyle}
          />
        </Marker>
        <Marker coordinate={dropOffLocation}>
          <Image
            source={icons.circleFilled}
            resizeMode="contain"
            style={styles.destinationMarkerStyle}
          />
        </Marker>

        <MapViewDirections
          origin={{...region}}
          destination={{...dropOffLocation}}
          apikey={apikey}
          mode="DRIVING"
          strokeColor="black"
          strokeWidth={vh * 0.3}></MapViewDirections>
      </MapView>
      {/* <BottomSheet
        ref={sheetRef}
        snapPoints={[vh * 50, vh * 30]}
        // borderRadius={10}
        initialSnap={1}
        // enabledGestureInteraction={true}
        // enabledContentGestureInteraction={true}
        // renderHeader={renderHeader}
        renderContent={() => renderContent(rideDetails)}
      /> */}
    </View>
  );
};
export default RideDetails;
