import React, { useState } from 'react';
import { View } from 'react-native';
import Container from '../../../components/Container';
import { AppColors, responsiveHeight, responsiveWidth } from '../../../utils';
import AppHeader from '../../../components/AppHeader';
import AppButton from '../../../components/AppButton';
import { useNavigation } from '@react-navigation/native';
import AppTextInput from '../../../components/AppTextInput';
import LineBreak from '../../../components/LineBreak';
import StarRating from 'react-native-star-rating-widget';

const ReviewsAndRatings = () => {
  const nav = useNavigation();
  const [rating, setRating] = useState(0);

  return (
    <Container safeAreaViewStyle={{ marginBottom: responsiveHeight(-6) }}>
      <View style={{ marginHorizontal: responsiveWidth(5) }}>
        <AppHeader onBackPress={true} heading={'Reviews & Ratings'} />
        <StarRating rating={rating} onChange={setRating} />
        <LineBreak space={2} />
        <AppTextInput
          inputPlaceHolder={'Write Your Reviews'}
          borderWidth={1}
          borderColor={AppColors.LIGHTGRAY}
          borderRadius={10}
          textAlignVertical={'top'}
          multiline={true}
          inputHeight={15}
        />
        <LineBreak space={2} />
        <AppButton
          title={'Submit'}
          textFontWeight={false}
          handlePress={() => nav.goBack()}
        />
      </View>
    </Container>
  );
};

export default ReviewsAndRatings;
