import React, { useState, useCallback, useEffect, Fragment } from 'react';
import {
  View,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';

import Container from '../../../components/Container';
import BackIcon from '../../../components/BackIcon';
import AppText from '../../../components/AppText';
import LineBreak from '../../../components/LineBreak';
import AppButton from '../../../components/AppButton';
import RatingView from '../../../components/RatingView';
import RatingWithProgressbar from '../../../components/RatingWithProgressbar';

import { AppImages } from '../../../assets/images';
import { AppIcons } from '../../../assets/icons';
import SVGXml from '../../../assets/icons/SVGXML';

import {
  AppColors,
  capitalizeFirstLetter,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils';
import { useLazyGetSingleServiceQuery } from '../../../redux/services/mainService';
import Loader from '../../../components/Loader';

/* -------------------- STATIC DATA -------------------- */

const tabsData = [
  { id: 1, title: 'Standard Plan $250' },
  { id: 2, title: 'Premium Plan $250' },
];

const statsData = [
  { id: 1, title: 'Lorem ipsum dolor', option: 'Yes' },
  { id: 2, title: 'Excepteur sint occaecat', option: 'No' },
  { id: 3, title: 'Lorem ipsum dolor', option: 'Yes' },
  { id: 4, title: 'Tempor incididunt', option: 'Yes' },
  { id: 5, title: 'Nostrud exercitation', option: 'Yes' },
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
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
  },
  {
    id: 2,
    image: AppImages.consultant,
    name: 'Emma Thompson',
    rating: '4.5',
    time: '2 minutes ago',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
  },
];

/* -------------------- COMPONENT -------------------- */

const ServiceDetails = props => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState(0);
  const [plans, setPlans] = useState([]);
  const [data, setData] = useState(null);
  let serviceId = props?.route?.params?.serviceId;

  const [getSingleService, { isLoading }] = useLazyGetSingleServiceQuery();

  useEffect(() => {
    _getSingleService(serviceId);
  }, [serviceId]);

  const _getSingleService = async serviceId => {
    await getSingleService(serviceId)
      ?.unwrap()
      ?.then(res => {
        console.log('res in _getSingleService', res?.service);
        setData(res?.service);

        const formattedPlans =
          res?.service?.plans?.map((item, index) => ({
            id: index + 1,
            title: `${item.name} $${item.price}`,
            description: item.description,
          })) || [];

        setPlans(formattedPlans);
      })
      ?.catch(err => console.log('err in _getSingleService', err));
  };

  /* -------------------- RENDER FUNCTIONS -------------------- */

  const renderPackageTab = useCallback(
    ({ item, index }) => (
      <TouchableOpacity onPress={() => setSelectedTab(index)}>
        <AppText
          title={capitalizeFirstLetter(item.title)}
          textSize={2}
          textFontWeight
          textAlignment="center"
          textColor={AppColors.ThemeColor}
          textwidth={42}
          borderBottomWidth={4}
          paddingBottom={0.5}
          borderBottomColor={
            selectedTab === index ? AppColors.ThemeColor : AppColors.WHITE
          }
        />
      </TouchableOpacity>
    ),
    [selectedTab],
  );

  const renderStatItem = ({ item }) => (
    <View style={styles.statRow}>
      <AppText title={item.title} textSize={1.8} textColor={AppColors.GRAY} />
      <AppText title={item.option} textSize={1.8} textColor={AppColors.GRAY} />
    </View>
  );

  const renderRatingItem = ({ item }) => (
    <View style={styles.ratingRow}>
      <View style={styles.starRow}>
        <AppText title={item.rating} textSize={1.8} />
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
        title={`${item.progress < 10 ? `0${item.progress}` : item.progress}%`}
        textSize={1.8}
        textColor={AppColors.ThemeColor}
      />
    </View>
  );

  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <Image source={item.image} style={styles.avatar} />

        <View>
          <AppText title={item.name} textSize={1.8} textFontWeight />
          <View style={styles.reviewRating}>
            <RatingView rating={4.5} width={2} starSize={18} />
            <AppText title="4.5" textSize={1.8} />
          </View>
        </View>

        <View style={styles.reviewTime}>
          <AppText title={item.time} textSize={1.6} />
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
  );

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <Loader color={AppColors.ThemeColor} />
      </View>
    );
  }
  console.log('selectedTab', selectedTab);
  /* -------------------- UI -------------------- */

  return (
    <Fragment>
      <Container>
        {/* HEADER */}
        <ImageBackground
          source={data?.cover ? { uri: data?.cover } : AppImages.service_bg}
          imageStyle={styles.headerRadius}
          style={styles.header}
        >
          <LineBreak space={8} />
          <View style={styles.headerRow}>
            <BackIcon onPress={navigation.goBack} />
            <BackIcon
              icon={<SVGXml icon={AppIcons.save} width={20} height={20} />}
            />
          </View>
        </ImageBackground>

        <View style={styles.content}>
          <AppText title={data?.name} textSize={3} textFontWeight />

          <View style={styles.inlineRating}>
            <RatingView rating={data?.averageRating || 0.5} />
            <AppText title={data?.averageRating} textSize={1.8} />
          </View>

          <LineBreak space={2} />

          <AppText title="About the Service" textSize={2} textFontWeight />
          <LineBreak space={1} />

          <AppText
            title={data?.description || 'N/A'}
            textSize={1.8}
            textColor={AppColors.GRAY}
          />

          <LineBreak space={3} />

          <AppText title="Packages" textSize={2} textFontWeight />

          <FlatList
            data={plans}
            horizontal
            contentContainerStyle={{ marginTop: 10 }}
            keyExtractor={item => item.id.toString()}
            renderItem={renderPackageTab}
            showsHorizontalScrollIndicator={false}
          />

          <View style={styles.statsBox}>
            <FlatList
              data={statsData}
              scrollEnabled={false}
              keyExtractor={item => item.id.toString()}
              renderItem={renderStatItem}
            />
          </View>

          <LineBreak space={2} />

          <AppText title="Rating & Reviews" textSize={2} textFontWeight />
          <LineBreak space={1} />

          <View style={styles.ratigRow1}>
            <AppText
              title={'All Ratings (48)'}
              textSize={2}
              textColor={AppColors.ThemeColor}
              textFontWeight
            />
            <View style={styles.ratingRow2}>
              <RatingView rating={4.5} />
              <AppText
                title={'4.5'}
                textSize={1.8}
                textColor={AppColors.GRAY}
                textFontWeight
              />
            </View>
          </View>

          <View>
            <FlatList
              data={ratingData}
              scrollEnabled={false}
              keyExtractor={item => item.id.toString()}
              ItemSeparatorComponent={<LineBreak space={2} />}
              renderItem={renderRatingItem}
            />
          </View>
        </View>

        <LineBreak space={2} />

        <FlatList
          data={reviewsData}
          horizontal
          keyExtractor={item => item.id.toString()}
          renderItem={renderReviewItem}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.reviewList}
        />
      </Container>

      {/* FOOTER */}
      <View style={styles.footer}>
        <AppButton
          title="Book Service"
          handlePress={() => navigation.navigate('Payment')}
        />
        <LineBreak space={1} />
        <AppButton
          title="Schedule For Later"
          borderWidth={1}
          borderColor={AppColors.ThemeColor}
          textColor={AppColors.ThemeColor}
          btnBackgroundColor={AppColors.WHITE}
          handlePress={() => navigation.navigate('ScheduleService')}
        />
      </View>

      <LineBreak space={2} />
    </Fragment>
  );
};

