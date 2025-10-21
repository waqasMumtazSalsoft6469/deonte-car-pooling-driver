import React, { useState, useRef } from 'react';
import { View, Text, Image, ImageBackground, ScrollView } from 'react-native';
import { icons, images } from '../../../assets';
import TextInput from '../../../components/TextInput';
import styles from './styles';
import TextBold from '../../../components/Wrappers/Text/GilroyBold';
import TextMedium from '../../../components/Wrappers/Text/GilroyMedium';
import TextRegular from '../../../components/Wrappers/Text/GilroyRegular';
import TextRobotoBold from '../../../components/Wrappers/Text/RobotoBold';
import Button from '../../../components/Button';
// import DocumentPicker from 'react-native-document-picker';
import Ripple from '../../../components/Wrappers/Ripple';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImageUpload from '../../../components/ImageUpload';
import { register } from '../../../Redux/Actions/auth';
import { showToast } from '../../../Api/HelperFunction';
import { validateEmail } from '../../../utils/units/validation';
import { useDispatch } from 'react-redux';
import GilroyBold from '../../../components/Wrappers/Text/GilroyBold';
import GilroyRegular from '../../../components/Wrappers/Text/GilroyRegular';
import { pick, pickDocument } from '@react-native-documents/picker';
const Signup = ({ navigation }) => {
  const dispatch = useDispatch();

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const dobRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [license, setLicense] = useState(false);
  const [lat, setLat] = useState(55);
  const [long, setLong] = useState(52);
  // console.log('License ==>', license[0].name);
  const handleSignUp = async () => {
    // navigation.navigate('DrawerNavigator')
    if (firstName == '') {
      return showToast('Enter your First Name');
    }
    if (lastName == '') {
      return showToast('Enter Your Last Name');
    }
    if (email == '') {
      return showToast('Enter your Email');
    }
    if (!validateEmail(email)) {
      return showToast('Enter Valid Email');
    }
    if (phone == '') {
      return showToast('Enter your Phone');
    }
    if (password == '') {
      return showToast('Enter Password');
    }
    // if (license == false) {
    //   return showToast(' Please Upload your license ');
    // }
    if (password != confirmPassword) {
      return showToast('Password Not Match');
    }
    const userImage = {
      name: license[0]?.name,
      type: license[0]?.type,
      uri: license[0]?.uri,
    };

    const body = {
      firstName: firstName,
      lastName: lastName,
      email: email.trim().toLowerCase(),
      password: password,
      phone: phone,
      // user_image: userImage,
      confirmpassword: confirmPassword,
    };
    try {

      console.log('Body ====>', body);
      const response = await dispatch(register(body));
      console.log('Response ======>', response);
      if (response) {
        showToast('You have Successfully Registered');
        navigation.navigate('CreateProfile');
      }

      setFirstName();
      setLastName();
      setEmail();
      setPhoneNumber();
      setPassword();
      setConfirmPassword();
      // setLicense(false);
      // if (response?.message) {
      //   setStep(2);
      //   console.log('Step ==>', step);
      // }
    } catch (err) {
      console.log('Error =======>', err);
      showToast(err);
    }
  };

  // const ImagePick = () => {
  //   pick().then(file => {
  //     console.log(file);
  //     setLicense(file);
  //   });
  // };
  return (
    <View style={styles.container} >
      <View style={styles.headingContainer}>
        <TextBold style={styles.headingText}>Create An Account</TextBold>
        <TextMedium style={styles.grayText}>
          Welcome book you’re been missied.
        </TextMedium>
      </View>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TextInput
            title="First Name*"
            placeholder="Enter First Name"
            onChangeText={setFirstName}
            onSubmitEditing={() => lastNameRef.current.focus()}
            autoFocus={true}
          />
          <TextInput
            title="Last Name*"
            placeholder="Enter Last Name"
            // secureTextEntry
            onChangeText={setLastName}
            reference={lastNameRef}
            onSubmitEditing={() => emailRef.current.focus()}
          />
          <TextInput
            title="Email Address"
            placeholder="Enter Email Address"
            // secureTextEntry
            onChangeText={setEmail}
            reference={emailRef}
            onSubmitEditing={() => dobRef.current.focus()}
          />
          <TextInput
            title="Phone Number*"
            placeholder="Enter Phone Number"
            // secureTextEntry
            onChangeText={setPhoneNumber}
            reference={dobRef}
            onSubmitEditing={() => passwordRef.current.focus()}
            keyboardType={'phone-pad'}
          />
          <TextInput
            title="Password*"
            placeholder="Enter Password"
            // secureTextEntry
            onChangeText={setPassword}
            secureTextEntry={true}
            reference={passwordRef}
            onSubmitEditing={() => confirmPasswordRef.current.focus()}
          />
          <TextInput
            reference={confirmPasswordRef}
            title="Confirm Password*"
            placeholder="Enter Confirm Password"
            // secureTextEntry
            onChangeText={setConfirmPassword}
            secureTextEntry={true}
          />
          {/* <Ripple style={[styles.uploadBox]} onPress={ImagePick}>
            {license?.length > 0 ? (
              <Image source={license[0]} style={styles.image} />
            ) : (
              <View style={{ alignItems: 'center' }}>
                <Image source={icons.uploadIcon} style={styles.uploadIcon} />
                <GilroyBold style={styles.text2}>{'Upload License'}</GilroyBold>
                <GilroyRegular style={styles.text3}>
                  {'PDF, JPG (max 3MB)'}
                </GilroyRegular>
              </View>
            )}
          </Ripple> */}

          {/* <ImageUpload
          title={'Upload License'}
          description={'PDF, JPG (max 3MB)'}
          image={license}
          setImage={setLicense}
          onPress={ImagePick}
        /> */}

          {/* <Ripple style={styles.uploadBox}>
          <Image source={icons.uploadIcon} style={styles.uploadIcon} />
          <TextBold style={styles.text2}>Upload License</TextBold>
          <TextRegular style={styles.text3}>PDF, JPG (max 3MB)</TextRegular>
        </Ripple> */}
          <Button
            style={styles.buttonStyle}
            text="CreateProfile"
            onPress={() => navigation.navigate('CreateProfile')}
          />
          <Button
            style={styles.buttonStyle}
            text="SignUp"
            onPress={handleSignUp}
          />
          <View style={styles.row}>
            <TextBold style={styles.text}>Already have an account?</TextBold>
            <Ripple onPress={() => navigation.navigate('Login')}>
              <TextBold style={[styles.text, styles.blueText]}> Sign In</TextBold>
            </Ripple>
          </View>

        </ScrollView>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Signup;
