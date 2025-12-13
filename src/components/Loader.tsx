import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import { AppColors } from '../utils';

interface LoaderProps {
  size?: any; 
  color?: any;
  align?: any;
}

const Loader = ({ size, color, align }: LoaderProps) => {
  return (
    <ActivityIndicator
      size={size || 'large'}
      color={color || AppColors.WHITE}
      style={{ alignSelf: align || 'center' }}
    />
  );
};

export default Loader;

const styles = StyleSheet.create({});
