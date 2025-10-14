/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import Container from '../../../components/Container';
import { AppColors, responsiveHeight, responsiveWidth } from '../../../utils';
import AppHeader from '../../../components/AppHeader';
import { AppIcons } from '../../../assets/icons';
import { useNavigation } from '@react-navigation/native';
import LineBreak from '../../../components/LineBreak';
import SVGXml from '../../../assets/icons/SVGXML';
import AppText from '../../../components/AppText';

const data = [
  { id: 1, icon: AppIcons.email, title: 'Email Us your concerns', navTo: 'EmailUs' },
  {
    id: 2,
    icon: AppIcons.chat,
    title: 'Live Chat with Support Agent',
    navTo: 'LiveChat',
  },
];

const HelpAndFeedback = () => {
  const nav = useNavigation();

  return (
    <Container>
      <View style={{ paddingHorizontal: responsiveWidth(5) }}>
        <AppHeader onBackPress={true} heading={'Help & Feedback'} />
        <View>
          <FlatList
            data={data}
            ItemSeparatorComponent={<LineBreak space={2} />}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  backgroundColor: AppColors.app_light,
                  gap: responsiveWidth(2),
                  alignItems: 'center',
                  paddingHorizontal: responsiveWidth(3),
                  paddingVertical: responsiveHeight(1.5),
                  borderRadius: 10,
                }}
                onPress={() => {
                  if (item.navTo) {
                    nav.navigate(item.navTo);
                  }
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 100,
                    backgroundColor: AppColors.ThemeColor,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <SVGXml icon={item.icon} width={20} height={20} />
                </View>
                <AppText
                  title={item.title}
                  textSize={2}
                  textColor={AppColors.ThemeColor}
                  textFontWeight
                />
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                  <SVGXml icon={AppIcons.right_arrow} width={18} height={18} />
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Container>
  );
};

export default HelpAndFeedback;
