import React, {useRef, useState} from 'react';
import {Text, View, LayoutAnimation, Image} from 'react-native';
import {styles} from './styles';
import MapView from 'react-native-maps';
import GilroyMedium from '../../../components/Wrappers/Text/GilroyMedium';
import GilroyRegular from '../../../components/Wrappers/Text/GilroyRegular';
import RobotoMedium from '../../../components/Wrappers/Text/RobotoMedium';
import {icons, images} from '../../../assets';
import Button from '../../../components/Button';
import Ripple from '../../../components/Wrappers/Ripple';
import GeneralModal from '../../../popups/GeneralModal';
import ReportModal from '../../../popups/ReportModal';
import vh from '../../../utils/units/vh';
import GilroyBold from '../../../components/Wrappers/Text/GilroyBold';
import ReceiptModal from '../../../popups/ReceiptModal';
import PickDropLocation from '../../../components/PickDropLocation';
import {
  ridePauseAction,
  rideResumeAction,
  submitAmountAction,
  rideEndRideAction,
} from '../../../Redux/Actions/rideAction';
import {showToast} from '../../../Api/HelperFunction';
import {useDispatch} from 'react-redux';
const RideStarted = props => {
  const [paused, setPaused] = useState(false);
  const dispatch = useDispatch();

  // const [switchh, setSwitch] = useState(true);
  const [markCompleted, setMarkCompleted] = useState(false);
  const [amountReceived, setAmountReceived] = useState('');
  const resumeRef = useRef();
  const modalRef = useRef();
  const rejectRef = useRef();
  const modalRef2 = useRef();
  const modalRef4 = useRef();
  const serviceRequest = useRef();
  const resumeConfirmRef = useRef();
  const markPaid = useRef();
  const markPaidConfirm = useRef();
  const receiptRef = useRef();
  const receiptImageRef = useRef();
  const amountReceivedRef = useRef();
  const walletRef = useRef();
  const endRide = useRef();

  const handlePaused = async () => {
    try {
      const id = '62c6930848572e20ac4e4095';
      const response = await dispatch(ridePauseAction(id));
      //   console.log('REsponse ==>', response);

      showToast(response?.message);
      setPaused(true);
      // // setMarkCompleted(true)
      modalRef4.current.show();
      // props.navigation.navigate('RideStarted');

      //   console.log('Response from Accept Ridew ==>', response);
    } catch (err) {
      console.log('Ree', err);
      showToast(err);
    }
  };
  const handleSubmitAmount = async () => {
    if (amountReceived == '') {
      return showToast('Enter Amount Recieved');
    }
    const id = '62c6930848572e20ac4e4095';
    const body = {
      recievedAmount: amountReceived,
    };
    try {
      const response = await dispatch(submitAmountAction(body, id));
      showToast(response?.message);
    } catch (err) {
      showToast(err);
    }
  };

  const handleResumed = async () => {
    try {
      const id = '62c6930848572e20ac4e4095';
      const response = await dispatch(rideResumeAction(id));
      //   console.log('REsponse ==>', response);

      showToast(response?.message);
      setPaused(false);
      resumeConfirmRef.current.show();
      // props.navigation.navigate('RideStarted');

      //   console.log('Response from Accept Ridew ==>', response);
    } catch (err) {
      console.log('Ree', err);
      showToast(err);
    }
  };

  const CustomButton = props => {
    return (
      <Ripple
        style={[styles.buttonContainer, props.customButtonStyle]}
        onPress={props.onPress}>
        <GilroyBold style={styles.buttonText}>{props.children}</GilroyBold>
      </Ripple>
    );
  };
  const end_Ride = async () => {
    try {
      const id = '62c6930848572e20ac4e4095';
      const response = await dispatch(rideEndRideAction(id));
      console.log('response from End Ride ==>', response);
      showToast(response?.message);
      props.navigation.goBack();
      // endRide.current.show();
    } catch (err) {
      showToast(err);
    }
  };

  const CalendarCart = ({imgSource, title}) => {
    return (
      <View style={styles.calendarCartContainer}>
        <Image source={imgSource} style={styles.calendarIcon} />
        <GilroyMedium style={styles.dateText}>{title}</GilroyMedium>
      </View>
    );
  };
  const markPaidFunc = () => {
    if (markCompleted) {
      markPaid.current.show();
    }
  };
  const markCompletedFunc = () => {
    if (paused) {
      console.log('Pause ==>', paused);
      setMarkCompleted(true);
      receiptRef.current.show();
    }
  };
  const PauseButton = props => {
    const pauseBtnRef = () => {
      if (paused) {
        resumeRef.current.show();
      } else {
        // console.log(props.paused);
        modalRef.current.show();
      }
    };
    // console.log("props", props);
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
            handleResumed();
            // setPaused(false);
            // resumeConfirmRef.current.show();
          }}
          button2Text={'No'}
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
  // const navigation =  useNavigation();
  const UserRequestCard = (
    <View style={styles.CardContainer}>
      <View style={styles.usernameProfileContainer}>
        <View style={styles.userNameImageContainer}>
          <View style={styles.profileContainer}>
            <Image
              source={images.userProfileImage}
              style={styles.profileImage}
            />
          </View>
          <View style={styles.userDetailsContainer}>
            <RobotoMedium style={styles.userNameText}>User Name</RobotoMedium>
            <GilroyRegular style={[styles.userNameText, styles.numberIdText]}>
              123435454565
            </GilroyRegular>
          </View>
        </View>
        {paused && (
          <View style={styles.imgsContainer}>
            <Ripple onPress={() => props.navigation.navigate('Chat')}>
              <Image source={icons.chat} style={styles.phoneIcon} />
            </Ripple>
          </View>
        )}
      </View>
      <PauseButton
        modalRef={modalRef}
        {...props}
        paused={paused}
        setPaused={setPaused}>
        {paused ? 'Paused' : 'Pause Ride'}
      </PauseButton>
      <PickDropLocation />
      <View style={styles.ButtonsStyle}>
        <CustomButton
          customButtonStyle={[styles.acceptBtn, paused && styles.markColor]}
          onPress={markCompletedFunc}>
          Mark Completed
        </CustomButton>
        <CustomButton
          customButtonStyle={[
            styles.rejectBtn,
            markCompleted && styles.markColorPaid,
          ]}
          onPress={markPaidFunc}>
          Mark Paid
        </CustomButton>
      </View>
      <Button text="Navigate" onPress={() => endRide.current.show()} />
      <GeneralModal //screen 7
        rating
        reference={endRide}
        icon={images.exclamationMark}
        text2={'Are You Sure you want to end\nthe Ride?'}
        text2Style={styles.text2style}
        button1Text={'Yes'}
        button2Text={'No'}
        onButton1Press={() => {
          end_Ride();
        }}
      />

      <ReceiptModal //screen 7
        reference={receiptRef}
        imageUpload
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
        // text2="Please Upload Receipt Here"
        img
        button1Text={'Yes'}
        onButton1Press={() => {
          handlePaused();
        }}
        button2Text={'No'}
      />
      <GeneralModal //screen 7
        reference={markPaid}
        icon={images.exclamationMark}
        text2={'Are you sure you want to mark paid?'}
        text2Style={styles.text2style}
        button1Text={'Yes'}
        onButton1Press={() => {
          setPaused(false);
          amountReceivedRef.current.show();
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
        onButton1Press={() => {
          handleSubmitAmount();
          // receiptImageRef.current.show()
        }}
        button2Text={'Cancel'}
      />
      <GeneralModal //screen 7
        reference={walletRef}
        icon={images.exclamationMark}
        text2={'Do you want to add the remaining\namount in abc user wallet ?'}
        text2Style={styles.text2style}
        textAmount
        button1Text={'Yes'}
        onButton1Press={() => {}}
        button2Text={'No'}
      />

      <GeneralModal //screen 7
        reference={modalRef}
        icon={images.exclamationMark}
        text2={'Are you sure you want to pause\nthis ride ?'}
        text2Style={styles.text2style}
        button1Text={'Yes'}
        onButton1Press={() => {
          setPaused(true);
          setMarkCompleted(true);
          modalRef4.current.show();

          // amountReceivedRef.current.show();
        }}
        button2Text={'No'}
      />
      <GeneralModal //screen 7
        reference={modalRef4}
        icon={icons.tickModal}
        text2={'Ride has been paused.'}
        text2Style={{height: null, fontSize: 1.9 * vh}}
        smallMainIconStyle
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapView}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}></MapView>
      {UserRequestCard}
      {/* <UserRequestCard {...props} /> */}
    </View>
  );
};
export default RideStarted;
