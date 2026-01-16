import React, { useCallback } from 'react';
import {
  FlatList,
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import Container from '../../../components/Container';
import AppHeader from '../../../components/AppHeader';
import AppText from '../../../components/AppText';
import LineBreak from '../../../components/LineBreak';

import {
  AppColors,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils';

const ServiceCategories = ({ route }) => {
  const navigation = useNavigation();
  const categories = route?.params?.data?.categories ?? [];

  const renderItem = useCallback(
    ({ item }) => (
      <View style={styles.card}>
        <View style={styles.iconWrapper}>
          <Image
            source={{ uri: item?.cover }}
            resizeMode="cover"
            style={styles.image}
          />
        </View>

        <AppText
          title={item?.name}
          textSize={2}
          textColor={AppColors.ThemeColor}
          textFontWeight
        />

        <View style={styles.arrowContainer}>
          <TouchableOpacity
            accessibilityRole="button"
            onPress={() =>
              navigation.navigate('Services', { categoryId: item?.id })
            }
          >
            <Icon
              name="arrow-right"
              size={responsiveFontSize(2.5)}
              color={AppColors.Dark_themeColor}
            />
          </TouchableOpacity>
        </View>
      </View>
    ),
    [navigation],
  );

  return (
    <Container>
      <View style={styles.container}>
        <AppHeader onBackPress heading="Service Category" />

        <FlatList
          data={categories}
          keyExtractor={item => String(item.id)}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <LineBreak space={2} />}
          ListEmptyComponent={
            <AppText
              title="No Categories Found"
              textSize={1.8}
              textAlignment="center"
            />
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Container>
  );
};

export default ServiceCategories;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: responsiveWidth(5),
  },
  card: {
    flexDirection: 'row',
    backgroundColor: AppColors.app_light,
    borderRadius: 10,
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1),
    alignItems: 'center',
    gap: responsiveWidth(4),
  },
  iconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: AppColors.ThemeColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: responsiveHeight(5),
    height: responsiveHeight(5),
    borderRadius: 100,
  },
  arrowContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
});

// /* eslint-disable react-native/no-inline-styles */
// import React from 'react';
// import { FlatList, Image, TouchableOpacity, View } from 'react-native';
// import Container from '../../../components/Container';
// import {
//   AppColors,
//   responsiveFontSize,
//   responsiveHeight,
//   responsiveWidth,
// } from '../../../utils';
// import AppHeader from '../../../components/AppHeader';
// import { AppIcons } from '../../../assets/icons';
// import AppText from '../../../components/AppText';
// import SVGXml from '../../../assets/icons/SVGXML';
// import LineBreak from '../../../components/LineBreak';
// import Icon from 'react-native-vector-icons/Feather';
// import { useNavigation } from '@react-navigation/native';

// const serviceCate = [
//   { id: 1, title: 'Tax Preparation & Filing', icon: AppIcons.booking_white },
//   { id: 2, title: 'Financial Consulting', icon: AppIcons.dollar_white },
//   { id: 3, title: 'Bookkeeping & Accounting', icon: AppIcons.file_white },
// ];

// const ServiceCategories = ({ route }) => {
//   const nav = useNavigation();

//   const { data } = route?.params;
//   console.log('all categories ===>', data);

//   return (
//     <Container>
//       <View style={{ marginHorizontal: responsiveWidth(5) }}>
//         <AppHeader onBackPress={true} heading={'Service Category'} />

//         <FlatList
//           data={data?.categories}
//           ListEmptyComponent={() => (
//             <AppText
//               textSize={1.8}
//               textAlignment={'center'}
//               title={'No Categories Found'}
//             />
//           )}
//           ItemSeparatorComponent={<LineBreak space={2} />}
//           renderItem={({ item }) => (
//             <View
//               style={{
//                 flexDirection: 'row',
//                 backgroundColor: AppColors.app_light,
//                 borderRadius: 10,
//                 paddingHorizontal: responsiveWidth(4),
//                 paddingVertical: responsiveHeight(1),
//                 gap: responsiveWidth(4),
//                 alignItems: 'center',
//               }}
//             >
//               <View
//                 style={{
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   width: 50,
//                   height: 50,
//                   borderRadius: 100,
//                   backgroundColor: AppColors.ThemeColor,
//                 }}
//               >
//                 {/* image will appear here in future */}
//                 <Image
//                   source={{ uri: item.cover }}
//                   style={{
//                     height: responsiveHeight(5),
//                     width: responsiveHeight(5),
//                     borderRadius: 100,
//                   }}
//                 />
//                 {/* <SVGXml icon={AppIcons.file_white} width={20} height={20} />       */}
//               </View>
//               <AppText
//                 title={item.name}
//                 textSize={2}
//                 textColor={AppColors.ThemeColor}
//                 textFontWeight
//               />
//               <View
//                 style={{
//                   flex: 1,
//                   justifyContent: 'flex-end',
//                   alignItems: 'flex-end',
//                 }}
//               >
//                 <TouchableOpacity onPress={() => nav.navigate('Services')}>
//                   <Icon
//                     name={'arrow-right'}
//                     size={responsiveFontSize(2.5)}
//                     color={AppColors.Dark_themeColor}
//                   />
//                 </TouchableOpacity>
//               </View>
//             </View>
//           )}
//         />
//       </View>
//     </Container>
//   );
// };

// export default ServiceCategories;
