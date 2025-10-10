/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Container from '../../../components/Container';
import { AppColors, responsiveFontSize, responsiveWidth } from '../../../utils';
import AppHeader from '../../../components/AppHeader';
import AppTextInput from '../../../components/AppTextInput';
import LineBreak from '../../../components/LineBreak';
import Icon from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LiveChatScreen from '../../../components/LiveChatScreen';

const LiveChat = () => {
  return (
    <Container scrollEnabled={false} safeAreaViewStyle={{ flex: 1 }}>
      <View style={{ flex: 1, marginHorizontal: responsiveWidth(5) }}>
        <AppHeader onBackPress={true} heading={'Live Chat'} />
        <LiveChatScreen />
      </View>

      <View
        style={{
          justifyContent: 'flex-end',
          marginHorizontal: responsiveWidth(5),
        }}
      >
        <AppTextInput
          inputPlaceHolder={'Enter Your Message'}
          borderWidth={1}
          inputWidth={55}
          borderColor={AppColors.LIGHTGRAY}
          rightIcon={
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: responsiveWidth(3),
              }}
            >
              <TouchableOpacity>
                <Icon
                  name="attachment"
                  size={responsiveFontSize(2.2)}
                  color={AppColors.Dark_themeColor}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <FontAwesome
                  name="image"
                  size={responsiveFontSize(2.2)}
                  color={AppColors.Dark_themeColor}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <LinearGradient
                  colors={['#003C46', '#007C91']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 40,
                    height: 40,
                    borderRadius: 100,
                    backgroundColor: AppColors.ThemeColor,
                  }}
                >
                  <Ionicons
                    name="send"
                    size={responsiveFontSize(2.2)}
                    color={AppColors.WHITE}
                  />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          }
        />
      </View>
      <LineBreak space={1} />
    </Container>
  );
};

export default LiveChat;
