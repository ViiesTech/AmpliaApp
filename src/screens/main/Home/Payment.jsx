import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Container from '../../../components/Container';
import AppHeader from '../../../components/AppHeader';
import AppText from '../../../components/AppText';
import AppTextInput from '../../../components/AppTextInput';
import AppButton from '../../../components/AppButton';
import LineBreak from '../../../components/LineBreak';

import {
  AppColors,
  capitalizeFirstLetter,
  responsiveHeight,
  responsiveWidth,
  ShowToast,
} from '../../../utils';
import { useCreateBookingMutation } from '../../../redux/services/mainService';

const Payment = props => {
  const navigation = useNavigation();

  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const [createBooking, { isLoading }] = useCreateBookingMutation();

  let serviceId = props?.route?.params?.serviceId;
  let selectedPlan = props?.route?.params?.selectedPlan;
  let serviceName = props?.route?.params?.serviceName;

  const handleCardNumberChange = text => {
    const formattedText =
      text
        .replace(/\D/g, '')
        .match(/.{1,4}/g)
        ?.join(' ') || '';
    if (formattedText.length <= 19) {
      setCardNumber(formattedText);
    }
  };

  const handleExpiryChange = text => {
    let formattedText = text.replace(/\D/g, '');
    if (formattedText.length >= 3) {
      formattedText = `${formattedText.slice(0, 2)}/${formattedText.slice(
        2,
        4,
      )}`;
    }
    if (formattedText.length <= 5) {
      setExpiry(formattedText);
    }
  };

  const handlePayment = async () => {
    if (!cardName || !cardNumber || !expiry || !cvc) {
      ShowToast('Please fill in all fields');
      return;
    }
    if (cardNumber.replace(/\s/g, '').length < 16) {
      ShowToast('Invalid Card Number');
      return;
    }
    if (expiry.length < 5) {
      ShowToast('Invalid Expiry Date');
      return;
    }
    if (cvc.length < 3) {
      ShowToast('Invalid CVC');
      return;
    }

    let payload = {
      service: serviceId,
      planName: selectedPlan?.name,
      status: 'new' || 'scheduled',
      scheduledDate: new Date().toISOString(),
    };
    await createBooking(payload)
      ?.unwrap()
      ?.then(res => {
        console.log('res in createBooking:-', res);
        ShowToast('Booking Created Successfully');
        navigation.navigate('Main', { screen: 'Bookings' });
      })
      ?.catch(err => {
        console.log('err in createBooking:-', err);
        ShowToast(err?.data?.message || 'Something went wrong');
      });
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
              title={serviceName || 'Service Name'}
              textSize={2}
              textColor={AppColors.BLACK}
              textFontWeight
            />
            <AppText
              title={`${capitalizeFirstLetter(selectedPlan?.name)} Plan`}
              textSize={1.6}
              textColor={AppColors.BLACK}
            />
          </View>

          <View style={styles.amountWrapper}>
            <View style={styles.amountBadge}>
              <AppText
                title={
                  selectedPlan ? `$${selectedPlan?.price?.toFixed(2)}` : '$0.00'
                }
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
          maxLength={20}
          value={cardName}
          onChangeText={setCardName}
        />

        <LineBreak space={1} />

        <AppTextInput
          inputPlaceHolder="Card Number"
          borderWidth={1}
          borderColor={AppColors.LIGHTGRAY}
          keyboardType="numeric"
          value={cardNumber}
          onChangeText={handleCardNumberChange}
          maxLength={19}
        />

        <LineBreak space={1} />

        <View style={styles.row}>
          <AppTextInput
            inputPlaceHolder="MM/YY"
            borderWidth={1}
            borderColor={AppColors.LIGHTGRAY}
            inputWidth={32}
            keyboardType="numeric"
            value={expiry}
            onChangeText={handleExpiryChange}
            maxLength={5}
          />
          <AppTextInput
            inputPlaceHolder="CVC"
            borderWidth={1}
            borderColor={AppColors.LIGHTGRAY}
            inputWidth={32}
            keyboardType="numeric"
            value={cvc}
            onChangeText={setCvc}
            maxLength={3}
            // secureTextEntry
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
