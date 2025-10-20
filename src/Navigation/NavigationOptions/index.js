import React from 'react';
import {View} from 'react-native';
import {Fonts, icons} from '../../assets';
import IconButton from '../../components/IconButton';
import styles from './styles';
import GilroyBold from '../../components/Wrappers/Text/GilroyBold';

const leftBtnRoutes = {
  Home: 'Home',
  // Notifications: "Notifications",
  ContactUs: 'ContactUs',
  MyRides: 'MyRides',
  MyEarnings: 'MyEarnings',
  RatingAndReviews: 'RatingAndReviews',
  Profile: 'Profile',
  MusicListing: 'MusicListing',
  MyVehicleInformation: 'MyVehicleInformation',
  RidesRequest: 'RidesRequest',
};
const leftBackRoutes = {
  ChangePassword: 'ChangePassword',
  EditProfile: 'EditProfile',
  // MyVehicle: "MyVehicle",
  Chat: 'Chat',
  // RegisterVehicle: "Register Vehicle",
  AddSongScreen: 'AddSongScreen',
  RideDetails: 'RideDetails',
  MyEarningDetails: 'MyEarningDetails',
  EditVehicleDetails: 'EditVehicleDetails',
  Notifications: 'Notifications',
};
const rightBtnNotification = {
  Home: 'Home',
  TripRequest: 'TripRequest',
  TripAccept: 'TripAccept',
  RideStarted: 'RideStarted',
};
const titles = {
  Home: 'Home',
  Notifications: 'Notifications',
  ContactUs: 'Contact Us',
  MyRides: 'My Rides',
  ChangePassword: 'Change Password',
  MyEarnings: 'MyEarnings',
  EditProfile: 'EditProfile',
  // MyVehicle: "My Vehicle",
  TripRequest: 'Trip',
  TripAccept: 'Trip',
  Chat: 'User Name',
  // RegisterVehicle: "Register Vehicle",
  RideStarted: 'Trip',
  MusicListing: 'My Playlist',
  AddSongScreen: 'Add new Song',
  RideDetails: 'Trip Details',
  MyEarnings: 'Earnings',
  MyEarningDetails: 'Earnings',
  RatingAndReviews: 'Ratings & Reviews ',
  MyVehicleInformation: 'My Vehicle',
  EditVehicleDetails: 'Edit Vehicle',
  Profile: 'Profile',
  RidesRequest: 'Rides Request',
};
const leftBackWhiteRoutes = {
  MyVehicle: 'My Vehicle',
  RegisterVehicle: 'Register Vehicle',
};
const titlesWhite = {
  MyVehicle: 'My Vehicle',
  RegisterVehicle: 'Register Vehicle',
};
const crossBtn = {
  TripRequest: 'Trip',
  TripAccept: 'TripAccept',
  RideStarted: 'RideStarted',
};
const getTitle = props => {
  if (titles[props?.route?.name]) {
    return (
      <View style={styles.titleContainer}>
        <GilroyBold>{titles[props?.route?.name]}</GilroyBold>
      </View>
    );
  }
  if (titlesWhite[props?.route?.name]) {
    return (
      <View style={styles.titleContainer}>
        <GilroyBold style={styles.titleStyle}>
          {titlesWhite[props?.route?.name]}
        </GilroyBold>
      </View>
    );
  }
};

const getHeaderRight = props => {
  if (rightBtnNotification[props?.route?.name]) {
    return (
      <IconButton
        onPress={() => props.navigation.navigate('Notifications')}
        iconStyle={[styles.headerNotificationButtons]}
        icon={icons.notifications} //icons.home
        resizeMode="contain"
      />
    );
  }
};
const getHeaderLeft = props => {
  if (leftBtnRoutes[props?.route?.name]) {
    return (
      <IconButton
        onPress={() => props.navigation.openDrawer()}
        iconStyle={[styles.headerButtonsBlack]}
        customStyle={styles.imageContainer}
        icon={icons.menu}
      />
    );
  }
  if (leftBackRoutes[props?.route?.name]) {
    return (
      <IconButton
        onPress={() => props.navigation.goBack()}
        iconStyle={[styles.headerButtonsBlack]}
        // customStyle={styles.imageContainer}
        icon={icons.arrowBack}
      />
    );
  }
  if (leftBackWhiteRoutes[props?.route?.name]) {
    return (
      <IconButton
        onPress={() => props.navigation.goBack()}
        iconStyle={[styles.headerButtons]}
        // customStyle={styles.imageContainer}
        icon={icons.arrowBack}
      />
    );
  }
  if (crossBtn[props?.route?.name]) {
    return (
      <IconButton
        onPress={() => props.navigation.navigate('Home')}
        iconStyle={[styles.crossBtn]}
        // customStyle={styles.imageContainer}
        icon={icons.cross}
      />
    );
  }
};
const NavigationOptions = navProps => {
  return {
    headerTitle: () => getTitle(navProps),
    headerLeft: () => getHeaderLeft(navProps),
    headerRight: () => getHeaderRight(navProps),
    headerTitleAlign: 'center',
  };
};
export default NavigationOptions;
