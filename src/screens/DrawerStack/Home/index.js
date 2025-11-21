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
  Alert,
  AppState,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Permission} from 'react-native-permissions';
import {styles} from './styles';
import {TripRequestStyles} from './tripRequestStyles';
import {tripAcceptStyles} from './tripAcceptStyles';
import {RideStartedStyles} from './rideStartedStyles';
import MapView, {Marker} from 'react-native-maps';
import GilroyMedium from '../../../components/Wrappers/Text/GilroyMedium';
import GilroyRegular from '../../../components/Wrappers/Text/GilroyRegular';
import RobotoMedium from '../../../components/Wrappers/Text/RobotoMedium';
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
import SocketService from '../../../services/socket';
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
import theme, { colors } from '../../../utils/theme';
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
  const backgroundLocationDeniedRef = useRef(false); // Track if background location was denied
  const backgroundLocationRequestedRef = useRef(false); // Track if we've already requested background location this session
  const checkingSettingsRef = useRef(false); // Track if user is in settings
  const locationIntervalRef = useRef(null); // Track location update interval
  const BACKGROUND_LOCATION_DENIED_KEY = '@background_location_denied'; // AsyncStorage key
  const [deatils, setDetails] = useState();
  const [vechicleDeatils, setVechicleDetails] = useState();
  const [region, setRegion] = useState();
  const [showPopUp, setShowPopup] = useState(true);
  const [rideDetails, setRideDetails] = useState();
  const [Distance, setDistance] = useState(0);
  const [paused, setPaused] = useState(false);
  const [amountReceived, setAmountReceived] = useState('');
  const [acceptRide, setAcceptRide] = useState(false);
  const [reason, setReason] = useState();
  const [imagepicker, setImage] = useState();
  const [rideStatus, setRideStatus] = useState();
  const [Rating, setRating] = useState(0);
  const [status, setStatus] = useState();
  const userDetail = useSelector(state => state.UserReducer.userData);
  // Initialize switch state based on login data flag
  // Default to false (Offline) if flag is not available, to be safe
  // Track if toggle was user-initiated to prevent useEffect from overwriting it
  const userToggledRef = useRef(false);
  const toggleTimestampRef = useRef(0);
  
  const [switchh, setSwitch] = useState(() => {
    // Check if userDetail and flag are available
    if (userDetail && userDetail.hasOwnProperty('flag')) {
      let flagValue = userDetail.flag;
      
      // Convert string "true"/"false" to boolean if needed
      if (typeof flagValue === 'string') {
        flagValue = flagValue.toLowerCase() === 'true';
      } else if (typeof flagValue !== 'boolean') {
        flagValue = Boolean(flagValue);
      }
      
      console.log('[Home] 📍 Initializing switch from userDetail.flag:', userDetail.flag, '→', flagValue);
      return flagValue;
    }
    // Default to false (Offline) if not available
    console.log('[Home] ⚠️ userDetail.flag not available, defaulting to false (Offline)');
    return false;
  });
  const [rideAccepted, setRideAccepted] = useState(false);
  const [rideStartered, setRideStarted] = useState(false);
  const [paymentAuthorized, setPaymentAuthorized] = useState(false); // Track payment authorization status
  const [currentLatitude, setCurrentLatitude] = useState(null);
  const [currentLongitude, setCurrentLongitude] = useState(null);
  var watchID = null;
  console.log('userDetail-cord', userDetail?.location?.coordinates?.[0]);
  console.log('userDetail-driver', userDetail);
  console.log('[Home] 📍 userDetail.flag value:', userDetail?.flag);
  console.log('[Home] 📍 userDetail.flag type:', typeof userDetail?.flag);
  console.log('[Home] 📍 Current switchh state:', switchh);
  
  // Log current driver location coordinates
  console.log('[Home] 📍 Current Driver Location State:', {
    latitude: currentLatitude,
    longitude: currentLongitude,
    timestamp: new Date().toISOString(),
  });

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
    rideDetails?.ride?.dropofflocation?.coordinates?.[0],
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
      console.log('[Home] 🔄 ========== FETCHING RIDE DETAILS ==========');
      console.log('[Home] 📍 Ride ID:', id);
      
      if (!id) {
        console.error('[Home] ❌ No ride ID provided to getRideDetails');
        return;
      }
      
      const response = await dispatch(rideDeatilsAction(id));
      console.log('[Home] 📍 API Response received:', JSON.stringify(response, null, 2));
      
      const rideStatus = response?.ride?.rideStatus;
      const normalizedStatus = rideStatus ? String(rideStatus).trim() : null;
      
      console.log('[Home] 📍 Ride Status from API:', rideStatus);
      console.log('[Home] 📍 Normalized Status:', normalizedStatus);
      
      // Always set ride details and status first
      setRideDetails(response);
      setRideStatus(response?.ride);
      
      // Ensure acceptRide is true if we have ride details
      if (response?.ride) {
        setAcceptRide(true);
      }
      
      // Use case-insensitive comparison for status
      if (normalizedStatus && normalizedStatus.toLowerCase() === 'started') {
        setRideStarted(true);
        setRideAccepted(false);
        setStatus('Started');
        console.log('[Home] ✅ Ride Started - Status set to: Started');
      } else if (normalizedStatus && normalizedStatus.toLowerCase() === 'accepted') {
        setRideAccepted(true);
        setRideStarted(false);
        setStatus('Accepted');
        
        // Check payment status when ride is accepted
        const paymentStatus = response?.ride?.paymentStatus;
        const paymentMethod = response?.ride?.paymentMethod;
        
        // Payment is authorized if: status is authorized/captured OR payment method is Wallet/Cash (no authorization needed)
        if (paymentStatus === 'authorized' || paymentStatus === 'captured' || 
            paymentMethod === 'Wallet' || paymentMethod === 'Cash') {
          setPaymentAuthorized(true);
          console.log('[Home] 💳 Payment authorized - paymentStatus:', paymentStatus, 'paymentMethod:', paymentMethod);
        } else {
          setPaymentAuthorized(false);
          console.log('[Home] ⏳ Payment not yet authorized - paymentStatus:', paymentStatus, 'paymentMethod:', paymentMethod);
        }
        
        console.log('[Home] ✅ Ride Accepted - Status set to: Accepted');
        console.log('[Home] ✅ rideAccepted set to: true');
        console.log('[Home] ✅ status set to: Accepted');
      } else if (
        normalizedStatus && 
        (normalizedStatus.toLowerCase() === 'completed' || normalizedStatus.toLowerCase() === 'cancelled')
      ) {
        // Reset all ride-related state when ride is completed or cancelled
        setRideAccepted(false);
        setRideStarted(false);
        setPaymentAuthorized(false);
        setDistance(0);
        setStatus(null);
        console.log('[Home] ✅ Ride Completed/Cancelled - Status cleared');
        
        // Clear ride details after a delay
        setTimeout(() => {
          setRideDetails(null);
          setRideStatus(null);
          setStatus(null);
        }, 2000);
      } else {
        // For any other status (Pending, Searching, etc.)
        setRideAccepted(false);
        setRideStarted(false);
        setStatus(normalizedStatus || null);
        console.log('[Home] ✅ Other status - Status set to:', normalizedStatus);
      }
      
      console.log('[Home] 📍 Final state values:', {
        rideStatus: normalizedStatus,
        rideAccepted: normalizedStatus?.toLowerCase() === 'accepted',
        rideStarted: normalizedStatus?.toLowerCase() === 'started',
        hasRideDetails: !!response?.ride,
      });
      console.log('[Home] ===========================================');
    } catch (err) {
      console.error('[Home] ❌ Error in getRideDetails:', err);
      console.error('[Home] ❌ Error details:', JSON.stringify(err, null, 2));
      showToast(err?.message || 'Failed to fetch ride details');
    }
  };

  console.log(reduxRideId, 'ride id');

  useEffect(() => {
    NotificationListener(handleNotifications);
  }, []);
  
  // Initialize switch state from userDetail flag on mount
  useEffect(() => {
    console.log('[Home] 🔄 Component mounted - Checking userDetail.flag');
    console.log('[Home] 📍 userDetail:', userDetail);
    console.log('[Home] 📍 userDetail.flag:', userDetail?.flag);
    
    if (userDetail && userDetail.hasOwnProperty('flag')) {
      let flagValue = userDetail.flag;
      
      // Convert string "true"/"false" to boolean if needed
      if (typeof flagValue === 'string') {
        flagValue = flagValue.toLowerCase() === 'true';
      } else if (typeof flagValue !== 'boolean') {
        flagValue = Boolean(flagValue);
      }
      
      console.log('[Home] 📍 Setting switch from userDetail.flag on mount:', userDetail.flag, '→', flagValue);
      setSwitch(flagValue);
    } else {
      console.log('[Home] ⚠️ userDetail.flag not available on mount');
    }
  }, []); // Run only on mount
  
  //Working on useEffect
  useEffect(() => {
    getOneTimeLocation();
    // Also fetch location using helper function
    fetchDriverLocation();
  }, []);
  useEffect(() => {
    //I Replace ReduxRideId to driverRideId
    if (reduxRideId !== null && reduxRideId !== undefined) {
      console.log('[Home] 🔄 ========== REDUX RIDE ID CHANGED ==========');
      console.log('[Home] 📍 New reduxRideId:', reduxRideId);
      console.log('[Home] 📍 Current rideId state:', rideId);
      
      // Set rideId in state
      SetRideId(reduxRideId);
      
      // Set acceptRide to true to ensure card shows
      setAcceptRide(true);
      
      // Fetch ride details
      console.log('[Home] 🔄 Fetching ride details for reduxRideId:', reduxRideId);
      getRideDetails(reduxRideId).then(() => {
        console.log('[Home] ✅ Ride details fetched successfully from reduxRideId');
      }).catch((err) => {
        console.error('[Home] ❌ Error fetching ride details from reduxRideId:', err);
      });
      
      console.log('[Home] ===========================================');
    }
    // SetRideId(driverUserId);
  }, [reduxRideId]);

  const handleAcceptButton = async () => {
    try {
      const socket = SocketService.getSocket();
      
      // Emit acceptance via socket
      if (socket && SocketService.isSocketConnected() && rideId && driverUserId) {
        socket.emit('ride:accept', {
          rideId: rideId,
          driverId: driverUserId,
        });
        console.log('🔵 Socket EMIT: ride:accept', {rideId, driverId: driverUserId});
      }
      
      // Also call API endpoint as backup
      const response = await dispatch(acceptRideAction(rideId));
      showToast(response?.message);
      
      // Close modal first
      modalRef2.current.hide();
      
      // Then fetch ride details which will set status to 'Accepted'
      await getRideDetails(rideId);
      
      setAcceptRide(false);
      // dispatch({
      //   type: actionTypes.rideId,
      //   currentRideId: rideId,
      // });
    } catch (err) {
      showToast(err);
      setShowPopup(true);
    }
  };

  const handleRejectButton = async () => {
    try {
      const socket = SocketService.getSocket();
      
      // Emit rejection via socket
      if (socket && SocketService.isSocketConnected() && rideId && driverUserId) {
        socket.emit('ride:reject', {
          rideId: rideId,
          driverId: driverUserId,
          reason: 'Not available',
        });
        console.log('🔵 Socket EMIT: ride:reject', {rideId, driverId: driverUserId});
      }
      
      // Also call API endpoint as backup
      const response = await dispatch(rejectRideAction(rideId));
      showToast(response?.message);
      setAcceptRide(false);
      setStatus(null); // Clear status properly
      //  modalRef2.current.hide();
    } catch (err) {
      showToast(err);

      setShowPopup(true);
    }
  };

  const handleStartRide = async () => {
    try {
      // Check if payment is authorized before starting ride
      // Payment is authorized if: status is authorized/captured OR payment method is Wallet/Cash (no authorization needed)
      const paymentStatus = rideDetails?.ride?.paymentStatus;
      const paymentMethod = rideDetails?.ride?.paymentMethod;
      const isPaymentAuthorized = paymentAuthorized || 
        paymentStatus === 'authorized' ||
        paymentStatus === 'captured' ||
        paymentMethod === 'Wallet' ||
        paymentMethod === 'Cash';
      
      if (!isPaymentAuthorized) {
        showToast('Please wait for user to authorize payment before starting the ride.');
        return;
      }

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
    // Calculate the new value first
    const newSwitchValue = !switchh;
    
    // Mark as user-initiated toggle
    userToggledRef.current = true;
    toggleTimestampRef.current = Date.now();
    
    // Update local state first
    setSwitch(newSwitchValue);

    // Send the NEW value to the server (not the old one)
    const body = {
      flag: newSwitchValue, // Use the new value, not the old one
    };
    
    console.log('[Home] 🔄 Toggling driver status:', {
      oldValue: switchh,
      newValue: newSwitchValue,
      sendingFlag: newSwitchValue,
    });
    
    try {
      const response = await dispatch(changeDriverStatus(body));
      console.log('[Home] ✅ Driver status updated:', response);
      console.log('[Home] 📍 Response driver location:', response?.driver?.location);
      
      // Update Redux store with the new flag value if response contains driver data
      if (response?.driver?.flag !== undefined) {
        // The API response might have the updated flag, but we already set it locally
        // So we don't need to update it again unless there's a mismatch
        console.log('[Home] 📍 API response flag:', response.driver.flag);
      }

      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      
      // Reset the user toggle flag after 2 seconds (enough time for API response)
      setTimeout(() => {
        userToggledRef.current = false;
      }, 2000);
    } catch (err) {
      console.error('[Home] ❌ Error updating driver status:', err);
      // Revert the switch if API call fails
      setSwitch(switchh);
      userToggledRef.current = false;
      showToast(err);
    }
  };
  //Ride started
  const RideStarted = () => {
    return (
      <View style={RideStartedStyles.CardContainer}>
        <UserDetailsCard data={rideDetails} />

        <View>
          {status != 'Completed' && status != 'Cancelled' && (
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
          <TouchableOpacity activeOpacity={0.8} onPress={markCompletedFunc} style={{backgroundColor:colors.primaryColor , top:-vh*1, width:'100%', borderBottomLeftRadius: vh*2, borderBottomRightRadius: vh*2, justifyContent:'center', alignItems:'center', alignContent:'center', paddingVertical:vh*2}}>
            <GilroyBold style={[RideStartedStyles.buttonText, {color:'#ffffff'}]}>Mark Completed</GilroyBold>
          </TouchableOpacity>
          {/* <CustomButton
            customButtonStyle={[
              status != 'Completed'
                ? RideStartedStyles.markColor
                : RideStartedStyles.acceptBtn,
            ]}
            onPress={markCompletedFunc}>
            Mark Completed
          </CustomButton> */}
          {/* <CustomButton
            customButtonStyle={[
              status === 'Completed'
                ? RideStartedStyles.markColorPaid
                : RideStartedStyles.rejectBtn,
            ]}
            onPress={markPaidFunc}>
            Mark Paid
          </CustomButton> */}
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
          Trip ID: {rideId && typeof rideId === 'string' ? rideId : 'N/A'}
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
          customButtonStyle={[
            tripAcceptStyles.rejectBtn,
            (() => {
              const paymentStatus = rideDetails?.ride?.paymentStatus;
              const paymentMethod = rideDetails?.ride?.paymentMethod;
              const isAuthorized = paymentAuthorized || 
                paymentStatus === 'authorized' ||
                paymentStatus === 'captured' ||
                paymentMethod === 'Wallet' ||
                paymentMethod === 'Cash';
              
              console.log('[Home] 🔘 Start Ride Button Render:');
              console.log('[Home] 🔘 - paymentAuthorized:', paymentAuthorized);
              console.log('[Home] 🔘 - paymentStatus:', paymentStatus);
              console.log('[Home] 🔘 - paymentMethod:', paymentMethod);
              console.log('[Home] 🔘 - isAuthorized:', isAuthorized);
              console.log('[Home] 🔘 - Button opacity:', !isAuthorized ? 0.5 : 1.0);
              
              return !isAuthorized ? { opacity: 0.5 } : {};
            })(),
          ]}
          onPress={() => {
            // Check payment authorization before showing modal
            // Payment is authorized if: status is authorized/captured OR payment method is Wallet/Cash (no authorization needed)
            const paymentStatus = rideDetails?.ride?.paymentStatus;
            const paymentMethod = rideDetails?.ride?.paymentMethod;
            const isPaymentAuthorized = paymentAuthorized || 
              paymentStatus === 'authorized' ||
              paymentStatus === 'captured' ||
              paymentMethod === 'Wallet' ||
              paymentMethod === 'Cash';
            
            console.log('[Home] 🔘 Start Ride Button Pressed:');
            console.log('[Home] 🔘 - paymentAuthorized:', paymentAuthorized);
            console.log('[Home] 🔘 - paymentStatus:', paymentStatus);
            console.log('[Home] 🔘 - paymentMethod:', paymentMethod);
            console.log('[Home] 🔘 - isPaymentAuthorized:', isPaymentAuthorized);
            
            if (!isPaymentAuthorized) {
              showToast('Please wait for user to authorize payment before starting the ride.');
              return;
            }
            startRideRef.current.show();
          }}>
          {(() => {
            const paymentStatus = rideDetails?.ride?.paymentStatus;
            const paymentMethod = rideDetails?.ride?.paymentMethod;
            const isAuthorized = paymentAuthorized || 
              paymentStatus === 'authorized' ||
              paymentStatus === 'captured' ||
              paymentMethod === 'Wallet' ||
              paymentMethod === 'Cash';
            
            const buttonText = isAuthorized ? 'Start Ride' : 'Waiting for Payment';
            console.log('[Home] 🔘 Button text:', buttonText, 'isAuthorized:', isAuthorized);
            return buttonText;
          })()}
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
  
  // Function to fetch driver's current latitude and longitude
  const fetchDriverLocation = async () => {
    // First, check if we have cached location available
    if (userDetail?.location?.coordinates && userDetail.location.coordinates.length >= 2) {
      const cachedLat = userDetail.location.coordinates[0];
      const cachedLon = userDetail.location.coordinates[1];
      console.log('[Home] 📍 Using cached location immediately:', {cachedLat, cachedLon});
      setCurrentLatitude(cachedLat);
      setCurrentLongitude(cachedLon);
    }
    
    try {
      console.log('[Home] 📍 Attempting to fetch fresh driver location...');
      
      // Try with faster settings first (accept cached location up to 30 seconds old)
      let location;
      try {
        location = await getCurrentLocation({
          enableHighAccuracy: false,
          timeout: 10000, // 10 seconds for first attempt
          maximumAge: 30000, // Accept location up to 30 seconds old
        });
      } catch (firstError) {
        // If first attempt fails, try with even more lenient settings
        console.log('[Home] ⚠️ First attempt failed, trying with more lenient settings...');
        try {
          location = await getCurrentLocation({
            enableHighAccuracy: false,
            timeout: 15000, // 15 seconds for second attempt
            maximumAge: 60000, // Accept location up to 1 minute old
          });
        } catch (secondError) {
          // Both attempts failed, use cached location or throw error
          console.error('[Home] ❌ Both location attempts failed');
          throw firstError; // Throw the first error to handle in outer catch
        }
      }
      
      if (location && location.latitude && location.longitude) {
        const latitude = location.latitude;
        const longitude = location.longitude;
        
        // Validate coordinates are reasonable
        if (isNaN(latitude) || isNaN(longitude) || 
            latitude < -90 || latitude > 90 || 
            longitude < -180 || longitude > 180) {
          throw new Error('Invalid coordinates received');
        }
        
        // Store in state
        setCurrentLatitude(latitude);
        setCurrentLongitude(longitude);
        
        console.log('[Home] ✅ Driver location fetched successfully');
        console.log('[Home] 📍 Current Latitude:', latitude);
        console.log('[Home] 📍 Current Longitude:', longitude);
        console.log('[Home] 📍 Coordinates:', {latitude, longitude});
        console.log('[Home] 📍 Timestamp:', new Date().toISOString());
        
        // Also save to Redux
        dispatch({
          type: actionTypes.setLocation,
          coordinates: [latitude, longitude],
        });
        
        return {latitude, longitude};
      } else {
        throw new Error('Invalid location data received');
      }
    } catch (error) {
      console.error('[Home] ❌ Error fetching driver location:', error);
      console.error('[Home] Error details:', {
        message: error?.message || 'Unknown error',
        code: error?.code,
        fullError: error,
      });
      
      // Handle specific error codes
      if (error?.code === 3) {
        // TIMEOUT - Use cached location if available
        console.log('[Home] ⏱️ Location request timed out, using cached location...');
        if (userDetail?.location?.coordinates && userDetail.location.coordinates.length >= 2) {
          const cachedLat = userDetail.location.coordinates[0];
          const cachedLon = userDetail.location.coordinates[1];
          console.log('[Home] 📍 Using cached location from Redux:', {cachedLat, cachedLon});
          setCurrentLatitude(cachedLat);
          setCurrentLongitude(cachedLon);
          // Don't show toast if we have cached location - it's working fine
          console.log('[Home] ✅ Using cached location successfully');
          return {latitude: cachedLat, longitude: cachedLon};
        } else {
          showToast('Location timed out. Using last known location if available.');
        }
      } else if (error?.code === 1) {
        // PERMISSION_DENIED
        showToast('Location permission denied. Please enable location permission in settings.');
      } else if (error?.code === 2) {
        // POSITION_UNAVAILABLE
        if (userDetail?.location?.coordinates && userDetail.location.coordinates.length >= 2) {
          // Use cached location silently
          const cachedLat = userDetail.location.coordinates[0];
          const cachedLon = userDetail.location.coordinates[1];
          setCurrentLatitude(cachedLat);
          setCurrentLongitude(cachedLon);
          console.log('[Home] ✅ Using cached location (GPS unavailable)');
          return {latitude: cachedLat, longitude: cachedLon};
        } else {
          showToast('Location unavailable. Please check GPS settings.');
        }
      } else {
        // For any other error, try to use cached location
        if (userDetail?.location?.coordinates && userDetail.location.coordinates.length >= 2) {
          const cachedLat = userDetail.location.coordinates[0];
          const cachedLon = userDetail.location.coordinates[1];
          setCurrentLatitude(cachedLat);
          setCurrentLongitude(cachedLon);
          console.log('[Home] ✅ Using cached location as fallback');
          return {latitude: cachedLat, longitude: cachedLon};
        } else {
          showToast('Failed to get current location. Please check GPS and try again.');
        }
      }
      return null;
    }
  };
  
  const getOneTimeLocation = () => {
    console.log('[Home] 📍 Getting one-time location...');
    console.log('[Home] Ride ID:', rideId);
    
    // Use cached location immediately if available
    if (userDetail?.location?.coordinates && userDetail.location.coordinates.length >= 2) {
      const cachedLat = userDetail.location.coordinates[0];
      const cachedLon = userDetail.location.coordinates[1];
      setCurrentLatitude(cachedLat);
      setCurrentLongitude(cachedLon);
      console.log('[Home] 📍 Using cached location immediately:', {cachedLat, cachedLon});
    }
    
    const config = {
      enableHighAccuracy: false, // Use false for faster response
      timeout: 15000, // 15 seconds timeout (reduced for faster fallback)
      maximumAge: 60000, // Accept location up to 1 minute old (for faster response)
    };
    
    console.log('[Home] Location config:', config);
    
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        //Saving the location on redux
        console.log('[Home] ✅ Location position received:', position);
        
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        
        // Validate coordinates
        if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude) ||
            latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
          console.error('[Home] ❌ Invalid coordinates:', {latitude, longitude});
          // Don't show toast, just use cached location
          if (userDetail?.location?.coordinates && userDetail.location.coordinates.length >= 2) {
            const cachedLat = userDetail.location.coordinates[0];
            const cachedLon = userDetail.location.coordinates[1];
            setCurrentLatitude(cachedLat);
            setCurrentLongitude(cachedLon);
            console.log('[Home] 📍 Using cached location due to invalid coordinates');
          }
          return;
        }
        
        // Store in state
        setCurrentLatitude(latitude);
        setCurrentLongitude(longitude);
        
        console.log('[Home] 📍 Driver location from getOneTimeLocation');
        console.log('[Home] 📍 Latitude:', latitude);
        console.log('[Home] 📍 Longitude:', longitude);
        
        dispatch({
          type: actionTypes.setLocation,
          coordinates: [latitude, longitude],
        });
        //Ride Id 65e5dbd8fc4f2443ec589f1c
        //Coords [24.8739192,67.0672376]

        // Always use driverUserId for driver coordinates
        const driverId = driverUserId || userDetail?._id;
        const obj = {
          userId: driverId,
          coordinates: [longitude, latitude], // GeoJSON format: [longitude, latitude]
        };

        const socket = SocketService.getSocket();
        if (socket && SocketService.isSocketConnected()) {
          // Emit driver coordinates for location tracking
          socket.emit('drivercoordinates', obj);
          
          // If on active ride, also send location update to rider
          if (rideId && driverId) {
            socket.emit('driver:location:update', {
              rideId: rideId,
              driverId: driverId,
              coordinates: [longitude, latitude],
            });
          }
        }
      },
      error => {
        console.error('[Home] ❌ Error from getOneTimeLocation:', error);
        console.error('[Home] Error code:', error.code);
        console.error('[Home] Error message:', error.message);
        
        // Better error handling - use cached location if available
        if (userDetail?.location?.coordinates && userDetail.location.coordinates.length >= 2) {
          const cachedLat = userDetail.location.coordinates[0];
          const cachedLon = userDetail.location.coordinates[1];
          setCurrentLatitude(cachedLat);
          setCurrentLongitude(cachedLon);
          
          if (error.code === 3) {
            // TIMEOUT - Use cached location silently
            console.log('[Home] ⏱️ Location timeout - using cached location:', {cachedLat, cachedLon});
            // Emit cached location to socket
            const driverId = driverUserId || userDetail?._id;
            const obj = {
              userId: driverId,
              coordinates: [cachedLon, cachedLat], // GeoJSON format: [longitude, latitude]
            };
            const socket = SocketService.getSocket();
            if (socket && SocketService.isSocketConnected()) {
              socket.emit('drivercoordinates', obj);
              // If on active ride, also send location update to rider
              if (rideId && driverId) {
                socket.emit('driver:location:update', {
                  rideId: rideId,
                  driverId: driverId,
                  coordinates: [cachedLon, cachedLat],
                });
              }
            }
            // Don't show toast - cached location is working
          } else if (error.code === 1) {
            showToast('Location permission denied. Using cached location.');
          } else if (error.code === 2) {
            console.log('[Home] 📍 GPS unavailable - using cached location:', {cachedLat, cachedLon});
            // Emit cached location to socket
            const driverId = driverUserId || userDetail?._id;
            const obj = {
              userId: driverId,
              coordinates: [cachedLon, cachedLat], // GeoJSON format: [longitude, latitude]
            };
            const socket = SocketService.getSocket();
            if (socket && SocketService.isSocketConnected()) {
              socket.emit('drivercoordinates', obj);
              // If on active ride, also send location update to rider
              if (rideId && driverId) {
                socket.emit('driver:location:update', {
                  rideId: rideId,
                  driverId: driverId,
                  coordinates: [cachedLon, cachedLat],
                });
              }
            }
            // Don't show toast - cached location is working
          } else {
            console.log('[Home] 📍 Using cached location due to error:', {cachedLat, cachedLon});
            // Emit cached location to socket
            const driverId = driverUserId || userDetail?._id;
            const obj = {
              userId: driverId,
              coordinates: [cachedLon, cachedLat], // GeoJSON format: [longitude, latitude]
            };
            const socket = SocketService.getSocket();
            if (socket && SocketService.isSocketConnected()) {
              socket.emit('drivercoordinates', obj);
              // If on active ride, also send location update to rider
              if (rideId && driverId) {
                socket.emit('driver:location:update', {
                  rideId: rideId,
                  driverId: driverId,
                  coordinates: [cachedLon, cachedLat],
                });
              }
            }
          }
        } else {
          // No cached location available, show error
          if (error.code === 3) {
            showToast('Location request timed out. Please enable GPS.');
          } else if (error.code === 1) {
            showToast('Location permission denied. Please enable in settings.');
          } else if (error.code === 2) {
            showToast('Location unavailable. Please check GPS settings.');
          } else {
            showToast(error.message || 'Failed to get location');
          }
        }
      },
      config,
    );
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
      const socket = SocketService.getSocket();
      if (socket && SocketService.isSocketConnected()) {
        // Always use driverId for drivercoordinates (not rideId)
        // During active ride, also send location update to rider
        const driverId = driverUserId || userId;
        
        // Always emit drivercoordinates with driverId (for driver location tracking)
        socket.emit('drivercoordinates', {
          userId: driverId,
          coordinates: [floatData?.longitude, floatData?.latitude],
        });
        
        // If on active ride, also emit driver:location:update for rider
        if (rideId && driverId) {
          socket.emit('driver:location:update', {
            rideId: rideId,
            driverId: driverId,
            coordinates: [floatData?.longitude, floatData?.latitude],
          });
        }
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
        // Check if foreground location permission is already granted
        const foregroundCheck = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        let granted;
        if (!foregroundCheck) {
          // Only request if not already granted
          granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message:
                'This App needs to Access your location to get you nearby rides',
            },
          );
          console.log('granted-granted', granted);
          
          // If user selected "just for now" or denied, they likely don't want background location
          // So we'll skip background location request to avoid the popup
          if (granted === PermissionsAndroid.RESULTS.DENIED) {
            // User denied foreground location, also mark background as denied
            backgroundLocationDeniedRef.current = true;
            try {
              await AsyncStorage.setItem(BACKGROUND_LOCATION_DENIED_KEY, 'true');
              console.log('Foreground location denied, skipping background location request');
            } catch (err) {
              console.log('Error saving background location preference:', err);
            }
          }
        } else {
          // Already granted, use the existing permission
          granted = PermissionsAndroid.RESULTS.GRANTED;
          console.log('Foreground location already granted');
        }

        // If foreground location is granted, proceed with getting location
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Foreground Permission Granted, proceeding...');
          getOneTimeLocation();

          // Check if background location was previously denied FIRST (before any permission checks)
          // This prevents the popup from showing if user already denied it
          if (backgroundLocationDeniedRef.current) {
            console.log('Background location was previously denied, skipping request completely');
            console.log('Using foreground location only');
            return; // Exit early, don't request background location at all
          }

          // Now handle background location permission
          // Check if background location permission is already granted
          const backgroundCheck = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
          );

          // Double-check denial preference after permission check (in case it changed)
          if (backgroundLocationDeniedRef.current) {
            console.log('Background location was denied during this session, skipping request');
            return; // Exit early, don't request background location
          }

          // If we've already requested background location this session and it was denied, skip
          if (backgroundLocationRequestedRef.current && !backgroundCheck) {
            console.log('Background location was already requested this session, skipping');
            return; // Exit early, don't request again
          }

          let backgroundGranted;
          // Only request background location if:
          // 1. Foreground location is granted
          // 2. Background location is not already granted
          // 3. Background location hasn't been denied previously (tracked in ref)
          // 4. We haven't already requested it this session
          if (!backgroundCheck) {
            // Mark that we're about to request it
            backgroundLocationRequestedRef.current = true;
            
            // Show alert to inform user and open system settings
            Alert.alert(
              'Location Access Required',
              'This App needs to Access your location in background to get you nearby rides. Please select "Allow all the time" in the next screen for best experience.',
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                  onPress: async () => {
                    // User cancelled, mark as denied
                    backgroundLocationDeniedRef.current = true;
                    backgroundLocationRequestedRef.current = true;
                    try {
                      await AsyncStorage.setItem(BACKGROUND_LOCATION_DENIED_KEY, 'true');
                      console.log('User cancelled background location settings');
                    } catch (err) {
                      console.log('Error saving preference:', err);
                    }
                  },
                },
                {
                  text: 'Open Settings',
                  onPress: async () => {
                    try {
                      // Mark that user is going to settings
                      checkingSettingsRef.current = true;
                      // Open the app's location settings page
                      await Linking.openSettings();
                      console.log('Opened location settings - user can now choose their preference');
                      // The permission check will happen when user returns (via useFocusEffect)
                    } catch (err) {
                      console.log('Error opening settings:', err);
                      checkingSettingsRef.current = false;
                      backgroundLocationDeniedRef.current = true;
                      try {
                        await AsyncStorage.setItem(BACKGROUND_LOCATION_DENIED_KEY, 'true');
                      } catch (storageErr) {
                        console.log('Error saving preference:', storageErr);
                      }
                    }
                  },
                },
              ],
            );
            
            // Set default value - will be updated when user returns from settings
            backgroundGranted = PermissionsAndroid.RESULTS.DENIED;
          } else if (backgroundCheck) {
            backgroundGranted = PermissionsAndroid.RESULTS.GRANTED;
            console.log('Background location already granted');
            backgroundLocationRequestedRef.current = false; // Reset since it's granted
            // Clear any denial preference if it's actually granted
            try {
              await AsyncStorage.removeItem(BACKGROUND_LOCATION_DENIED_KEY);
              backgroundLocationDeniedRef.current = false;
            } catch (err) {
              console.log('Error clearing background location preference:', err);
            }
            // Background location already granted, can enable background service
            // subscribeLocationLocation();
          } else {
            backgroundGranted = PermissionsAndroid.RESULTS.DENIED;
            console.log('Background location not available');
            // If background location is not available and was previously denied, don't request
            if (backgroundLocationDeniedRef.current) {
              console.log('Background location was previously denied, not requesting');
            }
          }

          // Summary
          if (backgroundGranted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Both permissions granted - background location enabled');
          } else {
            console.log('Using foreground location only (background denied or not available)');
          }
        } else {
          console.log('Foreground Permission Denied');
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
      // Load persisted background location denial preference FIRST, then request permission
      const loadAndRequestPermission = async () => {
        try {
          const denied = await AsyncStorage.getItem(BACKGROUND_LOCATION_DENIED_KEY);
          if (denied === 'true') {
            backgroundLocationDeniedRef.current = true;
            console.log('Background location was previously denied, loaded from storage - will NOT request');
          } else {
            backgroundLocationDeniedRef.current = false;
            console.log('Background location preference not found or was granted previously');
          }
        } catch (err) {
          console.log('Error loading background location preference:', err);
          backgroundLocationDeniedRef.current = false; // Default to false on error
        }
        
        // Now request permission after loading the preference (with delay to ensure ref is set)
        setTimeout(() => {
          console.log('useFocusEffect -- is running!');
          console.log('Background location denied ref:', backgroundLocationDeniedRef.current);
          //This function is crached the build - Native Modules
          requestLocationPermission();
        }, 800); // Increased delay to ensure AsyncStorage loads
      };
      
      loadAndRequestPermission();

      return () => stop();
    }, []),
  );

  // Listen for app state changes to detect when user returns from settings
  useEffect(() => {
    const subscription = AppState.addEventListener('change', async nextAppState => {
      if (nextAppState === 'active' && checkingSettingsRef.current) {
        // App came to foreground and user was in settings
        checkingSettingsRef.current = false;
        setTimeout(async () => {
          try {
            const newBackgroundCheck = await PermissionsAndroid.check(
              PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
            );
            
            if (newBackgroundCheck) {
              // User granted background location from settings
              backgroundLocationDeniedRef.current = false;
              backgroundLocationRequestedRef.current = false;
              try {
                await AsyncStorage.removeItem(BACKGROUND_LOCATION_DENIED_KEY);
                console.log('Background location granted from settings - cleared preference');
                showToast('Background location enabled successfully', 'success');
                // subscribeLocationLocation(); // Enable background service if needed
              } catch (err) {
                console.log('Error clearing preference:', err);
              }
            } else {
              // User didn't grant background location from settings
              backgroundLocationDeniedRef.current = true;
              backgroundLocationRequestedRef.current = true;
              try {
                await AsyncStorage.setItem(BACKGROUND_LOCATION_DENIED_KEY, 'true');
                console.log('Background location not granted from settings - saved preference');
                showToast('Using foreground location only', 'info');
              } catch (err) {
                console.log('Error saving preference:', err);
              }
            }
          } catch (err) {
            console.log('Error checking background location after settings:', err);
          }
        }, 500);
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

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
      console.log('[Home] 🔄 ========== SCREEN FOCUSED ==========');
      console.log('[Home] 📍 Current rideId state:', rideId);
      console.log('[Home] 📍 Current reduxRideId:', reduxRideId);
      console.log('[Home] 📍 Current status:', status);
      console.log('[Home] 📍 Current rideAccepted:', rideAccepted);
      
      // Check both local rideId and Redux rideId to ensure we fetch ride details
      const currentRideId = rideId || reduxRideId;
      
      if (currentRideId) {
        console.log('[Home] ✅ Valid rideId found, fetching ride details:', currentRideId);
        
        // Ensure rideId state is set if it wasn't already
        if (!rideId && reduxRideId) {
          console.log('[Home] 📍 Setting rideId from Redux:', reduxRideId);
          SetRideId(reduxRideId);
        }
        
        // Set acceptRide to true to ensure card shows
        setAcceptRide(true);
        
        // Fetch ride details
        getRideDetails(currentRideId).then(() => {
          console.log('[Home] ✅ Ride details fetched in useFocusEffect');
        }).catch((err) => {
          console.error('[Home] ❌ Error fetching ride details in useFocusEffect:', err);
        });
        
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
      } else {
        console.log('[Home] ⚠️ No rideId found, skipping ride details fetch');
      }

      getVechileInfo();
      getData();
      
      // Fetch driver location when screen comes into focus
      fetchDriverLocation();
      
      console.log('[Home] ======================================');
    }, [rideId, reduxRideId]),
  );

  // Debug: Log payment authorization state changes
  useEffect(() => {
    console.log('[Home] 🔍 paymentAuthorized state changed:', paymentAuthorized);
    console.log('[Home] 🔍 - rideId:', rideId);
    console.log('[Home] 🔍 - rideAccepted:', rideAccepted);
    console.log('[Home] 🔍 - rideDetails paymentStatus:', rideDetails?.ride?.paymentStatus);
    console.log('[Home] 🔍 - rideDetails paymentMethod:', rideDetails?.ride?.paymentMethod);
  }, [paymentAuthorized, rideId, rideAccepted, rideDetails]);

  // Track if socket is already initialized to prevent reconnection
  const socketInitializedRef = useRef(false);
  const socketListenersSetupRef = useRef(false);
  const connectionCallbackUnsubscribeRef = useRef(null);
  const socketRef = useRef(null);

  // Socket connection and setup
  useEffect(() => {
    // Store current values in refs to avoid dependency issues
    const currentDriverId = driverUserId;
    const currentBaseUrl = base_url;

    const setupSocketListeners = (socketInstance) => {
      if (!socketInstance) {
        console.error('[Home] ❌ Cannot setup listeners - socket instance is null');
        return;
      }

      console.log('[Home] 🔧 Setting up socket listeners...');
      
      // Remove old listeners first to prevent duplicates
      socketInstance.off('ride:request');
      socketInstance.off('ride:accepted_by_other');
      socketInstance.off('ride:accept:success');
      socketInstance.off('ride:error');
      socketInstance.off('ride:payment:authorized');
      socketInstance.off('ride:status:changed');
      socketInstance.off('reconnect');
      
      // Listen for incoming ride requests
      socketInstance.on('ride:request', (rideData) => {
        console.log('[Home] 📨 ========== NEW RIDE REQUEST RECEIVED ==========');
        console.log('[Home] 📨 Ride request data:', rideData);
        console.log('[Home] 📨 Ride ID:', rideData?.rideId || rideData?._id);
        console.log('[Home] 📨 User ID:', rideData?.userId);
        console.log('[Home] 📨 Pickup location:', {
          latitude: rideData?.latitude,
          longitude: rideData?.longitude,
        });
        console.log('[Home] 📨 Vehicle type ID:', rideData?.vehicletypeid);
        console.log('[Home] 📨 Package ID:', rideData?.packageId);
        console.log('[Home] 📨 Route summary:', rideData?.routeSummary);
        console.log('[Home] 📨 Timestamp:', new Date().toISOString());
        console.log('[Home] 📨 ============================================');
        
        // Get ride details and update state
        if (rideData?.rideId || rideData?._id) {
          const rideIdToFetch = rideData.rideId || rideData._id;
          console.log('[Home] 📍 Fetching ride details for ID:', rideIdToFetch);
          getRideDetails(rideIdToFetch);
          SetRideId(rideIdToFetch);
          setAcceptRide(true);
          
          // Show notification
          Alert.alert(
            'New Ride Request',
            'A user wants to book a ride near your location',
            [
              {
                text: 'View Details',
                onPress: () => {
                  // Ride details already fetched above
                },
              },
              {
                text: 'Dismiss',
                style: 'cancel',
              },
            ]
          );
        } else {
          console.error('[Home] ❌ No ride ID found in ride request data');
        }
      });

      // Listen if ride was accepted by another driver
      socketInstance.on('ride:accepted_by_other', (data) => {
        console.log('[Home] 🚗 Ride accepted by another driver:', data);
        
        // Reset ride state
        setAcceptRide(false);
        setStatus(null); // Clear status properly
        setRideAccepted(false);
        setRideStarted(false);
        showToast('Another driver has accepted this ride.');
      });

      // Listen for acceptance success
      socketInstance.on('ride:accept:success', (data) => {
        console.log('[Home] ✅ ========== RIDE ACCEPTANCE SUCCESS ==========');
        console.log('[Home] 📍 Full data received:', JSON.stringify(data, null, 2));
        console.log('[Home] 📍 data.rideId:', data?.rideId);
        console.log('[Home] 📍 data._id:', data?._id);
        console.log('[Home] 📍 data.ride:', data?.ride);
        
        // Reset payment authorization when new ride is accepted
        setPaymentAuthorized(false);
        
        // Extract rideId from multiple possible locations
        const rideIdToFetch = data?.rideId || data?._id || data?.ride?._id || data?.ride?.rideId;
        
        if (rideIdToFetch) {
          console.log('[Home] ✅ Valid rideId found:', rideIdToFetch);
          console.log('[Home] 📍 Setting rideId in state and Redux...');
          
          // Set rideId in state immediately
          SetRideId(rideIdToFetch);
          
          // Update Redux state
          dispatch({
            type: actionTypes.rideId,
            currentRideId: rideIdToFetch,
          });
          
          // Set acceptRide to true to show the card
          setAcceptRide(true);
          
          // If ride data is already in the response, use it directly
          if (data?.ride) {
            console.log('[Home] ✅ Ride data found in response, setting directly...');
            const rideStatus = data.ride.rideStatus || data.ride.status;
            console.log('[Home] 📍 Ride status from response:', rideStatus);
            
            // Set ride details directly
            setRideDetails({ ride: data.ride });
            setRideStatus(data.ride);
            
            // Set status based on ride status
            if (rideStatus === 'Accepted' || rideStatus === 'accepted') {
              console.log('[Home] ✅ Setting rideAccepted to true and status to Accepted');
              setRideAccepted(true);
              setRideStarted(false);
              setStatus('Accepted');
              
              // Check payment status
              const paymentStatus = data.ride.paymentStatus;
              const paymentMethod = data.ride.paymentMethod;
              if (paymentStatus === 'authorized' || paymentStatus === 'captured' || 
                  paymentMethod === 'Wallet' || paymentMethod === 'Cash') {
                setPaymentAuthorized(true);
              } else {
                setPaymentAuthorized(false);
              }
            }
          }
          
          // Always fetch fresh ride details to ensure we have latest data
          console.log('[Home] 🔄 Fetching fresh ride details for:', rideIdToFetch);
          getRideDetails(rideIdToFetch).then(() => {
            console.log('[Home] ✅ Ride details fetched successfully');
          }).catch((err) => {
            console.error('[Home] ❌ Error fetching ride details:', err);
          });
          
          console.log('[Home] ============================================');
        } else {
          console.error('[Home] ❌ No rideId found in acceptance success data');
          console.error('[Home] ❌ Available keys:', data ? Object.keys(data) : 'data is null');
        }
      });

      // Listen for errors
      socketInstance.on('ride:error', (error) => {
        console.error('[Home] ❌ Ride error:', error);
        const errorMessage = error?.message || error?.error || 'An error occurred';
        showToast(errorMessage);
      });

      // Listen for payment authorization (NEW - from API docs)
      socketInstance.on('ride:payment:authorized', (data) => {
        console.log('[Home] 💳 ========== PAYMENT AUTHORIZATION RECEIVED ==========');
        console.log('[Home] 💳 Payment authorized data:', JSON.stringify(data, null, 2));
        
        if (data?.rideId) {
          const authorizedRideId = String(data.rideId).trim();
          
          // Get current ride ID from multiple possible sources
          const currentRideId = rideId || rideDetails?.ride?._id || rideDetails?.ride?.rideId;
          const currentRideIdStr = currentRideId ? String(currentRideId).trim() : null;
          
          console.log('[Home] 💳 - Authorized Ride ID:', authorizedRideId);
          console.log('[Home] 💳 - Current Ride ID:', currentRideIdStr);
          console.log('[Home] 💳 - rideId state:', rideId);
          console.log('[Home] 💳 - rideDetails ride._id:', rideDetails?.ride?._id);
          console.log('[Home] 💳 - rideDetails ride.rideId:', rideDetails?.ride?.rideId);
          console.log('[Home] 💳 - rideAccepted:', rideAccepted);
          console.log('[Home] 💳 - paymentAuthorized (before):', paymentAuthorized);
          console.log('[Home] 💳 - rideDetails exists:', !!rideDetails);
          
          // ALWAYS set payment authorized when we receive this event
          // The backend only sends this to the driver who accepted the ride
          // So we can trust it regardless of rideId matching
          console.log('[Home] ✅ Setting paymentAuthorized to TRUE');
          setPaymentAuthorized(true);
          showToast('Payment authorized. You can start the ride.');
          
          // Update rideId if not set or different
          if (authorizedRideId && (!rideId || String(rideId).trim() !== authorizedRideId)) {
            console.log('[Home] 📍 Updating rideId to:', authorizedRideId);
            SetRideId(authorizedRideId);
          }
          
          // Refresh ride details to get updated payment status
          const rideIdToFetch = currentRideIdStr || authorizedRideId;
          if (rideIdToFetch) {
            console.log('[Home] 🔄 Fetching ride details for:', rideIdToFetch);
            getRideDetails(rideIdToFetch);
          }
          
          console.log('[Home] 💳 ============================================');
        } else {
          console.error('[Home] ❌ Payment authorization event missing rideId');
        }
      });

      // Listen for ride status changes (NEW - from API docs)
      socketInstance.on('ride:status:changed', (data) => {
        console.log('[Home] 🔄 Ride status changed:', data);
        if (data?.rideId && data?.status) {
          // Update ride status in UI
          if (data.status === 'Started') {
            setRideStarted(true);
          } else if (data.status === 'Completed') {
            setRideStarted(false);
            setRideAccepted(false);
          } else if (data.status === 'Cancelled') {
            setAcceptRide(false);
            setRideAccepted(false);
            setRideStarted(false);
          }
        }
      });

      // Listen for reconnection to re-register listeners
      socketInstance.on('reconnect', (attemptNumber) => {
        console.log('[Home] 🔄 Socket reconnected, re-registering listeners...');
        // Re-register listeners after reconnection
        setupSocketListeners(socketInstance);
      });

      socketListenersSetupRef.current = true;
      console.log('[Home] ✅ Socket listeners set up successfully');
    };

    const connectSocket = async () => {
      try {
        console.log('[Home] 🔌 ========== SOCKET CONNECTION SETUP ==========');
        console.log('[Home] 📍 Driver ID:', currentDriverId);
        console.log('[Home] 📍 Base URL:', currentBaseUrl);
        console.log('[Home] 📍 Driver online status (switchh):', switchh);
        
        if (!currentDriverId) {
          console.error('[Home] ❌ Driver ID not available, skipping socket connection');
          return;
        }

        // Connect socket
        console.log('[Home] 🔌 Connecting socket...');
        const socket = SocketService.connect(currentDriverId, 'driver', currentBaseUrl);
        
        if (socket) {
          console.log('[Home] ✅ Socket instance created');
          socketRef.current = socket;
          socketInitializedRef.current = true;
          
          // Register connection state change callback
          if (connectionCallbackUnsubscribeRef.current) {
            connectionCallbackUnsubscribeRef.current();
          }
          
          connectionCallbackUnsubscribeRef.current = SocketService.onConnectionChange((event, data) => {
            console.log('[Home] 📡 Connection state changed:', event, data);
            
            if (event === 'reconnect' && socket) {
              console.log('[Home] 🔄 Reconnection detected, re-registering listeners...');
              // Reset listener setup flag to allow re-registration
              socketListenersSetupRef.current = false;
              setupSocketListeners(socket);
            } else if (event === 'connect' && socket) {
              console.log('[Home] ✅ Connection established, setting up listeners...');
              socketListenersSetupRef.current = false;
              setupSocketListeners(socket);
            }
          });
          
          // Set up listeners
          if (socket.connected) {
            console.log('[Home] ✅ Socket already connected, setting up listeners...');
            setupSocketListeners(socket);
          } else {
            console.log('[Home] ⏳ Socket not yet connected, waiting for connect event...');
            socket.once('connect', () => {
              console.log('[Home] ✅ Socket connected, setting up listeners...');
              setupSocketListeners(socket);
            });
          }
          
          // IMPORTANT: Ensure driver is marked as online when socket connects
          // According to documentation, driver must have flag: true to receive ride requests
          if (switchh) {
            console.log('[Home] 📍 Driver is already online (switchh: true)');
            console.log('[Home] 📍 Driver should be able to receive ride requests');
          } else {
            console.warn('[Home] ⚠️ Driver is offline (switchh: false)');
            console.warn('[Home] ⚠️ Driver will NOT receive ride requests until they go online');
            console.warn('[Home] ⚠️ Please toggle the online/offline switch to go online');
          }
        } else {
          console.error('[Home] ❌ Failed to create socket instance');
        }
        
        console.log('[Home] ============================================');
      } catch (error) {
        console.error('[Home] ❌ Error connecting socket:', error);
        console.error('[Home] Error details:', {
          message: error?.message,
          stack: error?.stack,
          error: error,
        });
      }
    };

    // Only initialize once, but allow re-initialization if driverId or baseUrl changes
    if (!socketInitializedRef.current) {
      connectSocket();
    }

    // Cleanup on unmount - only remove listeners, don't disconnect (socket is shared)
    return () => {
      console.log('[Home] 🧹 Cleaning up socket listeners...');
      const socket = socketRef.current || SocketService.getSocket();
      if (socket) {
        socket.off('ride:request');
        socket.off('ride:accepted_by_other');
        socket.off('ride:accept:success');
        socket.off('ride:error');
        socket.off('ride:payment:authorized');
        socket.off('ride:status:changed');
        socket.off('reconnect');
        socketListenersSetupRef.current = false;
      }
      
      // Unsubscribe from connection callbacks
      if (connectionCallbackUnsubscribeRef.current) {
        connectionCallbackUnsubscribeRef.current();
        connectionCallbackUnsubscribeRef.current = null;
      }
      
      // Don't disconnect - socket is shared across screens
    };
  }, [driverUserId, base_url]); // Include dependencies that should trigger re-initialization

  // Function to send driver location via socket
  const sendDriverLocation = useCallback(() => {
    try {
      // Check if we have valid coordinates
      if (!currentLatitude || !currentLongitude) {
        console.log('[Home] ⚠️ Cannot send location - coordinates not available');
        return;
      }

      // Check if driver is online
      if (!switchh) {
        console.log('[Home] ⚠️ Cannot send location - driver is offline');
        return;
      }

      // Check if socket is connected
      const socket = SocketService.getSocket();
      if (!socket || !SocketService.isSocketConnected()) {
        console.log('[Home] ⚠️ Cannot send location - socket not connected');
        return;
      }

      // Validate coordinates
      if (
        isNaN(currentLatitude) ||
        isNaN(currentLongitude) ||
        currentLatitude < -90 ||
        currentLatitude > 90 ||
        currentLongitude < -180 ||
        currentLongitude > 180
      ) {
        console.error('[Home] ❌ Invalid coordinates, cannot send:', {
          latitude: currentLatitude,
          longitude: currentLongitude,
        });
        return;
      }

      // Prepare location data
      // According to documentation: { userId: driverId, coordinates: [longitude, latitude] }
      const driverId = driverUserId || userId;
      const locationData = {
        userId: driverId,
        coordinates: [currentLongitude, currentLatitude], // GeoJSON format: [longitude, latitude]
      };

      // Emit location to socket
      // Event name: 'drivercoordinates' (as per documentation)
      socket.emit('drivercoordinates', locationData);
      
      // If on active ride, also send location update to rider
      if (rideId && driverId) {
        socket.emit('driver:location:update', {
          rideId: rideId,
          driverId: driverId,
          coordinates: [currentLongitude, currentLatitude],
        });
      }
    } catch (error) {
      console.error('[Home] ❌ Error sending driver location:', error);
      console.error('[Home] Error details:', {
        message: error?.message,
        error: error,
      });
    }
  }, [currentLatitude, currentLongitude, switchh, driverUserId, userId]);

  // Set up interval to send location every 5 seconds
  useEffect(() => {
    console.log('[Home] 🔄 Setting up location update interval (every 5 seconds)');
    console.log('[Home] 📍 Current state:', {
      hasCoordinates: !!(currentLatitude && currentLongitude),
      isOnline: switchh,
      hasDriverId: !!(driverUserId || userId),
      socketConnected: SocketService.isSocketConnected(),
    });

    // Clear any existing interval first
    if (locationIntervalRef.current) {
      console.log('[Home] 🧹 Clearing existing location interval');
      clearInterval(locationIntervalRef.current);
      locationIntervalRef.current = null;
    }

    // Only set up interval if driver is online and has coordinates
    if (!switchh || !currentLatitude || !currentLongitude) {
      console.log('[Home] ⚠️ Skipping location interval setup - driver offline or no coordinates');
      return;
    }

    // Send location immediately
    console.log('[Home] 📍 Sending initial location update');
    sendDriverLocation();

    // Set up interval to send location every 5 seconds (5000ms)
    locationIntervalRef.current = setInterval(() => {
      console.log('[Home] ⏰ Location update interval triggered (every 5 seconds)');
      console.log('[Home] 📍 Interval count:', locationIntervalRef.current ? 'active' : 'inactive');
      sendDriverLocation();
    }, 5000);

    console.log('[Home] ✅ Location update interval set up successfully');
    console.log('[Home] 📍 Interval ID:', locationIntervalRef.current);

    // Cleanup interval on unmount or when dependencies change
    return () => {
      console.log('[Home] 🧹 Cleaning up location update interval');
      if (locationIntervalRef.current) {
        clearInterval(locationIntervalRef.current);
        locationIntervalRef.current = null;
        console.log('[Home] ✅ Location interval cleared');
      }
    };
  }, [switchh, currentLatitude, currentLongitude, sendDriverLocation, driverUserId, userId]);

  useEffect(() => {
    try {
      VehicleTypes();
      // reactNativeEasyPushNotifications.getDeviceId(id => {
      //   console.log('Id =-==========>', id);
      // });
    } catch (e) {
      console.log('Error from UseEffect =====>', e);
      showToast(e);
    }
  }, []);

  const [markerRegion, setmarkerRegion] = useState(() => {
    // Initialize with valid coordinates or default to a valid location
    const lat = userDetail?.location?.coordinates?.[0];
    const lon = userDetail?.location?.coordinates?.[1];
    
    // Use default location if coordinates are invalid
    const defaultLat = 24.8639148;
    const defaultLon = 67.1672468;
    
    return {
      latitude: (lat && !isNaN(lat) && lat !== 0) ? lat : defaultLat,
      longitude: (lon && !isNaN(lon) && lon !== 0) ? lon : defaultLon,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
  });
  
  // Update switch state when userDetail flag changes
  useEffect(() => {
    // Skip if user just toggled the switch (within last 3 seconds)
    if (userToggledRef.current) {
      const timeSinceToggle = Date.now() - toggleTimestampRef.current;
      if (timeSinceToggle < 3000) {
        console.log('[Home] ⏭️ Skipping useEffect sync - user just toggled switch');
        return;
      }
    }
    
    console.log('[Home] 📍 useEffect - userDetail:', userDetail);
    console.log('[Home] 📍 useEffect - userDetail.flag:', userDetail?.flag);
    console.log('[Home] 📍 useEffect - userDetail.flag type:', typeof userDetail?.flag);
    console.log('[Home] 📍 useEffect - Current switchh state:', switchh);
    
    // Check if userDetail exists and has flag property
    if (userDetail && userDetail.hasOwnProperty('flag')) {
      // Handle both boolean and string values
      let flagValue = userDetail.flag;
      
      // Convert string "true"/"false" to boolean if needed
      if (typeof flagValue === 'string') {
        flagValue = flagValue.toLowerCase() === 'true';
      } else if (typeof flagValue === 'boolean') {
        // Already boolean, use as is
        flagValue = flagValue;
      } else {
        // For any other type, convert to boolean
        flagValue = Boolean(flagValue);
      }
      
      console.log('[Home] 📍 Updating switch state from userDetail.flag:', userDetail.flag);
      console.log('[Home] 📍 Original flag type:', typeof userDetail.flag);
      console.log('[Home] 📍 Converted flag value:', flagValue);
      console.log('[Home] 📍 Flag is boolean?', typeof flagValue === 'boolean');
      console.log('[Home] 📍 Flag value (strict):', flagValue === true, flagValue === false);
      console.log('[Home] 📍 Will show:', flagValue ? 'online' : 'Offline');
      
      // Set switch to match flag value (true = online, false = offline)
      // Only update if it's different to avoid unnecessary re-renders
      if (switchh !== flagValue) {
        console.log('[Home] ✅ Setting switch to:', flagValue);
        setSwitch(flagValue);
      } else {
        console.log('[Home] ⏭️ Switch already matches flag value, skipping update');
      }
    } else {
      console.log('[Home] ⚠️ userDetail.flag is not available yet');
      console.log('[Home] ⚠️ userDetail exists?', !!userDetail);
      console.log('[Home] ⚠️ userDetail keys:', userDetail ? Object.keys(userDetail) : 'null');
    }
  }, [userDetail?.flag]);

  // Update markerRegion when userDetail location changes
  useEffect(() => {
    if (userDetail?.location?.coordinates) {
      const lat = userDetail.location.coordinates[0];
      const lon = userDetail.location.coordinates[1];
      
      // Only update if coordinates are valid
      if (lat && lon && !isNaN(lat) && !isNaN(lon) && lat !== 0 && lon !== 0) {
        setmarkerRegion(prev => ({
          ...prev,
          latitude: lat,
          longitude: lon,
        }));
      }
    }
  }, [userDetail?.location?.coordinates]);
  
  console.log('markerRegion--markerRegion', markerRegion);
  const handleRating = a => {
    setRating(a);
  };

  //Here ride flow
  const renderView = () => {
    const normalizedStatus = status ? String(status).trim().toLowerCase() : null;
    const rideStatusFromDetails = rideDetails?.ride?.rideStatus ? String(rideDetails.ride.rideStatus).trim().toLowerCase() : null;
    
    console.log('[Home] 🔍 ========== RENDER VIEW ==========');
    console.log('[Home] 📍 Current state:', {
      status,
      normalizedStatus,
      rideAccepted,
      rideStartered,
      acceptRide,
      hasRideDetails: !!rideDetails,
      rideStatusFromDetails,
      rideId,
      reduxRideId,
    });
    
    //status == 'Pending'
    if (false) {
      return (
        <View style={{flex: 1, alignItems: 'center'}}>{TripRequest()}</View>
      );
    }
    // Check if status is 'Accepted' (case-insensitive)
    else if (normalizedStatus === 'accepted' && rideAccepted) {
      console.log('[Home] ✅ Rendering TripStart component (main condition)');
      console.log('[Home] 📍 Condition met - status is Accepted and rideAccepted is true');
      return <View style={{flex: 1, alignItems: 'center'}}>{TripStart()}</View>;
    }
    // Fallback: Show TripStart if we have ride details with Accepted status
    else if (acceptRide && rideDetails && (rideStatusFromDetails === 'accepted' || normalizedStatus === 'accepted')) {
      console.log('[Home] ✅ Rendering TripStart component (fallback condition)');
      console.log('[Home] 📍 Fallback condition met:', {
        acceptRide,
        hasRideDetails: !!rideDetails,
        rideStatusFromDetails,
        normalizedStatus,
      });
      
      // Ensure state is set correctly for next render
      if (!rideAccepted) {
        console.log('[Home] 🔄 Setting rideAccepted to true');
        setRideAccepted(true);
      }
      if (status !== 'Accepted') {
        console.log('[Home] 🔄 Setting status to Accepted');
        setStatus('Accepted');
      }
      
      return <View style={{flex: 1, alignItems: 'center'}}>{TripStart()}</View>;
    } else if (
      status == 'Started' ||
      status === 'Completed' ||
      status == 'Paused' ||
      status == 'Resumed'
    ) {
      // Only show RideStarted view if ride is actually started and not completed
      if (rideStartered && status !== 'Completed' && status !== 'Cancelled') {
        console.log('[Home] ✅ Rendering RideStarted component');
        return (
          <View style={{flex: 1, alignItems: 'center'}}>{RideStarted()}</View>
        );
      }
      // If completed, fall through to show home screen
      console.log('[Home] ⚠️ Ride started but not showing - rideStartered:', rideStartered, 'status:', status);
    }
    
    // Default: show home screen (also handles completed/cancelled rides)
    console.log('[Home] 📍 Rendering home screen');
    return (
      <View style={{position: 'absolute', left: vw * 5, top: vh * 2}}>
        {homescreen()}
      </View>
    );
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
        {switchh && (() => {
          // Validate marker coordinates before rendering
          const markerCoords = {...markerRegion, ...region};
          const isValidMarker = 
            markerCoords.latitude && 
            markerCoords.longitude && 
            markerCoords.latitude !== 0 && 
            markerCoords.longitude !== 0 &&
            !isNaN(markerCoords.latitude) &&
            !isNaN(markerCoords.longitude);
          
          if (!isValidMarker) {
            return null;
          }
          
          return (
            <Marker coordinate={markerCoords} ref={markerRef}>
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
          );
        })()}

        {status && 
         status !== 'Completed' && 
         status !== 'Cancelled' && 
         (() => {
          // Validate coordinates before rendering MapViewDirections
          const origin = currentLatitude && currentLongitude 
            ? {latitude: currentLatitude, longitude: currentLongitude}
            : {latitude: 24.8639148, longitude: 67.1672468};
          
          const destination = status == 'Started'
            ? {
                latitude: rideDetails?.ride?.dropofflocation?.coordinates?.[1],
                longitude: rideDetails?.ride?.dropofflocation?.coordinates?.[0],
              }
            : {
                latitude: rideDetails?.ride?.pickuplocation?.coordinates?.[1],
                longitude: rideDetails?.ride?.pickuplocation?.coordinates?.[0],
              };
          
          // Validate destination coordinates
          const isValidDestination = 
            destination.latitude && 
            destination.longitude && 
            !isNaN(destination.latitude) &&
            !isNaN(destination.longitude) &&
            destination.latitude !== 0 &&
            destination.longitude !== 0;
          
          if (!isValidDestination) {
            console.warn('[Home] ⚠️ Invalid destination coordinates, skipping MapViewDirections');
            return null;
          }
          
          return (
            <MapViewDirections
              ref={mapDirectionRef}
              origin={origin}
              destination={destination}
              apikey={apikey}
              mode="DRIVING"
              strokeColor="black"
              strokeWidth={4}
              onReady={result => {
                console.log(result, 'Distance in Map view');
                if (result?.distance && !isNaN(result.distance)) {
                  setDistance(result.distance);
                }
              }}
              onError={(errorMessage) => {
                console.warn('[Home] ⚠️ MapViewDirections Error:', errorMessage);
                // Don't show error to user if it's a billing issue - just log it
                if (errorMessage && errorMessage.includes('Billing')) {
                  console.warn('[Home] ⚠️ Google Maps billing not enabled. Directions will not be displayed.');
                }
              }}
            />
          );
        })()}
        {status && 
         status !== 'Completed' && 
         status !== 'Cancelled' && 
         (() => {
          // Validate coordinates before rendering Marker
          const markerCoords = status == 'Started'
            ? {
                latitude: rideDetails?.ride?.dropofflocation?.coordinates?.[1],
                longitude: rideDetails?.ride?.dropofflocation?.coordinates?.[0],
              }
            : {
                latitude: rideDetails?.ride?.pickuplocation?.coordinates?.[1],
                longitude: rideDetails?.ride?.pickuplocation?.coordinates?.[0],
              };
          
          // Validate marker coordinates
          const isValidMarker = 
            markerCoords.latitude && 
            markerCoords.longitude && 
            !isNaN(markerCoords.latitude) &&
            !isNaN(markerCoords.longitude) &&
            markerCoords.latitude !== 0 &&
            markerCoords.longitude !== 0;
          
          if (!isValidMarker) {
            console.warn('[Home] ⚠️ Invalid marker coordinates, skipping Marker render');
            return null;
          }
          
          return (
            <Marker coordinate={markerCoords}>
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
          );
        })()}
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
