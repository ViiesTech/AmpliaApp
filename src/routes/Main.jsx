import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CustomBottomTabs from './CustomBottomTabs';
import Notification from './../screens/main/Home/Notification';
import ServiceCategories from './../screens/main/Home/ServiceCategories';
import Services from './../screens/main/Home/Services';
import ReviewsAndRatings from './../screens/main/Bookings/ReviewsAndRatings';
import PopularAndOtherServices from './../screens/main/Home/PopularAndOtherServices';
import LiveChat from './../screens/main/Home/LiveChat';

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
      <Stack.Screen name="PopularAndOtherServices" component={PopularAndOtherServices} />
      <Stack.Screen name="LiveChat" component={LiveChat} />
    </Stack.Navigator>
  );
};

const TabBar = () => {
    return <CustomBottomTabs />
}

export default Main;
