/* eslint-disable react-native/no-inline-styles */
import React, { useCallback } from 'react';
import { FlatList, TouchableOpacity, View, StyleSheet } from 'react-native';

import Container from '../../../components/Container';
import AppHeader from '../../../components/AppHeader';
import AppText from '../../../components/AppText';

import { AppColors, responsiveHeight, responsiveWidth } from '../../../utils';

import SVGXml from '../../../assets/icons/SVGXML';
import { AppIcons } from '../../../assets/icons';

const notificationsData = [
  {
    id: '1',
    title: 'Notification 1',
    subTitle: 'Lorem ipsum odor amet, consectetuer adipiscing elit...',
    isUnread: true,
  },
  {
    id: '2',
    title: 'Notification 2',
    subTitle: 'Lorem ipsum odor amet, consectetuer adipiscing elit...',
    isUnread: false,
  },
  {
    id: '3',
    title: 'Notification 3',
    subTitle: 'Lorem ipsum odor amet, consectetuer adipiscing elit...',
    isUnread: true,
  },
  {
    id: '4',
    title: 'Notification 4',
    subTitle: 'Lorem ipsum odor amet, consectetuer adipiscing elit...',
    isUnread: false,
  },
  {
    id: '5',
    title: 'Notification 5',
    subTitle: 'Lorem ipsum odor amet, consectetuer adipiscing elit...',
    isUnread: false,
  },
];

const Notification = () => {
  const renderItem = useCallback(({ item }) => {
    return (
      <View
        style={[styles.itemContainer, item.isUnread && styles.unreadBackground]}
      >
        <TouchableOpacity style={styles.iconWrapper}>
          <SVGXml icon={AppIcons.alert_white} width={20} height={20} />
        </TouchableOpacity>

        <View style={styles.textContainer}>
          <View style={styles.titleRow}>
            <AppText
              title={item.title}
              textSize={2}
              textColor={AppColors.BLACK}
              textFontWeight
            />

            {item.isUnread && <View style={styles.unreadDot} />}
          </View>

          <AppText
            title={item.subTitle}
            textSize={1.6}
            textColor={AppColors.ThemeColor}
            numberOfLines={1}
            textwidth={65}
          />
        </View>
      </View>
    );
  }, []);

  return (
    <Container>
      <View style={styles.headerWrapper}>
        <AppHeader onBackPress heading="Notification" />
      </View>

      <FlatList
        data={notificationsData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

export default Notification;

const styles = StyleSheet.create({
  headerWrapper: {
    marginHorizontal: responsiveWidth(5),
  },
  itemContainer: {
    flexDirection: 'row',
    gap: responsiveWidth(4),
    alignItems: 'center',
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(5),
    borderBottomWidth: 1,
    borderBottomColor: AppColors.LIGHTGRAY,
  },
  unreadBackground: {
    backgroundColor: AppColors.app_light,
  },
  iconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.ThemeColor,
  },
  textContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  unreadDot: {
    width: 7,
    height: 7,
    borderRadius: 100,
    backgroundColor: AppColors.RED || 'red',
  },
});
