/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useState, useRef } from 'react';
import { View, ActivityIndicator, Alert, ScrollView, KeyboardAvoidingView } from 'react-native';
import Container from '../../../components/Container';
import LiveChatScreen from '../../../components/LiveChatScreen';
import ChatInput from '../../../components/ChatInput';
import LineBreak from '../../../components/LineBreak';
import { responsiveWidth, AppColors } from '../../../utils';
import BookingChatHeader from '../../../components/BookingChatHeader';
import BookingChatStatus from '../../../components/BookingChatStatus';
import ImageCropPicker from 'react-native-image-crop-picker';
import { io } from 'socket.io-client';
import { useCreateChatMutation, useSendMessageMutation } from '../../../redux/services/mainService';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../../redux/constant';

// Adjust socket url if needed (typically base url without /api)
// const SOCKET_URL = 'http://localhost:4006/'; // Or extract from BASE_URL
const SOCKET_URL = 'https://apiforapp.link/Amplia'; // Or extract from BASE_URL

const BookingChat = props => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const { data } = props.route.params;
  const { user } = useSelector(state => state.persistedData);

  const [createChat, { isLoading: isCreatingChat }] = useCreateChatMutation();
  const [sendMessage] = useSendMessageMutation();

  const [chatId, setChatId] = useState(null);
  const socketRef = useRef(null);

  // Initialize Chat
  useEffect(() => {
    const initChat = async () => {
      try {
        const res = await createChat({ bookingId: data._id }).unwrap();
        const chat = res.chat;
        setChatId(chat._id);

        // Map existing messages
        const formattedMessages = (chat.messages || []).map(msg => ({
          id: msg._id,
          text: msg.message,
          time: new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: msg.sender._id === user._id ? 'sent' : 'received',
          media: msg.media,
          files: msg.files,
        }));
        setMessages(formattedMessages);

        // Connect Socket
        socketRef.current = io("https://apiforapp.link", {
          path: "/socket.io",
          transports: ["websocket"],
        });;
        socketRef.current.on('connect', () => {
          console.log('Socket connected');
          socketRef.current.emit('join_room', chat._id);
        });

        socketRef.current.on('new_message', (newEvent) => {
          const isOwn = newEvent.sender._id === user._id;
          const newMsg = {
            id: newEvent._id,
            text: newEvent.message,
            time: new Date(newEvent.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: isOwn ? 'sent' : 'received',
            media: newEvent.media,
            files: newEvent.files,
          };
          setMessages(prev => [...prev, newMsg]);
        });

      } catch (err) {
        console.error("Error initializing chat:", err);
        Alert.alert("Error", "Failed to load chat.");
      }
    };

    if (data._id && user._id) {
      initChat();
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [data._id, user._id, createChat]);


  const selectImage = useCallback(() => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: false,
    })
      .then(image => {
        // Handle image upload here (similar to handleSendMessage but with file)
        // For brevity, skipping implementation but structure is ready
        console.log(image);
      })
      .catch(err => {
        console.log('Image picker error:', err);
      });
  }, []);

  const handleSendMessage = useCallback(async () => {
    if (!inputText.trim() || !chatId) return;

    try {
      const formData = new FormData();
      formData.append('message', inputText.trim());

      // Optimistic update (optional)
      // We rely on socket 'new_message' for consistency

      await sendMessage({ id: chatId, data: formData }).unwrap();
      setInputText('');

    } catch (err) {
      console.error("Error sending message:", err);
      Alert.alert("Error", "Failed to send message.");
    }
  }, [inputText, chatId, sendMessage]);

  if (isCreatingChat && !chatId) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={AppColors.ThemeColor} />
      </View>
    )
  }

  return (
    <Container scrollEnabled={true} safeAreaViewStyle={{ flex: 1 }}>

      <View style={{ flex: 1, marginHorizontal: responsiveWidth(5) }}>
        <BookingChatHeader data={data} />
        <BookingChatStatus data={data} status={data.status} />
        <LiveChatScreen data={messages} />
      </View>

      <View
        style={{
          justifyContent: 'flex-end',
          marginHorizontal: responsiveWidth(5),
          paddingBottom: 10,
        }}
      >
      </View>
      <LineBreak space={1} />

      <View style={{ marginHorizontal: responsiveWidth(5) }}>
        <ChatInput
          value={inputText}
          onChangeText={setInputText}
          galleryPress={selectImage}
          sendPress={handleSendMessage}
        />
      </View>

    </Container>
  );
};

export default BookingChat;
