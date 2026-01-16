/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Container from '../../../components/Container';
import {
  AppColors,
  calculateTax,
  thousandsSeprator,
  responsiveHeight,
  responsiveWidth,
  ShowToast,
} from '../../../utils';
import AppHeader from '../../../components/AppHeader';
import SVGXml from '../../../assets/icons/SVGXML';
import { AppIcons } from '../../../assets/icons';
import AppText from '../../../components/AppText';
import LineBreak from '../../../components/LineBreak';
import AppTextInput from '../../../components/AppTextInput';
import AppDropDown from '../../../components/AppDropDown';
import AppButton from '../../../components/AppButton';

const Calculator = () => {
  const [state, setState] = useState({
    totalTax: '0',
    monthlyIncome: '',
    year: '',
  });

  const handleCalculate = () => {
    if (!state?.monthlyIncome) {
      ShowToast('Monthly Income is missing.');
      return;
    }

    if (!state?.year) {
      ShowToast('Year is missing.');
      return;
    }

    const tax = calculateTax(state.monthlyIncome, state.year);

    setState(prev => ({
      ...prev,
      totalTax: `${tax}`,
    }));
  };

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
            title={`Rs.${thousandsSeprator(state?.totalTax)}`}
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
            keyboardType="numeric"
            value={thousandsSeprator(state.monthlyIncome)}
            onChangeText={text => {
              const rawValue = text.replace(/[^0-9]/g, '');
              setState({ ...state, monthlyIncome: rawValue });
            }}
          />

          <LineBreak space={1} />

          <AppDropDown
            value={state?.year}
            setValue={val => {
              setState({ ...state, year: val });
            }}
          />

          <LineBreak space={1} />
          <AppButton title={'Calculate'} handlePress={handleCalculate} />
        </View>
      </View>
    </Container>
  );
};

export default Calculator;
