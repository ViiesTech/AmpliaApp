/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import Container from '../../../components/Container';
import AppHeader from '../../../components/AppHeader';
import { AppColors, responsiveHeight, responsiveWidth } from '../../../utils';
import { AppIcons } from '../../../assets/icons';
import SVGXml from '../../../assets/icons/SVGXML';
import AppText from '../../../components/AppText';
import LineBreak from '../../../components/LineBreak';
import { useNavigation } from '@react-navigation/native';

const data = [
  { id: 1, icon: AppIcons.account, title: 'My Account', navTo: 'MyAccount' },
  {
    id: 2,
    icon: AppIcons.change_password,
    title: 'Change Password',
    navTo: 'ChangePassword',
  },
  { id: 3, icon: AppIcons.privacy, title: 'Privacy Policy', navTo: 'PrivacyPolicy' },
  { id: 4, icon: AppIcons.privacy, title: 'Terms & Conditions', navTo: 'TermsCondition' },
  { id: 5, icon: AppIcons.help, title: 'Help & Feedback', navTo: 'HelpAndFeedback' },
  { id: 6, icon: AppIcons.billing, title: 'Billing History', navTo: 'BillingHistory' },
  {
    id: 7,
    icon: AppIcons.question,
    title: 'Frequently Asked Questions',
    navTo: 'Faqs',
  },
  { id: 8, icon: AppIcons.logout, title: 'Logout', navTo: 'Auth' },
];

const MyProfile = () => {
  const nav = useNavigation();
  return (
    <Container safeAreaViewStyle={{ marginBottom: responsiveHeight(-6) }}>
      <View style={{ paddingHorizontal: responsiveWidth(6) }}>
        <AppHeader heading={'Profile'} />
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
      <LineBreak space={2} />
    </Container>
  );
};

export default MyProfile;
