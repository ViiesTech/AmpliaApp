import React, { useState } from 'react';
import { View } from 'react-native';
import Container from '../../components/Container';
import { AppColors, responsiveHeight, responsiveWidth, ShowToast } from '../../utils';
import { useNavigation } from '@react-navigation/native';
import LineBreak from '../../components/LineBreak';
import BackIcon from '../../components/BackIcon';
import { AppIcons } from '../../assets/icons';
import SVGXml from '../../assets/icons/SVGXML';
import AppTextInput from '../../components/AppTextInput';
import GradientButton from '../../components/GradientButton';
import { useForgotPasswordMutation } from '../../redux/services/authService';

const ForgetPassword = () => {
  const nav = useNavigation();
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [email,setEmail] = useState('');
  const [forgotPassword,{isLoading}] = useForgotPasswordMutation();

  const onForgetPasswordPress = async () => {
    if(!email) {
      ShowToast('Please enter your email')
      return;
    }

    let data = {
      email
    }

   await forgotPassword(data)
      .unwrap()
      .then(res => {
        console.log('forgot password response ===>',res)
        if(res.success) {
          ShowToast(res.message)
          nav.navigate('EnterOtp',{email,type: 'forget'})
        }
      })
      .catch(err => {
        console.log('error while forgot password', err);
        return ShowToast(err?.data?.message || 'Some problem occured')
      });
 
  }

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
          value={email}
          onChangeText={text => setEmail(text)}
          borderColor={AppColors.LIGHTGRAY}
          isFocused={isEmailFocused}
          onFocus={() => setIsEmailFocused(true)}
          onBlur={() => setIsEmailFocused(false)}
        />
        <LineBreak space={2} />
        <GradientButton
          title={'Continue'}
          loading={isLoading}
          onPress={onForgetPasswordPress}
        />
      </View>
    </Container>
  );
};

export default ForgetPassword;
