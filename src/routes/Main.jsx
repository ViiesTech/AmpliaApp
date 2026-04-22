import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CustomBottomTabs from './CustomBottomTabs';
import Notification from './../screens/main/Home/Notification';
import Payment from './../screens/main/Home/Payment';
import MyAccount from './../screens/main/MyProfile/MyAccount';
import ChangePassword from './../screens/main/MyProfile/ChangePassword';
import PrivacyPolicy from './../screens/main/MyProfile/PrivacyPolicy';
import TermsCondition from './../screens/main/MyProfile/TermsCondition';
import HelpAndFeedback from './../screens/main/MyProfile/HelpAndFeedback';
import EmailUs from './../screens/main/MyProfile/EmailUs';
import BillingHistory from './../screens/main/MyProfile/BillingHistory';
import Faqs from './../screens/main/MyProfile/Faqs';
import Calculator from './../screens/main/Calculator/Calculator';
import { View } from 'react-native';
import { AppColors } from '../utils';

const Stack = createStackNavigator();
const Main = () => {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{ headerShown: false }}
    >
      {/* <Stack.Screen name="Home" component={Home} /> */}
      <Stack.Screen name="Main" component={TabBar} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="MyAccount" component={MyAccount} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="TermsCondition" component={TermsCondition} />
      <Stack.Screen name="HelpAndFeedback" component={HelpAndFeedback} />
      <Stack.Screen name="EmailUs" component={EmailUs} />
      <Stack.Screen name="BillingHistory" component={BillingHistory} />
      <Stack.Screen name="Faqs" component={Faqs} />
      <Stack.Screen name="Calculator" component={Calculator} />
    </Stack.Navigator>
  );
};

const TabBar = () => {
  return <CustomBottomTabs />;
};

export default Main;
