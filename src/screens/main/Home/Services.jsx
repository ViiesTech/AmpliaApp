import React, { useState, useCallback, useMemo } from 'react';
import { View, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Fontisto';
import Container from '../../../components/Container';
import AppHeader from '../../../components/AppHeader';
import PopularService from '../../../components/PopularService';
import LineBreak from '../../../components/LineBreak';
import AppText from '../../../components/AppText';
import { AppImages } from '../../../assets/images';
import {
  AppColors,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils';

const topTabsData = [
  { id: 0, title: 'All' },
  { id: 1, title: 'Tax Preparation & Filing' },
  { id: 2, title: 'Financial Consulting' },
  { id: 3, title: 'Bookkeeping & Accounting' },
];

const popularServices = [
  {
    id: '1',
    categoryId: 1,
    image: AppImages.service_one,
    title: 'Individual Tax Filing',
    rating: '4.5',
    price: [
      { id: 1, price: '200.00' },
      { id: 2, price: '200.00' },
    ],
  },
  {
    id: '2',
    categoryId: 2,
    image: AppImages.service_two,
    title: 'NTN Registration',
    rating: '4.5',
    price: [
      { id: 1, price: '200.00' },
      { id: 2, price: '200.00' },
    ],
  },
  {
    id: '3',
    categoryId: 3,
    image: AppImages.service_three,
    title: 'Business Incorporation',
    rating: '4.5',
    price: [
      { id: 1, price: '200.00' },
      { id: 2, price: '200.00' },
    ],
  },
];

const Services = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const filteredServices = useMemo(() => {
    if (selectedTab === 0) return popularServices;
    return popularServices.filter(item => item.categoryId === selectedTab);
  }, [selectedTab]);

  const renderTab = useCallback(
    ({ item }) => {
      const isActive = selectedTab === item.id;

      return (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setSelectedTab(item.id)}
        >
          <LinearGradient
            colors={
              isActive
                ? ['#003C46', '#007C91']
                : [AppColors.app_light, AppColors.app_light]
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.tab}
          >
            <AppText
              title={item.title}
              textSize={1.6}
              textFontWeight
              textColor={isActive ? AppColors.WHITE : AppColors.ThemeColor}
            />
          </LinearGradient>
        </TouchableOpacity>
      );
    },
    [selectedTab],
  );

  const renderService = useCallback(
    ({ item }) => (
      <PopularService
        title={item.title}
        image={item.image}
        price={item.price}
        rating={item.rating}
      />
    ),
    [],
  );

  return (
    <Container>
      <View style={styles.screenPadding}>
        <AppHeader
          onBackPress
          heading="Services"
          rightIcon={
            <TouchableOpacity style={styles.filterButton}>
              <Icon
                name="filter"
                size={responsiveFontSize(2)}
                color={AppColors.Dark_themeColor}
              />
            </TouchableOpacity>
          }
        />

        <FlatList
          data={topTabsData}
          horizontal
          keyExtractor={item => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContainer}
          renderItem={renderTab}
        />
      </View>

      <LineBreak space={2} />

      <View style={styles.servicesWrapper}>
        <FlatList
          data={filteredServices}
          numColumns={2}
          keyExtractor={item => item.id}
          columnWrapperStyle={styles.columnWrapper}
          ItemSeparatorComponent={<LineBreak space={2} />}
          renderItem={renderService}
          ListEmptyComponent={
            <AppText title="No services found" textAlignment="center" />
          }
        />
      </View>
    </Container>
  );
};

export default Services;

const styles = StyleSheet.create({
  screenPadding: {
    marginHorizontal: responsiveWidth(5),
  },
  filterButton: {
    backgroundColor: AppColors.app_light,
    width: 40,
    height: 40,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabsContainer: {
    gap: responsiveWidth(3),
  },
  tab: {
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(0.8),
    borderRadius: 100,
  },
  servicesWrapper: {
    paddingHorizontal: responsiveWidth(5),
    // alignItems: 'center',
  },
  columnWrapper: {
    gap: 12,
  },
});
