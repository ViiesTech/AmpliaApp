/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Container from '../../components/Container';
import { AppImages } from '../../assets/images';
import {
  AppColors,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils';
import LineBreak from '../../components/LineBreak';
import SVGXml from '../../assets/icons/SVGXML';
import { AppIcons } from '../../assets/icons';
import AppTextInput from '../../components/AppTextInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';
import AppText from '../../components/AppText';
import AppButton from '../../components/AppButton';
import { useNavigation } from '@react-navigation/native';

const SignIn = () => {
  const [isShow, setIsShow] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isDefinitionChecked, setIsDefinitionChecked] = useState(false);
  const nav = useNavigation();

  return (
    <Container
      showScrollBar={false}
      safeAreaViewStyle={{
        paddingHorizontal: responsiveWidth(5),
        marginBottom: responsiveHeight(-18),
      }}
    >
      <Image source={AppImages.horizontal_logo} style={styles.image} />
      <LineBreak space={1} />
      <SVGXml icon={AppIcons.sign_in} width={90} height={90} />
      <View>
        <AppTextInput
          inputPlaceHolder={'Email'}
          borderWidth={1}
          borderColor={AppColors.LIGHTGRAY}
          isFocused={isEmailFocused}
          onFocus={() => setIsEmailFocused(true)}
          onBlur={() => setIsEmailFocused(false)}
        />
        <LineBreak space={1} />
        <AppTextInput
          inputPlaceHolder={'Password'}
          borderWidth={1}
          isFocused={isPasswordFocused}
          onFocus={() => setIsPasswordFocused(true)}
          onBlur={() => setIsPasswordFocused(false)}
          inputWidth={72}
          rightIcon={
            <TouchableOpacity onPress={() => setIsShow(!isShow)}>
              <Ionicons
                name={isShow ? 'eye' : 'eye-off'}
                size={responsiveFontSize(2.5)}
                color={
                  isPasswordFocused ? AppColors.ThemeColor : AppColors.DARKGRAY
                }
              />
            </TouchableOpacity>
          }
          borderColor={AppColors.LIGHTGRAY}
        />
        <LineBreak space={1} />

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
              gap: responsiveWidth(2),
              alignItems: 'center',
            }}
          >
            <CheckBox
              role="definition"
              onAnimationType="stroke"
              value={isDefinitionChecked}
              onValueChange={newValue => setIsDefinitionChecked(newValue)}
              tintColors={{ true: AppColors.ThemeColor, false: '#C0C0C0' }}
              style={styles.checkbox}
            />
            <AppText
              title={'Remember Me'}
              textSize={1.8}
              textColor={AppColors.ThemeColor}
            />
          </View>
          <TouchableOpacity onPress={() => nav.navigate('ForgetPassword')}>
            <AppText
              title={'Forget Password?'}
              textSize={1.8}
              textColor={AppColors.ThemeColor}
              textFontWeight
            />
          </TouchableOpacity>
        </View>
        <LineBreak space={1} />
        <AppButton title={'Sign In'} handlePress={() => nav.navigate("Main")} />
        <LineBreak space={1} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <AppText
            title={"Don't have an account?"}
            textSize={1.8}
            textColor={AppColors.Dark_themeColor}
          />
          <TouchableOpacity onPress={() => nav.navigate('SignUp')}>
            <AppText
              title={' Sign Up'}
              textSize={1.8}
              textFontWeight
              textColor={AppColors.ThemeColor}
            />
          </TouchableOpacity>
        </View>
      </View>

      <LineBreak space={20} />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <AppText
          title={'By signing in, you agree to our'}
          textSize={1.5}
          textColor={AppColors.Dark_themeColor}
        />
        <AppText
          title={' Terms & Conditions'}
          textSize={1.5}
          textColor={AppColors.ThemeColor}
        />
      </View>
      <LineBreak space={3} />
    </Container>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  image: {
    width: responsiveWidth(49),
    resizeMode: 'contain',
    alignSelf: 'center',
    height: responsiveHeight(20),
  },
  checkboxWrapper: {
    width: 28,
    height: 28,
    borderRadius: 14, // makes it rounded
    borderWidth: 2,
    borderColor: '#C0C0C0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkbox: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }], // scales size
    borderRadius: 100,
  },
});
