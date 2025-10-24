import React, {useState, useCallback, useEffect, useRef} from 'react';
import {
  Text,
  View,
  LayoutAnimation,
  Image,
  Platform,
  PermissionsAndroid,
  Linking,
  NativeModules,
  DeviceEventEmitter,
  NativeEventEmitter,
} from 'react-native';
import {Permission} from 'react-native-permissions';
import {styles} from './styles';
import {TripRequestStyles} from './tripRequestStyles';
import {tripAcceptStyles} from './tripAcceptStyles';
import {RideStartedStyles} from './rideStartedStyles';
import MapView, {Marker} from 'react-native-maps';
import GilroyMedium from '../../../components/Wrappers/Text/GilroyMedium';
import GilroyRegular from '../../../components/Wrappers/Text/GilroyRegular';
import Ripple from 'react-native-material-ripple';
import Button from '../../../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {icons, images} from '../../../assets';
import GilroyBold from '../../../components/Wrappers/Text/GilroyBold';
import PickDropLocation from '../../../components/PickDropLocation';
import Geolocation from '@react-native-community/geolocation';
import {
  acceptRideAction,
  rejectRideAction,
  ridePauseAction,
  rideResumeAction,
  submitAmountAction,
  rideEndRideAction,
  rideDeatilsAction,
  rideStartedAction,
  rideCancelAction,
  markRidePaidAction,
  rideAddtoWallet,
} from '../../../Redux/Actions/rideAction';
import ReportModal from '../../../popups/ReportModal';
import {getDistance} from 'geolib';
import {useFocusEffect} from '@react-navigation/native';
import {showToast} from '../../../Api/HelperFunction';
import {getRiderDetails} from '../../../Redux/Actions/auth';
import {
  getVehicleInfo,
  getVehicleTypes,
} from '../../../Redux/Actions/registerVechicle';
import {io} from 'socket.io-client';
import {
  getCurrentLocation,
  watchPosition,
  checkLocationPermissions,
  getPermission,
  getUserLocation,
} from '../../../Api/HelperFunction';
import vw from '../../../utils/units/vw';
import vh from '../../../utils/units/vh';
import GeneralModal from '../../../popups/GeneralModal';
import MapViewDirections from 'react-native-maps-directions';
import {apikey, base_url} from '../../../Api/configs';
import ReceiptModal from '../../../popups/ReceiptModal';
import actionTypes from '../../../Redux/Actions/actionTypes';
import Touchable from '../../../components/Wrappers/Touchable';
// import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import UserDetailsCard from '../../../components/userDetailCard';
import {
  changeDriverStatus,
  getNotification,
} from '../../../Redux/Actions/rider';
import theme from '../../../utils/theme';
import {
  NotificationListener,
  requestUserPermission,
} from '../../../services/NotificationServices';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';

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
const socket = io(base_url);
console.log('socket: ', socket);
const Home = props => {
  const dispatch = useDispatch();
  const {BackgroundLocation} = NativeModules;
  const markerRef = useRef();
  const mapViewRef = useRef();
  const mapDirectionRef = useRef();
  const modalRef = useRef();
  const pauseModalRef = useRef();
  const rejectRef = useRef();
  const modalRef2 = useRef();
  const modalRef4 = useRef();
  const resumeRef = useRef();
  const mapView1 = useRef();
  const markedPaidRef = useRef();
  const serviceRequest = useRef();
  const resumeConfirmRef = useRef();
  const markPaid = useRef();
  const receiptRef = useRef();
  const receiptImageRef = useRef();
  const amountReceivedRef = useRef();
  const walletRef = useRef();
  const serviceRequested = useRef();
  const PausedRideRef = useRef(null);
  const walletAmountReceivedRef = useRef(null);
  const endRide = useRef();
  const CancellationReasonRef = useRef();
  const startRideRef = useRef(null);
  const cancelRideRef = useRef(null);
  const rideCancelledRef = useRef(null);
  const markpaidErrorRef = useRef(null);
  const paymentReceived = useRef(null);
  const [deatils, setDetails] = useState();
  const [vechicleDeatils, setVechicleDetails] = useState();
  const [region, setRegion] = useState();
  const [showPopUp, setShowPopup] = useState(true);
  const [rideDetails, setRideDetails] = useState();
  const [Distance, setDistance] = useState(10);
  const [paused, setPaused] = useState(false);
  const [amountReceived, setAmountReceived] = useState('');
  const [acceptRide, setAcceptRide] = useState(false);
  const [reason, setReason] = useState();
  const [imagepicker, setImage] = useState();
  const [rideStatus, setRideStatus] = useState();
  const [Rating, setRating] = useState(0);
  const [status, setStatus] = useState();
  const [switchh, setSwitch] = useState(true);
  const [rideAccepted, setRideAccepted] = useState(false);
  const [rideStartered, setRideStarted] = useState(false);
  var watchID = null;
  const userDetail = useSelector(state => state.UserReducer.userData);
  console.log('userDetail-cord', userDetail?.location?.coordinates[0]);
  console.log('userDetail-driver', userDetail);

  const RiderDetail = useSelector(state => state.SessionReducer.riderinfo);
  console.log('RiderDetail', RiderDetail);
  let userId = userDetail?._id;
  const [rideId, SetRideId] = useState();
  const reduxRideId = useSelector(state => state.vehicleReducer.currentRide);
  const allAppState = useSelector(state => state);
  const driverUserId = useSelector(state => state.UserReducer?.userData?._id);

  console.log(
    'allAppssState',
    allAppState?.SessionReducer?.riderinfo?.location?.coordinates,
  );
  const location = useSelector(state => state.UserReducer.userData?.location);
  console.log('location--hh', location);
  console.log('rideId', rideId);
  console.log('reduxRssideId', reduxRideId);
  console.log(
    'map-direction-√lat-lon',
    rideDetails?.ride?.dropofflocation?.coordinates[0],
  );
  console.log('region--region', region);
  const VehicleTypesfromReducer = useSelector(
    state => state.vehicleReducer.vehicleTypes,
  );

  //this is call for get ride id
  const handleNotifications = notificationData => {
    console.log('notificationData--ride', notificationData?.data?.id);
    console.log(notificationData?.data?.id, 'Ride id ');
    getRideDetails(notificationData?.data?.id);
  };
  const getRideDetails = async id => {
    try {
      const response = await dispatch(rideDeatilsAction(id));
      if (response?.ride?.rideStatus == 'Started') {
        setRideStarted(true);
      } else if (response?.ride?.rideStatus == 'Accepted') {
        setRideAccepted(true);
      } else if (
        response?.ride?.rideStatus == 'Completed' ||
        response?.ride?.rideStatus == 'Cancelled'
      ) {
        setRideAccepted(false);
        setRideStarted(false);
      } else {
        setRideAccepted(false);
        setRideStarted(false);
      }
      console.log('response-----------getRideDetails', response);
      console.log('response-----------rideStatus', response?.ride?.rideStatus);
      console.log('response-----------ride', response?.ride);
      setRideDetails(response);
      setRideStatus(response?.ride);
      setStatus(response?.ride?.rideStatus);
    } catch (err) {
      showToast(err);
    }
  };

  console.log(reduxRideId, 'ride id');

  useEffect(() => {
    NotificationListener(handleNotifications);
  }, []);
  //Working on useEffect
  useEffect(() => {
    getOneTimeLocation();
  }, []);
  useEffect(() => {
    //I Replace ReduxRideId to driverRideId
    if (reduxRideId !== null) {
      getRideDetails(reduxRideId);
      SetRideId(reduxRideId);
    }
    // SetRideId(driverUserId);
  }, [reduxRideId]);

  const handleAcceptButton = async () => {
    try {
      const response = await dispatch(acceptRideAction(rideId));
      showToast(response?.message);
      getRideDetails(rideId);
      setAcceptRide(false);
      // dispatch({
      //   type: actionTypes.rideId,
      //   currentRideId: rideId,
      // });

      modalRef2.current.hide();
    } catch (err) {
      showToast(err);
      setShowPopup(true);
    }
  };

  const handleRejectButton = async () => {
    try {
      const response = await dispatch(rejectRideAction(rideId));
      showToast(response?.message);
      setAcceptRide(false);
      setStatus(false);
      //  modalRef2.current.hide();
    } catch (err) {
      showToast(err);

      setShowPopup(true);
    }
  };

  const handleStartRide = async () => {
    try {
      const response = await dispatch(rideStartedAction(rideId));
      getRideDetails(rideId);
      setRideAccepted(false);

      showToast(response?.message);
    } catch (err) {
      showToast(err);
    }
  };

  const handlePaused = async () => {
    try {
      const response = await dispatch(ridePauseAction(rideId));
      //   console.log('REsponse ==>', response);

      showToast(response?.message);
      getRideDetails(rideId);

      setPaused(true);
      PausedRideRef.current.show();
      // modalRef4.current.show();
    } catch (err) {
      showToast(err);
    }
  };

  const end_Ride = async () => {
    try {
      const body = {
        rating: Rating,
        review: 'No Review',
      };
      const response = await dispatch(rideEndRideAction(rideId, body)); 
      showToast(response?.message);
      getRideDetails(rideId);
    } catch (err) {
      console.log('Response from end_ride Err ==>', err);
      if (rideDetails?.ride?.payableamount != 0) {
        console.log('Response Ride End Ride Details =====>', rideDetails);
        markpaidErrorRef.current.show();
      }
      showToast(err);
    }
  };

  const handleCancelbutton = async () => {
    try {
      const body = {
        rejectReason: reason,
      };
      if (reason) {
        const response = await dispatch(rideCancelAction(rideId, body));

        showToast(response?.message);
        getRideDetails(rideId);
        modalRef4.current.show();

        // modalRef2.current.hide();
      } else {
        showToast('Please Enter Reason To Cancel');
      }
    } catch (err) {
      showToast(err);
    }
  };

  const handleSubmitAmount = async () => {
    const body = {
      recievedAmount: amountReceived,
    };
    try {
      const response = await dispatch(submitAmountAction(body, rideId));

      getRideDetails(rideId);

      showToast(response?.message);
      if (amountReceived - rideDetails?.ride?.totalbill > 0) {
        walletRef.current.show();
      } else {
        paymentReceived.current.show();
      }
    } catch (err) {
      walletRef.current.show();
      showToast(err);
    }
  };

  const handleResumed = async () => {
    try {
      const response = await dispatch(rideResumeAction(rideId));

      showToast(response?.message);
      setPaused(false);
      getRideDetails(rideId);
      resumeConfirmRef.current.show();
    } catch (err) {
      console.log('Ree', err);
      showToast(err);
    }
  };

  const markPaidFunc = () => {
    if (status === 'Completed') {
      markPaid.current.show();
    }
  };

  const markCompletedFunc = () => {
    setRideStarted(false);
    endRide.current.show();
  };

  const handlerPicker = async response => {
    setImage(response[0]);
  };

  const handleMarkPaid = async () => {
    try {
      const response = await dispatch(markRidePaidAction(rideId));
      showToast(response?.message);
      getRideDetails(rideId);

      if (rideDetails?.ride?.walletpriority) {
        markedPaidRef.current.show();
      } else {
        amountReceivedRef.current.show();
      }
    } catch (err) {
      console.log('Ree', err);
      markpaidErrorRef.current.show();
      showToast(err);
    }
  };

  const PauseButton = props => {
    const pauseBtnRef = () => {
      if (paused) {
        resumeRef.current.show();
      } else {
        pauseModalRef.current.show();
      }
    };
    return (
      <View>
        <Ripple style={styles.pauseBtn} onPress={pauseBtnRef}>
          {paused && <Image source={icons.check} style={styles.checkBtnIcon} />}
          <GilroyBold style={styles.pauseBtnText}>{props.children}</GilroyBold>
        </Ripple>
        <GeneralModal //screen 7
          reference={resumeRef}
          icon={images.exclamationMark}
          text2={'Are you sure you want to resume this\nride ?'}
          text2Style={styles.text2style}
          button1Text={'Yes'}
          onButton1Press={() => {
            // handleResumed();
            serviceRequested.current.show();
            // receiptImageRef.current.show()

            // setPaused(false);
            // resumeConfirmRef.current.show();
          }}
          button2Text={'No'}
        />
        <GeneralModal //screen 7
          reference={serviceRequested}
          icon={images.exclamationMark}
          text2={'Was a Service requested? ?'}
          text2Style={styles.text2style}
          button1Text={'Yes'}
          onButton1Press={() => {
            // handleResumed();
            receiptImageRef.current.show();

            // setPaused(false);
            // resumeConfirmRef.current.show();
          }}
          button2Text={'No'}
          onButton2Press={() => {
            handleResumed();
          }}
        />

        <GeneralModal //screen 7
          reference={resumeConfirmRef}
          icon={icons.tickModal}
          text2={'Ride has been resumed.'}
          text2Style={{height: null, fontSize: 1.9 * vh}}
          smallMainIconStyle
        />
        <GeneralModal //screen 7
          reference={serviceRequest}
          icon={images.exclamationMark}
          text2={'Was a Service requested?'}
          text2Style={styles.text2style}
          button1Text={'Yes'}
          onButton1Press={() => {
            // setPaused(false)
            // modalRef4.current.show();
          }}
          button2Text={'No'}
        />
      </View>
    );
  };

  const handleSubmitRemainingAmount = async () => {
    try {
      const response = await dispatch(rideAddtoWallet(rideId));
      getRideDetails(rideId);

      showToast(response?.message);
      paymentReceived.current.show();
      setStatus(getRideId?.ride?.rideStatus);
    } catch (err) {
      showToast(err);
    }
  };

  const handleDriverStatus = async () => {
    setSwitch(!switchh);

    const body = {
      flag: !switchh,
    };
    try {
      const response = await dispatch(changeDriverStatus(body));
      // console.log('Response ====>', response);
      console.log('Response ====> --- ß', response?.driver?.location);

      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    } catch (err) {
      showToast(err);
    }
  };
  //Ride started
  const RideStarted = () => {
    return (
      <View style={RideStartedStyles.CardContainer}>
        <UserDetailsCard data={rideDetails} />

        <View>
          {status != 'Completed' && (
            <PauseButton
              modalRef={modalRef}
              {...props}
              paused={paused}
              setPaused={setPaused}>
              {status == 'Paused' ? 'Paused' : 'Pause Ride'}
            </PauseButton>
          )}
        </View>
        <PickDropLocation data={rideDetails} />
        <View style={RideStartedStyles.ButtonsStyle}>
          <CustomButton
            customButtonStyle={[
              status != 'Completed'
                ? RideStartedStyles.markColor
                : RideStartedStyles.acceptBtn,
            ]}
            onPress={markCompletedFunc}>
            Mark Completed
          </CustomButton>
          <CustomButton
            customButtonStyle={[
              status === 'Completed'
                ? RideStartedStyles.markColorPaid
                : RideStartedStyles.rejectBtn,
            ]}
            onPress={markPaidFunc}>
            Mark Paid
          </CustomButton>
        </View>
      </View>
    );
  };
  //Ride started
  //Ride start
  const TripStart = () => {
    return (
      <View style={tripAcceptStyles.CardContainer}>
        <GilroyBold style={tripAcceptStyles.tripIdText}>
          Trip ID: {rideId ? rideId : ''}
        </GilroyBold>
        <View style={tripAcceptStyles.usernameProfileContainer}>
          <View style={tripAcceptStyles.userNameImageContainer}>
            <View style={tripAcceptStyles.profileContainer}>
              <Image
                source={images.userProfileImage}
                style={tripAcceptStyles.profileImage}
              />
            </View>
            <RobotoMedium style={tripAcceptStyles.userNameText}>
              {rideDetails?.ride?.user?.firstName
                ? rideDetails?.ride?.user?.firstName +
                  ' ' +
                  rideDetails?.ride?.user?.lastName
                : 'Guest User'}
            </RobotoMedium>
          </View>
          <View style={tripAcceptStyles.imgsContainer}>
            {/* <Ripple onPress={() => props.navigation.navigate('Chat')}>
              <Image source={icons.chat} style={tripAcceptStyles.phoneIcon} />
            </Ripple> */}
            {/* <TouchableWithoutFeedback
              onPress={() =>
                Linking.openURL(`tel:${rideDetails?.ride?.user?.phone}`)
              }>
              <Image
                source={icons.phone}
                style={[
                  tripAcceptStyles.phoneIcon,
                  tripAcceptStyles.phoneIconChanges,
                ]}
              />
            </TouchableWithoutFeedback> */}
          </View>
        </View>
        <PickDropLocation data={rideDetails} />
        <CustomButton
          customButtonStyle={tripAcceptStyles.acceptBtn}
          textstyle={tripAcceptStyles.acceptBtn}
          onPress={() => cancelRideRef.current.show()}>
          Cancel
        </CustomButton>

        <CustomButton
          customButtonStyle={tripAcceptStyles.rejectBtn}
          onPress={() => startRideRef.current.show()}>
          Start Ride
        </CustomButton>
      </View>
    );
  };
  //Ride start
  //Ride request
  const TripRequest = () => {
    return (
      <View style={{alignItems: 'center'}}>
        <View style={TripRequestStyles.CardContainer}>
          <UserDetailsCard data={rideDetails} />
          <PickDropLocation data={rideDetails} />
          <View style={TripRequestStyles.ButtonsStyle}>
            <CustomButton
              customButtonStyle={TripRequestStyles.acceptBtn}
              onPress={() => modalRef.current.show()}>
              Accept
            </CustomButton>
            <CustomButton
              customButtonStyle={TripRequestStyles.rejectBtn}
              onPress={() => rejectRef.current.show()}>
              Reject
            </CustomButton>
          </View>
        </View>
      </View>
    );
  };
  //Ride request
  const homescreen = () => {
    return (
      <View style={styles.CardContainer}>
        <View style={styles.switchContainer}>
          <GilroyMedium style={styles.nameText}>
            Hi,{deatils?.firstName}
          </GilroyMedium>
          <View style={styles.offlineContainer}>
            <GilroyRegular>{!switchh ? 'Offline' : 'online'}</GilroyRegular>
            <Ripple
              style={[
                styles.switch,
                !switchh ? styles.switchOn : styles.switchOff,
              ]}
              onPress={handleDriverStatus}>
              <View
                style={[
                  styles.whiteCircle,
                  !switchh ? styles.grey : styles.purple,
                ]}
              />
            </Ripple>
          </View>
        </View>
        {!deatils?.drivervehicletype && (
          <View>
            <GilroyRegular style={styles.noVehicleText}>
              {'Currently no vehicle registered'}
            </GilroyRegular>
            <Button
              text="Register Vehicle"
              style={styles.buttonStyle}
              textStyle={styles.buttonText}
              onPress={() => props.navigation.navigate('MyVehicle')}
            />
          </View>
        )}
      </View>
    );
  };
  console.log(rideDetails, 'ride details');
  const getOneTimeLocation = () => {
    console.log('Getting Location ...');
    console.log('ride--id', rideId);
    const config = {
      enableHighAccuracy: false,
      timeout: 10000,
    };
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        //Saving the location on redux
        console.log('sssss', position);
        dispatch({
          type: actionTypes.setLocation,
          coordinates: [position.coords.latitude, position.coords.longitude],
        });
        //Ride Id 65e5dbd8fc4f2443ec589f1c
        //Coords [24.8739192,67.0672376]

        const obj = {
          userId: userDetail?._id,
          coordinates: [position.coords.latitude, position.coords.longitude],
        };

        socket.emit('drivercoordinates', obj);
      },
      error => {
        console.log('Error from getOneTimeLocation', error);
        showToast(error.message);
      },
      config,
    );

    // Geolocation.getCurrentPosition(
    //   info => console.log('INFO--------geo', info),
    //   error => console.log('ERROR-------geo', error),
    //   config
    // );
  };
  const subscribeLocationLocation = async () => {
    try {
      if (Platform.OS === 'android') {
        BackgroundLocation.startListener(resp => {
          console.log('Resp ==>', resp);
          if (resp === false) {
            return;
          } else {
            //I Commit the bg service native code 2024, Because app is crashing on android.
            getLocationFromNative();
          }
        });
      }
      if (Platform.OS === 'ios') {
        try {
          // Geolocation.requestAuthorization();
          console.log('testing permission');
          // console.log('are we here?');
          let k = await BackgroundLocation.requestAlwaysAuthorization();
          if (k === false) {
            console.log('PERISSSON IPHONEeeee GETTTIINNGNG', k);
          } else {
            console.log('permission granted');
          }
          BackgroundLocation.configure();
          BackgroundLocation.startUpdatingLocation();
          getLocationFromNative();
        } catch (e) {
          console.log('ERROR iphone', e);
        }
      }
    } catch (err) {
      showToast(err);
    }
  };
  const getLocationFromNative = () => {
    console.log('BackgroundLocation', BackgroundLocation);
    console.log('getLocationFromNative native modules func called');
    const eventEmitter = new NativeEventEmitter(BackgroundLocation);
    console.log('eventEmitter', eventEmitter);
    eventEmitter.addListener('getLocation');
    DeviceEventEmitter.addListener('getLocation', data => {
      console.log(data, 'data from backend');
      let floatData = {
        latitude: parseFloat(data?.latitude),
        longitude: parseFloat(data?.longitude),
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      };
      console.log(data, 'dataaa');
      if (rideId) {
        socket.emit('drivercoordinates', {
          userId: rideId,
          coordinates: [floatData?.longitude, floatData?.latitude],
        });
      } else {
        console.log('userId ===>', userId);
        socket.emit('drivercoordinates', {
          userId: userId,
          coordinates: [floatData?.longitude, floatData?.latitude],
        });
      }

      console.log(floatData, 'float data');

      if (Platform.OS === 'android') {
        if (markerRef?.current?.animateMarkerToCoordinate) {
          markerRef?.current?.animateMarkerToCoordinate(
            {
              latitude: floatData?.latitude,
              longitude: floatData?.longitude,
              latitudeDelta: 0.00922,
              longitudeDelta: 0.00421,
            },
            1000,
          );
        }
      }
      if (mapViewRef?.current?.animateToRegion) {
        mapViewRef?.current?.animateToRegion(
          {
            latitude: floatData?.latitude,
            longitude: floatData?.longitude,
            latitudeDelta: 0.00922,
            longitudeDelta: 0.00421,
          },
          1000,
        );
      }

      setRegion({
        latitude: floatData?.latitude,
        longitude: floatData?.longitude,
        latitudeDelta: 0.00922,
        longitudeDelta: 0.00421,
      });

      console.log('markerRef float data ', mapViewRef);
    });
  };
  const requestLocationPermission = async () => {
    console.log('inside requestLocationPermission');

    if (Platform.OS === 'ios') {
      setTimeout(() => {
        getOneTimeLocation();
      }, 10000);
      subscribeLocationLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message:
              'This App needs to Access your location to get you nearby rides',
          },
        );
        console.log('granted-granted', granted);
        const backgroundGranted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
          {
            title: 'Location Access Required',
            message:
              'This App needs to Access your location in background to get you nearby rides',
          },
        );
        console.log('backgroundGranted-backgroundGranted', backgroundGranted);

        if (
          granted === PermissionsAndroid.RESULTS.GRANTED &&
          backgroundGranted === PermissionsAndroid.RESULTS.GRANTED
        ) {
          //To Check, If Permission is granted
          console.log('Permission dddGranted');
          getOneTimeLocation();

          //I Commit the bg service native code 2024, Because app is crashing on android.
          // subscribeLocationLocation();
        } else {
          console.log('Permission Denied');
        }
      } catch (err) {
        console.log('Error from requestLocation ==>', err);
      }
    }
  };

  const stop = async () => {
    try {
      console.log('Inside Stop func');
      if (Platform.OS === 'android') {
        await BackgroundLocation.stopListener();
      } else {
        await BackgroundLocation.stopUpdatingLocation();
      }
    } catch (err) {
      console.log('Error from Stop ==>', err);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setTimeout(() => {
        console.log('useFocusEffect -- is running!');
        //This function is crached the build - Native Modules
        requestLocationPermission();
      }, 1000);

      return () => stop();
    }, []),
  );

  const getData = async () => {
    try {
      const response = await dispatch(getRiderDetails(userDetail?._id));

      setDetails(response?.driver);
      if (rideId) {
        getRideDetails(rideId);
      }
    } catch (err) {
      showToast(err);
    }
  };

  const getVechileInfo = async () => {
    try {
      if (deatils?.drivervehicletype) {
        const response = await dispatch(
          getVehicleInfo(RiderDetail?.drivervehicletype?._id),
        );

        setVechicleDetails(response?.vehicle);
      }
    } catch (err) {
      showToast(err);
    }
  };

  const VehicleTypes = async () => {
    try {
      const response = await dispatch(getVehicleTypes());

      // setVehicleTypes(tempData);
    } catch (err) {
      console.log('Error fromm get Vehicle types==>', err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (rideId) {
        getRideDetails(rideId);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
        setAcceptRide(true);
      }

      getVechileInfo();
      getData();
    }, [rideId]),
  );

  useEffect(() => {
    try {
      socket.emit('joinRoom', userId);

      VehicleTypes();
      // reactNativeEasyPushNotifications.getDeviceId(id => {
      //   console.log('Id =-==========>', id);
      // });
    } catch (e) {
      console.log('Error from UseEffect =====>', e);
      showToast(e);
    }
  }, []);

  const [markerRegion, setmarkerRegion] = useState({
    latitude: userDetail?.location?.coordinates[0],
    longitude: userDetail?.location?.coordinates[1],
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  console.log('markerRegion--markerRegion', markerRegion);
  const handleRating = a => {
    setRating(a);
  };

  //Here ride flow
  const renderView = () => {
    //status == 'Pending'
    if (false) {
      return (
        <View style={{flex: 1, alignItems: 'center'}}>{TripRequest()}</View>
      );
    }
    //status == 'Accepted' && Distance < 0.4
    else if (status == 'Accepted' && rideAccepted) {
      return <View style={{flex: 1, alignItems: 'center'}}>{TripStart()}</View>;
    } else if (
      status == 'Started' ||
      status === 'Completed' ||
      status == 'Paused' ||
      status == 'Resumed'
    ) {
      // if (Distance < 0.4) {
      if (rideStartered) {
        return (
          <View style={{flex: 1, alignItems: 'center'}}>{RideStarted()}</View>
        );
      }
    } else {
      return (
        <View style={{position: 'absolute', left: vw * 5, top: vh * 2}}>
          {homescreen()}
        </View>
      );
    }
  };
  //Here ride flow
  console.log(Distance, status, 'Distance status');

  return (
    <View style={styles.container}>
      <MapView
        ref={mapViewRef}
        region={region}
        style={styles.mapView}
        initialRegion={{
          ...markerRegion,
          ...region,
        }}>
        {switchh && (
          <Marker coordinate={{...markerRegion, ...region}} ref={markerRef}>
            <Ripple
              rippleColor="#5568FE"
              rippleSize={10}
              rippleDuration={400}
              rippleSequential={true}>
              <Image
                source={icons.circle}
                resizeMode="contain"
                style={{height: vh * 5, width: vw * 5}}
              />
            </Ripple>
          </Marker>
        )}

        {status && (
          <MapViewDirections
            ref={mapDirectionRef}
            // origin={region}
            origin={{latitude: 24.8639148, longitude: 67.1672468}}
            destination={
              status == 'Started'
                ? {
                    latitude:
                      rideDetails?.ride?.dropofflocation?.coordinates[1],
                    longitude:
                      rideDetails?.ride?.dropofflocation?.coordinates[0],
                  }
                : {
                    latitude: rideDetails?.ride?.pickuplocation?.coordinates[1],
                    longitude:
                      rideDetails?.ride?.pickuplocation?.coordinates[0],
                  }
            }
            apikey={apikey}
            mode="DRIVING"
            strokeColor="black"
            strokeWidth={4}
            onReady={result => {
              console.log(result, 'Distance in Map view');
              setDistance(result.distance);
            }}></MapViewDirections>
        )}
        {status && (
          <Marker
            coordinate={
              status == 'Started' || status == 'Completed'
                ? {
                    latitude:
                      rideDetails?.ride?.dropofflocation?.coordinates[1],
                    longitude:
                      rideDetails?.ride?.dropofflocation?.coordinates[0],
                  }
                : {
                    latitude: rideDetails?.ride?.pickuplocation?.coordinates[1],
                    longitude:
                      rideDetails?.ride?.pickuplocation?.coordinates[0],
                  }
            }>
            <Ripple
              rippleColor="#5568FE"
              rippleSize={10}
              rippleDuration={400}
              rippleSequential={true}>
              <Image
                source={icons.circle}
                resizeMode="contain"
                style={{
                  height: vh * 5,
                  width: vw * 5,
                  tintColor: theme.colors.primaryColor,
                }}
              />
            </Ripple>
          </Marker>
        )}
      </MapView>

      {renderView()}

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
      <ReportModal //screen 7
        reference={modalRef2}
        text1={'Rejection Reason'}
        title="Please Provide a Reason"
        inputIcon
        text2Style={{height: null, fontSize: 1.9 * vh}}
        button1Text={'Continue'}
        onChangeText={setReason}
        onButton1Press={() => {
          handleCancelbutton();
        }}
        button2Text={'Cancel'}
      />
      <GeneralModal //screen 7
        reference={modalRef4}
        icon={icons.tickModal}
        text2={'Ride has been rejected.'}
        text2Style={{height: null, fontSize: 1.9 * vh}}
        smallMainIconStyle
      />
      <GeneralModal //screen 7
        reference={markedPaidRef}
        icon={icons.tickModal}
        text2={'Ride payment has been marked paid.'}
        text2Style={{height: null, fontSize: 1.9 * vh}}
        smallMainIconStyle
      />

      <GeneralModal //screen 7
        reference={startRideRef}
        icon={images.exclamationMark}
        // text1={'Logout'}
        text2={'Are you sure you want to start the ride?'}
        text2Style={tripAcceptStyles.text2style}
        button1Text={'Yes'}
        onButton1Press={() => {
          handleStartRide();
        }}
        button2Text={'No'}
      />
      <GeneralModal //screen 7
        reference={cancelRideRef}
        icon={images.exclamationMark}
        text2={
          'Are you sure you want to cancel the ride.\nYou might be charged for cancellation.'
        }
        text2Style={tripAcceptStyles.text2style}
        button1Text={'Yes'}
        onButton1Press={() => {
          modalRef2.current.show();
        }}
        button2Text={'No'}
      />
      <ReportModal //screen 7
        reference={CancellationReasonRef}
        text1={'Cancellation Reason'}
        title="Please Provide a Reason"
        smallMainIconStyle
        text2Style={{height: null, fontSize: 1.9 * vh}}
        button1Text={'Continue'}
        onButton1Press={() => {
          rideCancelledRef.current.show();
        }}
        button2Text={'Cancel'}
      />
      <GeneralModal //screen 7
        reference={rideCancelledRef}
        icon={icons.tickModal}
        text2={'Trip has been cancelled'}
        text2Style={{height: null, fontSize: 1.9 * vh}}
        smallMainIconStyle
      />

      <GeneralModal //screen 7
        rating
        reference={endRide}
        icon={images.exclamationMark}
        text2={'Are You Sure you want to end\nthe Ride?'}
        text2Style={RideStartedStyles.text2style}
        button1Text={'Yes'}
        button2Text={'No'}
        onButton1Press={() => end_Ride()}
        ratings={handleRating}
      />

      <ReceiptModal //screen 7
        reference={receiptRef}
        text1="Receipt"
        text2="Please Upload Receipt Here"
        button1Text={'Yes'}
        onButton1Press={() => {
          receiptImageRef.current.show();
        }}
        button2Text={'No'}
      />
      <ReceiptModal //screen 7
        label
        input
        titleInput="Top Up Amount"
        reference={receiptImageRef}
        text1="Receipt"
        button1Text={'Yes'}
        keyboardType={'number-pad'}
        onButton1Press={() => {
          handleResumed();
        }}
        imageUpload
        button2Text={'No'}
        Picker={handlerPicker}
        image={imagepicker}
      />
      <GeneralModal //screen 7
        reference={markPaid}
        icon={images.exclamationMark}
        text2={'Are you sure you want to mark paid?'}
        text2Style={RideStartedStyles.text2style}
        button1Text={'Yes'}
        onButton1Press={() => {
          handleMarkPaid();
          // amountReceivedRef.current.show()

          // markPaidConfirm.current.show()

          // serviceRequest.current.show()
          // modalRef4.current.show();
        }}
        button2Text={'No'}
      />

      {/* <GeneralModal //screen 7
                    reference={markPaidConfirm}
                    icon={icons.tickModal}
                    text2={'Ride payment has been marked paid'}
                    text2Style={{ height: null, fontSize: 1.7 * vh }}
                    smallMainIconStyle
                /> */}

      <ReceiptModal //screen 7
        reference={amountReceivedRef}
        inputIcon
        text1="Amount Recieved"
        titleInput="Amount Recieved"
        input
        button1Text={'Submit'}
        onChangeText={setAmountReceived}
        keyboardType={'number-pad'}
        onButton1Press={() => {
          if (!amountReceived) {
            return showToast('Enter Amount Recieved');
          } else {
            handleSubmitAmount();
          }
          // receiptImageRef.current.show()
        }}
        button2Text={'Cancel'}
      />
      <GeneralModal //screen 7
        reference={walletRef}
        icon={images.exclamationMark}
        text2={`Do you want to add the remaining\namount in ${
          rideDetails?.ride?.user?.firstName
            ? rideDetails?.ride?.user?.firstName
            : 'user'
        } wallet ?`}
        text2Style={RideStartedStyles.text2style}
        textAmount={amountReceived - rideDetails?.ride?.totalbill}
        button1Text={'Yes'}
        onButton1Press={handleSubmitRemainingAmount}
        button2Text={'No'}
      />

      <GeneralModal //screen 7
        reference={pauseModalRef}
        icon={images.exclamationMark}
        text2={'Are you sure you want to pause\nthis ride ?'}
        text2Style={RideStartedStyles.text2style}
        button1Text={'Yes'}
        onButton1Press={() => {
          handlePaused();

          // receiptImageRef.current.show()
          // handlePaused()

          // amountReceivedRef.current.show();
        }}
        button2Text={'No'}
      />
      <GeneralModal //screen 7
        reference={PausedRideRef}
        icon={icons.tickModal}
        text2={'Ride has been paused.'}
        text2Style={{height: null, fontSize: 1.9 * vh}}
        smallMainIconStyle
      />
      <GeneralModal //screen 7
        reference={walletAmountReceivedRef}
        icon={icons.tickModal}
        text2={'Amount has been added to wallet.'}
        text2Style={{height: null, fontSize: 1.9 * vh}}
        smallMainIconStyle
      />
      <GeneralModal //screen 7
        reference={paymentReceived}
        icon={icons.tickModal}
        text2={'Payment has been received .'}
        text2Style={{height: null, fontSize: 1.9 * vh}}
        smallMainIconStyle
      />

      <GeneralModal //screen 7
        reference={markpaidErrorRef}
        icon={images.exclamationMark}
        text2={
          'An error occurred while transaction.Please collect payment in cash and then mark paid.'
        }
        onHide={() => amountReceivedRef.current.show()}
        text2Style={{height: null, fontSize: 1.9 * vh}}
        smallMainIconStyle
      />
    </View>
  );
};
export default Home;
