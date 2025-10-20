import React, {useCallback, useRef, useState} from 'react';
import {Text, View, FlatList} from 'react-native';
import GilroyMedium from '../../../components/Wrappers/Text/GilroyMedium';
import GilroyRegular from '../../../components/Wrappers/Text/GilroyRegular';
import {styles} from './styles';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
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
  const [rideId, setSideId] = useState('');
  const modalRef = useRef();
  const rejectRef = useRef();

  const getData = async () => {
    try {
      const response = await dispatch(pendingRideAction());
      console.log('Response from Get pending req  ========>', response);
      setPendingRides(response?.rides);
    } catch (err) {
      console.log('err-pending req', err);
      showToast(err);
    }
  };
  const handleAcceptButton = async () => {
    try {
      const response = await dispatch(acceptRideAction(rideId));
      showToast(response?.message);
      getRiderDetails(rideId);
      dispatch({
        type: actionTypes.rideId,
        currentRideId: rideId,
      });
      navigation.navigate('Home');
      // setAcceptRide(false);

      // modalRef2.current.hide();
    } catch (err) {
      showToast(err);
      setShowPopup(true);
    }
  };
  const handleRejectButton = async () => {
    try {
      const response = await dispatch(rejectRideAction(rideId));
      showToast(response?.message);
      // setAcceptRide(false);
      // setStatus(false);
      //  modalRef2.current.hide();
    } catch (err) {
      showToast(err);

      // setShowPopup(true);
    }
  };
  useFocusEffect(
    useCallback(() => {
      getData();
    }, []),
  );
  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={pendingRides}
        renderItem={({item, index}) => {
          console.log('item---flatlddddist --', item?._id);
          return (
            <View style={{alignItems: 'center', flex: 1}}>
              <View
                style={{
                  height: height / 1.9,
                  width: '100%',
                  // backgroundColor: 'green',
                }}>
                <UserDetailsCard data={item?.user} />
                <PickDropLocation data={item} />
                <View style={TripRequestStyles.ButtonsStyle}>
                  <CustomButton
                    customButtonStyle={TripRequestStyles.acceptBtn}
                    onPress={() => {
                      modalRef.current.show();
                      setSideId(item?._id);
                    }}>
                    Accept
                  </CustomButton>
                  <CustomButton
                    customButtonStyle={TripRequestStyles.rejectBtn}
                    onPress={() => {
                      rejectRef.current.show();
                      setSideId(item?._id);
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
