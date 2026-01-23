import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import Container from '../../../components/Container';
import {
  AppColors,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
  ShowToast,
} from '../../../utils';
import AppHeader from '../../../components/AppHeader';
import AppText from '../../../components/AppText';
import LineBreak from '../../../components/LineBreak';
import PdfCard from '../../../components/PdfCard';
import SVGXml from '../../../assets/icons/SVGXML';
import { AppIcons } from '../../../assets/icons';
import { useLazyGetFilesQuery } from '../../../redux/services/mainService';
import Loader from '../../../components/Loader';

const topTabsData = [
  { id: 1, title: 'All' },
  { id: 2, title: '2021' },
  { id: 3, title: '2022' },
  { id: 4, title: '2023' },
  { id: 5, title: '2024' },
  { id: 6, title: '2025' },
  { id: 6, title: '2026' },
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
  const [selectedTab, setSelectedTab] = useState('All');
  const [getFiles, { data, isLoading }] = useLazyGetFilesQuery();

  console.log('all files ===>', data);

  useEffect(() => {
    if (selectedTab === 'All') {
      getFiles();
    }
  }, [selectedTab]);

  const onSelectYear = async year => {
    setSelectedTab(year);
    if (year !== 'All') {
      try {
        await getFiles(year).unwrap();
      } catch (error) {
        ShowToast(error?.data?.message || 'Error fetching files');
        console.log('error fetching files by year:', error);
      }
    }
  };

  return (
    <>
      <Container>
        <View style={{ marginHorizontal: responsiveWidth(5) }}>
          <AppHeader onBackPress={false} heading={'My Files'} />

          <FlatList
            data={topTabsData}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: responsiveWidth(3) }}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => onSelectYear(item.title)}>
                <View
                  style={{
                    backgroundColor: selectedTab === item.title ? '#006570' : AppColors.app_light,
                    paddingHorizontal: responsiveWidth(4),
                    paddingVertical: responsiveHeight(1.2),
                    borderRadius: 100,
                  }}
                >
                  <AppText
                    textColor={
                      selectedTab === item.title
                        ? AppColors.WHITE
                        : AppColors.ThemeColor
                    }
                    textSize={1.6}
                    title={item.title}
                  />
                </View>
              </TouchableOpacity>
            )}
          />

          <LineBreak space={2} />

          <View style={{ alignItems: 'center' }}>
           {isLoading ?
              <View style={{marginTop: responsiveHeight(5)}}>
                <Loader  color={AppColors.ThemeColor} />
                </View> 
              :
            <FlatList
              data={data?.files}
              numColumns={2}
              ItemSeparatorComponent={<LineBreak space={2} />}
              ListEmptyComponent={() => <AppText textSize={1.8} textAlignment={'center'} title={data?.message || 'No Files Found'} />}
              showsHorizontalScrollIndicator={false}
              columnWrapperStyle={{
                gap: responsiveWidth(3),
              }}
              renderItem={({ item }) => <PdfCard title={item.name} />}
            />
            } 
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
        {/* <TouchableOpacity>
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
        </TouchableOpacity> */}
      </View>
    </>
  );
};

export default MyFiles;
