import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CustomBottomTabs from './CustomBottomTabs';
import Notification from './../screens/main/Home/Notification';
import ServiceCategories from './../screens/main/Home/ServiceCategories';
import Services from './../screens/main/Home/Services';
import ReviewsAndRatings from './../screens/main/Bookings/ReviewsAndRatings';
import PopularAndOtherServices from './../screens/main/Home/PopularAndOtherServices';
import LiveChat from './../screens/main/Home/LiveChat';
import ServiceDetails from './../screens/main/Home/ServiceDetails';
import Payment from './../screens/main/Home/Payment';
import ScheduleService from './../screens/main/Home/ScheduleService';
import MyAccount from './../screens/main/MyProfile/MyAccount';
import ChangePassword from './../screens/main/MyProfile/ChangePassword';
import PrivacyPolicy from './../screens/main/MyProfile/PrivacyPolicy';
import TermsCondition from './../screens/main/MyProfile/TermsCondition';
import HelpAndFeedback from './../screens/main/MyProfile/HelpAndFeedback';
import EmailUs from './../screens/main/MyProfile/EmailUs';
import BillingHistory from './../screens/main/MyProfile/BillingHistory';
import Faqs from './../screens/main/MyProfile/Faqs';
import BookingChat from './../screens/main/Bookings/BookingChat';
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
      <Stack.Screen name="ServiceCategories" component={ServiceCategories} />
      <Stack.Screen name="Services" component={Services} />
      <Stack.Screen name="ReviewsAndRatings" component={ReviewsAndRatings} />
      <Stack.Screen
        name="PopularAndOtherServices"
        component={PopularAndOtherServices}
      />
      <Stack.Screen name="LiveChat" component={LiveChat} />
      <Stack.Screen name="ServiceDetails" component={ServiceDetails} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="ScheduleService" component={ScheduleService} />
      <Stack.Screen name="MyAccount" component={MyAccount} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="TermsCondition" component={TermsCondition} />
      <Stack.Screen name="HelpAndFeedback" component={HelpAndFeedback} />
      <Stack.Screen name="EmailUs" component={EmailUs} />
      <Stack.Screen name="BillingHistory" component={BillingHistory} />
      <Stack.Screen name="Faqs" component={Faqs} />
      <Stack.Screen name="BookingChat" component={BookingChat} />
    </Stack.Navigator>
  );
};

const TabBar = () => {
  return <CustomBottomTabs />;
};

export default Main;
