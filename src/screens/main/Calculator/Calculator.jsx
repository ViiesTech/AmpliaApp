/* eslint-disable react-native/no-inline-styles */
import React, { useState, useCallback } from 'react';
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
import GradientButton from '../../../components/GradientButton';

// Australian Tax Brackets for different financial years
const TAX_BRACKETS = {
  '2024-25': [
    { min: 0, max: 18200, rate: 0, base: 0 },
    { min: 18201, max: 45000, rate: 0.16, base: 0 },
    { min: 45001, max: 135000, rate: 0.30, base: 4288 },
    { min: 135001, max: 190000, rate: 0.37, base: 31288 },
    { min: 190001, max: Infinity, rate: 0.45, base: 51638 },
  ],
  '2023-24': [
    { min: 0, max: 18200, rate: 0, base: 0 },
    { min: 18201, max: 45000, rate: 0.19, base: 0 },
    { min: 45001, max: 120000, rate: 0.325, base: 5092 },
    { min: 120001, max: 180000, rate: 0.37, base: 29467 },
    { min: 180001, max: Infinity, rate: 0.45, base: 51667 },
  ],
  '2022-23': [
    { min: 0, max: 18200, rate: 0, base: 0 },
    { min: 18201, max: 45000, rate: 0.19, base: 0 },
    { min: 45001, max: 120000, rate: 0.325, base: 5092 },
    { min: 120001, max: 180000, rate: 0.37, base: 29467 },
    { min: 180001, max: Infinity, rate: 0.45, base: 51667 },
  ],
};

// Calculate annual tax based on income and year
const calculateAnnualTax = (annualIncome, year) => {
  const brackets = TAX_BRACKETS[year] || TAX_BRACKETS['2024-25'];
  
  for (const bracket of brackets) {
    if (annualIncome >= bracket.min && annualIncome <= bracket.max) {
      return bracket.base + (annualIncome - bracket.min + 1) * bracket.rate;
    }
  }
  
  // If income exceeds all brackets, use the highest bracket
  const lastBracket = brackets[brackets.length - 1];
  return lastBracket.base + (annualIncome - lastBracket.min + 1) * lastBracket.rate;
};

const Calculator = () => {
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [selectedYear, setSelectedYear] = useState(null);
  const [monthlyTax, setMonthlyTax] = useState(0);
  const [hasCalculated, setHasCalculated] = useState(false);

  const yearOptions = [
    { label: '2024-25', value: '2024-25' },
    { label: '2023-24', value: '2023-24' },
    { label: '2022-23', value: '2022-23' },
  ];

  const handleCalculate = useCallback(() => {
    const income = parseFloat(monthlyIncome.replace(/,/g, '')) || 0;
    const year = selectedYear || '2024-25';
    
    // Convert monthly to annual income
    const annualIncome = income * 12;
    
    // Calculate annual tax
    const annualTax = calculateAnnualTax(annualIncome, year);
    
    // Convert back to monthly
    const monthly = annualTax / 12;
    
    setMonthlyTax(monthly);
    setHasCalculated(true);
  }, [monthlyIncome, selectedYear]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <Container >
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
            title={'Total Monthly Tax'}
          />
          <AppText
            textColor={AppColors.ThemeColor}
            textSize={4}
            title={hasCalculated ? formatCurrency(monthlyTax) : '$0.00'}
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
            value={monthlyIncome}
            onChangeText={setMonthlyIncome}
            keyboardType="numeric"
          />
          <LineBreak space={1} />
          <AppDropDown 
            items={yearOptions}
            value={selectedYear}
            onChangeValue={setSelectedYear}
            placeholder="Choose year"
          />
          <LineBreak space={1} />
          <GradientButton 
            title={'Calculate'} 
            onPress={handleCalculate}
          />
        </View>
      </View>
    </Container>
  );
};

export default Calculator;
