import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Image, View } from 'react-native';
import MontserratMedium from '../Wrappers/Text/GilroyMedium';

import { useDrawerProgress, useDrawerStatus } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import {
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { image_url } from '../../Api/configs';
import { icons, images } from '../../assets';
import GeneralModal from '../../popups/GeneralModal';
import { logout, getProfile } from '../../Redux/Actions/auth';
import vh from '../../utils/units/vh';
import Ripple from '../Wrappers/Ripple';
import GilroyMedium from '../Wrappers/Text/GilroyMedium';
import GilroyRegular from '../Wrappers/Text/GilroyRegular';
import styles from './styles';
const DrawerContent = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const progress = useDrawerProgress();
  const sv = useSharedValue(0);
  const isDrawerOpen = useDrawerStatus();
  const modalRef = useRef();
  
  const userDetail = useSelector(state => state.UserReducer.userData);
  const profileData = useSelector(state => state.UserReducer.profile);
  const [driverProfile, setDriverProfile] = useState(null);
  const [logOutPopup, setLogOutPopup] = useState(false);

  console.log('User Details from drawer======>', userDetail);
  console.log('Profile Data from drawer======>', profileData);

  // Fetch profile data when drawer opens
  const fetchProfile = useCallback(async () => {
    if (userDetail?._id) {
      try {
        const response = await dispatch(getProfile(userDetail._id));
        // The response structure might be { driver: {...} } or { data: { driver: {...} } }
        if (response?.driver) {
          setDriverProfile(response.driver);
        } else if (response?.data?.driver) {
          setDriverProfile(response.data.driver);
        }
      } catch (err) {
        console.log('Error fetching profile in drawer:', err);
      }
    }
  }, [dispatch, userDetail?._id]);

  // Fetch profile when drawer opens
  useEffect(() => {
    if (isDrawerOpen === 'open') {
      fetchProfile();
    }
  }, [isDrawerOpen, fetchProfile]);

  // Animation effect for drawer
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
          {/* Use profile data if available, otherwise fallback to userData */}
          {(() => {
            // Priority: driverProfile (fetched) > profileData.driver (from Redux) > profileData (from Redux) > userDetail
            const profile = driverProfile || profileData?.driver || profileData || userDetail;
            const userImageUri = profile?.userImage
              ? image_url + profile.userImage
              : null;
            const hasValidImage = userImageUri && userImageUri.trim() !== '';
            
            // Dummy/placeholder image - local asset
            const dummyImageSource = images.userProfileImage;
            
            // Image source: use URI if valid, otherwise use dummy image
            const imageSource = hasValidImage
              ? {uri: userImageUri}
              : dummyImageSource;
            
            return (
              <Image
                style={styles.image}
                source={imageSource}
                defaultSource={dummyImageSource}
                onError={() => {
                  console.log('Drawer profile image failed to load, using dummy image');
                }}
              />
            );
          })()}
        </View>
        <GilroyMedium style={styles.mark}>
          {(() => {
            // Priority: driverProfile (fetched) > profileData.driver (from Redux) > profileData (from Redux) > userDetail
            const profile = driverProfile || profileData?.driver || profileData || userDetail;
            const firstName = profile?.firstName || '';
            const lastName = profile?.lastName || '';
            const fullName = firstName || lastName
              ? `${firstName} ${lastName}`.trim()
              : 'Driver';
            return `Hi, ${fullName}`;
          })()}
        </GilroyMedium>
      </View>
      {/* </Animated.View> */}
      <View style={styles.labelContainer}>
        <Ripple
          onPress={() => navigation.navigate('HomeNavigator')}
          style={styles.label}>
          {/* <Animated.View style={[styles.label, animatedStyles]}> */}

          <Image source={icons.drawerGarageHome} style={styles.iconbookaride} />
          <MontserratMedium style={styles.drawerText}>
            Home
          </MontserratMedium>

          {/* </Animated.View> */}
        </Ripple>

        {/* <Animated.View style={[animatedStyles2]}> */}
        <Ripple
          style={styles.label}
          onPress={() => navigation.navigate('ProfileNavigator')}>
          <Image source={icons.drawerAssignmentInd} style={styles.icon} />
          <MontserratMedium style={styles.drawerText}>My Profile</MontserratMedium>
        </Ripple>
        {/* </Animated.View> */}
        <Ripple
          style={styles.label}
          onPress={() => navigation.navigate('MyVehicleNavigator')}>
          <Image source={icons.drawerDirectionsCar} style={styles.icon} />
          <MontserratMedium style={styles.drawerText}>
            My Car
          </MontserratMedium>
        </Ripple>

        <Ripple
          style={styles.label}
          onPress={() => navigation.navigate('RatingNavigator')}>
          <Image source={icons.drawerContract} style={styles.icon} />
          <MontserratMedium style={styles.drawerText}>
            Ratings and Reviews
          </MontserratMedium>
        </Ripple>
        <Ripple
          style={styles.label}
          onPress={() => navigation.navigate('MyEarningsNavigator')}>
          {/* <Animated.View style={[styles.label, animatedStyles3]}> */}

          <Image source={icons.drawerDialogs} style={styles.icon} />
          <MontserratMedium style={styles.drawerText}>
            Payment Logs
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
          <Image source={icons.drawerDirectionsCar} style={styles.iconbookaride} />
          <MontserratMedium style={styles.drawerText}>
            Rides Request
          </MontserratMedium>
        </Ripple>
        {/* </Animated.View> */}
        {/* <Animated.View style={[animatedStyles2]}> */}
        {/* <Ripple
          style={styles.label}
          onPress={() => navigation.navigate('ContactUsNavigator')}>
          <Image source={icons.phoneDrawer} style={styles.icon} />
          <MontserratMedium style={styles.drawerText}>
            Contact Us
          </MontserratMedium>
        </Ripple> */}
        {/* </Animated.View> */}
        {/* <Animated.View style={[animatedStyles2]}> */}
        <Ripple style={styles.Logout} onPress={() => modalRef.current.show()}>
          <Image source={icons.drawerExitToApp} style={styles.icon} />
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
          text2Style={{ height: null }}
          button1Text={'Yes'}
          onButton1Press={() => {
            dispatch(logout());
          }}
          button2Text={'No'}
        />
      </View>
    </View>
  );
};
// </LinearGradient>

export default DrawerContent;
