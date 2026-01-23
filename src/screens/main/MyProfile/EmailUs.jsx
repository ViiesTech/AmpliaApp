import React from 'react';
import { View } from 'react-native';
import Container from '../../../components/Container';
import { AppColors, responsiveWidth } from '../../../utils';
import AppHeader from '../../../components/AppHeader';
import AppTextInput from '../../../components/AppTextInput';
import LineBreak from '../../../components/LineBreak';
import GradientButton from '../../../components/GradientButton';

const EmailUs = () => {
  return (
    <Container>
      <View style={{ paddingHorizontal: responsiveWidth(5) }}>
        <AppHeader onBackPress={true} heading={'Email Us'} />

        <View>
          <AppTextInput
            inputPlaceHolder={'Add Subject'}
            borderWidth={1}
            borderColor={AppColors.LIGHTGRAY}
          />
          <LineBreak space={1} />
          <AppTextInput
            inputPlaceHolder={'Write Your message here...'}
            borderWidth={1}
            borderColor={AppColors.LIGHTGRAY}
            multiline={true}
            borderRadius={12}
            inputHeight={15}
            textAlignVertical={'top'}
          />
          <LineBreak space={1} />
          <GradientButton title={'Send Email'} />
        </View>
      </View>
    </Container>
  );
};

export default EmailUs;
