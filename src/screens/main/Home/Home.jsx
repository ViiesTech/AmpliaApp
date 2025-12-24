/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
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
import {
  useLazyGetAllCategoriesQuery,
  useLazyGetAllServicesQuery,
} from '../../../redux/services/mainService';
import Loader from '../../../components/Loader';

const serviceCate = [
  {
    id: 1,
    title: 'Tax Preparation',
    subTitle: '& Filing',
    icon: AppIcons.file,
  },
  { id: 2, title: 'Financial', subTitle: 'Consulting', icon: AppIcons.dollar },
  {
    id: 3,
    title: 'Bookkeeping &',
    subTitle: 'Accounting',
    icon: AppIcons.booking,
  },
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
  const [
    getAllCategories,
    { data: categoriesData, isLoading: categoryLoader },
  ] = useLazyGetAllCategoriesQuery();
  const [getAllServices, { data: servicesData, isLoading: serviceLoader }] =
    useLazyGetAllServicesQuery();
  const nav = useNavigation();

  console.log('categories ===>', categoriesData);
  console.log('services ===>', servicesData);

  useEffect(() => {
    getAllCategories();
    getAllServices();
  }, []);

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

          <TouchableOpacity
            onPress={() =>
              nav.navigate('ServiceCategories', { data: categoriesData })
            }
          >
            <AppText
              title={'View More'}
              textSize={1.8}
              textColor={AppColors.ThemeColor}
              textFontWeight
            />
          </TouchableOpacity>
        </View>
        <LineBreak space={2} />

        {categoryLoader ? (
          <View style={{ marginTop: responsiveHeight(3) }}>
            <Loader color={AppColors.ThemeColor} />
          </View>
        ) : (
          <FlatList
            data={categoriesData?.categories.slice(0, 2)}
            ListEmptyComponent={() => (
              <View style={{ flex: 1 }}>
                <AppText
                  textSize={1.8}
                  textAlignment={'center'}
                  title={'No Categories Found'}
                />
              </View>
            )}
            contentContainerStyle={{
              flex: 1,
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: responsiveWidth(5),
            }}
            horizontal
            renderItem={({ item }) => (
              <ServiceCategory
                title={item.name}
                subTitle={item.description}
                icon={{ uri: item.cover }} // image will appear when server will live
                onPress={() => nav.navigate('Services')}
              />
            )}
          />
        )}
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

          <TouchableOpacity
            onPress={() => nav.navigate('PopularAndOtherServices',{servicesData: servicesData?.services})}
          >
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

      {/* <View> */}
      {serviceLoader ? (
        <View style={{ marginTop: responsiveHeight(3) }}>
          <Loader color={AppColors.ThemeColor} />
        </View>
      ) : (
        <FlatList
          data={servicesData?.services?.slice(0,2)}
          horizontal
          ListEmptyComponent={() => <View style={{flex: 1}}><AppText textAlignment={'center'} title={'No Service Found'} /></View> }
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: 12,
            paddingHorizontal: responsiveWidth(5),
          }}
          renderItem={({ item }) => (
            <PopularService
              title={item.name}
              image={{uri: item.cover}}
              onPress={() => nav.navigate("ServiceDetails")}
              price={item.plans}
              rating={item.averageRating}
            />
          )}
        />
      )}
      {/* </View> */}

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
