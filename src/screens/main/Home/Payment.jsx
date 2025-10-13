/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View } from 'react-native';
import Container from '../../../components/Container';
import AppHeader from '../../../components/AppHeader';
import { AppColors, responsiveHeight, responsiveWidth } from '../../../utils';
import AppText from '../../../components/AppText';
import { useNavigation } from '@react-navigation/native';
import LineBreak from '../../../components/LineBreak';
import AppTextInput from '../../../components/AppTextInput';
import AppButton from '../../../components/AppButton';

const Payment = () => {
  const nav = useNavigation();
  return (
    <Container>
      <View style={{ paddingHorizontal: responsiveWidth(6) }}>
        <AppHeader onBackPress={true} heading={'Payment'} />
        <View
          style={{
            backgroundColor: AppColors.app_light,
            paddingVertical: responsiveHeight(1.5),
            paddingHorizontal: responsiveWidth(4),
            borderRadius: 15,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View>
            <AppText
              title={'Payment Summary'}
              textSize={1.6}
              textColor={AppColors.GRAY}
            />
            <AppText
              title={'Individual Tax Filing'}
              textSize={2}
              textColor={AppColors.BLACK}
              textFontWeight
            />
            <AppText
              title={'Standard Plan'}
              textSize={1.6}
              textColor={AppColors.BLACK}
            />
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <View
              style={{
                backgroundColor: AppColors.ThemeColor,
                paddingHorizontal: responsiveWidth(6),
                paddingVertical: responsiveHeight(1.5),
                borderRadius: 100,
              }}
            >
              <AppText
                title={'$250.00'}
                textSize={1.8}
                textColor={AppColors.WHITE}
                textFontWeight
              />
            </View>
          </View>
        </View>
        <LineBreak space={2} />
        <AppText
          title={'Enter Card details'}
          textSize={2}
          textColor={AppColors.BLACK}
          textFontWeight
        />
        <LineBreak space={1} />
        <View>
          <AppTextInput
            inputPlaceHolder={'Cardholder Name'}
            borderWidth={1}
            borderColor={AppColors.LIGHTGRAY}
          />
          <LineBreak space={1} />
          <AppTextInput
            inputPlaceHolder={'Card Number'}
            borderWidth={1}
            borderColor={AppColors.LIGHTGRAY}
          />
          <LineBreak space={1} />
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <AppTextInput
              inputPlaceHolder={'Expiry Date'}
              borderWidth={1}
              inputWidth={32}
              borderColor={AppColors.LIGHTGRAY}
            />
            <AppTextInput
              inputPlaceHolder={'Expiry Your CVC'}
              borderWidth={1}
              inputWidth={32}
              borderColor={AppColors.LIGHTGRAY}
            />
          </View>
        </View>
        <LineBreak space={2} />
        <AppButton
          title={'Continue To Pay'}
          handlePress={() => nav.navigate('Main', {screen: 'Bookings'})}
        />
      </View>
      <LineBreak space={2} />
    </Container>
  );
};

export default Payment;
