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
import AppHeader from '../../../components/AppHeader';
import { AppIcons } from '../../../assets/icons';
import AppText from '../../../components/AppText';
import SVGXml from '../../../assets/icons/SVGXML';
import LineBreak from '../../../components/LineBreak';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const serviceCate = [
  { id: 1, title: 'Tax Preparation & Filing', icon: AppIcons.booking_white },
  { id: 2, title: 'Financial Consulting', icon: AppIcons.dollar_white },
  { id: 3, title: 'Bookkeeping & Accounting', icon: AppIcons.file_white },
];

const ServiceCategories = () => {
  const nav = useNavigation();

  return (
    <Container safeAreaViewStyle={{ marginBottom: responsiveHeight(-6) }}>
      <View style={{ marginHorizontal: responsiveWidth(5) }}>
        <AppHeader onBackPress={true} heading={'Service Category'} />

        <FlatList
          data={serviceCate}
          ItemSeparatorComponent={<LineBreak space={2} />}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: AppColors.app_light,
                borderRadius: 10,
                paddingHorizontal: responsiveWidth(4),
                paddingVertical: responsiveHeight(1),
                gap: responsiveWidth(4),
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 50,
                  height: 50,
                  borderRadius: 100,
                  backgroundColor: AppColors.ThemeColor,
                }}
              >
                <SVGXml icon={item.icon} width={20} height={20} />
              </View>
              <AppText
                title={item.title}
                textSize={2}
                textColor={AppColors.ThemeColor}
                textFontWeight
              />
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                }}
              >
                <TouchableOpacity onPress={() => nav.navigate('Services')}>
                  <Icon
                    name={'arrow-right'}
                    size={responsiveFontSize(2.5)}
                    color={AppColors.Dark_themeColor}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </Container>
  );
};

export default ServiceCategories;
