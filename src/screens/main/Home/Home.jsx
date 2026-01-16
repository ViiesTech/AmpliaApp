import React, { useEffect, useCallback } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
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
} from '../../../redux/services/mainService';

const bookings = [
  {
    id: '1',
    title: 'Bookkeeping and Accounting',
    date: '24/12/24',
    status: 'Active',
  },
  {
    id: '2',
    title: 'Bookkeeping and Accounting',
    date: '24/12/24',
    status: 'Completed',
  },
  {
    id: '3',
    title: 'Bookkeeping and Accounting',
    date: '24/12/24',
    status: 'Schedule',
  },
];

const Home = () => {
  const navigation = useNavigation();

  const [
    getAllCategories,
    { data: categoriesData, isLoading: categoryLoader },
  ] = useLazyGetAllCategoriesQuery();

  const [getAllServices, { data: servicesData, isLoading: serviceLoader }] =
    useLazyGetAllServicesQuery();

  useEffect(() => {
    getAllCategories();
    getAllServices();
  }, [getAllCategories, getAllServices]);

  const renderCategory = useCallback(
    ({ item }) => (
      <ServiceCategory
        title={item?.name}
        subTitle={item?.description}
        icon={{ uri: item?.cover }}
        onPress={() => navigation.navigate('Services')}
      />
    ),
    [navigation],
  );

  const renderService = useCallback(
    ({ item }) => {
      // console.log('serviceId:-', item?._id);
      return (
        <PopularService
          title={item?.name}
          image={{ uri: item?.cover }}
          price={item?.plans}
          rating={item?.averageRating}
          onPress={() =>
            navigation.navigate('ServiceDetails', {
              serviceId: item?._id,
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

        <LineBreak space={3} />

        {/* Service Categories Header */}
        <View style={styles.rowBetween}>
          <AppText title="Service Category" textSize={2.4} textFontWeight />
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ServiceCategories', {
                data: categoriesData?.categories || [],
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

        <LineBreak space={2} />

        {categoryLoader ? (
          <Loader color={AppColors.ThemeColor} />
        ) : (
          <FlatList
            data={categoriesData?.categories?.slice(0, 2) || []}
            horizontal
            keyExtractor={item => String(item.id)}
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
          keyExtractor={item => String(item.id)}
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

        <View style={styles.bookingContainer}>
          <FlatList
            data={bookings}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Bookings {...item} />}
          />
        </View>

        <LineBreak space={4} />

        {/* Consultants */}
        <AppText title="Our Consultants" textSize={2.4} textFontWeight />

        <LineBreak space={2} />

        <FlatList
          data={[1, 2, 3, 4]}
          keyExtractor={item => String(item)}
          numColumns={2}
          columnWrapperStyle={styles.consultantRow}
          renderItem={() => <OurConsultants />}
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
    flex: 1,
    paddingHorizontal: responsiveWidth(5),
    justifyContent: 'space-between',
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
    marginBottom: 10,
  },
});
