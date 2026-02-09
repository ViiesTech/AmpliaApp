import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import Container from '../../../components/Container';
import AppHeader from '../../../components/AppHeader';
import AppText from '../../../components/AppText';
import Loader from '../../../components/Loader';
import SVGXml from '../../../assets/icons/SVGXML';
import { AppIcons } from '../../../assets/icons';
import { AppColors, responsiveFontSize, responsiveHeight, responsiveWidth, thousandsSeprator } from '../../../utils';
import { useLazyGetAllTaxCategoriesQuery, useCalculateTaxMutation } from '../../../redux/services/mainService';
import LineBreak from '../../../components/LineBreak';
import AppButton from '../../../components/AppButton';

const Calculator = () => {
  const [selectedYear, setSelectedYear] = useState('');
  const [taxType, setTaxType] = useState('Salary');
  const [filer, setFiler] = useState('Filer');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState(null);

  const [getAllCategories, { data: categoriesData, isLoading: isCategoriesLoading }] = useLazyGetAllTaxCategoriesQuery();
  const [calculateTax, { isLoading: isCalculating }] = useCalculateTaxMutation();

  useEffect(() => {
    getAllCategories();
  }, [getAllCategories]);

  // Extract unique values for filters
  const years = Array.from(new Set(categoriesData?.data?.map(cat => cat.year.toString()) || [])).sort((a, b) => b - a);
  const taxTypes = Array.from(new Set(categoriesData?.data?.map(cat => cat.taxType) || []));
  const filerStatuses = Array.from(new Set(categoriesData?.data?.map(cat => cat.filerStatus) || []));

  useEffect(() => {
    if (years.length > 0 && !selectedYear) {
      setSelectedYear(years[0]);
    }
    if (taxTypes.length > 0 && !taxType) {
      setTaxType(taxTypes[0]);
    }
    if (filerStatuses.length > 0 && !filer) {
      setFiler(filerStatuses[0]);
    }
  }, [years, taxTypes, filerStatuses, selectedYear, taxType, filer]);

  // Filter categories by year, taxType, and filer status
  const filteredCategories = categoriesData?.data?.filter(cat => {
    const matchesYear = cat.year.toString() === selectedYear;
    const matchesType = cat.taxType === taxType;
    const matchesFiler = cat.filerStatus === filer;
    return matchesYear && matchesType && matchesFiler;
  }) || [];

  const handleCalculate = async () => {
    if (!selectedCategory || !amount.trim()) {
      Alert.alert('Error', 'Please select a year, category and enter an amount');
      return;
    }

    try {
      const res = await calculateTax({
        categoryId: selectedCategory._id,
        amount: parseFloat(amount.replace(/,/g, ''))
      }).unwrap();
      setResult(res.data);
    } catch (err) {
      console.error('Calculation error:', err);
      Alert.alert('Error', 'Failed to calculate tax');
    }
  };

  const reset = () => {
    setResult(null);
    setAmount('');
    setSelectedCategory(null);
    setSelectedYear('');
    setTaxType('Salary');
    setFiler('Filer');
  };

  return (
    <Container>
      <View style={{ marginHorizontal: responsiveWidth(5), flex: 1 }}>
        <AppHeader
          onBackPress={false}
          heading={'Tax Calculator'}
        // rightIcon={
        //   <TouchableOpacity
        //     style={styles.headerRightIcon}
        //   >
        //     <SVGXml icon={AppIcons.horizontal_icon} width={20} height={20} />
        //   </TouchableOpacity>
        // }
        />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
          <View style={styles.taxSummaryCard}>
            <AppText
              textColor={AppColors.ThemeColor}
              textSize={1.8}
              title={result ? 'Calculated Tax' : 'Total Monthly Tax'}
            />
            <AppText
              textColor={AppColors.ThemeColor}
              textSize={4}
              title={`$${thousandsSeprator(result ? result.taxAmount : '0')}`}
              textFontWeight
            />
          </View>

          <LineBreak space={3} />

          {isCategoriesLoading ? (
            <Loader color={AppColors.ThemeColor} />
          ) : result ? (
            <View style={styles.resultDetails}>
              <AppText title="Calculation Breakdown" textSize={2} textFontWeight />
              <LineBreak space={1} />
              <ResultRow label="Category" value={result.category} />
              <ResultRow label="Year" value={result.year} />
              <ResultRow label="Tax Rate" value={`${result.rate}%`} />
              <ResultRow label="Original Amount" value={`$${thousandsSeprator(result.originalAmount)}`} />
              <View style={styles.divider} />
              <ResultRow label="Total Amount" value={`$${thousandsSeprator(result.totalAmount)}`} isBold />

              <LineBreak space={2} />
              <AppButton title="Calculate Again" handlePress={reset} />
            </View>
          ) : (
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
              <AppText
                textColor={AppColors.Dark_themeColor}
                textSize={2}
                textFontWeight
                title={'Enter Your details'}
              />

              <LineBreak space={1.5} />

              <View style={styles.form}>
                {/* Year Selection */}
                <AppText title="Select Tax Year" textSize={1.6} textFontWeight style={styles.label} />
                <View style={styles.chipRow}>
                  {years.map(year => (
                    <TouchableOpacity
                      key={year}
                      style={[styles.chip, selectedYear === year && styles.chipActive]}
                      onPress={() => {
                        setSelectedYear(year);
                        setSelectedCategory(null);
                      }}
                    >
                      <AppText title={year} textColor={selectedYear === year ? AppColors.WHITE : AppColors.BLACK} />
                    </TouchableOpacity>
                  ))}
                  {years.length === 0 && <AppText title="No tax years available" textColor={AppColors.GRAY} />}
                </View>

                {selectedYear && (
                  <>
                    <LineBreak space={1} />
                    {/* Tax Type Selection */}
                    <AppText title="Tax Type" textSize={1.6} textFontWeight style={styles.label} />
                    <View style={styles.chipRow}>
                      {Array.from(new Set(categoriesData?.data?.map(cat => cat.taxType) || [])).map(type => (
                        <TouchableOpacity
                          key={type}
                          style={[styles.chip, taxType === type && styles.chipActive]}
                          onPress={() => {
                            setTaxType(type);
                            setSelectedCategory(null);
                          }}
                        >
                          <AppText title={type} textColor={taxType === type ? AppColors.WHITE : AppColors.BLACK} />
                        </TouchableOpacity>
                      ))}
                    </View>

                    <LineBreak space={1} />
                    {/* Filer Status Selection */}
                    <AppText title="Filer Status" textSize={1.6} textFontWeight style={styles.label} />
                    <View style={styles.chipRow}>
                      {filerStatuses.map(status => (
                        <TouchableOpacity
                          key={status}
                          style={[styles.chip, filer === status && styles.chipActive]}
                          onPress={() => {
                            setFiler(status);
                            setSelectedCategory(null);
                          }}
                        >
                          <AppText title={status} textColor={filer === status ? AppColors.WHITE : AppColors.BLACK} />
                        </TouchableOpacity>
                      ))}
                    </View>

                    <LineBreak space={1} />
                    {/* Category Selection */}
                    <AppText title="Select Category" textSize={1.6} textFontWeight style={styles.label} />
                    <View style={styles.catGrid}>
                      {filteredCategories.map(cat => (
                        <TouchableOpacity
                          key={cat._id}
                          style={[styles.catOption, selectedCategory?._id === cat._id && styles.catOptionActive]}
                          onPress={() => setSelectedCategory(cat)}
                        >
                          <AppText
                            title={cat.name}
                            textFontWeight
                            textAlignment="center"
                            textColor={selectedCategory?._id === cat._id ? AppColors.WHITE : AppColors.BLACK}
                          />
                          <AppText
                            title={`${cat.rate}%`}
                            textSize={1.2}
                            textAlignment="center"
                            textColor={selectedCategory?._id === cat._id ? AppColors.WHITE : AppColors.ThemeColor}
                          />
                        </TouchableOpacity>
                      ))}
                      {filteredCategories.length === 0 && (
                        <AppText title="No categories found for this selection" textColor={AppColors.GRAY} />
                      )}
                    </View>
                  </>
                )}

                <LineBreak space={2} />

                <AppText title="Monthly Income" textSize={1.6} textFontWeight style={styles.label} />
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Income Amount"
                    keyboardType="numeric"
                    value={thousandsSeprator(amount)}
                    onChangeText={text => {
                      const rawValue = text.replace(/[^0-9]/g, '');
                      setAmount(rawValue);
                    }}
                  />
                </View>

                <LineBreak space={2} />
                <AppButton
                  title={isCalculating ? 'Calculating...' : 'Calculate'}
                  handlePress={handleCalculate}
                  disabled={isCalculating}
                />
              </View>
            </KeyboardAvoidingView>
          )}
        </ScrollView>
      </View>
    </Container>
  );
};

