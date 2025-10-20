import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NavigationOptions from '../NavigationOptions';

import ContactUs from '../../screens/DrawerStack/ContactUs';

const ContactStack = createStackNavigator();

function ContactUsNavigator() {
    return (
        <ContactStack.Navigator initialRouteName='Welcome' screenOptions={NavigationOptions}>
            <ContactStack.Screen name="ContactUs" component={ContactUs} />
        </ContactStack.Navigator>
    );
}
export default ContactUsNavigator