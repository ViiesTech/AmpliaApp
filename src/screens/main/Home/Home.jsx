/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import Container from '../../../components/Container';
import {
  AppColors,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils';
import HomeHeader from '../../../components/HomeHeader';
import LineBreak from '../../../components/LineBreak';
import AppTextInput from '../../../components/AppTextInput';
import Icon from 'react-native-vector-icons/Feather';
import HomeBanner from '../../../components/HomeBanner';
import AppText from '../../../components/AppText';
import ServiceCategory from '../../../components/ServiceCategory';
import { AppIcons } from '../../../assets/icons';
import PopularService from '../../../components/PopularService';
import { AppImages } from '../../../assets/images';
import Bookings from '../../../components/Bookings';
import OurConsultants from '../../../components/OurConsultants';
import { useNavigation } from '@react-navigation/native';

const serviceCate = [
  { id: 1, title: 'Tax Preparation', subTitle: '& Filing', icon: AppIcons.file },
  { id: 2, title: 'Financial', subTitle: 'Consulting', icon: AppIcons.dollar },
  { id: 3, title: 'Bookkeeping &', subTitle: 'Accounting', icon: AppIcons.booking },
];

const popularServices = [
  {
    id: 1,
    image: AppImages.service_one,
    title: 'Individual Tax Filing',
    rating: '4.5',
    price: '$200.00',
  },
  {
    id: 2,
    image: AppImages.service_two,
    title: 'NTN Registration',
    rating: '4.5',
    price: '$200.00',
  },
  {
    id: 3,
    image: AppImages.service_three,
    title: 'Business Incorporation',
    rating: '4.5',
    price: '$200.00',
  },
];

const bookings = [
  {
    id: 1,
    title: 'Bookkeeping and Accounting',
    date: '24/12/24',
    status: 'Active',
  },
  {
    id: 2,
    title: 'Bookkeeping and Accounting',
    date: '24/12/24',
    status: 'Completed',
  },
  {
    id: 3,
    title: 'Bookkeeping and Accounting',
    date: '24/12/24',
    status: 'Schedule',
  },
];

const Home = () => {
  const nav = useNavigation();
  return (
    <Container>
      <LineBreak space={2} />
      <View style={{ marginHorizontal: responsiveWidth(5) }}>
        <HomeHeader />
        <LineBreak space={2} />
        <AppTextInput
          inputPlaceHolder={'Search Services'}
          borderWidth={1}
          borderColor={AppColors.LIGHTGRAY}
          containerBg={AppColors.WHITE}
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

        <LineBreak space={5} />
        <HomeBanner />
        <LineBreak space={3} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <AppText
            title={'Service Category'}
            textSize={2.4}
            textColor={AppColors.BLACK}
            textFontWeight
          />

          <TouchableOpacity onPress={() => nav.navigate('ServiceCategories')}>
            <AppText
              title={'View More'}
              textSize={1.8}
              textColor={AppColors.ThemeColor}
              textFontWeight
            />
          </TouchableOpacity>
        </View>
        <LineBreak space={2} />

        <FlatList
          data={serviceCate}
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: responsiveWidth(5),
          }}
          horizontal
          renderItem={({ item }) => (
            <ServiceCategory
              title={item.title}
              subTitle={item.subTitle}
              icon={item.icon}
              onPress={() => nav.navigate('Services')}
            />
          )}
        />
        <LineBreak space={3} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <AppText
            title={'Popular Service'}
            textSize={2.4}
            textColor={AppColors.BLACK}
            textFontWeight
          />

          <TouchableOpacity onPress={() => nav.navigate("PopularAndOtherServices")}>
            <AppText
              title={'View More'}
              textSize={1.8}
              textColor={AppColors.ThemeColor}
              textFontWeight
            />
          </TouchableOpacity>
        </View>
      </View>

      <LineBreak space={1.5} />

      <View>
        <FlatList
          data={popularServices}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: 12,
            paddingHorizontal: responsiveWidth(5),
          }}
          renderItem={({ item }) => (
            <PopularService
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
            />
          )}
        />
      </View>

      <LineBreak space={2} />

      <View style={{ paddingHorizontal: responsiveWidth(5) }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <AppText
            title={'Bookings'}
            textSize={2.4}
            textColor={AppColors.BLACK}
            textFontWeight
          />

          <TouchableOpacity
            onPress={() => nav.navigate('Main', { screen: 'Bookings' })}
          >
            <AppText
              title={'View All'}
              textSize={1.8}
              textColor={AppColors.ThemeColor}
              textFontWeight
            />
          </TouchableOpacity>
        </View>
        <LineBreak space={2} />

        <View
          style={{
            backgroundColor: AppColors.app_light,
            paddingVertical: responsiveHeight(2),
            paddingHorizontal: responsiveWidth(4),
          }}
        >
          <FlatList
            data={bookings}
            renderItem={({ item }) => (
              <Bookings
                title={item.title}
                date={item.date}
                status={item.status}
              />
            )}
          />
        </View>

        <LineBreak space={4} />

        <AppText
          title={'Our Consultants'}
          textSize={2.4}
          textColor={AppColors.BLACK}
          textFontWeight
        />

        <LineBreak space={2} />

        <FlatList
          data={[{ id: '1' }, { id: '2' }, { id: '4' }, { id: '3' }]}
          numColumns={2}
          columnWrapperStyle={{ gap: responsiveWidth(3) }}
          ItemSeparatorComponent={<LineBreak space={2} />}
          renderItem={({ item }) => <OurConsultants />}
        />

        <LineBreak space={3} />
      </View>
    </Container>
  );
};

export default Home;
