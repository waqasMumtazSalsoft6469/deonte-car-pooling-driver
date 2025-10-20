import React, {useRef, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {icons, images} from '../../../assets';
import {styles} from './styles';
import GeneralModal from '../../../popups/GeneralModal';
import GilroyMedium from '../../../components/Wrappers/Text/GilroyMedium';
import Button from '../../../components/Button';
import GilroyBold from '../../../components/Wrappers/Text/GilroyBold';
import TextInput from '../../../components/TextInput';
import Touchable from '../../../components/Wrappers/Touchable';
import vh from '../../../utils/units/vh';
import ImagePicker from '../../../components/ImagePicker';
import {useDispatch, useSelector} from 'react-redux';
import {showToast} from '../../../Api/HelperFunction';
import {updateProfile} from '../../../Redux/Actions/auth';
import {image_url} from '../../../Api/configs';

// vh
const Card = ({image, text}) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={image} style={styles.icon} />
      <GilroyMedium style={styles.cardText}>{text}</GilroyMedium>
    </View>
  );
};
const EditProfile = ({navigation,route}) => {

  // console.log("Route =======<> ===============================================================  ", route?.params?.deatils?.userImage);
  const dispatch = useDispatch();
  const pickerRef = useRef();
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const phoneNumberRef = useRef(null);

  const profile = useSelector(state => state.UserReducer.userData);
  const profileUpdateRef = useRef();
  const [image, setImage] = useState(route?.params?.deatils?.userImage ? route?.params?.deatils?.userImage : null);
  const imagePickerHandler = async response => {
    setImage(response[0])
  };

  const [firstName, setFirstName] = useState(profile?.firstName);
  const [lastName, setLastName] = useState(
    profile?.lastName ? profile?.lastName : '',
  );
  const [phone, setPhone] = useState(profile?.phone ? profile?.phone : '');
  const [email, setEmail] = useState(profile?.email ? profile?.email : '');
  const [imagePicker, setImagePicker] = useState(false);
  const handleUpdateBtn = async () => {
    if (firstName == '') {
      return showToast('Enter Your FirstName');
    }
    if (lastName == '') {
      return showToast('Enter Your LastName');
    }
    if (phone == '') {
      return showToast('Enter Your Contact Number');
    }
    if (!image) {
      return showToast('please Upload Your Profile picture');
    }
 
    // console.log('Image ==>', image);


    let userImage = null
    if(image?.uri){
   userImage = {
      name: image?.fileName,
      type: image?.type,
      uri: image?.uri,
    };
  }

    const body = {
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      // user_image: userImage,
    };
    if(userImage){
body['user_image'] = userImage
    }
    try {
      const response = await dispatch(updateProfile(body));
      showToast('Profile Updated Succesfully');
      navigation.goBack();
    } catch (err) {
      showToast(err);
    }
  };

  return (
    <View style={styles.container}>
      {image ? (
        <Touchable
          onPress={() => pickerRef.current.show()}
          style={styles.profileImagecontainer}>
          <Image source={{uri: image?.uri ? image?.uri : image_url + image }} style={styles.profileImageUser} />
        </Touchable>
      ) : (
        <View>
          <Image source={images.userImage} style={styles.profileImage} />
          <Touchable
            style={styles.cameraContainerStyle}
            onPress={() => pickerRef.current.show()}
            >
            <Image source={icons.cameraIcon} style={styles.cameraIconStyle} />
          </Touchable>
        </View>
      )}
      <ImagePicker
        ref={pickerRef}
        handleOnSelectImage={imagePickerHandler}
        selectionLimit={0}
        imageSource={image_url + image}
      />
      <TextInput
        title="First Name*"
        labelStyle={styles.inputLabel2}
        placeholder="First Name"
        textInputContainer={styles.inputStyle}
        inputStyle={styles.input2Style}
        parentContainerStyle={styles.inputParentContainerStyle}
        onChangeText={setFirstName}
        value={firstName}
        autoFocus={true}
        onSubmitEditing={() => lastNameRef.current.focus()}

      />
      <TextInput
        reference={lastNameRef}
        title="Last Name*"
        labelStyle={styles.inputLabel2}
        placeholder="Last Name*"
        textInputContainer={styles.inputStyle}
        inputStyle={styles.input2Style}
        parentContainerStyle={styles.inputParentContainerStyle}
        onChangeText={setLastName}
        value={lastName}
        onSubmitEditing={() => phoneNumberRef.current.focus()}

      />
      <TextInput
        reference={phoneNumberRef}
        title="Phone Number*"
        labelStyle={styles.inputLabel2}
        placeholder="Phone Number*"
        textInputContainer={styles.inputStyle}
        inputStyle={styles.input2Style}
        parentContainerStyle={styles.inputParentContainerStyle}
        onChangeText={setPhone}
        value={phone}
        keyboardType={'phone-pad'}
      />
      <Card image={icons.mail} text={email} />
      <Button
        text="Update"
        onPress={() => handleUpdateBtn()}
        style={styles.buttonStyle}
        textStyle={styles.buttonText}
      />
      <GeneralModal //screen 7
        reference={profileUpdateRef}
        icon={icons.tickModal}
        text2={'Profile updated successfully'}
        text2Style={{height: null, fontSize: 1.8 * vh}}
        smallMainIconStyle
      />
    </View>
  );
};

export default EditProfile;
