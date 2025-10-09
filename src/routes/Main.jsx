import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/main/Home/Home';
import CustomBottomTabs from './CustomBottomTabs';

const Stack = createStackNavigator();
const Main = () => {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{ headerShown: false }}
    >
      {/* <Stack.Screen name="Home" component={Home} /> */}
      <Stack.Screen name="Main" component={TabBar} />
    </Stack.Navigator>
  );
};

const TabBar = () => {
    return <CustomBottomTabs />
}

export default Main;
