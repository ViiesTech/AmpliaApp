import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { AppColors, responsiveFontSize, responsiveHeight, responsiveWidth } from '../utils';

const LiveChatScreen = ({ data = [] }: any) => {
    const messages = [
        {
            id: '1',
            text: 'Lorem ipsum dolor sit amet, consectetur adipicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem amet.',
            time: '4 mins ago',
            type: 'sent',
        },
        {
            id: '2',
            text: 'Lorem ipsum dolor sit amet, consectetur adipicing elit, sed do eiusmod tempor incididunt.',
            time: '4 mins ago',
            type: 'received',
        },
        {
            id: '3',
            text: 'Lorem ipsum dolor sit amet, consectetur',
            time: '4 mins ago',
            type: 'sent',
        },
        {
            id: '4',
            text: 'Lorem ipsum dolor sit amet, consectetur adipicing elit, sed do eiusmod tempor incididunt.',
            time: '4 mins ago',
            type: 'received',
        },
        {
            id: '5',
            text: 'Lorem ipsum dolor sit amet, consectetur',
            time: '4 mins ago',
            type: 'sent',
        },
    ];

    const renderMessage = ({ item }: any) => (
        <View
            style={[
                styles.messageContainer,
                item.type === 'sent' ? styles.sentContainer : styles.receivedContainer,
            ]}
        >
            <View
                style={[
                    styles.bubble,
                    item.type === 'sent' ? styles.sentBubble : styles.receivedBubble,
                ]}
            >
                <Text
                    style={[
                        styles.messageText,
                        item.type === 'sent' ? styles.sentText : styles.receivedText,
                    ]}
                >
                    {item.text}
                </Text>
                <Text
                    style={[
                        styles.timeText,
                        item.type === 'sent' ? styles.sentTime : styles.receivedTime,
                    ]}
                >
                    {item.time}
                </Text>
            </View>
        </View>
    );

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={item => item.id}
                renderItem={renderMessage}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        // paddingVertical: 10,
    },
    messageContainer: {
        marginVertical: responsiveHeight(1),
    },
    sentContainer: {
        alignItems: 'flex-start',
    },
    receivedContainer: {
        alignItems: 'flex-end',
    },
    bubble: {
        maxWidth: responsiveWidth(80),
        borderRadius: 15,
        paddingVertical: responsiveHeight(1),
        paddingHorizontal: responsiveWidth(3),
    },
    sentBubble: {
        backgroundColor: '#003B44',
        borderTopLeftRadius: 0,
    },
    receivedBubble: {
        backgroundColor: '#F2F8F8',
        borderTopRightRadius: 0,
    },
    messageText: {
        fontSize: responsiveFontSize(1.7),
        lineHeight: 20,
    },
    sentText: {
        color: AppColors.WHITE,
    },
    receivedText: {
        color: '#333333',
    },
    timeText: {
        fontSize: responsiveFontSize(1.4),
        marginTop: responsiveHeight(0.5),
    },
    sentTime: {
        color: AppColors.WHITE,
        marginLeft: responsiveWidth(1),
    },
    receivedTime: {
        color: '#7C9A9A',
        marginRight: responsiveWidth(1),
    },
});

export default LiveChatScreen;
