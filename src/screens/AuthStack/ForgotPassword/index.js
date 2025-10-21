import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  LayoutAnimation,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { images } from '../../../assets';
import TextInput from '../../../components/TextInput';
import styles from './styles';
import TextBold from '../../../components/Wrappers/Text/GilroyBold';
import TextMedium from '../../../components/Wrappers/Text/GilroyMedium';
import TextRobotoBold from '../../../components/Wrappers/Text/RobotoBold';
import Button from '../../../components/Button';
import Ripple from '../../../components/Wrappers/Ripple';
import {
  resetPassword,
  setPasswordAction,
  verifyCode,
} from '../../../Redux/Actions/auth';
import { validateEmail } from '../../../utils/units/validation';

import { useDispatch } from 'react-redux';
import { showToast } from '../../../Api/HelperFunction';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import {show} from 'react-native-toast';

const ForgotPass = props => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [cnfrmPassword, setCnfrmPassword] = useState('');
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const steps = {
    step1: 1,
    step2: 2,
    step3: 3,
  };
  const handleEmail = async () => {
    if (step < 3) {
      if (email == '') {
        return showToast('Enter your Email');
      }
      if (!validateEmail(email)) {
        return showToast('Enter valid Email');
      }
      const body = {
        email: email.trim().toLowerCase(),
      };

      try {
        const response = await dispatch(resetPassword(body));
        if (response) {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
          setStep(step + 1);
        }
      } catch (err) {
        showToast(err);
      }

      //   if (verificationCode == '') {
      //     showToast('Enter Verification Code');
      //   }

      //   // } else {
      //   //   props.navigation.navigate('Login');
    }
  };
  const resendCode = async () => {
    if (step < 3) {
      if (email == '') {
        return showToast('Enter your Email');
      }
      if (!validateEmail(email)) {
        return showToast('Enter valid Email');
      }
      const body = {
        email: email.trim().toLowerCase(),
      };

      try {
        const response = await dispatch(resetPassword(body));
        if (response) {
          showToast(response?.message)
        }
        console.log("Response from forget Pass= ====>", response);
      } catch (err) {
        showToast(err);
      }

      //   if (verificationCode == '') {
      //     showToast('Enter Verification Code');
      //   }

      //   // } else {
      //   //   props.navigation.navigate('Login');
    }
  };
  const handleVerificationCode = async () => {
    if (verificationCode == '') {
      showToast('Enter Verification Code');
    }
    const body = {
      code: verificationCode,
      email: email,
    };

    try {
      const response = await dispatch(verifyCode(body));
      if (response) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
        setStep(step + 1);
      }
    } catch (err) {
      showToast(err);
    }
  };
  const handleResetPasword = async () => {
    if (newPassword == '') {
      return showToast('Please Enter new Password');
    }
    if (cnfrmPassword == '') {
      return showToast('Please Re-enter Password');
    }

    if (newPassword != cnfrmPassword) {
      return showToast('Password Not Match');
    }
    const body = {
      password: newPassword,
      confirm_password: cnfrmPassword,
      code: verificationCode,
      email: email,
    };
    try {
      const response = await dispatch(setPasswordAction(body));
      if (response) {

        props.navigation.navigate('Login');
      }
    } catch (err) {
      showToast(err);
    }
  };

  const renderSteps = () => {
    switch (step) {
      case steps.step1:
        return (
          <View style={{ alignItems: 'center' }}>
            <TextMedium style={styles.grayText}>
              Please Enter Your Email Address to Continue
            </TextMedium>
            <TextInput
              title="Email Address*"
              placeholder="Enter Email Address"
              onChangeText={setEmail}
            />
            <Button
              style={styles.buttonStyle}
              text="Continue"
              onPress={() => {
                handleEmail();
              }}
            />
            <View style={styles.row}>
              <Ripple
                onPress={() => {
                  props.navigation.navigate('Login');
                }}>
                <TextBold style={[styles.text, styles.blueText]}>
                  Back to Login
                </TextBold>
              </Ripple>
            </View>
          </View>
        );
      case steps.step2:
        return (
          <View style={{ alignItems: 'center' }}>
            <TextMedium style={styles.grayText}>
              Please Enter Code Sent To Your Email
            </TextMedium>
            <TextInput
              title="Verification Code*"
              placeholder="Enter Verification Code"
              onChangeText={setVerificationCode}
              rightView={() => (
                <View style={styles.marginRight}>
                  <TouchableOpacity
                    onPress={() => {
                      resendCode();
                    }}>
                    <TextBold style={styles.blueText}>RESEND CODE</TextBold>
                  </TouchableOpacity>
                </View>
              )}
            // secureTextEntry
            />
            <Button
              style={styles.buttonStyle}
              text="Continue"
              onPress={() => {
                handleVerificationCode();
              }}
            />
            <View style={styles.row}>
              <Ripple
                onPress={() => {
                  props.navigation.navigate('Login');
                }}>
                <TextBold style={[styles.text, styles.blueText]}>
                  Back to Login
                </TextBold>
              </Ripple>
            </View>
          </View>
        );
      case steps.step3:
        return (
          <View style={{ alignItems: 'center' }}>
            <TextInput
              title="New Password*"
              placeholder="Enter New Password"
              onChangeText={setNewPassword}
              autoFocus={true}
              onSubmitEditing={() => confirmPasswordRef.current.focus()}
              secureTextEntry={true}


            />
            <TextInput
              title="Confirm Password*"
              placeholder="Enter Confirm Password"
              onChangeText={setCnfrmPassword}
              reference={confirmPasswordRef}
              secureTextEntry={true}


            />
            <Button
              style={styles.buttonStyle}
              text="Update"
              onPress={() => {
                handleResetPasword();
              }}
            />
            <View style={styles.row}>
              <Ripple
                onPress={() => {
                  props.navigation.navigate('Login');
                }}>
                <TextBold style={[styles.text, styles.blueText]}>
                  Back to Login
                </TextBold>
              </Ripple>
            </View>
          </View>
        );
      default:
        return null;
    }
  };
  return (
    <View style={styles.container}>
      {/* <View style={{alignItems: 'center'}}> */}
      {/* <Image source={images.logo} style={styles.carImage} /> */}
      {/* <TextBold style={styles.headingText}>Password Recovery</TextBold> */}
      {/* </View> */}
      <View style={styles.headingContainer}>
        <TextBold style={styles.headingText}>Forgot Password</TextBold>
        <TextMedium style={styles.grayText}>
          Enter Your Email Address to Continue
        </TextMedium>
      </View>

      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderSteps()}
        </ScrollView>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default ForgotPass;
