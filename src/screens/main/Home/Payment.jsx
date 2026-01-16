import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Container from '../../../components/Container';
import AppHeader from '../../../components/AppHeader';
import AppText from '../../../components/AppText';
import AppTextInput from '../../../components/AppTextInput';
import AppButton from '../../../components/AppButton';
import LineBreak from '../../../components/LineBreak';

import { AppColors, responsiveHeight, responsiveWidth } from '../../../utils';

const Payment = () => {
  const navigation = useNavigation();

  const handlePayment = () => {
    navigation.navigate('Main', { screen: 'Bookings' });
  };

  return (
    <Container>
      <View style={styles.container}>
        <AppHeader onBackPress heading="Payment" />

        {/* Payment Summary */}
        <View style={styles.summaryCard}>
          <View>
            <AppText
              title="Payment Summary"
              textSize={1.6}
              textColor={AppColors.GRAY}
            />
            <AppText
              title="Individual Tax Filing"
              textSize={2}
              textColor={AppColors.BLACK}
              textFontWeight
            />
            <AppText
              title="Standard Plan"
              textSize={1.6}
              textColor={AppColors.BLACK}
            />
          </View>

          <View style={styles.amountWrapper}>
            <View style={styles.amountBadge}>
              <AppText
                title="$250.00"
                textSize={1.8}
                textColor={AppColors.WHITE}
                textFontWeight
              />
            </View>
          </View>
        </View>

        <LineBreak space={2} />

        {/* Card Details */}
        <AppText
          title="Enter Card Details"
          textSize={2}
          textColor={AppColors.BLACK}
          textFontWeight
        />

        <LineBreak space={1} />

        <AppTextInput
          inputPlaceHolder="Cardholder Name"
          borderWidth={1}
          borderColor={AppColors.LIGHTGRAY}
        />

        <LineBreak space={1} />

        <AppTextInput
          inputPlaceHolder="Card Number"
          borderWidth={1}
          borderColor={AppColors.LIGHTGRAY}
          keyboardType="numeric"
        />

        <LineBreak space={1} />

        <View style={styles.row}>
          <AppTextInput
            inputPlaceHolder="MM/YY"
            borderWidth={1}
            borderColor={AppColors.LIGHTGRAY}
            inputWidth={32}
            keyboardType="numeric"
          />
          <AppTextInput
            inputPlaceHolder="CVC"
            borderWidth={1}
            borderColor={AppColors.LIGHTGRAY}
            inputWidth={32}
            keyboardType="numeric"
          />
        </View>

        <LineBreak space={2} />

        <AppButton title="Continue To Pay" handlePress={handlePayment} />
      </View>

      <LineBreak space={2} />
    </Container>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: responsiveWidth(6),
  },
  summaryCard: {
    backgroundColor: AppColors.app_light,
    paddingVertical: responsiveHeight(1.5),
    paddingHorizontal: responsiveWidth(4),
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountWrapper: {
    flex: 1,
    alignItems: 'flex-end',
  },
  amountBadge: {
    backgroundColor: AppColors.ThemeColor,
    paddingHorizontal: responsiveWidth(6),
    paddingVertical: responsiveHeight(1.5),
    borderRadius: 100,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
