/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import {
  AppColors,
  capitalizeFirstLetter,
  responsiveHeight,
  responsiveWidth,
} from '../utils';
import { AppImages } from '../assets/images';
import AppText from './AppText';
import LineBreak from './LineBreak';
import SVGXml from '../assets/icons/SVGXML';
import { AppIcons } from '../assets/icons';
import AppButton from './AppButton';
import moment from 'moment';

type Prop = {
  title?: string;
  subTitle?: any;
  status?: any;
  OnPressCard?: () => void;
  fromDate?: any;
  toDate?: any;
  amount?: any;
  navigation?: any;
};

const ManageBookingsCard = ({
  title,
  subTitle,
  status,
  fromDate,
  toDate,
  amount,
  navigation,
  OnPressCard,
}: Prop) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{
        backgroundColor: AppColors.app_light,
        paddingHorizontal: responsiveWidth(4),
        paddingVertical: responsiveHeight(2),
        borderRadius: 10,
      }}
      onPress={OnPressCard}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: responsiveWidth(3),
        }}
      >
        <Image
          source={AppImages.service_one}
          style={{ width: 45, height: 45, borderRadius: 10 }}
        />
        <View>
          <AppText
            textColor={AppColors.Dark_themeColor}
            textSize={1.6}
            title={title}
            textFontWeight
          />
          <AppText
            textColor={AppColors.ThemeColor}
            textSize={1.5}
            title={`${capitalizeFirstLetter(subTitle)} Plan ID#A23456`}
          />
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <View
            style={{
              backgroundColor:
                status === 'new'
                  ? AppColors.lighttest_yellow
                  : status === 'Completed'
                  ? AppColors.lighttest_green
                  : AppColors.lighttest_gray,
              paddingHorizontal: responsiveWidth(3),
              paddingVertical: responsiveHeight(0.5),
              borderRadius: 100,
            }}
          >
            <AppText
              title={capitalizeFirstLetter(
                status === 'new' ? 'Active' : status,
              )}
              textSize={1.2}
              textColor={
                status === 'new'
                  ? AppColors.dark_yellow
                  : status === 'Completed'
                  ? AppColors.darkGreen
                  : AppColors.darkest
              }
            />
          </View>
        </View>
      </View>

      <LineBreak space={2} />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: responsiveWidth(2),
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: responsiveWidth(2),
          }}
        >
          <View
            style={{
              width: 20,
              height: 20,
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 100,
              borderColor: AppColors.ThemeColor,
            }}
          >
            <SVGXml icon={AppIcons.calendar_small} width={12} height={12} />
          </View>
          <AppText
            textColor={AppColors.ThemeColor}
            textSize={1.5}
            title={'From'}
          >
            :{' '}
            <AppText
              textColor={AppColors.ThemeColor}
              textSize={1.5}
              title={moment(fromDate).format('DD/MM/YY')}
              textFontWeight
            />
          </AppText>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: responsiveWidth(2),
          }}
        >
          <View
            style={{
              width: 20,
              height: 20,
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 100,
              borderColor: AppColors.ThemeColor,
            }}
          >
            <SVGXml icon={AppIcons.calendar_small} width={12} height={12} />
          </View>
          <AppText textColor={AppColors.ThemeColor} textSize={1.5} title={'To'}>
            :{' '}
            <AppText
              textColor={AppColors.ThemeColor}
              textSize={1.5}
              title={moment(toDate).format('DD/MM/YY')}
              textFontWeight
            />
          </AppText>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: responsiveWidth(2),
          }}
        >
          <View
            style={{
              width: 20,
              height: 20,
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 100,
              borderColor: AppColors.ThemeColor,
            }}
          >
            <SVGXml icon={AppIcons.dollar_small} width={12} height={12} />
          </View>
          <AppText
            textColor={AppColors.ThemeColor}
            textSize={1.5}
            title={'Paid'}
          >
            :{' '}
            <AppText
              textColor={AppColors.ThemeColor}
              textSize={1.5}
              title={`$${amount?.toFixed(1)}` || '$0.0'}
              textFontWeight
            />
          </AppText>
        </View>
      </View>

      {status === 'Completed' && (
        <View>
          <LineBreak space={2} />

          <AppText
            textColor={AppColors.ThemeColor}
            textSize={1.5}
            title={'Remarks by admin:'}
          />
          <LineBreak space={0.5} />
          <AppText
            textColor={AppColors.ThemeColor}
            textSize={1.5}
            title={
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nis'
            }
          />
          <LineBreak space={2} />
          <AppButton
            title={'Review'}
            textSize={2}
            btnPadding={10}
            textFontWeight={false}
            handlePress={() => navigation.navigate('ReviewsAndRatings')}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ManageBookingsCard;
