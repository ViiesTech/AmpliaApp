/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppText from './AppText';
import {
  AppColors,
  capitalizeFirstLetter,
  responsiveHeight,
  responsiveWidth,
} from '../utils';
import LineBreak from './LineBreak';
import SVGXml from '../assets/icons/SVGXML';
import { AppIcons } from '../assets/icons';
import moment from 'moment';

type Prop = {
  data?: any;
  status?: any;
};

const BookingChatStatus = ({ data, status }: Prop) => {
  const navigation = useNavigation();
  return (
    <View>
      <View
        style={{
          backgroundColor:
            status === 'new'
              ? AppColors.lighttest_yellow
              : status === 'Completed'
                ? AppColors.lighttest_green
                : AppColors.lighttest_gray,
          paddingVertical: responsiveHeight(0.5),
          borderRadius: 100,
          alignItems: 'center',
        }}
      >
        <AppText
          title={`Project Status : ${capitalizeFirstLetter(status === 'new' ? 'Active' : status)}`}
          textSize={1.5}
          textColor={
            status === 'new'
              ? AppColors.dark_yellow
              : status === 'Completed'
                ? AppColors.darkGreen
                : AppColors.darkest
          }
        />
      </View>
      <LineBreak space={1} />
      <View
        style={{
          backgroundColor:
            status === 'new'
              ? AppColors.lighttest_yellow
              : status === 'Completed'
                ? AppColors.lighttest_green
                : AppColors.lighttest_gray,
          paddingVertical: responsiveHeight(2),
          borderRadius: 15,
          paddingHorizontal: responsiveWidth(4),
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: responsiveWidth(1),
            }}
          >
            <SVGXml icon={AppIcons.requirements} width={20} height={20} />
            <AppText
              title={'Requirement & Details'}
              textSize={1.8}
              textColor={AppColors.ThemeColor}
            />
          </View>
          <AppText
            title={data?.status}
            textSize={1.8}
            textColor={AppColors.ThemeColor}
          />
        </View>

        <LineBreak space={1} />

        <AppText
          title={
            'Lorem ipsum dolor sit amet, consectetur adipicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem amet eiusmod tempor incididunt.'
          }
          textSize={1.6}
          textColor={AppColors.ThemeColor}
        />
      </View>

      <LineBreak space={1} />

      <View style={styles.container}>
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
              title={moment(data?.fromDate).format('DD/MM/YY')}
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
              title={moment(data?.scheduledDate).format('DD/MM/YY')}
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
              title={`$${data?.service?.plan?.price?.toFixed(1)}` || '$0.0'}
              textFontWeight
            />
          </AppText>
        </View>
      </View>

      <LineBreak space={1} />

      <View
        style={[
          styles.container,
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
        ]}
      >
        <AppText
          title={`${capitalizeFirstLetter(data?.service?.plan?.name)} Plan`}
          textSize={1.8}
          textColor={AppColors.ThemeColor}
        />
        <SVGXml icon={AppIcons.right_arrow_two} width={15} height={15} />
      </View>

      <LineBreak space={2} />
      <View
        style={[
          styles.container,
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('MyFiles', { bookingId: data._id });
          }}
          style={{ flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'space-between' }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: responsiveWidth(2) }}>
            <SVGXml icon={AppIcons.requirements} width={20} height={20} />
            <AppText
              title="View Booking Files"
              textSize={1.8}
              textColor={AppColors.ThemeColor}
              textFontWeight
            />
          </View>
          <SVGXml icon={AppIcons.right_arrow_two} width={15} height={15} />
        </TouchableOpacity>
      </View>

      <LineBreak space={2} />
    </View>
  );
};

export default BookingChatStatus;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: AppColors.LIGHTGRAY,
    paddingHorizontal: responsiveWidth(2),
    paddingVertical: responsiveHeight(1.5),
  },
});
