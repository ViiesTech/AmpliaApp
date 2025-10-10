/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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

const Tab = createBottomTabNavigator();

const screens = [
  { name: 'Home', icon: 'home-outline' },
  { name: 'Calculator', icon: 'calculator-variant' },
  { name: 'Bookings', icon: 'calendar-check-outline' },
  { name: 'My Files', icon: 'file-document-outline' },
  { name: 'Profile', icon: 'account-outline' },
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
    // case 'Profile':
    //   return <Profile />;
    default:
      return null; // Always return something
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
        const iconName = screens[index].icon;

        return (
          <TouchableOpacity
            key={label}
            accessibilityRole="button"
            onPress={() => navigation.navigate(route.name)}
            style={styles.tabButton}
            activeOpacity={0.9}
          >
            {isFocused ? (
              <LinearGradient
                colors={['#007B7F', '#004C5C']}
                style={styles.activeTab}
              >
                <Icon
                  name={iconName}
                  size={responsiveFontSize(3)}
                  color="#fff"
                />
                <Text style={styles.activeText}>{label}</Text>
              </LinearGradient>
            ) : (
              <View style={styles.inactiveTab}>
                <Icon
                  name={iconName}
                  size={responsiveFontSize(3)}
                  color="#A0AEB8"
                />
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
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: responsiveWidth(4),
    marginBottom: responsiveHeight(5),
    paddingVertical: responsiveHeight(1),
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 6,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
  },
  activeTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(2),
    gap: 5,
    paddingVertical: responsiveHeight(1.5),
    borderRadius: 25,
  },
  inactiveTab: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: AppColors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeText: {
    color: '#fff',
    fontSize: responsiveFontSize(1.2),
    fontWeight: '500',
  },
});
