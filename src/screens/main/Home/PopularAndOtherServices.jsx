/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, FlatList } from 'react-native';
import Container from '../../../components/Container';
import { AppColors, responsiveWidth } from '../../../utils';
import { AppImages } from '../../../assets/images';
import AppHeader from '../../../components/AppHeader';
import PopularService from '../../../components/PopularService';
import LineBreak from '../../../components/LineBreak';
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

const PopularAndOtherServices = () => {
  return (
    <Container>
      <View style={{ marginHorizontal: responsiveWidth(5) }}>
        <AppHeader onBackPress={true} heading={'Popular Services'} />
      </View>
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
      <LineBreak space={3} />
      <View>
        <View style={{ marginHorizontal: responsiveWidth(5) }}>
          <AppText
            textColor={AppColors.BLACK}
            textSize={2.5}
            title={'Other Services'}
            textFontWeight
          />
        </View>
        <LineBreak space={2} />
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
    </Container>
  );
};

export default PopularAndOtherServices;
