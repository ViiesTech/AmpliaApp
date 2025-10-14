/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import Container from '../../../components/Container';
import {
  AppColors,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils';
import AppHeader from '../../../components/AppHeader';
import AppTextInput from '../../../components/AppTextInput';
import Icon from 'react-native-vector-icons/Feather';
import LineBreak from '../../../components/LineBreak';
import LinearGradient from 'react-native-linear-gradient';
import AppText from '../../../components/AppText';
import ManageBookingsCard from '../../../components/ManageBookingsCard';
import { useNavigation } from '@react-navigation/native';

const topTabsData = [
  { id: 1, title: 'Active' },
  { id: 2, title: 'Schedule' },
  { id: 3, title: 'Completed' },
];

const activeData = [
  {
    id: 1,
    title: 'Bookkeeping and Accounting',
    subTitle: 'Standard Plan ID#54654',
    status: 'Active',
  },
  {
    id: 2,
    title: 'Bookkeeping and Accounting',
    subTitle: 'Standard Plan ID#54654',
    status: 'Active',
  },
  {
    id: 3,
    title: 'Bookkeeping and Accounting',
    subTitle: 'Standard Plan ID#54654',
    status: 'Active',
  },
  {
    id: 4,
    title: 'Bookkeeping and Accounting',
    subTitle: 'Standard Plan ID#54654',
    status: 'Active',
  },
];

const seheduleData = [
  {
    id: 1,
    title: 'Bookkeeping and Accounting',
    subTitle: 'Standard Plan ID#54654',
    status: 'Sehedule',
  },
  {
    id: 2,
    title: 'Bookkeeping and Accounting',
    subTitle: 'Standard Plan ID#54654',
    status: 'Sehedule',
  },
  {
    id: 3,
    title: 'Bookkeeping and Accounting',
    subTitle: 'Standard Plan ID#54654',
    status: 'Sehedule',
  },
  {
    id: 4,
    title: 'Bookkeeping and Accounting',
    subTitle: 'Standard Plan ID#54654',
    status: 'Sehedule',
  },
];

const completedData = [
  {
    id: 1,
    title: 'Bookkeeping and Accounting',
    subTitle: 'Standard Plan ID#54654',
    status: 'Completed',
  },
  {
    id: 2,
    title: 'Bookkeeping and Accounting',
    subTitle: 'Standard Plan ID#54654',
    status: 'Completed',
  },
  {
    id: 3,
    title: 'Bookkeeping and Accounting',
    subTitle: 'Standard Plan ID#54654',
    status: 'Completed',
  },
  {
    id: 4,
    title: 'Bookkeeping and Accounting',
    subTitle: 'Standard Plan ID#54654',
    status: 'Completed',
  },
];

const BookingsScreens = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const nav = useNavigation();

  return (
    <Container safeAreaViewStyle={{ marginBottom: responsiveHeight(-6) }}>
      <View style={{ marginHorizontal: responsiveWidth(5) }}>
        <AppHeader onBackPress={false} heading={'Manage Bookings'} />
        <AppTextInput
          inputPlaceHolder={'Search Services'}
          borderWidth={1}
          borderColor={AppColors.LIGHTGRAY}
          inputWidth={72}
          rightIcon={
            <TouchableOpacity>
              <Icon
                name={'search'}
                size={responsiveFontSize(2.5)}
                color={AppColors.LIGHTGRAY}
              />
            </TouchableOpacity>
          }
        />
        <LineBreak space={2} />
        <FlatList
          data={topTabsData}
          horizontal
          contentContainerStyle={{ flex: 1, justifyContent: 'space-between' }}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => setSelectedTab(index)}>
              <LinearGradient
                colors={
                  selectedTab == index
                    ? ['#003C46', '#007C91']
                    : [AppColors.app_light, AppColors.app_light]
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  paddingHorizontal: responsiveWidth(7.5),
                  paddingVertical: responsiveHeight(0.6),
                  borderRadius: 100,
                  borderWidth: 2,
                  borderColor:
                    selectedTab == index
                      ? AppColors.ThemeColor
                      : AppColors.LIGHTGRAY,
                }}
              >
                <AppText
                  textColor={
                    selectedTab == index ? AppColors.WHITE : AppColors.GRAY
                  }
                  textSize={1.6}
                  title={item.title}
                />
              </LinearGradient>
            </TouchableOpacity>
          )}
        />
        <LineBreak space={2} />
        {selectedTab == 0 && (
          <FlatList
            data={activeData}
            ItemSeparatorComponent={<LineBreak space={2} />}
            renderItem={({ item }) => (
              <ManageBookingsCard
                title={item.title}
                subTitle={item.subTitle}
                status={item.status}
                OnPressCard={() => nav.navigate('BookingChat')}
              />
            )}
          />
        )}
        {selectedTab == 1 && (
          <FlatList
            data={seheduleData}
            ItemSeparatorComponent={<LineBreak space={2} />}
            renderItem={({ item }) => (
              <ManageBookingsCard
                title={item.title}
                subTitle={item.subTitle}
                status={item.status}
                OnPressCard={() => {}}
              />
            )}
          />
        )}
        {selectedTab == 2 && (
          <FlatList
            data={completedData}
            ItemSeparatorComponent={<LineBreak space={2} />}
            renderItem={({ item }) => (
              <ManageBookingsCard
                title={item.title}
                subTitle={item.subTitle}
                status={item.status}
                OnPressCard={() => {}}
              />
            )}
          />
        )}
        <LineBreak space={2} />
      </View>
    </Container>
  );
};

export default BookingsScreens;
