import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../../screens/AuthStack/Login';
import Welcome from '../../screens/AuthStack/Welcome';
import Signup from '../../screens/AuthStack/Signup';
import ForgotPassword from '../../screens/AuthStack/ForgotPassword';

const AuthStack = createStackNavigator();

function AuthNavigator() {
    return (
        <AuthStack.Navigator initialRouteName='Login' screenOptions={{headerShown:false}}>
            {/* <AuthStack.Screen name="Welcome" component={Welcome} /> */}
            <AuthStack.Screen name="Login" component={Login} />
            <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
            <AuthStack.Screen name="Signup" component={Signup} />
        </AuthStack.Navigator>
    );
}
export default AuthNavigator