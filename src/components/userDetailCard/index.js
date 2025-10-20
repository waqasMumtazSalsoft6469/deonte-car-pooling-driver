import React from 'react';
import {Image, View} from 'react-native';
import RobotoMedium from '../Wrappers/Text/RobotoMedium';
import GilroyRegular from '../Wrappers/Text/GilroyRegular';
import {images} from '../../assets';
import {styles} from './styles';
import {image_url} from '../../Api/configs';

const UserDetailCard = data => {
  console.log('data--userddd', data);
  console.log('DAta ======>', data?.data?.ride?.user?.userImage);
  return (
    <View style={styles.usernameProfileContainer}>
      <View style={styles.userNameImageContainer}>
        <View style={styles.profileContainer}>
          <Image
            source={
              data?.data?.ride?.user?.userImage
                ? {uri: image_url + data?.data?.ride?.user?.userImage}
                : images.userImage
            }
            style={styles.profileImage}
          />
        </View>
        <View style={styles.userDetailsContainer}>
          <RobotoMedium style={styles.userNameText}>
            {data?.data?.firstName
              ? data?.data?.firstName + ' ' + data?.data?.lastName
              : data?.data?.ride?.user?.firstName
              ? data?.data?.ride?.user?.firstName +
                ' ' +
                data?.data?.ride?.user?.lastName
              : 'Guest User'}
          </RobotoMedium>
          <GilroyRegular style={[styles.userNameText, styles.numberIdText]}>
            {data?.data?.ride?.user?.phone
              ? data?.data?.ride?.user?.phone
              : null}
          </GilroyRegular>
        </View>
      </View>
    </View>
  );
};

export default UserDetailCard;
