import React, { useState, useCallback, useEffect } from 'react';
import { View, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Fontisto';
import Container from '../../../components/Container';
import AppHeader from '../../../components/AppHeader';
import PopularService from '../../../components/PopularService';
import LineBreak from '../../../components/LineBreak';
import AppText from '../../../components/AppText';
import { getImageUrl } from '../../../redux/constant';
import { useNavigation } from '@react-navigation/native';
import {
  AppColors,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils';
import {
  useLazyGetAllServicesQuery,
} from '../../../redux/services/mainService';
import Loader from '../../../components/Loader';

const Services = ({ route }) => {
  const navigation = useNavigation();
  const categoryId = route?.params?.categoryId;

  const [getAllServices, { data: servicesData, isLoading: serviceLoader }] =
    useLazyGetAllServicesQuery();

  console.log("servicesDatacategoryId", servicesData);

  useEffect(() => {
    getAllServices({ categoryId });
  }, [categoryId]);

  const renderService = useCallback(
    ({ item }) => (
      <PopularService
        title={item.name}
        image={{ uri: getImageUrl(item.cover, 'cover') }}
        price={item.price}
        rating={item.averageRating}
        onPress={() =>
          navigation.navigate('ServiceDetails', {
            serviceId: item?._id,
            service: item,
          })
        }
      />
    ),
    [navigation],
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
      </View>

      <LineBreak space={2} />

      <View style={styles.servicesWrapper}>
        {serviceLoader ? (
          <Loader color={AppColors.ThemeColor} />
        ) : (
          <FlatList
            data={servicesData?.services || []}
            numColumns={2}
            keyExtractor={item => String(item._id)}
            columnWrapperStyle={styles.columnWrapper}
            ItemSeparatorComponent={<LineBreak space={2} />}
            renderItem={renderService}
            ListEmptyComponent={
              <AppText title="No services found" textAlignment="center" />
            }
          />
        )}
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
  },
  columnWrapper: {
    gap: 12,
  },
});
