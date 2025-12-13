/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Container from '../../components/Container';
import {
  AppColors,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
  ShowToast,
} from '../../utils';
import { useNavigation } from '@react-navigation/native';
import LineBreak from '../../components/LineBreak';
import BackIcon from '../../components/BackIcon';
import { AppIcons } from '../../assets/icons';
import SVGXml from '../../assets/icons/SVGXML';
import AppTextInput from '../../components/AppTextInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppButton from '../../components/AppButton';
import { useResetPasswordMutation } from '../../redux/services/authService';

const CreateNewPassword = ({ route }) => {
  const nav = useNavigation();
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] =
    useState(false);
  const [isShow, setIsShow] = useState(true);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(true);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetPassword,{isLoading}] = useResetPasswordMutation();

  const { email, type } = route?.params;

  // console.log(email,type)

  const onContinuePress = async () => {
    if (type === 'forget') {
      if (!password) {
        ShowToast('Please enter password');
        return;
      }

      if (password.length < 6) {
        ShowToast('Password must be at least 6 characters long');
        return;
      }
      if (password !== confirmPassword) {
        ShowToast('Password doesn\'t match');
        return;
      } 

      let data = {
        email,
        password,
        confirmPassword
      }

      await resetPassword(data).unwrap().then(res => {
        console.log('reset password response ===>',res)
        if(res.success) {
          ShowToast(res.message)
          nav.navigate('SignIn')
        }
      })
      .catch(err => {
        console.log('error while reset password', err);
        return ShowToast(err?.data?.message || 'Some problem occured')
      }); 

    } else {
      nav.goBack();
    }

    // nav.navigate('SignIn');
  };

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
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View>
          <SVGXml
            icon={AppIcons.create_new_password}
            width={responsiveWidth(80)}
            height={responsiveHeight(10)}
          />
        </View>
        <LineBreak space={1} />
        <AppTextInput
          inputPlaceHolder={'Password'}
          borderWidth={1}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={isShow}
          isFocused={isPasswordFocused}
          onFocus={() => setIsPasswordFocused(true)}
          onBlur={() => setIsPasswordFocused(false)}
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
        <AppTextInput
          inputPlaceHolder={'Confirm Password'}
          borderWidth={1}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={isShowConfirmPassword}
          isFocused={isConfirmPasswordFocused}
          onFocus={() => setIsConfirmPasswordFocused(true)}
          onBlur={() => setIsConfirmPasswordFocused(false)}
          inputWidth={72}
          rightIcon={
            <TouchableOpacity
              onPress={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
            >
              <Ionicons
                name={isShowConfirmPassword ? 'eye-off' : 'eye'}
                size={responsiveFontSize(2.5)}
                color={
                  isConfirmPasswordFocused
                    ? AppColors.ThemeColor
                    : AppColors.DARKGRAY
                }
              />
            </TouchableOpacity>
          }
          borderColor={AppColors.LIGHTGRAY}
        />
        <LineBreak space={1} />
        <AppButton indicator={isLoading} title={'Continue'} handlePress={() => onContinuePress()} />
        <LineBreak space={1} />
      </View>
    </Container>
  );
};

export default CreateNewPassword;
