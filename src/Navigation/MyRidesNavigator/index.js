import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import NavigationOptions from '../NavigationOptions';
import MyRides from '../../screens/DrawerStack/MyRides';
import RideDetails from '../../screens/DrawerStack/RideDetails';
import RidesRequest from '../../screens/DrawerStack/RidesRequest';

const RidesStack = createStackNavigator();

function MyRidesNavigator() {
  return (
    <RidesStack.Navigator
      initialRouteName="Welcome"
      screenOptions={NavigationOptions}>
      <RidesStack.Screen name="MyRides" component={MyRides} />
      <RidesStack.Screen
        name="RideDetails"
        component={RideDetails}
        options={{headerTransparent: true}}
      />
    </RidesStack.Navigator>
  );
}
export default MyRidesNavigator;
