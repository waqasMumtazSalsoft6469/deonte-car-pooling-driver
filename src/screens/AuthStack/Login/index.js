import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, ImageBackground, Platform, ScrollView } from 'react-native';
import { images } from '../../../assets';
import TextInput from '../../../components/TextInput';
import styles from './styles';
import TextBold from '../../../components/Wrappers/Text/GilroyBold';
import TextMedium from '../../../components/Wrappers/Text/GilroyMedium';
import TextRobotoBold from '../../../components/Wrappers/Text/RobotoBold';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { validateEmail } from '../../../utils/units/validation';
import Button from '../../../components/Button';
import Ripple from '../../../components/Wrappers/Ripple';
import { showToast } from '../../../Api/HelperFunction';
import { login } from '../../../Redux/Actions/auth';
import { useDispatch } from 'react-redux';
import { requestUserPermission } from '../../../services/NotificationServices';
// import reactNativeEasyPushNotifications from 'react-native-easy-push-notifications';

const Login = props => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('smith@gmail.com');
  const [password, setPassword] = useState('Admin@123');
  const [deviceId, setDeviceId] = useState('');
  const [device_type, setDevice_type] = useState('');
  const [message, setMessage] = useState();
  const passwordRef = useRef(null);
  const steps = {
    loginScreen: 1,
    profileRejected: 2,
  };

  // useEffect(() => {
  //   reactNativeEasyPushNotifications.getDeviceId(id => {
  //     console.log('Id =-==========>', id);
  //     setDeviceId(id);
  //     setDevice_type(Platform?.OS);
  //   });
  // }, []);
  useEffect(() => {
    getFcmToken();
  }, []);

  const getFcmToken = async () => {
    const device_id = await requestUserPermission();
    setDeviceId(device_id);
    console.log('device_id', device_id);
  };

  const loginHandler = async () => {
    if (email == '') {
      return showToast('Enter your Email');
    }
    if (!validateEmail(email)) {
      return showToast('Please Enter Valid Email');
    }
    if (password == '') {
      return showToast('Enter Password');
    }
    const body = {
      email: email.trim().toLowerCase(),
      password: password,
      deviceId: deviceId,
      device_type: Platform?.OS,
    };
    console.log('boydddd', body);
    try {
      const response = await dispatch(login(body));
      console.log('response--->', response);  
      if (response?.token) {
        props.navigation.navigate('DrawerNavigator');
      } else {
        showToast(response?.message);
        setStep(2);
        // setMessage(response?.message);
      }
    } catch (err) {
      showToast(err);
    }
  };

  return (
    <View style={styles.container}>
      <View   style={styles.headingContainer}> 
        <TextBold style={styles.headingText}>Login In</TextBold>
        <TextMedium style={styles.grayText}>
          Enter Your Credentials to login.
        </TextMedium>
      </View>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* <Image source={images.logo} style={styles.carImage} /> */}
          {/* {step == steps.profileRejected && (
          <TextBold style={styles.redText}>{message}</TextBold>
        )} */}
          {/* <TextBold style={styles.headingText}>Welcome back</TextBold>
          <TextMedium style={styles.grayText}>
            Please Login to Continue
          </TextMedium> */}
          <TextInput
            title="Email Address"
            placeholder="Enter Email Address"
            keyboardType="email-address"
            autoFocus={true}
            value={email}
            onChangeText={setEmail}
            onSubmitEditing={() => passwordRef.current.focus()}
          />
          <TextInput
            reference={passwordRef}
            title="Password"
            placeholder="Enter Password"
            secureTextEntry={true}
            onChangeText={setPassword}
            value={password}
          />

          <View style={styles.forgotPasswordContainer}>
            <Ripple onPress={() => props.navigation.navigate('ForgotPassword')}>
              <TextRobotoBold style={styles.forgotPassText}>
                Forgot Password?
              </TextRobotoBold>
            </Ripple>
          </View>

          <Button
            style={styles.buttonStyle}
            text="Login"
            onPress={loginHandler}
          />
          <View style={styles.row}>
            <TextBold style={styles.text}>Don't have an account?</TextBold>
            <Ripple
              onPress={() => {
                props.navigation.navigate('Signup');
              }}>
              <TextBold style={[styles.text, styles.blueText]}> SignUp</TextBold>
            </Ripple>
          </View>
        </ScrollView>

      </KeyboardAwareScrollView>
    </View>
  );
};

export default Login;
