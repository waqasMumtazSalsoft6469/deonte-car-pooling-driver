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
import PickDropLocation from '../../../components/PickDropLocation';
import {rideStartedAction} from '../../../Redux/Actions/rideAction';
import {showToast} from '../../../Api/HelperFunction';
import {useDispatch} from 'react-redux';

const CustomButton = props => {
  return (
    <Ripple
      style={[styles.buttonContainer, props.customButtonStyle]}
      onPress={props.onPress}>
      <GilroyBold style={[styles.buttonText, props.buttonTextStyle]}>
        {props.children}
      </GilroyBold>
    </Ripple>
  );
};

const UserRequestCard = props => {
  const dispatch = useDispatch();

  const modalRef = useRef();
  const rejectRef = useRef();
  const modalRef2 = useRef();
  const modalRef4 = useRef();
  const handleStartRide = async () => {
    try {
      const id = '62c6930848572e20ac4e4095';
      const response = await dispatch(rideStartedAction(id));
      //   console.log('REsponse ==>', response);

      showToast(response?.message);
      props.navigation.navigate('RideStarted');

      //   console.log('Response from Accept Ridew ==>', response);
    } catch (err) {
      showToast(err);
    }
  };
  return (
    <View style={styles.CardContainer}>
      <GilroyBold style={styles.tripIdText}>Trip ID: ab001</GilroyBold>
      <View style={styles.usernameProfileContainer}>
        <View style={styles.userNameImageContainer}>
          <View style={styles.profileContainer}>
            <Image
              source={images.userProfileImage}
              style={styles.profileImage}
            />
          </View>
          <RobotoMedium style={styles.userNameText}>User Name</RobotoMedium>
        </View>
        <View style={styles.imgsContainer}>
          <Ripple onPress={() => props.navigation.navigate('Chat')}>
            <Image source={icons.chat} style={styles.phoneIcon} />
          </Ripple>
          <Image
            source={icons.phone}
            style={[styles.phoneIcon, styles.phoneIconChanges]}
          />
        </View>
      </View>
      <PickDropLocation />

      <CustomButton
        buttonTextStyle={styles.acceptBtn}
        onPress={() => rejectRef.current.show()}>
        Cancel
      </CustomButton>
      <CustomButton
        customButtonStyle={styles.rejectBtn}
        onPress={() => modalRef.current.show()}>
        Start Ride
      </CustomButton>

      <GeneralModal //screen 7
        reference={modalRef}
        icon={images.exclamationMark}
        // text1={'Logout'}
        text2={'Are you sure you want to start the ride?'}
        text2Style={styles.text2style}
        button1Text={'Yes'}
        onButton1Press={() => {
          handleStartRide();
        }}
        button2Text={'No'}
      />
      <GeneralModal //screen 7
        reference={rejectRef}
        icon={images.exclamationMark}
        text2={
          'Are you sure you want to cancel the ride.\nYou might be charged for cancellation.'
        }
        text2Style={styles.text2style}
        button1Text={'Yes'}
        onButton1Press={() => {
          modalRef2.current.show();
        }}
        button2Text={'No'}
      />
      <ReportModal //screen 7
        reference={modalRef2}
        text1={'Cancellation Reason'}
        title="Please Provide a Reason"
        smallMainIconStyle
        text2Style={{height: null, fontSize: 1.9 * vh}}
        button1Text={'Continue'}
        onButton1Press={() => {
          modalRef4.current.show();
          modalRef2.current.hide();
        }}
        onHide={() => {}}
        button2Text={'Cancel'}
      />
      <GeneralModal //screen 7
        reference={modalRef4}
        icon={icons.tickModal}
        text2={'Trip has been cancelled'}
        text2Style={{height: null, fontSize: 1.9 * vh}}
        smallMainIconStyle
      />
    </View>
  );
};

const TripAccept = props => {
  const [switchh, setSwitch] = useState(true);
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
      <UserRequestCard {...props} />
    </View>
  );
};
export default TripAccept;
