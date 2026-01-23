/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { responsiveWidth, responsiveFontSize } from '../utils';

type GradientButtonProps = {
  title: string;
  onPress?: () => void;
  loading?: boolean;
  outline?: boolean;
  textColor?: string;
  borderColor?: string;
  btnWidth?: number;
  textSize?: number;
  btnPadding?: number;
  textFontWeight?: boolean;
};

const GradientButton = ({ 
  title, 
  onPress, 
  loading = false,
  outline = false,
  textColor,
  borderColor,
  btnWidth,
  textSize = 2.2,
  btnPadding,
  textFontWeight = true,
}: GradientButtonProps) => {
  const gradientColors: [string, string] = outline 
    ? ['#FFFFFF', '#FFFFFF'] 
    : ['#003C46', '#007C91'];

  const finalTextColor = textColor ?? (outline ? '#007C91' : '#FFFFFF');

  // Use auto-sizing container when btnPadding is specified
  const useAutoSize = btnPadding != null;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        useAutoSize ? styles.containerAuto : styles.container,
        btnWidth ? { width: responsiveWidth(btnWidth) } : null,
        useAutoSize && !btnWidth ? { alignSelf: 'flex-start' } : null,
      ]}
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[
          useAutoSize ? styles.gradientAuto : styles.gradient,
          outline && { borderWidth: 1, borderColor: borderColor ?? '#007C91' },
          useAutoSize ? { paddingVertical: btnPadding, paddingHorizontal: btnPadding + 16 } : null,
        ]}
      >
        {loading ? (
          <ActivityIndicator color={finalTextColor} size="small" />
        ) : (
          <Text
            style={[
              styles.text,
              {
                color: finalTextColor,
                fontSize: responsiveFontSize(textSize),
                fontWeight: textFontWeight ? 'bold' : 'normal',
              },
            ]}
          >
            {title}
          </Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
  },
  containerAuto: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 28,
  },
  gradientAuto: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  text: {
    textAlign: 'center',
  },
});

export default GradientButton;
