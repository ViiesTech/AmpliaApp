/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Container from '../../../components/Container';
import { responsiveWidth } from '../../../utils';
import AppHeader from '../../../components/AppHeader';
import LineBreak from '../../../components/LineBreak';
import LiveChatScreen from '../../../components/LiveChatScreen';
import ChatInput from '../../../components/ChatInput';
import ImageCropPicker from 'react-native-image-crop-picker';
import { messagesData } from '../../../redux/constant';
import { useIsFocused } from '@react-navigation/native';

const LiveChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  // const isFocussed = useIsFocused();

  useEffect(() => {
    setMessages(messagesData);
  }, []);

  const selectImage = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      ?.then(res => {
        console.log('res in selectImage:-', res);
        // setImage(res);
      })
      ?.catch(err => {
        console.log('err in selectImage', err);
      });
  };

  const handleSendMessage = () => {
    if (!inputText?.trim()) return;

    const newMessage = {
      id: Date?.now()?.toString(),
      text: inputText,
      time: 'Just now',
      type: 'sent',
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
  };

  return (
    <Container scrollEnabled={false} safeAreaViewStyle={{ flex: 1 }}>
      <View style={{ flex: 1, marginHorizontal: responsiveWidth(5) }}>
        <AppHeader onBackPress={true} heading={'Live Chat'} />
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
          onChangeText={t => setInputText(t)}
          galleryPress={selectImage}
          sendPress={handleSendMessage}
        />
      </View>
      <LineBreak space={1} />
    </Container>
  );
};

export default LiveChat;
