/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import Container from '../../../components/Container';
import {
  AppColors,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils';
import AppHeader from '../../../components/AppHeader';
import LinearGradient from 'react-native-linear-gradient';
import AppText from '../../../components/AppText';
import LineBreak from '../../../components/LineBreak';
import PdfCard from '../../../components/PdfCard';
import Feather from 'react-native-vector-icons/Feather';

const topTabsData = [
  { id: 1, title: 'All' },
  { id: 2, title: '2020' },
  { id: 3, title: '2021' },
  { id: 4, title: '2022' },
  { id: 5, title: '2023' },
  { id: 6, title: '2024' },
];

const pdfData = [
  { id: 1, title: 'Individual Tax Filing File 1.pdf' },
  { id: 2, title: 'Individual Tax Filing File 1.pdf' },
  { id: 3, title: 'Individual Tax Filing File 1.pdf' },
  { id: 4, title: 'Individual Tax Filing File 1.pdf' },
  { id: 5, title: 'Individual Tax Filing File 1.pdf' },
  { id: 6, title: 'Individual Tax Filing File 1.pdf' },
];

const MyFiles = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <>
      <Container safeAreaViewStyle={{ marginBottom: responsiveHeight(-6) }}>
        <View style={{ marginHorizontal: responsiveWidth(5) }}>
          <AppHeader onBackPress={false} heading={'My Files'} />

          <FlatList
            data={topTabsData}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: responsiveWidth(3) }}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => setSelectedTab(index)}>
                <LinearGradient
                  colors={
                    selectedTab == index
                      ? ['#003C46', '#007C91']
                      : [AppColors.app_light, AppColors.app_light]
                  }
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    paddingHorizontal: responsiveWidth(4),
                    paddingVertical: responsiveHeight(0.8),
                    borderRadius: 100,
                  }}
                >
                  <AppText
                    textColor={
                      selectedTab == index
                        ? AppColors.WHITE
                        : AppColors.ThemeColor
                    }
                    textSize={1.6}
                    title={item.title}
                  />
                </LinearGradient>
              </TouchableOpacity>
            )}
          />

          <LineBreak space={2} />

          <View style={{ alignItems: 'center' }}>
            <FlatList
              data={pdfData}
              numColumns={2}
              ItemSeparatorComponent={<LineBreak space={2} />}
              showsHorizontalScrollIndicator={false}
              columnWrapperStyle={{
                gap: responsiveWidth(3),
              }}
              renderItem={({ item }) => <PdfCard title={item.title} />}
            />
          </View>
          <LineBreak space={10} />
        </View>
      </Container>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          paddingHorizontal: responsiveWidth(5),
          paddingVertical: responsiveHeight(2),
        }}
      >
        <TouchableOpacity>
          <LinearGradient
            colors={['#003C46', '#007C91']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: 50,
              height: 50,
              borderRadius: 100,
              backgroundColor: AppColors.ThemeColor,
            }}
          >
            <Feather
              name="plus"
              size={responsiveFontSize(3)}
              color={AppColors.WHITE}
            />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default MyFiles;
