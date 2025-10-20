import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NavigationOptions from '../NavigationOptions';
import Home from '../../screens/DrawerStack/Home';
import Notifications from '../../screens/DrawerStack/Notifications';
import MyVehicle from '../../screens/DrawerStack/MyVehicle';
import RegisterVehicle from '../../screens/DrawerStack/RegisterVehicle';
import TripRequest from '../../screens/DrawerStack/TripRequest';
import TripAccept from '../../screens/DrawerStack/TripAccept';
import Chat from '../../screens/DrawerStack/ChatScreen';
import RideStarted from '../../screens/DrawerStack/RideStarted';

const HomeStack = createStackNavigator();

function HomeNavigator() {
    return (
        <HomeStack.Navigator initialRouteName='Home'  screenOptions={NavigationOptions}>
            <HomeStack.Screen name="Home" component={Home} options={{headerTransparent: true}}/>
            <HomeStack.Screen name="MyVehicle" component={MyVehicle} options={{headerTransparent: true}}/>
            <HomeStack.Screen name="RegisterVehicle" component={RegisterVehicle} options={{headerTransparent: true}}/>
            <HomeStack.Screen name="Notifications" component={Notifications} />
            <HomeStack.Screen name="TripRequest" component={TripRequest} options={{headerTransparent: true}}/>
            <HomeStack.Screen name="TripAccept" component={TripAccept} options={{headerTransparent: true}}/>
            <HomeStack.Screen name="Chat" component={Chat} options={{headerTransparent: true}}/>
            <HomeStack.Screen name="RideStarted" component={RideStarted} options={{headerTransparent: true}}/>
        </HomeStack.Navigator>
    );
}
export default HomeNavigator