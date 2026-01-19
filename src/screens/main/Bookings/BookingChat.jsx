/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import Container from '../../../components/Container';
import LiveChatScreen from '../../../components/LiveChatScreen';
import ChatInput from '../../../components/ChatInput';
import LineBreak from '../../../components/LineBreak';
import { responsiveWidth } from '../../../utils';
import BookingChatHeader from '../../../components/BookingChatHeader';
import BookingChatStatus from '../../../components/BookingChatStatus';
import ImageCropPicker from 'react-native-image-crop-picker';

const BookingChat = props => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const { data } = props.route.params;
  let status = data.status;

  // useEffect(() => {
  //   setMessages([]);
  // }, []);

  const selectImage = useCallback(() => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(res => {
        console.log('Selected image:', res);
        // TODO: convert image into chat message
      })
      .catch(err => {
        console.log('Image picker error:', err);
      });
  }, []);

  const handleSendMessage = useCallback(() => {
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      text: inputText.trim(),
      time: 'Just now',
      type: 'sent',
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
  }, [inputText]);

  return (
    <Container scrollEnabled={false} safeAreaViewStyle={{ flex: 1 }}>
      <View style={{ flex: 1, marginHorizontal: responsiveWidth(5) }}>
        <BookingChatHeader />
        <BookingChatStatus data={data} status={status} />
        <LiveChatScreen data={messages} />
      </View>

      <View
        style={{
          justifyContent: 'flex-end',
          marginHorizontal: responsiveWidth(5),
        }}
      >
        <ChatInput
          value={inputText}
          onChangeText={setInputText}
          galleryPress={selectImage}
          sendPress={handleSendMessage}
        />
      </View>
      <LineBreak space={1} />
    </Container>
  );
};

export default BookingChat;
