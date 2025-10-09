import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from '../screens/auth/Splash.jsx';
import SignIn from './../screens/auth/SignIn';
import SignUp from './../screens/auth/SignUp';
import EnterOtp from './../screens/auth/EnterOtp';
import ForgetPassword from './../screens/auth/ForgetPassword';
import CreateNewPassword from './../screens/auth/CreateNewPassword';

const Stack = createStackNavigator();
const Auth = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="EnterOtp" component={EnterOtp} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="CreateNewPassword" component={CreateNewPassword} />
    </Stack.Navigator>
  );
};

export default Auth;
