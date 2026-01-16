import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';

import Container from '../../../components/Container';
import AppHeader from '../../../components/AppHeader';
import LineBreak from '../../../components/LineBreak';
import LiveChatScreen from '../../../components/LiveChatScreen';
import ChatInput from '../../../components/ChatInput';

import { responsiveWidth } from '../../../utils';
import { messagesData } from '../../../redux/constant';

const LiveChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    setMessages(messagesData);
  }, []);

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
    <Container scrollEnabled={false} safeAreaViewStyle={styles.container}>
      <View style={styles.chatContainer}>
        <AppHeader onBackPress heading="Live Chat" />
        <LiveChatScreen data={messages} />
      </View>

      <View style={styles.inputWrapper}>
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

export default LiveChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatContainer: {
    flex: 1,
    marginHorizontal: responsiveWidth(5),
  },
  inputWrapper: {
    justifyContent: 'flex-end',
    marginHorizontal: responsiveWidth(5),
  },
});
