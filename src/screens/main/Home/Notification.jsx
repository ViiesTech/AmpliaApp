/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import Container from '../../../components/Container';
import { AppColors, responsiveHeight, responsiveWidth } from '../../../utils';
import AppHeader from '../../../components/AppHeader';
import AppText from '../../../components/AppText';
import SVGXml from '../../../assets/icons/SVGXML';
import { AppIcons } from '../../../assets/icons';

const data = [
  {
    id: 1,
    title: 'Notification 1',
    subTitle: 'Lorem ipsum odor amet, consectetuer adipiscing elit...',
  },
  {
    id: 2,
    title: 'Notification 1',
    subTitle: 'Lorem ipsum odor amet, consectetuer adipiscing elit...',
  },
  {
    id: 3,
    title: 'Notification 1',
    subTitle: 'Lorem ipsum odor amet, consectetuer adipiscing elit...',
  },
  {
    id: 4,
    title: 'Notification 1',
    subTitle: 'Lorem ipsum odor amet, consectetuer adipiscing elit...',
  },
  {
    id: 5,
    title: 'Notification 1',
    subTitle: 'Lorem ipsum odor amet, consectetuer adipiscing elit...',
  },
];

const Notification = () => {
  return (
    <Container safeAreaViewStyle={{ marginBottom: responsiveHeight(-6) }}>
      <View style={{ marginHorizontal: responsiveWidth(5) }}>
        <AppHeader onBackPress={true} heading={'Notification'} />
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: 'row',
              gap: responsiveWidth(4),
              alignItems: 'center',
              borderBottomWidth: 1,
              paddingVertical: responsiveHeight(2),
              paddingHorizontal: responsiveWidth(5),
              borderBottomColor: AppColors.LIGHTGRAY,
              backgroundColor:
                item.id === 1 || item.id === 3 ? AppColors.app_light : null,
            }}
          >
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 50,
                height: 50,
                borderRadius: 100,
                backgroundColor: AppColors.ThemeColor,
              }}
            >
              <SVGXml icon={AppIcons.alert_white} width={20} height={20} />
            </TouchableOpacity>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <AppText
                  title={item.title}
                  textSize={2}
                  textColor={AppColors.BLACK}
                  textFontWeight
                />
                {item.id == 1 && (
                  <View
                    style={{
                      width: 7,
                      height: 7,
                      backgroundColor: 'red',
                      borderRadius: 100,
                    }}
                  />
                )}
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
        )}
      />
    </Container>
  );
};

export default Notification;
