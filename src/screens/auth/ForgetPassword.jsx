/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View } from 'react-native';
import Container from '../../components/Container';
import { AppColors, responsiveHeight, responsiveWidth } from '../../utils';
import { useNavigation } from '@react-navigation/native';
import LineBreak from '../../components/LineBreak';
import BackIcon from '../../components/BackIcon';
import { AppIcons } from '../../assets/icons';
import SVGXml from '../../assets/icons/SVGXML';
import AppTextInput from '../../components/AppTextInput';
import AppButton from '../../components/AppButton';

const ForgetPassword = () => {
  const nav = useNavigation();
  const [isEmailFocused, setIsEmailFocused] = useState(false);

  return (
    <Container
      scrollEnabled={false}
      safeAreaViewStyle={{
        flex: 1,
        paddingHorizontal: responsiveWidth(5),
      }}
    >
      <LineBreak space={2} />
      <BackIcon onPress={() => nav.goBack()} />
      <View style={{ flex: 0.8, justifyContent: 'center' }}>
        <View>
          <SVGXml
            icon={AppIcons.forget_password}
            width={responsiveWidth(60)}
            height={responsiveHeight(10)}
          />
        </View>
        <AppTextInput
          inputPlaceHolder={'Write Your Email'}
          borderWidth={1}
          borderColor={AppColors.LIGHTGRAY}
          isFocused={isEmailFocused}
          onFocus={() => setIsEmailFocused(true)}
          onBlur={() => setIsEmailFocused(false)}
        />
        <LineBreak space={2} />
        <AppButton
          title={'Continue'}
          handlePress={() => nav.navigate('CreateNewPassword')}
        />
      </View>
    </Container>
  );
};

export default ForgetPassword;
