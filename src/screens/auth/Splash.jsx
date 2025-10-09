/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { Image, View } from 'react-native';
import Container from '../../components/Container';
import { AppImages } from '../../assets/images';
import { responsiveHeight, responsiveWidth } from '../../utils';
import { useNavigation } from '@react-navigation/native';

const Splash = () => {
  const nav = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      nav.replace('SignIn');
    }, 2000);
  }, []);

  return (
    <Container scrollEnabled={false}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={AppImages.splash_image}
          style={{ width: responsiveWidth(100), height: responsiveHeight(17) }}
          resizeMode="contain"
        />
      </View>
    </Container>
  );
};

export default Splash;
