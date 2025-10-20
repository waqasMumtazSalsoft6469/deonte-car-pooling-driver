import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NavigationOptions from '../NavigationOptions';
import Profile from '../../screens/DrawerStack/Profile';
import EditProfile from '../../screens/DrawerStack/EditProfile';
import ChangePassword from '../../screens/DrawerStack/ChangePassword';

const ProfileStack = createStackNavigator();

function ProfileNavigator() {
    return (
        <ProfileStack.Navigator  screenOptions={NavigationOptions}>
            <ProfileStack.Screen name="Profile" component={Profile} options={{headerTransparent: true}}/>
            <ProfileStack.Screen name="EditProfile" component={EditProfile} options={{headerTransparent: true}}/>
            <ProfileStack.Screen name="ChangePassword" component={ChangePassword} options={{headerTransparent: true}}/>

        </ProfileStack.Navigator>
    );
}
export default ProfileNavigator