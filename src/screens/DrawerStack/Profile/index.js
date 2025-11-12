import React, {useCallback, useState} from 'react';
import {View, Image, TouchableOpacity, ScrollView} from 'react-native';
import {icons, images} from '../../../assets';
import {styles} from './styles';
import GilroyMedium from '../../../components/Wrappers/Text/GilroyMedium';
import Button from '../../../components/Button';
import GilroyBold from '../../../components/Wrappers/Text/GilroyBold';
import {useFocusEffect} from '@react-navigation/native';
import {getProfile} from '../../../Redux/Actions/auth';
import {useDispatch, useSelector} from 'react-redux';
import {image_url} from '../../../Api/configs';
const Card = ({image, text}) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={image} style={styles.icon} />
      <GilroyMedium style={styles.cardText}>{text}</GilroyMedium>
    </View>
  );
};
const Profile = ({navigation}) => {
  const dispatch = useDispatch();
  const [deatils, setDetails] = useState();
  // console.log('Details ==>', deatils);
  const id = useSelector(state => state.UserReducer.userData._id);
  console.log('Id  ==>', id);
  const getData = async () => {
    try {
      const response = await dispatch(getProfile(id));
      console.log('Response from getProfile Data  ==>', response);
      setDetails(response?.driver);
    } catch (err) {
      // console.log('Error ==>', err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );
  // Get user's full name or default
  const fullName =
    deatils?.firstName || deatils?.lastName
      ? `${deatils?.firstName || ''} ${deatils?.lastName || ''}`.trim()
      : 'User';

  // Determine image source - separate URI from dummy image
  const userImageUri = deatils?.userImage
    ? image_url + deatils.userImage
    : null;
  const hasValidImage = userImageUri && userImageUri.trim() !== '';
  
  // Dummy/placeholder image - local asset
  const dummyImageSource = images.userProfileImage;
  
  // Image source: use URI if valid, otherwise use dummy image
  const imageSource = hasValidImage
    ? {uri: userImageUri}
    : dummyImageSource;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}>
      <View style={styles.ProfileImageContainer}>
        <Image
          source={imageSource}
          style={styles.profileImage}
          defaultSource={dummyImageSource}
          onError={() => {
            // If image fails to load, it will use defaultSource (dummy image)
            console.log('Profile image failed to load, using dummy image');
          }}
        />
      </View>
      <GilroyMedium style={styles.nameStyle}>{fullName}</GilroyMedium>
      {deatils?.email && <Card image={icons.mail} text={deatils.email} />}
      {deatils?.phone && <Card image={icons.phone} text={deatils.phone} />}
      <TouchableOpacity
        style={styles.changePasswordContainer}
        onPress={() => navigation.navigate('ChangePassword')}>
        <Image source={icons.passwordLock} style={styles.passwordLockIcon} />
        <GilroyBold style={styles.changePasswordText}>
          Change Password
        </GilroyBold>
      </TouchableOpacity>
      <Button
        text="Edit Profile"
        style={styles.buttonStyle}
        textStyle={styles.buttonText}
        onPress={() => navigation.navigate('EditProfile', {data: deatils})}
      />
    </ScrollView>
  );
};

export default Profile;
