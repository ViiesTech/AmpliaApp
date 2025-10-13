/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  View,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import Container from '../../../components/Container';
import { AppImages } from '../../../assets/images';
import {
  AppColors,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils';
import LineBreak from '../../../components/LineBreak';
import BackIcon from '../../../components/BackIcon';
import { useNavigation } from '@react-navigation/native';
import SVGXml from '../../../assets/icons/SVGXML';
import { AppIcons } from '../../../assets/icons';
import AppText from '../../../components/AppText';
import RatingView from '../../../components/RatingView';
import RatingWithProgressbar from '../../../components/RatingWithProgressbar';
import Entypo from 'react-native-vector-icons/Entypo';
import AppButton from '../../../components/AppButton';

const tabsData = [
  { id: 1, title: 'Standard Plan $250' },
  { id: 2, title: 'Premium Plan $250' },
];

const statsData = [
  { id: 1, title: 'Lorem ipsum dolor', option: 'Yes' },
  { id: 2, title: 'Excepteur sint occaecat', option: 'No' },
  { id: 3, title: 'Lorem ipsum dolor', option: 'Yes' },
  { id: 4, title: 'Tempor incididunt', option: 'Yes' },
  { id: 5, title: 'Nostrud exercitation ', option: 'Yes' },
];

const ratingData = [
  { id: 1, rating: 1, progress: 42 },
  { id: 2, rating: 2, progress: 65 },
  { id: 3, rating: 3, progress: 15 },
  { id: 4, rating: 4, progress: 22 },
  { id: 5, rating: 5, progress: 8 },
];

const reviewsData = [
  {
    id: 1,
    image: AppImages.consultant,
    name: 'Emma Thompson',
    rating: '4.5',
    time: 'A while ago',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
  },
  {
    id: 2,
    image: AppImages.consultant,
    name: 'Emma Thompson',
    rating: '4.5',
    time: '2 minutes ago',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
  },
];

const ServiceDetails = () => {
  const nav = useNavigation();
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <>
      <Container safeAreaViewStyle={{ marginBottom: responsiveHeight(-6) }}>
        <ImageBackground
          source={AppImages.service_bg}
          imageStyle={{
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
          }}
          style={{
            width: responsiveWidth(100),
            height: responsiveHeight(30),
            paddingHorizontal: responsiveWidth(4),
          }}
        >
          <LineBreak space={8} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <BackIcon onPress={() => nav.goBack()} />
            <BackIcon
              onPress={() => {}}
              icon={<SVGXml icon={AppIcons.save} width={20} height={20} />}
            />
          </View>
        </ImageBackground>
        <LineBreak space={1.5} />
        <View style={{ paddingHorizontal: responsiveWidth(6) }}>
          <AppText
            title={'Individual Tax Filing'}
            textSize={3}
            textColor={AppColors.BLACK}
            textFontWeight
          />
          <View
            style={{
              flexDirection: 'row',
              gap: responsiveWidth(2),
              alignItems: 'center',
            }}
          >
            <RatingView />
            <AppText
              title={'4.5'}
              textSize={1.8}
              textColor={AppColors.GRAY}
              textFontWeight
            />
          </View>
          <LineBreak space={2} />
          <AppText
            title={'About the Service'}
            textSize={2}
            textColor={AppColors.BLACK}
            textFontWeight
          />
          <LineBreak space={1} />
          <AppText
            title={
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
            }
            textSize={1.8}
            textColor={AppColors.GRAY}
          />
          <LineBreak space={3} />
          <AppText
            title={'Packages'}
            textSize={2}
            textColor={AppColors.BLACK}
            textFontWeight
          />
          <LineBreak space={1} />
          <View>
            <FlatList
              data={tabsData}
              horizontal
              contentContainerStyle={{
                flex: 1,
                justifyContent: 'space-between',
              }}
              renderItem={({ item, index }) => (
                <TouchableOpacity onPress={() => setSelectedTab(index)}>
                  <AppText
                    title={item.title}
                    textSize={2}
                    textColor={AppColors.ThemeColor}
                    textFontWeight
                    textAlignment={'center'}
                    textwidth={42}
                    borderBottomWidth={4}
                    paddingBottom={0.5}
                    borderBottomColor={
                      selectedTab == index
                        ? AppColors.ThemeColor
                        : AppColors.WHITE
                    }
                  />
                </TouchableOpacity>
              )}
            />
          </View>
          <View
            style={{
              backgroundColor: AppColors.app_light,
              paddingHorizontal: responsiveWidth(3),
            }}
          >
            <FlatList
              data={statsData}
              renderItem={({ item }) => (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: responsiveHeight(1),
                    borderBottomWidth: 1,
                    borderBottomColor: AppColors.LIGHTGRAY,
                    paddingHorizontal: responsiveWidth(2),
                  }}
                >
                  <AppText
                    title={item.title}
                    textSize={1.8}
                    textColor={AppColors.GRAY}
                  />
                  <AppText
                    title={item.option}
                    textSize={1.8}
                    textColor={AppColors.GRAY}
                  />
                </View>
              )}
            />
          </View>
          <LineBreak space={2} />
          <AppText
            title={'Rating & Reviews'}
            textSize={2}
            textColor={AppColors.BLACK}
            textFontWeight
          />

          <LineBreak space={1} />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <AppText
              title={'All Ratings (48)'}
              textSize={2}
              textColor={AppColors.ThemeColor}
              textFontWeight
            />
            <View
              style={{
                flexDirection: 'row',
                gap: responsiveWidth(2),
                alignItems: 'center',
              }}
            >
              <RatingView />
              <AppText
                title={'4.5'}
                textSize={1.8}
                textColor={AppColors.GRAY}
                textFontWeight
              />
            </View>
          </View>
          <LineBreak space={2} />
          <View>
            <FlatList
              data={ratingData}
              ItemSeparatorComponent={<LineBreak space={2} />}
              renderItem={({ item }) => (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: responsiveWidth(0.5),
                      alignItems: 'center',
                    }}
                  >
                    <AppText
                      title={item.rating}
                      textSize={1.8}
                      textColor={AppColors.ThemeColor}
                    />
                    <Entypo
                      name="star"
                      size={responsiveFontSize(2)}
                      color={AppColors.ThemeColor}
                    />
                  </View>
                  <RatingWithProgressbar
                    progress={item.progress}
                    animated
                    style={{ width: '80%' }}
                  />
                  <AppText
                    title={
                      item.progress < 10
                        ? `0${item.progress}%`
                        : `${item.progress}%`
                    }
                    textSize={1.8}
                    textColor={AppColors.ThemeColor}
                  />
                </View>
              )}
            />
          </View>
          <LineBreak space={2} />
          <AppText
            title={'Reviews'}
            textSize={2}
            textColor={AppColors.BLACK}
            textFontWeight
          />
        </View>

        <LineBreak space={2} />

        <FlatList
          data={reviewsData}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: responsiveWidth(6),
            gap: responsiveWidth(6),
          }}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: AppColors.appBgColor,
                paddingHorizontal: responsiveWidth(4),
                paddingVertical: responsiveHeight(2),
                borderRadius: 20,
                width: responsiveWidth(80),
              }}
            >
              <View style={{ flexDirection: 'row', gap: responsiveWidth(2) }}>
                <Image
                  source={item.image}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 100,
                    borderWidth: 1,
                    borderColor: AppColors.ThemeColor,
                  }}
                />
                <View>
                  <AppText
                    title={item.name}
                    textSize={1.8}
                    textColor={AppColors.Dark_themeColor}
                    textFontWeight
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: responsiveWidth(2),
                      alignItems: 'center',
                    }}
                  >
                    <RatingView width={2} starSize={18} />
                    <AppText
                      title={'4.5'}
                      textSize={1.8}
                      textColor={AppColors.GRAY}
                      textFontWeight
                    />
                  </View>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                  <AppText
                    title={item.time}
                    textSize={1.6}
                    textColor={AppColors.Dark_themeColor}
                  />
                </View>
              </View>
              <LineBreak space={1} />
              <AppText
                title={item.desc}
                textSize={1.8}
                textwidth={75}
                textColor={AppColors.Dark_themeColor}
              />
            </View>
          )}
        />

        <LineBreak space={2} />
      </Container>
      <View style={{ paddingHorizontal: responsiveWidth(6) }}>
        <AppButton
          title={'Book Service'}
          handlePress={() => nav.navigate('Payment')}
        />
        <LineBreak space={1} />
        <AppButton
          title={'Schedule For later'}
          borderWidth={1}
          borderColor={AppColors.ThemeColor}
          textColor={AppColors.ThemeColor}
          btnBackgroundColor={AppColors.WHITE}
          handlePress={() => nav.navigate('ScheduleService')}
        />
      </View>
      <LineBreak space={6} />
    </>
  );
};

export default ServiceDetails;
