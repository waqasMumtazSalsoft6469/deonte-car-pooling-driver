import React, {useCallback, useRef, useState} from 'react';
import {Text, View, Image, FlatList} from 'react-native';
import GilroyMedium from '../../../components/Wrappers/Text/GilroyMedium';
import GilroyRegular from '../../../components/Wrappers/Text/GilroyRegular';
import {styles} from './styles';
import {icons, images} from '../../../assets';
import GilroyBold from '../../../components/Wrappers/Text/GilroyBold';
import Ripple from 'react-native-material-ripple';
import {showToast} from '../../../Api/HelperFunction';
import {useDispatch} from 'react-redux';
import {getEarning} from '../../../Redux/Actions/rider';
import {useFocusEffect} from '@react-navigation/native';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import vh from '../../../utils/units/vh';
import vw from '../../../utils/units/vw';
import {apikey} from '../../../Api/configs';

const Rides = props => {
  console.log(props, 'props ====== Rides');
  const [driverDetails, setDriverDetails] = useState(props?.data?.driver);
  const [ridedetails, setRideDetails] = useState(props?.data?.ride);

  const date = new Date(props?.data?.ride?.createdAt);
  const mapViewRef = useRef();
  const mapDirectionRef = useRef();
  const [markerRegion, setmarkerRegion] = useState({
    latitude: props?.data?.ride?.pickuplocation?.coordinates
      ? props?.data?.ride?.pickuplocation?.coordinates[1]
      : 24.873844,
    longitude: props?.data?.ride?.pickuplocation?.coordinates
      ? props?.data?.ride?.pickuplocation?.coordinates[0]
      : 67.0672913,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // console.log("date ===>", date.toLocaleDateString());
  // date.toLocaleDateString()
  console.log(ridedetails, 'ride details');
  return (
    <View>
      <View style={styles.rideContainer}>
        <View>
          <View style={styles.driverNameContainer}>
            <GilroyMedium style={styles.driverNameStyle}>
              {driverDetails?.firstName + ' ' + driverDetails?.lastName}
            </GilroyMedium>
            <GilroyRegular style={styles.driverNameStyle}>
              {date?.toLocaleDateString()}
            </GilroyRegular>
          </View>
          <View style={styles.driverNameContainer}>
            {/* <GilroyRegular style={styles.idStyle}>BBB-001</GilroyRegular> */}
            <GilroyRegular style={styles.idStyle}>
              ${ridedetails?.totalbill}
            </GilroyRegular>
          </View>
        </View>
        <Image source={icons.arrowRight} style={styles.arrowIcon} />
      </View>
      <MapView
        ref={mapViewRef}
        style={styles.rideMapStyle}
        initialRegion={{
          ...markerRegion,
        }}>
        <Marker coordinate={{...markerRegion}}>
          <Image
            source={icons.circle}
            resizeMode="contain"
            style={{height: vh * 2.5, width: vw * 2.5}}
          />
        </Marker>
        <MapViewDirections
          ref={mapDirectionRef}
          origin={{...markerRegion}}
          destination={{
            latitude: props?.data?.ride?.dropofflocation?.coordinates[1],
            longitude: props?.data?.ride?.dropofflocation?.coordinates[0],
          }}
          apikey={apikey}
          mode="DRIVING"
          strokeColor="black"
          strokeWidth={vh * 0.5}></MapViewDirections>
      </MapView>
      <View style={styles.bookedContainer}>
        <GilroyBold style={styles.bookedText}>
          {props?.data?.ride?.rideStatus}
        </GilroyBold>
      </View>
    </View>
  );
};

const footerComponent = () => {
  return (
    <View style={styles.footerStyle}>
      <View style={styles.viewMoreContainer}>
        <Image source={icons.eyeOpenpurple} style={styles.eyeOpenStyle} />
        <GilroyBold style={styles.viewMoreText}>View More</GilroyBold>
      </View>
    </View>
  );
};

const MyEarnings = props => {
  const dispatch = useDispatch();
  const [details, setDetails] = useState();
  const [refresh, setRefresh] = useState(false);

  // const [driverdetails, setdriverDetails] = useState()
  const getData = async () => {
    try {
      const response = await dispatch(getEarning());

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

  const getDataonRefresh = async () => {
    try {
      const response = await dispatch(getEarning(true));
      setDetails(response);
      setRefresh(false);
    } catch (err) {
      showToast(err);
    }
  };

  const onRefreshhandler = () => {
    setRefresh(true);
    getDataonRefresh();
  };

  const renderEmptyContent = () => {
    return (
      <View style={styles.emptyContainerStyles}>
        <GilroyMedium style={styles.emptyText}>
          No Earning Available
        </GilroyMedium>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={details?.payment}
        renderItem={({index, item}) => (
          // console.log("Item ============>", )
          <Ripple
            onPress={() =>
              props.navigation.navigate('MyEarningDetails', {data: item?._id})
            }>
            <Rides data={item} />
          </Ripple>
        )}
        showsVerticalScrollIndicator={false}
        refreshing={refresh}
        onRefresh={onRefreshhandler}
        ListEmptyComponent={renderEmptyContent()}
      />
    </View>
  );
};
export default MyEarnings;
