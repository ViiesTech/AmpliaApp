/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState, useMemo } from 'react';
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

const BookingsScreens = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [activeBookings, setActiveBookings] = useState([]);
  const [scheduleBookings, setScheduleBookings] = useState([]);
  const [completedBookings, setCompletedBookings] = useState([]);
  const [searchText, setSearchText] = useState('');

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { user } = useSelector(state => state.persistedData);
  const [getBookings, { isLoading }] = useLazyGetBookingsQuery();

  useEffect(() => {
    if (user?._id) {
      _getBookings(user._id);
    }
  }, [isFocused, selectedTab, user?._id]); // eslint-disable-line react-hooks/exhaustive-deps

  const _getBookings = async userId => {
    try {
      const res = await getBookings(userId).unwrap();
      const bookings = res?.bookings || [];
      const active = bookings.filter(item => item.status === 'new');
      const schedule = bookings.filter(item => item.status === 'scheduled');
      const completed = bookings.filter(item => item.status === 'completed');

      setActiveBookings(active);
      setScheduleBookings(schedule);
      setCompletedBookings(completed);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    }
  };

  const filteredData = useMemo(() => {
    const currentData =
      selectedTab === 0
        ? activeBookings
        : selectedTab === 1
          ? scheduleBookings
          : completedBookings;

    if (!searchText) { return currentData; }

    return currentData.filter(item =>
      item?.service?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
      item?.service?.plan?.name?.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [selectedTab, activeBookings, scheduleBookings, completedBookings, searchText]);

  const renderTabItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => setSelectedTab(index)}>
        <LinearGradient
          colors={
            selectedTab === index
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
              selectedTab === index ? AppColors.ThemeColor : AppColors.LIGHTGRAY,
          }}
        >
          <AppText
            textColor={selectedTab === index ? AppColors.WHITE : AppColors.GRAY}
            textSize={1.6}
            title={item.title}
          />
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const renderBookingItem = ({ item }) => {
    const onPress = () => {
      if (item.status !== 'completed') {
        navigation.navigate('BookingChat', {
          data: { ...item },
        });
      }
    };

    return (
      <ManageBookingsCard
        title={item?.service?.name}
        subTitle={item?.service?.plan?.name}
        status={item.status}
        fromDate={item?.scheduledDate}
        toDate={item?.scheduledDate}
        amount={item?.service?.plan?.price}
        navigation={navigation}
        OnPressCard={onPress}
      />
    );
  };

  const ListEmptyComponent = () => {
    const type = topTabsData[selectedTab].title;
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
    <Container scrollEnabled={false}>
      <View style={{ marginHorizontal: responsiveWidth(5), flex: 1 }}>
        <AppHeader onBackPress={false} heading={'Manage Bookings'} />
        <AppTextInput
          inputPlaceHolder={'Search Services'}
          borderWidth={1}
          borderColor={AppColors.LIGHTGRAY}
          inputWidth={85}
          value={searchText}
          onChangeText={setSearchText}
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

        <View>
          <FlatList
            data={topTabsData}
            horizontal
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}
            renderItem={renderTabItem}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <LineBreak space={2} />

        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => item._id || index.toString()}
          ItemSeparatorComponent={() => <LineBreak space={2} />}
          renderItem={renderBookingItem}
          ListEmptyComponent={ListEmptyComponent}
          contentContainerStyle={{ paddingBottom: responsiveHeight(5) }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Container>
  );
};

export default BookingsScreens;
