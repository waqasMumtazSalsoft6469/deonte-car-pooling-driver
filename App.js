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


// import {set, withDecay} from 'react-native-reanimated';
// Messaging guarded to avoid init crash when Firebase app isn't configured
// import Toast from 'react-native-toast';
import Toast from 'react-native-toast-message';
import SplashScreen from 'react-native-splash-screen';
// import AnimatedSplash from 'react-native-animated-splash';

const {BackgroundLocation} = NativeModules;
const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
    let unsubscribe = () => {};
    (async () => {
      try {
        const messaging = (await import('@react-native-firebase/messaging')).default;
        unsubscribe = messaging().onMessage(async remoteMessage => {
          console.log('new FCM message arriv', remoteMessage?.notification?.body);
        });
      } catch (e) {
        if (__DEV__) {
          console.warn('FCM disabled: Firebase not initialized');
        }
      }
    })();

    return () => {
      try { unsubscribe && unsubscribe(); } catch {}
    };
  });



  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        barStyle="dark-content"
        backgroundColor="transparent" //black
      />
      <Navigation />
      <Toast 
        config={{
          success: (props) => (
            <View style={{
              height: 60,
              width: '90%',
              backgroundColor: '#000000',
              borderRadius: 10,
              paddingHorizontal: 15,
              paddingVertical: 10,
              flexDirection: 'row',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}>
              <Text style={{
                color: '#FFFFFF',
                fontSize: 14,
                fontWeight: '500',
                flex: 1,
              }}>
                {props.text1}
              </Text>
            </View>
          ),
          error: (props) => (
            <View style={{
              height: 60,
              width: '90%',
              backgroundColor: '#000000',
              borderRadius: 10,
              paddingHorizontal: 15,
              paddingVertical: 10,
              flexDirection: 'row',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}>
              <Text style={{
                color: '#FFFFFF',
                fontSize: 14,
                fontWeight: '500',
                flex: 1,
              }}>
                {props.text1}
              </Text>
            </View>
          ),
          info: (props) => (
            <View style={{
              height: 60,
              width: '90%',
              backgroundColor: '#000000',
              borderRadius: 10,
              paddingHorizontal: 15,
              paddingVertical: 10,
              flexDirection: 'row',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}>
              <Text style={{
                color: '#FFFFFF',
                fontSize: 14,
                fontWeight: '500',
                flex: 1,
              }}>
                {props.text1}
              </Text>
            </View>
          ),
          warning: (props) => (
            <View style={{
              height: 60,
              width: '90%',
              backgroundColor: '#000000',
              borderRadius: 10,
              paddingHorizontal: 15,
              paddingVertical: 10,
              flexDirection: 'row',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}>
              <Text style={{
                color: '#FFFFFF',
                fontSize: 14,
                fontWeight: '500',
                flex: 1,
              }}>
                {props.text1}
              </Text>
            </View>
          ),
        }}
      />
    </View>
  );
};
export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
