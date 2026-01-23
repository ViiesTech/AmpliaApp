import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { responsiveFontSize } from '../utils';

type SmallButtonProps = {
  title: string;
  onPress?: () => void;
  loading?: boolean;
  textSize?: number;
};

const SmallButton = ({ 
  title, 
  onPress, 
  loading = false,
  textSize = 1.8,
}: SmallButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={styles.button}>
        {loading ? (
          <ActivityIndicator color="#FFFFFF" size="small" />
        ) : (
          <Text style={[styles.text, { fontSize: responsiveFontSize(textSize) }]}>
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#005C66',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default SmallButton;
