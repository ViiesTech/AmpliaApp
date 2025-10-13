import React from 'react';
import { View } from 'react-native';
import Container from '../../../components/Container';
import { responsiveWidth } from '../../../utils';
import AppHeader from '../../../components/AppHeader';
import CustomRangeCalendar from '../../../components/CustomRangeCalendar';
import { useNavigation } from '@react-navigation/native';
import LineBreak from '../../../components/LineBreak';
import AppButton from '../../../components/AppButton';

const ScheduleService = () => {
  const nav = useNavigation();

  return (
    <Container>
      <View style={{ paddingHorizontal: responsiveWidth(6) }}>
        <AppHeader onBackPress={true} heading={'Schedule Service'} />
        <CustomRangeCalendar />
        <LineBreak space={2} />
        <AppButton
          title={'Continue'}
          handlePress={() => nav.navigate('Payment')}
        />
      </View>
    </Container>
  );
};

export default ScheduleService;
