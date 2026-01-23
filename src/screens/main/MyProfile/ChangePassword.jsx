import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Container from '../../../components/Container';
import {
  AppColors,
  responsiveFontSize,
  responsiveWidth,
  ShowToast,
} from '../../../utils';
import AppHeader from '../../../components/AppHeader';
import AppTextInput from '../../../components/AppTextInput';
import LineBreak from '../../../components/LineBreak';
import GradientButton from '../../../components/GradientButton';
import SVGXml from '../../../assets/icons/SVGXML';
import { AppIcons } from '../../../assets/icons';
import { useChangePasswordMutation } from '../../../redux/services/mainService';

const ChangePassword = () => {
  const [visible, setVisible] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    current: false,
    newPass: false,
    confirm: false,
  });
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const toggle = (key: 'current' | 'newPass' | 'confirm') => {
    setVisible(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const onChangeText = (key, value) => {
    setVisible(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const onSaveChanges = async () => {
    if (!visible.currentPassword) {
      ShowToast('Please enter your current password');
      return;
    }

    if (!visible.newPassword) {
      ShowToast('Please enter your new password');
      return;
    }

    if (!visible.confirmNewPassword) {
      ShowToast('Please confirm your new password');
      return;
    }
    if (visible.newPassword.length < 8) {
      ShowToast('Password is too weak');
      return;
    }
    if (visible.newPassword !== visible.confirmNewPassword) {
      ShowToast(`Password doesn't match`);
      return;
    }
    let data = {
      currentPassword: visible.currentPassword,
      newPassword: visible.newPassword,
      confirmNewPassword: visible.confirmNewPassword,
    };
    await changePassword(data)
      .unwrap()
      .then(res => {
        console.log('password change response ===>', res);
        ShowToast(res?.message || 'Password updated successfully');
      })
      .catch(error => {
        ShowToast(error?.data?.message || 'Failed to change your password');
        console.log('failed to change your password ===>', error);
      });
  };

  return (
    <Container>
      <View style={{ paddingHorizontal: responsiveWidth(5) }}>
        <AppHeader onBackPress={true} heading={'Change Password'} />

        <View>
          <AppTextInput
            inputPlaceHolder={'Enter Current Password'}
            borderWidth={1}
            borderColor={AppColors.LIGHTGRAY}
            inputWidth={74}
            value={visible.currentPassword}
            onChangeText={text => onChangeText('currentPassword', text)}
            secureTextEntry={visible.current}
            rightIcon={
              <TouchableOpacity onPress={() => toggle('current')}>
                <SVGXml
                  icon={visible.current ? AppIcons.eye_closed(AppColors.GRAY) : AppIcons.eye_open(AppColors.GRAY)}
                  width={responsiveFontSize(2)}
                  height={responsiveFontSize(2)}
                />
              </TouchableOpacity>
            }
          />
          <LineBreak space={1} />
          <AppTextInput
            inputPlaceHolder={'Enter New Password'}
            borderWidth={1}
            borderColor={AppColors.LIGHTGRAY}
            value={visible.newPassword}
            onChangeText={text => onChangeText('newPassword', text)}
            secureTextEntry={visible.newPass}
            inputWidth={74}
            rightIcon={
              <TouchableOpacity onPress={() => toggle('newPass')}>
                <SVGXml
                  icon={visible.newPass ? AppIcons.eye_closed(AppColors.GRAY) : AppIcons.eye_open(AppColors.GRAY)}
                  width={responsiveFontSize(2)}
                  height={responsiveFontSize(2)}
                />
              </TouchableOpacity>
            }
          />
          <LineBreak space={1} />
          <AppTextInput
            inputPlaceHolder={'Confirm New Password'}
            borderWidth={1}
            borderColor={AppColors.LIGHTGRAY}
            inputWidth={74}
            value={visible.confirmNewPassword}
            onChangeText={text => onChangeText('confirmNewPassword', text)}
            secureTextEntry={visible.confirm}
            rightIcon={
              <TouchableOpacity onPress={() => toggle('confirm')}>
                <SVGXml
                  icon={visible.confirm ? AppIcons.eye_closed(AppColors.GRAY) : AppIcons.eye_open(AppColors.GRAY)}
                  width={responsiveFontSize(2)}
                  height={responsiveFontSize(2)}
                />
              </TouchableOpacity>
            }
          />
          <LineBreak space={1} />
          <GradientButton
            onPress={onSaveChanges}
            loading={isLoading}
            title={'Save Changes'}
          />
        </View>
      </View>
    </Container>
  );
};

export default ChangePassword;
