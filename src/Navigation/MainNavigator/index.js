import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AuthNavigator from '../AuthNavigator';
import DrawerNavigator from '../DrawerNavigator';
import {useDispatch, useSelector} from 'react-redux';
// import reactNativeEasyPushNotifications from 'react-native-easy-push-notifications';
// import actionTypes from '../../Redux/Actions/actionTypes';

const MainStack = createStackNavigator();

function MainNavigator() {
  const dispatch = useDispatch();
  const token = useSelector(state => state.SessionReducer.token);
  console.log('Token  ==>', token);
  useEffect(() => {
    // if (token) {
    //   reactNativeEasyPushNotifications.onMessageReceived(notif => {
    //     if (notif?.id) {
    //       dispatch({
    //         type: 'Ride_ID',
    //         currentRideId: notif?.id,
    //       });
    //     }
    //   });
    // }
  }, []);
  return (
    <MainStack.Navigator screenOptions={{headerShown: false}}>
      {token ? (
        <MainStack.Screen name="DrawerNavigator" component={DrawerNavigator} />
      ) : (
        <MainStack.Screen name="AuthNavigator" component={AuthNavigator} />
      )}
    </MainStack.Navigator>
  );
}
export default MainNavigator;
