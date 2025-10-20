import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NavigationOptions from '../NavigationOptions';
import RatingAndReviews from '../../screens/DrawerStack/RatingAndReviews';

const Stack = createStackNavigator();

function RatingNavigator() {
    return (
        <Stack.Navigator  screenOptions={NavigationOptions}>
            <Stack.Screen name="RatingAndReviews" component={RatingAndReviews} options={{headerTransparent: true}}/>
        </Stack.Navigator>
    );
}
export default RatingNavigator