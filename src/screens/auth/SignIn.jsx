/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';
import AppText from '../../components/AppText';
import AppButton from '../../components/AppButton';
import { useNavigation } from '@react-navigation/native';
import { useLoginMutation } from '../../redux/services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';

/* -------------------- STORAGE KEYS -------------------- */

const REMEMBER_ME_KEY = 'REMEMBER_ME';
const USER_CREDENTIALS_KEY = 'USER_CREDENTIALS';

const SignIn = () => {
  const [isShow, setIsShow] = useState(true);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [checked, setChecked] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login, { isLoading }] = useLoginMutation();
  const nav = useNavigation();

  /* -------------------- LOAD REMEMBERED USER -------------------- */

  useEffect(() => {
    const loadRememberedUser = async () => {
      try {
        const rememberMe = await AsyncStorage.getItem(REMEMBER_ME_KEY);
        const credentials = await AsyncStorage.getItem(USER_CREDENTIALS_KEY);

        if (rememberMe === 'true' && credentials) {
          const parsed = JSON.parse(credentials);
          setEmail(parsed.email);
          setPassword(parsed.password);
          setChecked(true);
        }
      } catch (error) {
        console.log('Error loading remembered user:', error);
      }
    };

    loadRememberedUser();
  }, []);

  /* -------------------- LOGIN -------------------- */

  const onLoginPress = async () => {
    if (!email) {
      ShowToast('Please enter your email');
      return;
    }
    if (!password) {
      ShowToast('Please enter your password');
      return;
    }

    const data = { email, password };

    try {
      const res = await login(data).unwrap();

      if (res.success) {
        ShowToast(res.message);

        if (checked) {
          await AsyncStorage.setItem(REMEMBER_ME_KEY, 'true');
          await AsyncStorage.setItem(
            USER_CREDENTIALS_KEY,
            JSON.stringify({ email, password }),
          );
        } else {
          await AsyncStorage.removeItem(REMEMBER_ME_KEY);
          await AsyncStorage.removeItem(USER_CREDENTIALS_KEY);
        }

        // Navigate after successful login
        // nav.reset({ index: 0, routes: [{ name: 'Home' }] });
      }
    } catch (err) {
      console.log('Login error:', err);
      ShowToast(err?.data?.message || 'Some problem occurred');
    }
  };

  return (
    <Container
      showScrollBar={false}
      safeAreaViewStyle={{ paddingHorizontal: responsiveWidth(5) }}
    >
      <Image source={AppImages.horizontal_logo} style={styles.image} />
      <LineBreak space={1} />
      <SVGXml icon={AppIcons.sign_in} width={90} height={90} />

      <View>
        {/* -------------------- EMAIL -------------------- */}
        <AppTextInput
          inputPlaceHolder="Email"
          borderWidth={1}
          value={email}
          onChangeText={setEmail}
          borderColor={AppColors.LIGHTGRAY}
          isFocused={isEmailFocused}
          onFocus={() => setIsEmailFocused(true)}
          onBlur={() => setIsEmailFocused(false)}
        />

        <LineBreak space={1} />

        {/* -------------------- PASSWORD -------------------- */}
        <AppTextInput
          inputPlaceHolder="Password"
          borderWidth={1}
          value={password}
          onChangeText={setPassword}
          isFocused={isPasswordFocused}
          onFocus={() => setIsPasswordFocused(true)}
          onBlur={() => setIsPasswordFocused(false)}
          secureTextEntry={isShow}
          inputWidth={72}
          rightIcon={
            <TouchableOpacity onPress={() => setIsShow(!isShow)}>
              <Ionicons
                name={isShow ? 'eye-off' : 'eye'}
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

        {/* -------------------- REMEMBER ME -------------------- */}
        <View style={styles.rememberRow}>
          <View style={styles.rememberLeft}>
            <CheckBox
              value={checked}
              onValueChange={setChecked}
              tintColors={{ true: AppColors.ThemeColor, false: '#C0C0C0' }}
              style={styles.checkbox}
            />
            <AppText
              title="Remember Me"
              textSize={1.8}
              textColor={AppColors.ThemeColor}
            />
          </View>

          <TouchableOpacity onPress={() => nav.navigate('ForgetPassword')}>
            <AppText
              title="Forget Password?"
              textSize={1.8}
              textFontWeight
              textColor={AppColors.ThemeColor}
            />
          </TouchableOpacity>
        </View>

        <LineBreak space={1} />

        <AppButton
          indicator={isLoading}
          title="Sign In"
          handlePress={onLoginPress}

        />

        <LineBreak space={1} />

        <View style={styles.signupRow}>
          <AppText
            title="Don't have an account?"
            textSize={1.8}
            textColor={AppColors.Dark_themeColor}
          />
          <TouchableOpacity onPress={() => nav.navigate('SignUp')}>
            <AppText
              title=" Sign Up"
              textSize={1.8}
              textFontWeight
              textColor={AppColors.ThemeColor}
            />
          </TouchableOpacity>
        </View>
      </View>

      <LineBreak space={20} />

      <View style={styles.termsRow}>
        <AppText
          title="By signing in, you agree to our"
          textSize={1.5}
          textColor={AppColors.Dark_themeColor}
        />
        <AppText
          title=" Terms & Conditions"
          textSize={1.5}
          textColor={AppColors.ThemeColor}
        />
      </View>

      <LineBreak space={3} />
    </Container>
  );
};

export default SignIn;

/* -------------------- STYLES -------------------- */
const styles = StyleSheet.create({
  image: {
    width: responsiveWidth(49),
    resizeMode: 'contain',
    alignSelf: 'center',
    height: responsiveHeight(20),
  },
  checkbox: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  rememberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rememberLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsiveWidth(2),
  },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  termsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
