/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View } from 'react-native';
import Container from '../../../components/Container';
import LiveChatScreen from '../../../components/LiveChatScreen';
import ChatInput from '../../../components/ChatInput';
import LineBreak from '../../../components/LineBreak';
import { responsiveWidth } from '../../../utils';
import BookingChatHeader from '../../../components/BookingChatHeader';
import BookingChatStatus from '../../../components/BookingChatStatus';

const BookingChat = () => {
  return (
    <Container scrollEnabled={false} safeAreaViewStyle={{ flex: 1 }}>
      <View style={{ flex: 1, marginHorizontal: responsiveWidth(5) }}>
        <BookingChatHeader />
        <BookingChatStatus />
        <LiveChatScreen />
      </View>

      <View
        style={{
          justifyContent: 'flex-end',
          marginHorizontal: responsiveWidth(5),
        }}
      >
        <ChatInput />
      </View>
      <LineBreak space={1} />
    </Container>
  );
};

export default BookingChat;
