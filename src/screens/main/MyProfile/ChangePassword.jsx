import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Container from '../../../components/Container';
import { AppColors, responsiveFontSize, responsiveWidth } from '../../../utils';
import AppHeader from '../../../components/AppHeader';
import AppTextInput from '../../../components/AppTextInput';
import LineBreak from '../../../components/LineBreak';
import AppButton from '../../../components/AppButton';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ChangePassword = () => {
    const [visible, setVisible] = useState({
    current: false,
    newPass: false,
    confirm: false,
  });

  const toggle = (key: 'current' | 'newPass' | 'confirm') => {
    setVisible(prev => ({ ...prev, [key]: !prev[key] }));
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
            secureTextEntry={visible.current}
            rightIcon={
              <TouchableOpacity onPress={() => toggle('current')}>
                <Ionicons
                  name={visible.current ? 'eye-off' : 'eye'}
                  size={responsiveFontSize(2)}
                  color={AppColors.GRAY}
                />
              </TouchableOpacity>
            }
          />
          <LineBreak space={1} />
          <AppTextInput
            inputPlaceHolder={'Enter New Password'}
            borderWidth={1}
            borderColor={AppColors.LIGHTGRAY}
            secureTextEntry={visible.newPass}
            inputWidth={74}
            rightIcon={
              <TouchableOpacity onPress={() => toggle('newPass')}>
                <Ionicons
                  name={visible.newPass ? 'eye-off' : 'eye'}
                  size={responsiveFontSize(2)}
                  color={AppColors.GRAY}
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
            secureTextEntry={visible.confirm}
            rightIcon={
              <TouchableOpacity onPress={() => toggle('confirm')}>
                <Ionicons
                  name={visible.confirm ? 'eye-off' : 'eye'}
                  size={responsiveFontSize(2)}
                  color={AppColors.GRAY}
                />
              </TouchableOpacity>
            }
          />
          <LineBreak space={1} />
          <AppButton title={'Save Changes'} />
        </View>
      </View>
    </Container>
  );
};

export default ChangePassword;
