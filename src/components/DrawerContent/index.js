import React, {useState, useRef, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import MontserratMedium from '../Wrappers/Text/GilroyMedium';

import styles from './styles';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useDrawerProgress, useDrawerStatus} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import vh from '../../utils/units/vh';
import {icons, images} from '../../assets';
import GilroyRegular from '../Wrappers/Text/GilroyRegular';
import GilroyMedium from '../Wrappers/Text/GilroyMedium';
import GeneralModal from '../../popups/GeneralModal';
import Ripple from '../Wrappers/Ripple';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../Redux/Actions/auth';
import {image_url} from '../../Api/configs';
import vw from '../../utils/units/vw';
const DrawerContent = props => {
  const userDetail = useSelector(state => state.UserReducer.userData);

  console.log('USer Details from drawer======>', userDetail);
  const sv = useSharedValue(0);
  const isDrawerOpen = useDrawerStatus();
  const [logOutPopup, setLogoutPopup] = useState(false);
  // const [visibility, setVisibility] = useState(false)
  const modalRef = useRef();

  const navigation = useNavigation();
  const progress = useDrawerProgress();
  // console.log("animate",Animated);
  const dispatch = useDispatch();
  // const logoutfun = () => {
  //   dispatch(
  //     logout().then(res => {
  //       console.log('Logout ====>', res);
  //     }),
  //   );
  //   // setVisibility(false);
  // };
  useEffect(() => {
    if (isDrawerOpen === 'open') {
      sv.value = withTiming(progress.value);
    } else {
      sv.value = withTiming(progress.value);
    }
  });
  // const opacity = Animated.interpolate(sv.value, {
  //   inputRange: [0, 1],
  //   outputRange: [-10, 1],
  // });

  // const scale = Animated.interpolate(sv.value, {
  //   inputRange: [0, 1],
  //   outputRange: [0, 1],
  // });

  // const scale2 = Animated.interpolate(sv.value, {
  //   inputRange: [0.3, 1],
  //   outputRange: [0, 1],
  // });
  // const scale3 = Animated.interpolate(sv.value, {
  //   inputRange: [0.6, 1],
  //   outputRange: [0, 1],
  // });
  // const scale4 = Animated.interpolate(sv.value, {
  //   inputRange: [0.9, 1],
  //   outputRange: [0, 1],
  // });
  // const translateX = Animated.interpolate(sv.value, {
  //   inputRange: [0, 1],
  //   outputRange: [40 * -vh, vh * 1],
  // });

  // const translateX2 = Animated.interpolate(sv.value, {
  //   inputRange: [0, 1],
  //   outputRange: [40 * -vh * 3, vh * 1],
  // });
  // const translateX3 = Animated.interpolate(sv.value, {
  //   inputRange: [0, 1],
  //   outputRange: [40 * -vh * 5, vh * 1],
  // });
  // const translateX4 = Animated.interpolate(sv.value, {
  //   inputRange: [0, 1],
  //   outputRange: [40 * -vh * 7, vh * 1],
  // });

  // const animatedStylesImage = {
  //   opacity: opacity,
  // };

  // const animatedStyles = {
  //   // opacity: opacity,
  //   transform: [{translateX}, {scale}],
  // };
  // const animatedStyles2 = {
  //   // opacity: opacity,
  //   transform: [{translateX: translateX2}, {scale: scale2}],
  // };
  // const animatedStyles3 = {
  //   // opacity: opacity,
  //   transform: [{translateX: translateX3}, {scale: scale3}],
  // };
  // const animatedStyles4 = {
  //   // opacity: opacity,
  //   transform: [{translateX: translateX4}, {scale: scale4}],
  // };

  return (
    <View style={styles.container}>
      {/* <Animated.View style={[styles.imageStyle, animatedStylesImage]}> */}
      <View style={styles.label}>
        <View
          style={{
            height: vh * 6,
            width: vh * 6,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: (vh * 6) / 2,
          }}>
          <Image
            style={styles.image}
            source={
              userDetail?.userImage
                ? {uri: image_url + userDetail?.userImage}
                : images.driverImage
            }
          />
        </View>
        <GilroyMedium style={styles.mark}>
          Hi, {userDetail?.firstName}
        </GilroyMedium>
      </View>
      {/* </Animated.View> */}
      <View style={styles.labelContainer}>
        <Ripple
          onPress={() => navigation.navigate('HomeNavigator')}
          style={styles.label}>
          {/* <Animated.View style={[styles.label, animatedStyles]}> */}

          <Image source={icons.bookRide} style={styles.iconbookaride} />
          <MontserratMedium style={styles.drawerText}>
            Book A Ride
          </MontserratMedium>

          {/* </Animated.View> */}
        </Ripple>

        {/* <Animated.View style={[animatedStyles2]}> */}
        <Ripple
          style={styles.label}
          onPress={() => navigation.navigate('ProfileNavigator')}>
          <Image source={icons.profile} style={styles.icon} />
          <MontserratMedium style={styles.drawerText}>Profile</MontserratMedium>
        </Ripple>
        {/* </Animated.View> */}
        <Ripple
          style={styles.label}
          onPress={() => navigation.navigate('MyVehicleNavigator')}>
          <Image source={icons.myVehicle} style={styles.icon} />
          <MontserratMedium style={styles.drawerText}>
            My Vehicles
          </MontserratMedium>
        </Ripple>
        <Ripple
          style={styles.label}
          onPress={() => navigation.navigate('PlayListNavigator')}>
          <Image source={icons.playlist} style={styles.icon} />
          <MontserratMedium style={styles.drawerText}>
            My Playlist
          </MontserratMedium>
        </Ripple>
        <Ripple
          style={styles.label}
          onPress={() => navigation.navigate('RatingNavigator')}>
          <Image source={icons.ratingContainer} style={styles.icon} />
          <MontserratMedium style={styles.drawerText}>
            Ratings and Reviews{' '}
          </MontserratMedium>
        </Ripple>
        <Ripple
          style={styles.label}
          onPress={() => navigation.navigate('MyEarningsNavigator')}>
          {/* <Animated.View style={[styles.label, animatedStyles3]}> */}

          <Image source={icons.walletDrawer} style={styles.icon} />
          <MontserratMedium style={styles.drawerText}>
            My Earnings
          </MontserratMedium>
        </Ripple>
        {/* </Animated.View> */}
        {/* <Animated.View style={[animatedStyles2]}> */}
        {/* <Ripple
          style={styles.label}
          onPress={() => navigation.navigate('MyRidesNavigator')}>
          <Image source={icons.bookRide} style={styles.iconbookaride} />
          <MontserratMedium style={styles.drawerText}>
            My Rides
          </MontserratMedium>
        </Ripple> */}
        {/* </Animated.View> */}
        {/* <Animated.View style={[animatedStyles2]}> */}
        <Ripple
          style={styles.label}
          onPress={() => navigation.navigate('MyRidesRequestNavigator')}>
          <Image source={icons.bookRide} style={styles.iconbookaride} />
          <MontserratMedium style={styles.drawerText}>
            Rides Request
          </MontserratMedium>
        </Ripple>
        {/* </Animated.View> */}
        {/* <Animated.View style={[animatedStyles2]}> */}
        <Ripple
          style={styles.label}
          onPress={() => navigation.navigate('ContactUsNavigator')}>
          <Image source={icons.phoneDrawer} style={styles.icon} />
          <MontserratMedium style={styles.drawerText}>
            Contact Us
          </MontserratMedium>
        </Ripple>
        {/* </Animated.View> */}
        {/* <Animated.View style={[animatedStyles2]}> */}
        <Ripple style={styles.Logout} onPress={() => modalRef.current.show()}>
          <Image source={icons.logout} style={styles.icon} />
          <GilroyRegular style={styles.drawerText}>Logout</GilroyRegular>
        </Ripple>
        {/* </Animated.View> */}

        {/* <Animated.View
          style={[styles.label, animatedStyles4, styles.logoutStyle]}
          > */}

        {/* </Animated.View> */}
        <GeneralModal //screen 7
          reference={modalRef}
          icon={images.logout}
          text1={'Logout'}
          text2={'Are you sure you want to logout ?'}
          text2Style={{height: null}}
          // textLink={'Contact Here'}
          // onHide={() => props.navigation.navigate('Drawer')}
          // textLinkStyle={{}}
          button1Text={'Yes'}
          onButton1Press={() => {
            dispatch(logout());
            setTimeout(() => {
              props.navigation.navigate('AuthNavigator');
            }, 2000);
          }}
          button2Text={'No'}
        />
      </View>
    </View>
  );
};
// </LinearGradient>

export default DrawerContent;
