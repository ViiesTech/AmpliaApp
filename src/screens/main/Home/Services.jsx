/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import Container from '../../../components/Container';
import {
  AppColors,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils';
import AppHeader from '../../../components/AppHeader';
import Icon from 'react-native-vector-icons/Fontisto';
import PopularService from '../../../components/PopularService';
import { AppImages } from '../../../assets/images';
import LineBreak from '../../../components/LineBreak';
import LinearGradient from 'react-native-linear-gradient';
import AppText from '../../../components/AppText';

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

const topTabsData = [
  { id: 1, title: 'All' },
  { id: 2, title: 'Tax Preparation & Filing' },
  { id: 3, title: 'Financial Consulting' },
  { id: 4, title: 'Bookkeeping & Accounting' },
];

const Services = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <Container>
      <View style={{ marginHorizontal: responsiveWidth(5) }}>
        <AppHeader
          onBackPress={true}
          heading={'Services'}
          rightIcon={
            <TouchableOpacity
              onPress={() => {}}
              style={{
                backgroundColor: AppColors.app_light,
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 100,
              }}
            >
              <Icon
                name={'filter'}
                size={responsiveFontSize(2)}
                color={AppColors.Dark_themeColor}
              />
            </TouchableOpacity>
          }
        />
        <FlatList
          data={topTabsData}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: responsiveWidth(3) }}
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
                  paddingHorizontal: responsiveWidth(4),
                  paddingVertical: responsiveHeight(0.8),
                  borderRadius: 100,
                }}
              >
                <AppText
                  textColor={
                    selectedTab == index
                      ? AppColors.WHITE
                      : AppColors.ThemeColor
                  }
                  textSize={1.6}
                  title={item.title}
                  textFontWeight
                />
              </LinearGradient>
            </TouchableOpacity>
          )}
        />
      </View>
      <LineBreak space={2} />
      <View style={{ alignItems: 'center' }}>
        <FlatList
          data={popularServices}
          numColumns={2}
          ItemSeparatorComponent={<LineBreak space={2} />}
          showsHorizontalScrollIndicator={false}
          columnWrapperStyle={{
            gap: 12,
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
    </Container>
  );
};

export default Services;
