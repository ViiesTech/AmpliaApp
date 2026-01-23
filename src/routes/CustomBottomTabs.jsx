/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  AppColors,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../utils';
import Home from '../screens/main/Home/Home';
import BookingsScreens from './../screens/main/Bookings/BookingsScreens';
import Calculator from './../screens/main/Calculator/Calculator';
import MyFiles from './../screens/main/MyFiles/MyFiles';
import MyProfile from './../screens/main/MyProfile/MyProfile';
import { AppIcons } from '../assets/icons';

const Tab = createBottomTabNavigator();

const screens = [
  { name: 'Home', getIcon: AppIcons.home_tab },
  { name: 'Calculator', getIcon: AppIcons.calculator_tab },
  { name: 'Bookings', getIcon: AppIcons.booking_tab },
  { name: 'My Files', getIcon: AppIcons.files_tab },
  { name: 'Profile', getIcon: AppIcons.profile_tab },
];

const DummyScreen = ({ route }) => {
  switch (route.name) {
    case 'Home':
      return <Home />;
    case 'Calculator':
      return <Calculator />;
    case 'Bookings':
      return <BookingsScreens />;
    case 'My Files':
      return <MyFiles />;
    case 'Profile':
      return <MyProfile />;
    default:
      return null;
  }
};

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        const getIcon = screens[index].getIcon;
        const iconColor = isFocused ? '#fff' : '#A0AEB8';

        return (
          <TouchableOpacity
            key={label}
            accessibilityRole="button"
            onPress={() => navigation.navigate(route.name)}
            style={styles.tabButton}
            activeOpacity={0.9}
          >
            {isFocused ? (
              <View style={styles.activeTab}>
                <SvgXml xml={getIcon(iconColor)} width={20} height={20} />
                <Text style={styles.activeText}>{label}</Text>
              </View>
            ) : (
              <View style={styles.inactiveTab}>
                <SvgXml xml={getIcon(iconColor)} width={20} height={20} />
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default function CustomBottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={props => <CustomTabBar {...props} />}
    >
      {screens.map(s => (
        <Tab.Screen key={s.name} name={s.name} component={DummyScreen} />
      ))}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#E6EBED',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: responsiveWidth(3),
    paddingHorizontal: responsiveWidth(1),
    paddingVertical: responsiveHeight(1),
    marginBottom: 20,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 6,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#006570',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 25,
  },
  inactiveTab: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: AppColors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeText: {
    color: '#fff',
    fontSize: responsiveFontSize(1.4),
    fontWeight: '600',
    marginLeft: 8,
  },
});