const ResultRow = ({ label, value, color = AppColors.BLACK, isBold = false }) => (
  <View style={styles.resultRow}>
    <AppText title={label} textColor={AppColors.GRAY} />
    <AppText title={value} textFontWeight={isBold} textColor={color} />
  </View>
);

export default Calculator;

const styles = StyleSheet.create({
  headerRightIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: AppColors.app_light,
  },
  taxSummaryCard: {
    backgroundColor: AppColors.app_light,
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(2),
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  form: {
    gap: 10,
  },
  label: {
    marginBottom: 5,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: AppColors.WHITE,
    borderWidth: 1,
    borderColor: AppColors.LIGHTGRAY,
  },
  chipActive: {
    backgroundColor: AppColors.ThemeColor,
    borderColor: AppColors.ThemeColor,
  },
  catGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  catOption: {
    width: '48%',
    padding: 12,
    backgroundColor: AppColors.WHITE,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: AppColors.LIGHTGRAY,
  },
  catOptionActive: {
    backgroundColor: AppColors.ThemeColor,
    borderColor: AppColors.ThemeColor,
  },
  inputWrapper: {
    backgroundColor: AppColors.WHITE,
    borderWidth: 1,
    borderColor: AppColors.LIGHTGRAY,
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 55,
    justifyContent: 'center',
  },
  input: {
    fontSize: responsiveFontSize(1.8),
    color: AppColors.BLACK,
    height: '100%',
  },
  resultDetails: {
    backgroundColor: AppColors.WHITE,
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: AppColors.LIGHTGRAY,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  divider: {
    height: 1,
    backgroundColor: AppColors.LIGHTGRAY,
    marginVertical: 10,
  }
});
