import React, { useEffect, useCallback } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { getImageUrl } from '../../../redux/constant';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import Container from '../../../components/Container';
import HomeHeader from '../../../components/HomeHeader';
import LineBreak from '../../../components/LineBreak';
import AppTextInput from '../../../components/AppTextInput';
import HomeBanner from '../../../components/HomeBanner';
import AppText from '../../../components/AppText';
import ServiceCategory from '../../../components/ServiceCategory';
import PopularService from '../../../components/PopularService';
import Bookings from '../../../components/Bookings';
import OurConsultants from '../../../components/OurConsultants';
import Loader from '../../../components/Loader';

import {
  AppColors,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils';

import {
  useLazyGetAllCategoriesQuery,
  useLazyGetAllServicesQuery,
  useLazyGetBookingsQuery,
  useLazyGetAllSubAdminsQuery,
} from '../../../redux/services/mainService';
import { useSelector } from 'react-redux';

const Home = () => {
  const navigation = useNavigation();
  const { user } = useSelector(state => state.persistedData);
  const [
    getAllCategories,
    { data: categoriesData, isLoading: categoryLoader },
  ] = useLazyGetAllCategoriesQuery();

  const [getAllServices, { data: servicesData, isLoading: serviceLoader }] =
    useLazyGetAllServicesQuery();

  const [getBookings, { data: bookingsData, isLoading: bookingsLoader }] =
    useLazyGetBookingsQuery();

  const [getAllSubAdmins, { data: subAdminsData }] = useLazyGetAllSubAdminsQuery();


  useEffect(() => {
    getAllCategories();
    getAllServices();
    getAllSubAdmins();
    if (user?._id) {
      _getBookings(user._id);
    }
  }, [getAllCategories, getAllServices, getAllSubAdmins, user?._id]);

  const _getBookings = async userId => {
    try {
      await getBookings(userId).unwrap();
    } catch (err) {
      console.error('Error fetching bookings:', err);
    }
  };

  const renderCategory = useCallback(
    ({ item }) => (
      <ServiceCategory
        title={item?.name}

        icon={{ uri: getImageUrl(item?.cover, 'cover') }}
        onPress={() => navigation.navigate('Services', { categoryId: item?._id })}
      />
    ),
    [navigation],
  );

  const renderService = useCallback(
    ({ item }) => {

      console.log(getImageUrl(item?.cover, 'cover'))
      return (
        <PopularService
          title={item?.name}
          image={{ uri: getImageUrl(item?.cover, 'cover') }}
          price={item?.price}
          rating={item?.averageRating}
          onPress={() =>
            navigation.navigate('ServiceDetails', {
              serviceId: item?._id,
              service: item,
            })
          }
        />
      );
    },
    [navigation],
  );

  return (
    <Container>
      <LineBreak space={2} />

      <View style={styles.screenPadding}>
        <HomeHeader />

        <LineBreak space={2} />

        <AppTextInput
          inputPlaceHolder="Search Services"
          borderWidth={1}
          borderColor={AppColors.LIGHTGRAY}
          containerBg={AppColors.WHITE}
          inputWidth={72}
          rightIcon={
            <TouchableOpacity>
              <Icon
                name="search"
                size={responsiveFontSize(2.5)}
                color={AppColors.LIGHTGRAY}
              />
            </TouchableOpacity>
          }
        />

        <LineBreak space={5} />

        <HomeBanner />

        <LineBreak space={2} />

        {/* Live Chat Button */}
        <TouchableOpacity
          style={styles.liveChatButton}
          onPress={() => navigation.navigate('LiveChat')}
        >
          <Icon name="message-circle" size={responsiveFontSize(2.5)} color={AppColors.WHITE} />
          <AppText
            title="Live Chat Now"
            textSize={1.8}
            textColor={AppColors.WHITE}
            textFontWeight
          />
        </TouchableOpacity>

        <LineBreak space={3} />


        {/* Service Categories Header */}
        <View style={styles.rowBetween}>
          <AppText title="Service Category" textSize={2.4} textFontWeight />
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Services')
            }
          >
            <AppText
              title="View More"
              textSize={1.8}
              textColor={AppColors.ThemeColor}
              textFontWeight
            />
          </TouchableOpacity>
        </View>

        <LineBreak space={2} />

        {categoryLoader ? (
          <Loader color={AppColors.ThemeColor} />
        ) : (
          <FlatList
            data={categoriesData?.categories?.slice(0, 3) || []}

            horizontal
            keyExtractor={item => String(item?._id)}
            renderItem={renderCategory}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryList}
            ListEmptyComponent={
              <AppText title="No Categories Found" textAlignment="center" />
            }
          />
        )}

        <LineBreak space={3} />

        {/* Popular Services Header */}
        <View style={styles.rowBetween}>
          <AppText title="Popular Service" textSize={2.4} textFontWeight />
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('PopularAndOtherServices', {
                servicesData: servicesData?.services || [],
              })
            }
          >
            <AppText
              title="View More"
              textSize={1.8}
              textColor={AppColors.ThemeColor}
              textFontWeight
            />
          </TouchableOpacity>
        </View>
      </View>

      <LineBreak space={1.5} />

      {serviceLoader ? (
        <Loader color={AppColors.ThemeColor} />
      ) : (
        <FlatList
          data={servicesData?.services?.slice(0, 2) || []}
          horizontal
          keyExtractor={item => String(item?._id)}
          renderItem={renderService}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.serviceList}
          ListEmptyComponent={
            <AppText title="No Service Found" textAlignment="center" />
          }
        />
      )}

      <LineBreak space={2} />

      {/* Bookings */}
      <View style={styles.screenPadding}>
        <View style={styles.rowBetween}>
          <AppText title="Bookings" textSize={2.4} textFontWeight />
          <TouchableOpacity
            onPress={() => navigation.navigate('Main', { screen: 'Bookings' })}
          >
            <AppText
              title="View All"
              textSize={1.8}
              textColor={AppColors.ThemeColor}
              textFontWeight
            />
          </TouchableOpacity>
        </View>

        <LineBreak space={2} />

        {bookingsLoader ? (
          <Loader color={AppColors.ThemeColor} />
        ) : (
          <View style={styles.bookingContainer}>
            <FlatList
              data={bookingsData?.bookings?.slice(0, 3) || []}
              keyExtractor={item => item?._id}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <Bookings
                  title={item?.service?.name}
                  date={item?.scheduledDate}
                  status={item?.status}
                />
              )}
            />
          </View>
        )}

        <LineBreak space={4} />

        {/* Consultants */}
        <AppText title="Our Consultants" textSize={2.4} textFontWeight />

        <LineBreak space={2} />

        <FlatList
          data={subAdminsData?.subAdmins || []}
          keyExtractor={item => String(item?._id)}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.consultantRow}
          renderItem={({ item }) => <OurConsultants name={item?.firstName} profile={item?.profile} />}
        />

        <LineBreak space={3} />
      </View>
    </Container>
  );
};

export default Home;

const styles = StyleSheet.create({
  screenPadding: {
    paddingHorizontal: responsiveWidth(5),
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryList: {
    paddingHorizontal: responsiveWidth(5),
    gap: responsiveWidth(3),
  },
  serviceList: {
    paddingHorizontal: responsiveWidth(5),
    gap: 12,
  },
  bookingContainer: {
    backgroundColor: AppColors.app_light,
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(4),
  },
  consultantRow: {
    gap: responsiveWidth(3),
    paddingBottom: 10,
  },
  liveChatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.ThemeColor,
    paddingVertical: responsiveHeight(1.5),
    borderRadius: 10,
    gap: 10,
  },
});
