import React from 'react';
import {
  Image,
  ImageBackground,
  Linking,
  Platform,
  Text,
  TouchableOpacity,
} from 'react-native';
import {images} from '../../../assets';
import styles from './styles';
import TextBold from '../../../components/Wrappers/Text/GilroyBold';
import TextLight from '../../../components/Wrappers/Text/GilroyLight';
import Button from '../../../components/Button';
import vw from '../../../utils/units/vw';
import LinearGradient from 'react-native-linear-gradient';
import LemonBold from '../../../components/Wrappers/Text/LemonBold';
import CalibryLight from '../../../components/Wrappers/Text/CalibryLight';
import vh from '../../../utils/units/vh';

const Welcome = props => {
  // const handlePassengerApp = () => {
  //   if (Platform.OS == 'android') {
  //     Linking.openURL('https://play.google.com/store/games?pli=1');
  //   } else {
  //     Linking.openURL('https://apps.apple.com/us/app/');
  //   }
  // };

  return (
    <ImageBackground style={styles.container} source={images.welcomeImage}>
      <Image source={images.logo} style={styles.logo} />

      <LinearGradient
        style={styles.gradiantStyles}
        colors={[
          '#ffffff00',
          '#ffffff00',
          '#ffffff00',

          '#0000008c',
          '#0000008c',
          '#000000b0',
        ]}>
        <LemonBold style={styles.headingText}>More Than Just A Ride</LemonBold>
        <LemonBold
          style={[styles.headingText, {fontSize: vh * 2, color: '#b80202'}]}>
          It's An Experience
        </LemonBold>

        <CalibryLight style={styles.text}>
          As a driver we must we must present ourselves, in a professional and
          caring manner. Always remember, we set the tone for the ride...
        </CalibryLight>
        <Button
          style={styles.button}
          text="Get Started"
          onPress={() => props.navigation.navigate('Login')}
        />
      </LinearGradient>

      {/* <TouchableOpacity onPress={handlePassengerApp}>
        <TextBold style={styles.bottomText}>
          Need a ride ?{' '}
          <Text style={{textDecorationLine: 'underline'}}>
            Open the passenger app
          </Text>
        </TextBold>
      </TouchableOpacity> */}
    </ImageBackground>
  );
};

export default Welcome;
