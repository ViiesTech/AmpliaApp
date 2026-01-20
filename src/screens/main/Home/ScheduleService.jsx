import React, { useState } from 'react';
import { View } from 'react-native';
import Container from '../../../components/Container';
import { responsiveWidth } from '../../../utils';
import AppHeader from '../../../components/AppHeader';
import CustomRangeCalendar from '../../../components/CustomRangeCalendar';
import { useNavigation } from '@react-navigation/native';
import LineBreak from '../../../components/LineBreak';
import AppButton from '../../../components/AppButton';

const ScheduleService = (props) => {
  const [selectedRange, setSelectedRange] = useState({
    start: null,
    end: null,
  });

  const nav = useNavigation();
  let serviceId = props?.route?.params?.serviceId;
  let selectedPlan = props?.route?.params?.selectedPlan;
  let serviceName = props?.route?.params?.serviceName;

  // console.log('selectedRange:', selectedRange);

  const isRangeComplete = selectedRange.start && selectedRange.end;

  return (
    <Container>
      <View style={{ paddingHorizontal: responsiveWidth(6) }}>
        <AppHeader onBackPress heading="Schedule Service" />

        <CustomRangeCalendar onChange={setSelectedRange} />

        <LineBreak space={2} />

        <AppButton
          title="Continue"
          disabled={!isRangeComplete}
          handlePress={() => nav.navigate('Payment', { selectedRange, serviceId, selectedPlan, serviceName })}
        />
      </View>
    </Container>
  );
};

export default ScheduleService;
