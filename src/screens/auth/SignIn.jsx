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
  ShowToast,
} from '../../utils';
import LineBreak from '../../components/LineBreak';
import SVGXml from '../../assets/icons/SVGXML';
import { AppIcons } from '../../assets/icons';
import AppTextInput from '../../components/AppTextInput';

import CheckBox from '@react-native-community/checkbox';
import AppText from '../../components/AppText';
import GradientButton from '../../components/GradientButton';
import { useNavigation } from '@react-navigation/native';
import { useLoginMutation } from '../../redux/services/authService';

const SignIn = () => {
  const [isShow, setIsShow] = useState(true);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isDefinitionChecked, setIsDefinitionChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading }] = useLoginMutation();
  const nav = useNavigation();

  const onLoginPress = async () => {
    if (!email) {
      ShowToast('Please enter your email')
      return;
    }
    if (!password) {
      ShowToast('Please enter your password')
      return;
    }

    let data = {
      email,
      password
    }

    await login(data)
      .unwrap()
      .then(res => {
        console.log('login response ===>',res)
        if(res.success) {
          ShowToast(res.message)
        }
      })
      .catch(err => {
        console.log('error while login', err);
        return ShowToast(err?.data?.message || 'Some problem occured')
      });
  };

  return (
    <Container
      showScrollBar={false}
      safeAreaViewStyle={{
        paddingHorizontal: responsiveWidth(5),
      }}
    >
      <Image source={AppImages.horizontal_logo} style={styles.image} />
      <LineBreak space={1} />
      <SVGXml icon={AppIcons.sign_in} width={90} height={90} />
      <View>
        <AppTextInput
          inputPlaceHolder={'Email'}
          borderWidth={1}
          value={email}
          onChangeText={text => setEmail(text)}
          borderColor={AppColors.LIGHTGRAY}
          isFocused={isEmailFocused}
          onFocus={() => setIsEmailFocused(true)}
          onBlur={() => setIsEmailFocused(false)}
        />
        <LineBreak space={1} />
        <AppTextInput
          inputPlaceHolder={'Password'}
          borderWidth={1}
          value={password}
          onChangeText={text => setPassword(text)}
          isFocused={isPasswordFocused}
          onFocus={() => setIsPasswordFocused(true)}
          onBlur={() => setIsPasswordFocused(false)}
          secureTextEntry={isShow}
          inputWidth={72}
          rightIcon={
            <TouchableOpacity onPress={() => setIsShow(!isShow)}>
              <SVGXml
                icon={isShow ? AppIcons.eye_closed(isPasswordFocused ? AppColors.ThemeColor : AppColors.DARKGRAY) : AppIcons.eye_open(isPasswordFocused ? AppColors.ThemeColor : AppColors.DARKGRAY)}
                width={responsiveFontSize(2.5)}
                height={responsiveFontSize(2.5)}
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
              boxType="circle"
              onAnimationType="fade"
              value={isDefinitionChecked}
              onValueChange={newValue => setIsDefinitionChecked(newValue)}
              tintColors={{ true: AppColors.ThemeColor, false: '#C0C0C0' }}
              onCheckColor={AppColors.ThemeColor}
              onTintColor={AppColors.ThemeColor}
              tintColor="#C0C0C0"
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
        <GradientButton loading={isLoading} title="Sign In" onPress={() => onLoginPress()} />
        <LineBreak space={2} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
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
  checkbox: {
    transform: [{ scaleX: 0.85 }, { scaleY: 0.85 }],
    paddingLeft: 10,
  },
});
