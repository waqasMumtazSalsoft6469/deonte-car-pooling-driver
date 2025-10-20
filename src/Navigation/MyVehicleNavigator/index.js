import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NavigationOptions from '../NavigationOptions';
import MusicListing from '../../screens/DrawerStack/MusicListing';
import MyVehicle from '../../screens/DrawerStack/MyVehicle';
import MyVehicleInformation from '../../screens/DrawerStack/MyVehicleInformation';
import EditVehicleDetails from '../../screens/DrawerStack/EditVehicleDetails';

const Stack = createStackNavigator();

function MyVehicleNavigator() {
    return (
        <Stack.Navigator  screenOptions={NavigationOptions}>
            <Stack.Screen name="MyVehicleInformation" component={MyVehicleInformation} />
            <Stack.Screen name="EditVehicleDetails" component={EditVehicleDetails} />

        </Stack.Navigator>
    );
}
export default MyVehicleNavigator