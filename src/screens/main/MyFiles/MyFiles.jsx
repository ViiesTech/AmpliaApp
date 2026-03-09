import React, { useEffect, useState, useCallback, Fragment } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Linking, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
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
import { getImageUrl } from '../../../redux/constant';

import { useLazyGetFilesQuery } from '../../../redux/services/mainService';

const currentYear = new Date().getFullYear();
const startYearBound = currentYear + 1;
const topTabsData = [
  { id: 0, title: 'All' },
  ...Array.from({ length: startYearBound - 1900 + 1 }, (_, i) => ({
    id: i + 1,
    title: (startYearBound - i).toString()
  }))
];

const MyFiles = props => {
  const { params } = props.route || {};
  const bookingId = params?.bookingId;
  const [selectedTab, setSelectedTab] = useState('All');
  const { user } = useSelector(state => state.persistedData);
  const [getFiles, { data, isLoading, isFetching }] = useLazyGetFilesQuery();

  useEffect(() => {
    if (bookingId) {
      getFiles({ bookingId, userId: user?._id });
    } else if (user?._id) {
      getFiles({ userId: user._id });
    }
  }, [getFiles, bookingId, user?._id]);

  const onSelectYear = useCallback(
    async year => {
      setSelectedTab(year);

      try {
        const fetchParams = { userId: user?._id };
        if (year !== 'All') {
          fetchParams.year = year;
        }
        await getFiles(fetchParams).unwrap();
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
      <Feather name="folder-minus" size={40} color={AppColors.GRAY} style={{ marginBottom: 10 }} />
      <AppText
        textSize={1.8}
        textAlignment="center"
        textColor={AppColors.GRAY}
        title={selectedTab === 'All' ? 'No documents found in your vault.' : `No documents found for ${selectedTab}.`}
      />
    </View>
  );

  return (
    <Fragment>
      <Container>
        <View style={styles.container}>
          <AppHeader onBackPress={bookingId ? () => props.navigation.goBack() : false} heading={bookingId ? "Booking Files" : "Vault"} />

          <FlatList
            data={topTabsData}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            renderItem={renderTabItem}
            contentContainerStyle={styles.tabsContainer}
          />

          <LineBreak space={2} />

          {isLoading || isFetching ? (
            <View style={styles.loaderContainer}>
              <Loader color={AppColors.ThemeColor} />
            </View>
          ) : (
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
              {(() => {
                const files = data?.files || [];
                const filedByAdmin = files.filter(f => f.type === 'return_doc');
                const userDocs = files.filter(f => f.type === 'user_doc');

                if (files.length === 0) return renderEmptyComponent();

                const renderFileGrid = (items) => (
                  <View style={styles.gridContainer}>
                    {items.map((item, index) => (
                      <View key={item?._id || `file-${index}`} style={styles.gridItem}>
                        <PdfCard
                          title={item.name}
                          onPress={() => {
                            const url = getImageUrl(item.url, 'file');
                            Linking.openURL(url).catch(err =>
                              console.error("Couldn't load page", err),
                            );
                          }}
                        />
                      </View>
                    ))}
                  </View>
                );

                return (
                  <View style={{ paddingBottom: 20 }}>
                    {filedByAdmin.length > 0 && (
                      <View style={{ marginBottom: 25 }}>
                        <AppText
                          title="FILED DOCUMENTS (From Admin)"
                          textSize={1.6}
                          textColor={AppColors.GRAY}
                          textFontWeight
                          style={{ marginBottom: 15 }}
                        />
                        {renderFileGrid(filedByAdmin)}
                      </View>
                    )}

                    <View>
                      <AppText
                        title="YOUR DOCUMENTS"
                        textSize={1.6}
                        textColor={AppColors.GRAY}
                        textFontWeight
                        style={{ marginBottom: 15 }}
                      />
                      {userDocs.length > 0 ? (
                        renderFileGrid(userDocs)
                      ) : (
                        <View style={{ padding: 20, alignItems: 'center' }}>
                          <AppText title="No user documents found." textSize={1.4} textColor={AppColors.GRAY} />
                        </View>
                      )}
                    </View>
                  </View>
                );
              })()}
            </ScrollView>
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
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: responsiveWidth(3),
  },
  gridItem: {
    width: (responsiveWidth(90) - responsiveWidth(3)) / 2,
    marginBottom: responsiveHeight(2),
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