export default ServiceDetails;

/* -------------------- STYLES -------------------- */

const styles = StyleSheet.create({
  header: {
    width: responsiveWidth(100),
    height: responsiveHeight(30),
    paddingHorizontal: responsiveWidth(4),
  },
  headerRadius: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  content: {
    marginTop: 15,
    paddingHorizontal: responsiveWidth(6),
  },
  inlineRating: {
    flexDirection: 'row',
    gap: responsiveWidth(2),
    alignItems: 'center',
  },
  statsBox: {
    backgroundColor: AppColors.app_light,
    paddingHorizontal: responsiveWidth(3),
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: responsiveHeight(1),
    borderBottomWidth: 1,
    borderBottomColor: AppColors.LIGHTGRAY,
    paddingHorizontal: responsiveWidth(2),
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  starRow: {
    flexDirection: 'row',
    gap: responsiveWidth(0.5),
    alignItems: 'center',
  },
  reviewList: {
    paddingHorizontal: responsiveWidth(6),
    gap: responsiveWidth(6),
  },
  reviewCard: {
    backgroundColor: 'rgba(241, 247, 248, 1)',
    padding: responsiveWidth(4),
    borderRadius: 20,
    width: responsiveWidth(80),
    marginBottom: 10,
  },
  reviewHeader: {
    flexDirection: 'row',
    gap: responsiveWidth(2),
  },
  reviewRating: {
    flexDirection: 'row',
    gap: responsiveWidth(2),
    alignItems: 'center',
  },
  reviewTime: {
    flex: 1,
    alignItems: 'flex-end',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: AppColors.ThemeColor,
  },
  footer: {
    paddingHorizontal: responsiveWidth(6),
  },
  ratigRow1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingRow2: {
    flexDirection: 'row',
    gap: responsiveWidth(2),
    alignItems: 'center',
  },
  loaderContainer: {
    flex: 1,
    backgroundColor: AppColors.containerColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
