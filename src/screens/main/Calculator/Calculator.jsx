/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Container from '../../../components/Container';
import { AppColors, responsiveHeight, responsiveWidth } from '../../../utils';
import AppHeader from '../../../components/AppHeader';
import SVGXml from '../../../assets/icons/SVGXML';
import { AppIcons } from '../../../assets/icons';
import AppText from '../../../components/AppText';
import LineBreak from '../../../components/LineBreak';
import AppTextInput from '../../../components/AppTextInput';
import AppDropDown from '../../../components/AppDropDown';
import AppButton from '../../../components/AppButton';

const Calculator = () => {
  return (
    <Container>
      <View style={{ marginHorizontal: responsiveWidth(5) }}>
        <AppHeader
          onBackPress={false}
          heading={'Tax Calculator'}
          rightIcon={
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 40,
                height: 40,
                borderRadius: 100,
                backgroundColor: AppColors.app_light,
              }}
            >
              <SVGXml icon={AppIcons.horizontal_icon} width={20} height={20} />
            </TouchableOpacity>
          }
        />

        <View
          style={{
            backgroundColor: AppColors.app_light,
            paddingHorizontal: responsiveWidth(4),
            paddingVertical: responsiveHeight(2),
            borderRadius: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <AppText
            textColor={AppColors.ThemeColor}
            textSize={1.8}
            title={'Total Monthlty Tax'}
          />
          <AppText
            textColor={AppColors.ThemeColor}
            textSize={4}
            title={'$2105.00'}
            textFontWeight
          />
        </View>

        <LineBreak space={3} />

        <AppText
          textColor={AppColors.Dark_themeColor}
          textSize={2}
          textFontWeight
          title={'Enter Your details'}
        />

        <LineBreak space={1.5} />

        <View>
          <AppTextInput
            inputPlaceHolder={'Monthly Income'}
            borderWidth={1}
            borderColor={AppColors.LIGHTGRAY}
          />
          <LineBreak space={1} />

          <AppDropDown />

          <LineBreak space={1} />
          <AppButton title={'Calculate'} />
        </View>
      </View>
    </Container>
  );
};

export default Calculator;
