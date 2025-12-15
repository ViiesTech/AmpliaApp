/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Image, TouchableOpacity, FlatList } from 'react-native';
import Container from '../../../components/Container';
import {
  AppColors,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils';
import AppHeader from '../../../components/AppHeader';
import Entypo from 'react-native-vector-icons/Entypo';
import { AppImages } from '../../../assets/images';
import AppText from '../../../components/AppText';
import LineBreak from '../../../components/LineBreak';
import SVGXml from '../../../assets/icons/SVGXML';
import { AppIcons } from '../../../assets/icons';
import AppButton from '../../../components/AppButton';
import { useSelector } from 'react-redux';


const MyAccount = () => {
  
  const {user} = useSelector(state => state.persistedData)
  
  const data = [
    { id: 1, title: 'Email', subTitle: `${user?.email || ''}`, isShowBadge: true },
    { id: 2, title: 'Phone number', subTitle: '65998794454654' },
    { id: 3, title: 'Unique ID', subTitle: `#${user?._id.slice(-4)}` },
  ];
  console.log(user)

  return (
    <Container>
      <View style={{ paddingHorizontal: responsiveWidth(5) }}>
        <AppHeader
          onBackPress={true}
          heading={'My Account'}
          // rightIcon={
          //   <Entypo
          //     name="dots-three-vertical"
          //     size={responsiveFontSize(2)}
          //     color={AppColors.ThemeColor}
          //   />
          // }
        />

        <View
          style={{
            flexDirection: 'row',
            gap: responsiveWidth(3),
            alignItems: 'center',
            backgroundColor: AppColors.app_light,
            paddingHorizontal: responsiveWidth(3),
            paddingVertical: responsiveHeight(2),
            borderRadius: 15,
          }}
        >
          <Image
            source={{uri: user?.profile} || AppImages.userprofile}
            style={{ width: 45, height: 45, borderRadius: 100 }}
          />
          <View>
            <AppText
              title={`${user?.firstName || ''} ${user?.lastName || ''}`}
              textSize={2}
              textColor={AppColors.ThemeColor}
              textFontWeight
            />
            <AppText
              title={`#${user?._id.slice(-4)}`}
              textSize={1.6}
              textColor={AppColors.ThemeColor}
            />
          </View>

          <View style={{  alignItems: 'flex-end' }}>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: AppColors.ThemeColor,
                paddingHorizontal: responsiveWidth(4),
                paddingVertical: responsiveHeight(1),
                borderRadius: 100,
              }}
            >
              <AppText
                title={'Change Image'}
                textSize={1.6}
                textColor={AppColors.ThemeColor}
                textFontWeight
              />
            </TouchableOpacity>
          </View>
        </View>
        <LineBreak space={2} />
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: AppColors.LIGHTGRAY,
                paddingVertical: responsiveHeight(2),
                flexDirection: 'row',
              }}
            >
              <View>
                <AppText
                  title={item.title}
                  textSize={2}
                  textColor={AppColors.BLACK}
                  textFontWeight
                />
                <AppText
                  title={item.subTitle}
                  textSize={1.6}
                  textColor={AppColors.BLACK}
                />
              </View>
              {item.isShowBadge && (
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    gap: responsiveWidth(2),
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}
                >
                  <SVGXml icon={AppIcons.correct} width={15} height={15} />
                  <AppText
                    title={'Verified User'}
                    textSize={1.6}
                    textColor={AppColors.ThemeColor}
                  />
                </View>
              )}
            </View>
          )}
        />
        <LineBreak space={2} />

        <AppButton
          title={'Delete Account'}
          borderWidth={2}
          borderColor={AppColors.RED_COLOR}
          textColor={AppColors.RED_COLOR}
          btnBackgroundColor={AppColors.WHITE}
        />
      </View>
    </Container>
  );
};

export default MyAccount;
