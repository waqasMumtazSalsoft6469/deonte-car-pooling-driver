import React, {useCallback, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {icons, images} from '../../../assets';
import {styles} from './styles';
import GilroyMedium from '../../../components/Wrappers/Text/GilroyMedium';
import Button from '../../../components/Button';
import GilroyBold from '../../../components/Wrappers/Text/GilroyBold';
import {useFocusEffect} from '@react-navigation/native';
import {
  getLocalizedString,
  getLocale,
  getTranslatedMessage,
} from '../../../Translations';
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
  const [changePasswordModal, setChangePasswordModal] = useState(false);
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
    }, []),
  );
  return (
    <View style={styles.container}>
      <View style={styles.ProfileImageContainer}>
        <Image
          source={{uri: image_url + deatils?.userImage}}
          style={styles.profileImage}
        />
        {/* <Image source={{uri images.userImage}} style={styles.profileImage} /> */}
      </View>
      <GilroyMedium style={styles.nameStyle}>
        {deatils?.firstName + ' ' + deatils?.lastName}
      </GilroyMedium>
      <Card image={icons.mail} text={deatils?.email} />

      <Card image={icons.phone} text={deatils?.phone} />
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
        onPress={() => navigation.navigate('EditProfile', (data = {deatils}))}
      />
    </View>
  );
};

export default Profile;
