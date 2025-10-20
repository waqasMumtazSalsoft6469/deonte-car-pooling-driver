import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NavigationOptions from '../NavigationOptions';
import MusicListing from '../../screens/DrawerStack/MusicListing';
import AddSongScreen from '../../screens/DrawerStack/AddSongScreen';

const Stack = createStackNavigator();

function PlayListNavigator() {
    return (
        <Stack.Navigator  screenOptions={NavigationOptions}>
            <Stack.Screen name="MusicListing" component={MusicListing} />
            <Stack.Screen name="AddSongScreen" component={AddSongScreen} />
        </Stack.Navigator>
    );
}
export default PlayListNavigator