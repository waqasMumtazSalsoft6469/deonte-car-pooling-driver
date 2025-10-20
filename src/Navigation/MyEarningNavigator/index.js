import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NavigationOptions from '../NavigationOptions';
import MyEarnings from '../../screens/DrawerStack/MyEarnings';
import MyEarningDetails from '../../screens/DrawerStack/MyEarningDetails';



const EarningStack = createStackNavigator();

function MyEarningsNavigator() {
    return (
        <EarningStack.Navigator screenOptions={NavigationOptions}>
            <EarningStack.Screen name="MyEarnings" component={MyEarnings} />
            <EarningStack.Screen name="MyEarningDetails" component={MyEarningDetails} options={{headerTransparent: true}}/>
        </EarningStack.Navigator>
    );
}
export default MyEarningsNavigator