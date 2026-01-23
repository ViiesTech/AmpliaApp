/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, FlatList } from 'react-native';
import Container from '../../../components/Container';
import {
  AppColors,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils';
import AppHeader from '../../../components/AppHeader';
import SVGXml from '../../../assets/icons/SVGXML';
import { AppIcons } from '../../../assets/icons';
import BackIcon from '../../../components/BackIcon';
import AppText from '../../../components/AppText';
import LineBreak from '../../../components/LineBreak';

const data = [
  {
    id: 1,
    date: 'July 24 2025',
    title: 'Individual Tax Filing',
    time: '4:30 pm',
    price: '$250.00',
  },
  {
    id: 2,
    date: 'July 24 2025',
    title: 'Individual Tax Filing',
    time: '4:30 pm',
    price: '$250.00',
  },
  {
    id: 3,
    date: 'July 24 2025',
    title: 'Individual Tax Filing',
    time: '4:30 pm',
    price: '$250.00',
  },
  {
    id: 4,
    date: 'July 24 2025',
    title: 'Individual Tax Filing',
    time: '4:30 pm',
    price: '$250.00',
  },
];

const BillingHistory = () => {
  return (
    <Container>
      <View style={{ paddingHorizontal: responsiveWidth(5) }}>
        <AppHeader
          onBackPress={true}
          heading={'Billing History'}
          rightIcon={
            <BackIcon
              icon={
                <SVGXml
                  icon={AppIcons.filter_icon(AppColors.ThemeColor)}
                  width={responsiveFontSize(2)}
                  height={responsiveFontSize(2)}
                />
              }
            />
          }
        />

        <FlatList
          data={data}
          ItemSeparatorComponent={<LineBreak space={3} />}
          renderItem={({ item }) => (
            <View>
              <AppText
                title={item.date}
                textSize={2.2}
                textColor={AppColors.ThemeColor}
                textFontWeight
              />
              <LineBreak space={1} />
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: AppColors.app_light,
                  gap: responsiveWidth(2),
                  alignItems: 'center',
                  paddingHorizontal: responsiveWidth(3),
                  paddingVertical: responsiveHeight(1.5),
                  borderRadius: 10,
                }}
              >
                <View>
                  <AppText
                    title={item.title}
                    textSize={2}
                    textColor={AppColors.ThemeColor}
                    textFontWeight
                  />
                  <AppText
                    title={item.time}
                    textSize={1.6}
                    textColor={AppColors.ThemeColor}
                  />
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                  <AppText
                    title={item.price}
                    textSize={2.8}
                    textColor={AppColors.ThemeColor}
                    textFontWeight
                  />
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </Container>
  );
};

export default BillingHistory;
