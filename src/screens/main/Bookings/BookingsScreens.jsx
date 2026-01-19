/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
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

import { useLazyGetBookingsQuery } from '../../../redux/services/mainService';
import { useSelector } from 'react-redux';
import Loader from '../../../components/Loader';
import { useIsFocused, useNavigation } from '@react-navigation/native';

const topTabsData = [
  { id: 1, title: 'Active' },
  { id: 2, title: 'Schedule' },
  { id: 3, title: 'Completed' },
];

const BookingsScreens = props => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [activeBookings, setActiveBookings] = useState([]);
  const [scheduleBookings, setScheduleBookings] = useState([]);
  const [completedBookings, setCompletedBookings] = useState([]);
  const navigation = useNavigation();
  const isFocussed = useIsFocused();
  const { user } = useSelector(state => state.persistedData);
  const [getBookings, { isLoading }] = useLazyGetBookingsQuery();

  useEffect(() => {
    _getBookigs(user?._id);
  }, [isFocussed, selectedTab]); // eslint-disable-line react-hooks/exhaustive-deps

  const _getBookigs = async userId => {
    await getBookings(userId)
      ?.unwrap()
      ?.then(res => {
        console.log('res in _getBookigs', res?.bookings);
        let bookings = res?.bookings;
        let active = bookings.filter(item => item.status === 'new');
        let schedule = bookings.filter(item => item.status === 'scheduled');
        let completed = bookings.filter(item => item.status === 'completed');
        setActiveBookings(active);
        setScheduleBookings(schedule);
        setCompletedBookings(completed);
        console.log('active bookings:-', active);
        console.log('schedule bookings:-', schedule);
        console.log('completed bookings:-', completed);
      })
      ?.catch(err => console.log('err in _getBookigs', err));
  };

  const renderTabItem = ({ item, index }) => {
    return (
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
              selectedTab == index ? AppColors.ThemeColor : AppColors.LIGHTGRAY,
          }}
        >
          <AppText
            textColor={selectedTab == index ? AppColors.WHITE : AppColors.GRAY}
            textSize={1.6}
            title={item.title}
          />
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const renderActiveItem = ({ item }) => {
    // console.log('item:-----', item);
    return (
      <ManageBookingsCard
        title={item?.service?.name}
        subTitle={item?.service?.plan?.name}
        status={item.status}
        fromDate={item?.scheduledDate}
        toDate={item?.scheduledDate}
        amount={item?.service?.plan?.price}
        navigation={navigation}
        OnPressCard={() =>
          navigation.navigate('BookingChat', {
            data: { ...item },
          })
        }
      />
    );
  };

  const renderScheduleItem = ({ item }) => {
    // console.log('item:-----', item);
    return (
      <ManageBookingsCard
        title={item?.service?.name}
        subTitle={item?.service?.plan?.name}
        status={item.status}
        fromDate={item?.scheduledDate}
        toDate={item?.scheduledDate}
        amount={item?.service?.plan?.price}
        navigation={navigation}
        OnPressCard={() =>
          navigation.navigate('BookingChat', {
            data: { ...item },
          })
        }
      />
    );
  };

  const renderCompletedItem = ({ item }) => {
    // console.log('item:-----', item);
    return (
      <ManageBookingsCard
        title={item?.service?.name}
        subTitle={item?.service?.plan?.name}
        status={item.status}
        fromDate={item?.scheduledDate}
        toDate={item?.scheduledDate}
        amount={item?.service?.plan?.price}
        navigation={navigation}
        OnPressCard={() => {}}
      />
    );
  };

  const listEmptyComponent = type => {
    return (
      <View style={{ marginTop: responsiveHeight(10), alignItems: 'center' }}>
        <AppText
          textColor={AppColors.GRAY}
          textSize={2}
          title={`No ${type} Bookings`}
        />
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Loader color={AppColors.ThemeColor} />
      </View>
    );
  }

  return (
    <Container>
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
          renderItem={renderTabItem}
        />

        <LineBreak space={2} />

        {selectedTab === 0 && (
          <FlatList
            data={activeBookings}
            ItemSeparatorComponent={<LineBreak space={2} />}
            renderItem={renderActiveItem}
            ListEmptyComponent={() => listEmptyComponent('Active')}
          />
        )}

        {selectedTab === 1 && (
          <FlatList
            data={scheduleBookings}
            ItemSeparatorComponent={<LineBreak space={2} />}
            renderItem={renderScheduleItem}
            ListEmptyComponent={() => listEmptyComponent('Scheduled')}
          />
        )}

        {selectedTab === 2 && (
          <FlatList
            data={completedBookings}
            ItemSeparatorComponent={<LineBreak space={2} />}
            renderItem={renderCompletedItem}
            ListEmptyComponent={() => listEmptyComponent('Completed')}
          />
        )}
        <LineBreak space={2} />
      </View>
    </Container>
  );
};

export default BookingsScreens;
