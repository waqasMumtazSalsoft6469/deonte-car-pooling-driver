import React, {useEffect} from 'react';
import Navigation from './src/Navigation';
import {
  StatusBar,
  View,
  StyleSheet,
  NativeModules,
  Text,
  Alert,
} from 'react-native';
import {set, withDecay} from 'react-native-reanimated';
import messaging from '@react-native-firebase/messaging';
// import Toast from 'react-native-toast';
import SplashScreen from 'react-native-splash-screen';
// import AnimatedSplash from 'react-native-animated-splash';

const {BackgroundLocation} = NativeModules;

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      console.log('new FCM message arriv', remoteMessage?.notification?.body);

      // Toast.show(remoteMessage?.notification?.body);
    });

    return unsubscribe;
  });



  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        barStyle="dark-content"
        backgroundColor="transparent" //black
      />
      <Navigation />
    </View>
  );
};
export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
