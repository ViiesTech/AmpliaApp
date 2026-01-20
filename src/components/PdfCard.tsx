import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { AppColors, responsiveHeight, responsiveWidth } from '../utils';
import { AppImages } from '../assets/images';
import LineBreak from './LineBreak';
import AppText from './AppText';

type Props = {
  title?: string;
  onDownloadPress?: () => void;
};

const PdfCard = ({ title, onDownloadPress }: Props) => {
  return (
    <View style={styles.container}>
      <Image
        source={AppImages.pdf}
        style={styles.pdfImage}
        resizeMode="contain"
      />

      <LineBreak space={1.5} />

      <View style={styles.footer}>
        <View style={styles.titleContainer}>
          <AppText
            title={title}
            textSize={1.8}
            numberOfLines={1}
            textColor={AppColors.ThemeColor}
            textFontWeight
            textwidth={40}
          />
        </View>

        {/* <TouchableOpacity
          style={styles.downloadBtn}
          activeOpacity={0.7}
          onPress={onDownloadPress}
          accessibilityLabel="Download PDF"
        >
          <Image
            source={AppImages.download}
            style={styles.downloadIcon}
            resizeMode="contain"
          />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default React.memo(PdfCard);

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.app_light,
    width: responsiveWidth(42),
    paddingBottom: responsiveHeight(1.5),
    borderRadius: 15,
    overflow: 'hidden',
  },
  pdfImage: {
    width: responsiveWidth(42),
    height: responsiveHeight(18),
  },
  footer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(2),
  },
  titleContainer: {
    width: '85%',
  },
  downloadBtn: {
    width: '15%',
    alignItems: 'flex-end',
  },
  downloadIcon: {
    width: responsiveWidth(5),
    height: responsiveWidth(5),
  },
});
