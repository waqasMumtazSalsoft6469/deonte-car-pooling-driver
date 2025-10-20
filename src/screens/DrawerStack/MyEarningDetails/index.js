import React, {useCallback, useRef, useState} from 'react';

import {Text, View, Image, ImageBackground} from 'react-native';
import GilroyBold from '../../../components/Wrappers/Text/GilroyBold';
import vh from '../../../utils/units/vh';
// import BottomSheet from 'reanimated-bottom-sheet';
import {Rating} from 'react-native-ratings';
import {styles} from './styles';
import GilroyRegular from '../../../components/Wrappers/Text/GilroyRegular';
import MapView, {Marker} from 'react-native-maps';
import {images, icons} from '../../../assets';
import GilroyMedium from '../../../components/Wrappers/Text/GilroyMedium';
import vw from '../../../utils/units/vw';
import PickDropLocation from '../../../components/PickDropLocation';
import {useFocusEffect} from '@react-navigation/native';
import MapViewDirections from 'react-native-maps-directions';
import {WaveIndicator} from 'react-native-indicators';
import {apikey, image_url} from '../../../Api/configs';
import {getEarningDetails} from '../../../Redux/Actions/rider';
import {showToast} from '../../../Api/HelperFunction';
import {useDispatch} from 'react-redux';

const PricesOfServices = props => {
  return (
    <View style={styles.totalFairContainer}>
      <View style={styles.TopupContainer}>
        <Image source={props.imageSrc} style={styles.walletImage} />
        <GilroyRegular style={styles.topUpText}>{props.title}</GilroyRegular>
      </View>
      <GilroyMedium style={styles.amount}>{props.amount}</GilroyMedium>
    </View>
  );
};

const renderContent = data => {
  console.log('Data from Earning ===>', data);
  return (
    <View style={styles.bottomContainer}>
      <View style={styles.row}>
        <Image
          source={{uri: image_url + data?.data?.user?.userImage}}
          style={styles.driverImage}
          resizeMode="cover"
        />
        <View style={styles.driverDetails}>
          <View style={styles.row2}>
            <GilroyRegular style={styles.text}>
              {data?.data?.user?.firstName
                ? data?.data?.user?.firstName + ' ' + data?.data?.user?.lastName
                : 'Guest User'}
            </GilroyRegular>
          </View>
          <View style={styles.ratingContainer}>
            <Image source={icons.Stars} style={styles.starStyle} />
            <GilroyBold style={styles.text}>
              {data?.ride?.ratings ? data?.ride?.ratings : '0'}
            </GilroyBold>
          </View>
          <GilroyRegular style={styles.text}>
            + {data?.data?.user?.phone}
          </GilroyRegular>
        </View>
      </View>
      <PickDropLocation data={data?.data} />

      <PricesOfServices
        title="Applied Promocode"
        amount="MB40"
        imageSrc={icons.discount}
      />
      <PricesOfServices
        title="Discounted Fare"
        amount={`${
          data?.data?.ride?.discountedfare
            ? '$' + data?.data?.ride?.discountedfare
            : '$ 0'
        }`}
        imageSrc={icons.fire}
      />
      <PricesOfServices
        title="Admin's Commission"
        amount="$20"
        imageSrc={icons.wallet}
      />

      <View style={styles.horizontalLine} />
      <View style={styles.totalFairContainer}>
        <GilroyRegular style={styles.totalFairText}>Total Fare</GilroyRegular>
        <GilroyMedium>
          ${data?.data?.ride?.totalbill ? data?.data?.ride?.totalbill : 0}
        </GilroyMedium>
      </View>
      <GilroyBold style={styles.ratingText}>Rating and Review</GilroyBold>
      <Rating
        type="star"
        ratingCount={4}
        style={styles.starRating}
        readonly={true}
        imageSize={14}
        startingValue={4}
      />
      <GilroyRegular style={styles.reviewText}>
        {data?.data?.ride?.reviews.length > 0
          ? data?.data?.ride?.reviews[0]
          : 'No Review'}
      </GilroyRegular>
    </View>
  );
};
const MyEarningDetails = props => {
  const mapViewRef = useRef();

  const dispatch = useDispatch();
  const [details, setDetails] = useState();
  // const [driverdetails, setdriverDetails] = useState()
  const getData = async () => {
    try {
      const response = await dispatch(
        getEarningDetails(props?.route?.params?.data),
      );
      console.log('REsponse from getEarningDetails ==> ', response);
      setRegion({
        latitude: response?.payment?.ride?.pickuplocation?.coordinates[1],
        longitude: response?.payment?.ride?.pickuplocation?.coordinates[0],
      }),
        setdropOffLocation({
          latitude: response?.payment?.ride?.dropofflocation?.coordinates[1],
          longitude: response?.payment?.ride?.dropofflocation?.coordinates[0],
        });
      mapViewRef?.current?.animateToRegion({
        latitude: response?.payment?.ride?.pickuplocation?.coordinates[1],
        longitude: response?.payment?.ride?.pickuplocation?.coordinates[0],
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setDetails(response);
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
    <View style={{flex: 1}}>
      <MapView
        ref={mapViewRef}
        style={styles.mapView}
        initialRegion={{
          ...initialRegion,
          ...region,
        }}
        // region={{
        //   latitude: 37.78825,
        //   longitude: -122.4324
        // }}
      >
        <Marker coordinate={region}>
          <Image
            source={icons.circleFilled}
            resizeMode="contain"
            style={styles.destinationMarkerStyle}
          />
        </Marker>
        <Marker coordinate={region}>
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
          strokeWidth={vh * 0.5}></MapViewDirections>
      </MapView>
      {/* <BottomSheet
        ref={sheetRef}
        snapPoints={[vh * 70, vh * 30]}
        initialSnap={1}
        renderContent={() => renderContent({data: details?.payment})}
      /> */}
    </View>
  );
};
export default MyEarningDetails;
