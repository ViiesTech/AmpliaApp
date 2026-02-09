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
import Icon from 'react-native-vector-icons/Feather';

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
import { getImageUrl } from '../../../redux/constant';

import {
  AppColors,
  capitalizeFirstLetter,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils';
import { useLazyGetSingleServiceQuery, useLazyGetRatingsQuery } from '../../../redux/services/mainService';
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
  const passedService = props?.route?.params?.service;
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [plans, setPlans] = useState([]);
  const [data, setData] = useState(passedService || null);
  let serviceId = props?.route?.params?.serviceId;

  const [getSingleService, { isLoading }] = useLazyGetSingleServiceQuery();
  const [getRatings, { data: ratingsDataFromApi, isLoading: ratingsLoading }] = useLazyGetRatingsQuery();

  useEffect(() => {
    if (passedService) {
      const formattedPlans = [{
        id: 1,
        name: passedService?.plans || 'Standard',
        price: passedService?.price || 0,
        title: `${capitalizeFirstLetter(passedService?.plans || 'Standard')} Plan $${passedService?.price || 0}`,
        description: passedService?.description || '',
      }];
      setPlans(formattedPlans);
      setSelectedPlan(formattedPlans?.[0]);
    }
    _getSingleService(serviceId);
    if (serviceId) {
      getRatings(serviceId);
    }
  }, [serviceId]);

  const distribution = ratingsDataFromApi?.distribution || { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  const totalRatingsForDistribution = Object.values(distribution).reduce((a, b) => a + b, 0) || 1;

  const formattedRatingData = [5, 4, 3, 2, 1].map(r => ({
    id: r,
    rating: r,
    progress: Math.round(((distribution[r] || 0) / totalRatingsForDistribution) * 100)
  }));

  const reviews = ratingsDataFromApi?.ratings || [];

  const _getSingleService = async serviceId => {
    await getSingleService(serviceId)
      ?.unwrap()
      ?.then(res => {
        setData(res?.service);

        const formattedPlans = [{
          id: 1,
          name: res?.service?.plans || 'Standard',
          price: res?.service?.price || 0,
          title: `${capitalizeFirstLetter(res?.service?.plans || 'Standard')} Plan $${res?.service?.price || 0}`,
          description: res?.service?.description || '',
        }];

        setPlans(formattedPlans);
        setSelectedPlan(formattedPlans?.[0]);
      })
      ?.catch(err => console.log('err in _getSingleService', err));
  };

  /* -------------------- RENDER FUNCTIONS -------------------- */

  const renderPackageTab = useCallback(
    ({ item, index }) => (
      <TouchableOpacity
        onPress={() => {
          setSelectedTab(index);
          setSelectedPlan(item);
        }}
      >
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

  const renderFeatureItem = ({ item }) => (
    <View style={styles.statRow}>
      <AppText title={item} textSize={1.8} textColor={AppColors.GRAY} />
      <Icon name="check-circle" size={18} color={AppColors.ThemeColor} />
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

  const handleBookService = () => {
    navigation.navigate('Payment', {
      serviceId: serviceId,
      selectedPlan: selectedPlan,
      serviceName: data?.name,
      isScheduled: false,
    });
  };

  const handleScheduleService = () => {
    navigation.navigate('ScheduleService', {
      serviceId: serviceId,
      selectedPlan: selectedPlan,
      serviceName: data?.name,
      isScheduled: true,
    });
  };

  if (isLoading && !data) {
    return (
      <View style={styles.loaderContainer}>
        <Loader color={AppColors.ThemeColor} />
      </View>
    );
  }

  /* -------------------- UI -------------------- */

  return (
    <Fragment>
      <Container>
        {/* HEADER */}
        <ImageBackground
          source={data?.cover ? { uri: getImageUrl(data?.cover, 'cover') } : AppImages.service_bg}
          imageStyle={styles.headerRadius}
          style={styles.header}
        >
          <LineBreak space={8} />
          <View style={styles.headerRow}>
            <BackIcon onPress={navigation.goBack} />
            {/* <BackIcon
              icon={<SVGXml icon={AppIcons.save} width={20} height={20} />}
            /> */}
          </View>
        </ImageBackground>

        <View style={styles.content}>
          <AppText title={data?.name} textSize={3} textFontWeight />

          <View style={styles.inlineRating}>
            <RatingView rating={data?.averageRating || 0.0} />
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

          <LineBreak space={2} />
          <AppText title="Service Features" textSize={2} textFontWeight />
          <LineBreak space={1} />
          <View style={styles.statsBox}>
            <FlatList
              data={data?.features || []}
              scrollEnabled={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderFeatureItem}
              ListEmptyComponent={<AppText title="No features available" textSize={1.6} textColor={AppColors.GRAY} />}
            />
          </View>

          <LineBreak space={2} />

          <AppText title="Rating & Reviews" textSize={2} textFontWeight />
          <LineBreak space={1} />

          <View style={styles.ratigRow1}>
            <AppText
              title={`All Ratings (${data?.ratingCount || 0})`}
              textSize={2}
              textColor={AppColors.ThemeColor}
              textFontWeight
            />
            <View style={styles.ratingRow2}>
              <RatingView rating={data?.averageRating || 0} />
              <AppText
                title={data?.averageRating?.toFixed(1) || '0.0'}
                textSize={1.8}
                textColor={AppColors.GRAY}
                textFontWeight
              />
            </View>
          </View>

          <View>
            <FlatList
              data={formattedRatingData}
              scrollEnabled={false}
              keyExtractor={item => item.id.toString()}
              ItemSeparatorComponent={<LineBreak space={2} />}
              renderItem={renderRatingItem}
            />
          </View>
        </View>

        <LineBreak space={2} />

        <FlatList
          data={reviews}
          horizontal
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <View style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Image
                  source={item.user?.profile ? { uri: getImageUrl(item.user.profile, 'profile') } : AppImages.consultant}
                  style={styles.avatar}
                />

                <View>
                  <AppText title={`${item.user?.firstName} ${item.user?.lastName}`} textSize={1.8} textFontWeight />
                  <View style={styles.reviewRating}>
                    <RatingView rating={item.rating} width={2} starSize={18} />
                    <AppText title={item.rating.toString()} textSize={1.8} />
                  </View>
                </View>

                <View style={styles.reviewTime}>
                  <AppText title={new Date(item.createdAt).toLocaleDateString()} textSize={1.6} />
                </View>
              </View>

              <LineBreak space={1} />

              <AppText
                title={item.review}
                textSize={1.8}
                textwidth={75}
                textColor={AppColors.Dark_themeColor}
              />
            </View>
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.reviewList}
          ListEmptyComponent={<AppText title="No reviews yet" textSize={1.8} textAlignment="center" />}
        />

      </Container>

      {/* FOOTER */}
      <View style={styles.footer}>
        <AppButton title="Book Service" handlePress={handleBookService} />
        <LineBreak space={1} />
        <AppButton
          title="Schedule For Later"
          borderWidth={1}
          borderColor={AppColors.ThemeColor}
          textColor={AppColors.ThemeColor}
          btnBackgroundColor={AppColors.WHITE}
          handlePress={handleScheduleService}
          btnWidth={90}
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
