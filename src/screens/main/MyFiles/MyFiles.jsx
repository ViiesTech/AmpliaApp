import React, { useEffect, useState, useCallback, Fragment } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';

import Container from '../../../components/Container';
import AppHeader from '../../../components/AppHeader';
import AppText from '../../../components/AppText';
import LineBreak from '../../../components/LineBreak';
import PdfCard from '../../../components/PdfCard';
import Loader from '../../../components/Loader';

import {
  AppColors,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
  ShowToast,
} from '../../../utils';

import { useLazyGetFilesQuery } from '../../../redux/services/mainService';

const topTabsData = [
  { id: 1, title: 'All' },
  { id: 2, title: '2021' },
  { id: 3, title: '2022' },
  { id: 4, title: '2023' },
  { id: 5, title: '2024' },
  { id: 6, title: '2025' },
  { id: 7, title: '2026' },
];

const MyFiles = () => {
  const [selectedTab, setSelectedTab] = useState('All');
  const [getFiles, { data, isLoading }] = useLazyGetFilesQuery();

  useEffect(() => {
    getFiles();
  }, [getFiles]);

  const onSelectYear = useCallback(
    async year => {
      setSelectedTab(year);

      try {
        if (year === 'All') {
          await getFiles().unwrap();
        } else {
          await getFiles(year).unwrap();
        }
      } catch (error) {
        ShowToast(error?.data?.message || 'Error fetching files');
        console.log('Fetch files error:', error);
      }
    },
    [getFiles],
  );

  const renderTabItem = ({ item }) => {
    const isActive = selectedTab === item.title;

    return (
      <LinearGradient
        colors={
          isActive
            ? ['#003C46', '#007C91']
            : [AppColors.app_light, AppColors.app_light]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          borderRadius: 300,
        }}
      >
        <TouchableOpacity onPress={() => onSelectYear(item.title)} style={styles.tab}>
          <AppText
            title={item.title}
            textSize={1.6}
            textColor={isActive ? AppColors.WHITE : AppColors.ThemeColor}
          />
        </TouchableOpacity>
      </LinearGradient>
    );
  };

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <AppText
        textSize={1.8}
        textAlignment="center"
        title={data?.message || 'No Files Found'}
      />
    </View>
  );

  return (
    <Fragment>
      <Container>
        <View style={styles.container}>
          <AppHeader onBackPress={false} heading="My Files" />

          <FlatList
            data={topTabsData}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            renderItem={renderTabItem}
            contentContainerStyle={styles.tabsContainer}
          />

          <LineBreak space={2} />

          {isLoading ? (
            <View style={styles.loaderContainer}>
              <Loader color={AppColors.ThemeColor} />
            </View>
          ) : (
            <FlatList
              data={data?.files || []}
              numColumns={2}
              keyExtractor={(item, index) =>
                item?._id ? item._id.toString() : `file-${index}`
              }
              renderItem={({ item }) => <PdfCard title={item.name} />}
              ListEmptyComponent={renderEmptyComponent}
              columnWrapperStyle={styles.columnWrapper}
              ItemSeparatorComponent={() => <LineBreak space={2} />}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1 }}
            />
          )}

          <LineBreak space={10} />
        </View>
      </Container>

      {/* Floating Action Button (optional) */}
      {/* 
      <TouchableOpacity style={styles.fab}>
        <LinearGradient
          colors={['#003C46', '#007C91']}
          style={styles.fabGradient}
        >
          <Feather
            name="plus"
            size={responsiveFontSize(3)}
            color={AppColors.WHITE}
          />
        </LinearGradient>
      </TouchableOpacity> 
      */}
    </Fragment>
  );
};

export default MyFiles;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: responsiveWidth(5),
  },
  tabsContainer: {
    gap: responsiveWidth(3),
    flexGrow: 1,
  },
  tab: {
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(0.8),
    borderRadius: 100,
  },
  loaderContainer: {
    marginTop: responsiveHeight(5),
    alignItems: 'center',
  },
  columnWrapper: {
    gap: responsiveWidth(3),
  },
  fab: {
    position: 'absolute',
    bottom: responsiveHeight(2),
    right: responsiveWidth(5),
  },
  fabGradient: {
    width: 50,
    height: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
