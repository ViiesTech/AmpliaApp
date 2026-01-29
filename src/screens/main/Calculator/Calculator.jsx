/* eslint-disable react-native/no-inline-styles */
import React, { useState, useCallback, useEffect } from 'react';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
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
import { BASE_URL } from '../../../redux/constant';

// US Federal Tax Brackets - Single Filer (2024)
// These are fallback values - will be overridden by API data from Admin Panel
const DEFAULT_TAX_BRACKETS = {
  '2024': [
    { min: 0, max: 11600, rate: 0.10, base: 0 },
    { min: 11601, max: 47150, rate: 0.12, base: 1160 },
    { min: 47151, max: 100525, rate: 0.22, base: 5426 },
    { min: 100526, max: 191950, rate: 0.24, base: 17168.50 },
    { min: 191951, max: 243725, rate: 0.32, base: 39110.50 },
    { min: 243726, max: 609350, rate: 0.35, base: 55678.50 },
    { min: 609351, max: Infinity, rate: 0.37, base: 183647.25 },
  ],
  '2023': [
    { min: 0, max: 11000, rate: 0.10, base: 0 },
    { min: 11001, max: 44725, rate: 0.12, base: 1100 },
    { min: 44726, max: 95375, rate: 0.22, base: 5147 },
    { min: 95376, max: 182100, rate: 0.24, base: 16290 },
    { min: 182101, max: 231250, rate: 0.32, base: 37104 },
    { min: 231251, max: 578125, rate: 0.35, base: 52832 },
    { min: 578126, max: Infinity, rate: 0.37, base: 174238.25 },
  ],
  '2022': [
    { min: 0, max: 10275, rate: 0.10, base: 0 },
    { min: 10276, max: 41775, rate: 0.12, base: 1027.50 },
    { min: 41776, max: 89075, rate: 0.22, base: 4807.50 },
    { min: 89076, max: 170050, rate: 0.24, base: 15213.50 },
    { min: 170051, max: 215950, rate: 0.32, base: 34647.50 },
    { min: 215951, max: 539900, rate: 0.35, base: 49335.50 },
    { min: 539901, max: Infinity, rate: 0.37, base: 162718 },
  ],
};

// Calculate annual tax based on income and year
const calculateAnnualTax = (annualIncome, year, taxBrackets) => {
  const brackets = taxBrackets[year] || taxBrackets['2024'] || DEFAULT_TAX_BRACKETS['2024'];
  
  for (const bracket of brackets) {
    if (annualIncome >= bracket.min && annualIncome <= bracket.max) {
      return bracket.base + (annualIncome - bracket.min) * bracket.rate;
    }
  }
  
  // If income exceeds all brackets, use the highest bracket
  const lastBracket = brackets[brackets.length - 1];
  return lastBracket.base + (annualIncome - lastBracket.min) * lastBracket.rate;
};

const Calculator = () => {
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [selectedYear, setSelectedYear] = useState(null);
  const [monthlyTax, setMonthlyTax] = useState(0);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [taxBrackets, setTaxBrackets] = useState(DEFAULT_TAX_BRACKETS);
  const [isLoading, setIsLoading] = useState(true);
  const [filingStatus, setFilingStatus] = useState('single');

  const yearOptions = [
    { label: '2024', value: '2024' },
    { label: '2023', value: '2023' },
    { label: '2022', value: '2022' },
  ];

  const filingStatusOptions = [
    { label: 'Single', value: 'single' },
    { label: 'Married Filing Jointly', value: 'married_jointly' },
    { label: 'Married Filing Separately', value: 'married_separately' },
    { label: 'Head of Household', value: 'head_of_household' },
  ];

  // Fetch tax brackets from Admin Panel API
  useEffect(() => {
    const fetchTaxBrackets = async () => {
      try {
        const response = await fetch(`${BASE_URL}settings/tax-brackets`);
        if (response.ok) {
          const data = await response.json();
          if (data.taxBrackets) {
            setTaxBrackets(data.taxBrackets);
          }
        }
      } catch (error) {
        console.log('Using default tax brackets:', error.message);
        // Will use DEFAULT_TAX_BRACKETS as fallback
      } finally {
        setIsLoading(false);
      }
    };
    fetchTaxBrackets();
  }, []);

  const handleCalculate = useCallback(() => {
    const income = parseFloat(monthlyIncome.replace(/,/g, '')) || 0;
    const year = selectedYear || '2024';
    
    // Convert monthly to annual income
    const annualIncome = income * 12;
    
    // Calculate annual tax
    const annualTax = calculateAnnualTax(annualIncome, year, taxBrackets);
    
    // Convert back to monthly
    const monthly = annualTax / 12;
    
    setMonthlyTax(monthly);
    setHasCalculated(true);
  }, [monthlyIncome, selectedYear, taxBrackets]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
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
            inputPlaceHolder={'Monthly Income (USD)'}
            borderWidth={1}
            borderColor={AppColors.LIGHTGRAY}
            value={monthlyIncome}
            onChangeText={setMonthlyIncome}
            keyboardType="numeric"
          />
          <LineBreak space={1} />
          <AppDropDown 
            items={filingStatusOptions}
            value={filingStatus}
            onChangeValue={setFilingStatus}
            placeholder="Filing Status"
            zIndex={3000}
            zIndexInverse={1000}
          />
          <LineBreak space={1} />
          <AppDropDown 
            items={yearOptions}
            value={selectedYear}
            onChangeValue={setSelectedYear}
            placeholder="Tax Year"
            zIndex={2000}
            zIndexInverse={2000}
          />
          <LineBreak space={1} />
          <GradientButton 
            title={isLoading ? 'Loading...' : 'Calculate'} 
            onPress={handleCalculate}
            loading={isLoading}
          />
        </View>
      </View>
    </Container>
  );
};

export default Calculator;
