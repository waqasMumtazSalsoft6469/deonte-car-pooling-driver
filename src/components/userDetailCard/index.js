import React from 'react';
import {Image, View} from 'react-native';
import RobotoMedium from '../Wrappers/Text/RobotoMedium';
import GilroyRegular from '../Wrappers/Text/GilroyRegular';
import {images} from '../../assets';
import {styles} from './styles';
import {image_url} from '../../Api/configs';

const UserDetailCard = data => {
  // Handle multiple data structure formats:
  // 1. data.data.ride.user (nested structure)
  // 2. data.data.user (direct structure)
  // 3. data.ride.user (if passed directly)
  // 4. data.user (if passed directly)
  // 5. data.data (if user object is passed directly)
  // 6. data (if user object is passed directly)
  const userData = data?.data?.ride?.user || 
                   data?.data?.user || 
                   data?.ride?.user || 
                   data?.user ||
                   data?.data ||
                   data;
  
  console.log('[UserDetailCard] 📍 Full data received:', JSON.stringify(data, null, 2));
  console.log('[UserDetailCard] 📍 Extracted userData:', JSON.stringify(userData, null, 2));
  
  // Get user image from multiple possible locations
  const userImage = userData?.userImage || 
                    userData?.image || 
                    userData?.profileImage ||
                    data?.data?.ride?.user?.userImage ||
                    data?.data?.userImage;
  
  // Get user name from multiple possible locations
  const firstName = userData?.firstName || 
                    data?.data?.firstName ||
                    data?.firstName;
  const lastName = userData?.lastName || 
                   data?.data?.lastName ||
                   data?.lastName;
  
  // Get phone from multiple possible locations
  const phone = userData?.phone || 
                data?.data?.ride?.user?.phone ||
                data?.data?.phone ||
                data?.phone;
  
  // Construct full name
  const fullName = firstName && lastName
    ? `${firstName} ${lastName}`
    : firstName || lastName || 'Guest User';
  
  // Construct image source
  const imageSource = userImage && image_url
    ? {uri: `${image_url}${userImage}`}
    : images.userImage;
  
  return (
    <View style={styles.usernameProfileContainer}>
      <View style={styles.userNameImageContainer}>
        <View style={styles.profileContainer}>
          <Image
            source={imageSource}
            style={styles.profileImage}
            defaultSource={images.userImage}
            onError={() => {
              console.warn('[UserDetailCard] ⚠️ Failed to load user image, using default');
            }}
          />
        </View>
        <View style={styles.userDetailsContainer}>
          <RobotoMedium style={styles.userNameText}>
            {fullName}
          </RobotoMedium>
          {phone && (
            <GilroyRegular style={[styles.userNameText, styles.numberIdText]}>
              {phone}
            </GilroyRegular>
          )}
        </View>
      </View>
    </View>
  );
};

export default UserDetailCard;
