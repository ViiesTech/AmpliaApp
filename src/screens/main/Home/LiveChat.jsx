import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';

import Container from '../../../components/Container';
import AppHeader from '../../../components/AppHeader';
import LineBreak from '../../../components/LineBreak';
import LiveChatScreen from '../../../components/LiveChatScreen';
import ChatInput from '../../../components/ChatInput';
import AppText from '../../../components/AppText';
import Loader from '../../../components/Loader';

import { AppColors, responsiveWidth, ShowToast } from '../../../utils';
import { BASE_URL } from '../../../redux/constant';
import { useCreateChatMutation, useSendMessageMutation } from '../../../redux/services/mainService';

const LiveChat = () => {
  const { token, user } = useSelector(state => state.persistedData);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [chatId, setChatId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeHandler, setActiveHandler] = useState(null);
  const socketRef = useRef(null);

  const [createChat] = useCreateChatMutation();
  const [sendMessage] = useSendMessageMutation();

  // Initialize socket and chat
  useEffect(() => {
    const initChat = async () => {
      try {
        // Create or get existing live chat (no bookingId = general support)
        const res = await createChat({}).unwrap();
        const chat = res.chat;
        setChatId(chat._id);
        setActiveHandler(chat.activeSubAdmin);

        // Transform messages for display
        const formattedMessages = (chat.messages || []).map(msg => ({
          id: msg._id,
          text: msg.message,
          time: new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: msg.sender?._id === user._id ? 'sent' : 'received',
          sender: msg.sender,
        })).reverse();
        setMessages(formattedMessages);
      } catch (err) {
        console.error('Error initializing chat:', err);
        ShowToast('error', 'Failed to start live chat');
      } finally {
        setIsLoading(false);
      }
    };

    initChat();
  }, [createChat, user._id]);

  // Socket connection
  useEffect(() => {
    if (!chatId || !token) return;

    const socket = io(BASE_URL.replace('/Amplia/', ''), {
      transports: ['websocket'],
      auth: { token },
    });
    socketRef.current = socket;

    socket.on('connect', () => {
      socket.emit('join_room', chatId);
    });

    socket.on('new_message', (message) => {
      setMessages(prev => {
        // If this is my message, check if we already have an optimistic version
        if (message.sender?._id === user._id) {
          const optimisticIndex = prev.findIndex(msg => msg.isOptimistic && msg.text === message.message);
          if (optimisticIndex !== -1) {
            const updatedMessages = [...prev];
            updatedMessages[optimisticIndex] = {
              id: message._id,
              text: message.message,
              time: new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              type: 'sent',
              sender: message.sender,
            };
            return updatedMessages;
          }
        }

        // If it's a new received message or no optimistic version found
        if (prev.some(m => m.id === message._id)) return prev;

        const newMsg = {
          id: message._id,
          text: message.message,
          time: new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: message.sender?._id === user._id ? 'sent' : 'received',
          sender: message.sender,
        };
        return [newMsg, ...prev];
      });
    });

    socket.on('subadmin_joined', ({ subAdminId }) => {
      setActiveHandler(subAdminId);
    });

    socket.on('subadmin_left', () => {
      setActiveHandler(null);
    });

    return () => {
      socket.disconnect();
    };
  }, [chatId, token, user._id]);

  const selectImage = useCallback(() => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(res => {
        console.log('Selected image:', res);
        // TODO: Implement image message logic
      })
      .catch(err => {
        console.log('Image picker error:', err);
      });
  }, []);

  const handleSendMessage = useCallback(async () => {
    const text = inputText.trim();
    if (!text || !chatId) return;

    // Optimistic Update
    const optimisticMsg = {
      id: `temp-${Date.now()}`,
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'sent',
      sender: user,
      isOptimistic: true,
    };

    setMessages(prev => [optimisticMsg, ...prev]);
    setInputText('');

    const formData = new FormData();
    formData.append('message', text);

    try {
      await sendMessage({ id: chatId, data: formData }).unwrap();
    } catch (err) {
      console.error('Error sending message:', err);
      ShowToast('error', 'Failed to send message');
      // On error, remove the optimistic message
      setMessages(prev => prev.filter(msg => msg.id !== optimisticMsg.id));
      // Optionally restore input text if user wants to retry
      setInputText(text);
    }
  }, [inputText, chatId, sendMessage, user]);

  if (isLoading) {
    return (
      <Container safeAreaViewStyle={styles.container}>
        <View style={styles.chatContainer}>
          <AppHeader onBackPress heading="Live Chat" />
          <View style={styles.loaderContainer}>
            <Loader color={AppColors.ThemeColor} />
          </View>
        </View>
      </Container>
    );
  }

  return (
    <Container scrollEnabled={false} safeAreaViewStyle={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.chatContainer}>
          <AppHeader onBackPress heading="Live Chat" />
          <View style={styles.statusBar}>
            <AppText
              title={activeHandler ? 'Connected to Support' : 'Waiting for a consultant...'}
              textSize={1.6}
              textColor={activeHandler ? AppColors.ThemeColor : AppColors.GRAY}
              textAlignment="center"
            />
          </View>
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
      </KeyboardAvoidingView>
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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusBar: {
    paddingVertical: 8,
    backgroundColor: AppColors.app_light,
    borderRadius: 8,
    marginBottom: 10,
  },
  inputWrapper: {
    justifyContent: 'flex-end',
    marginHorizontal: responsiveWidth(5),
  },
});
