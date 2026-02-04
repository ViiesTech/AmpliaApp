import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { AppColors, responsiveFontSize, responsiveHeight, responsiveWidth } from '../utils';

const LiveChatScreen = ({ data = [] }: any) => {

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
        <View style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={item => item.id}
                renderItem={renderMessage}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: responsiveHeight(60)
    },
    contentContainer: {
        paddingVertical: 10,
    },
    messageContainer: {
        marginVertical: responsiveHeight(1),
    },
    sentContainer: {
        alignItems: 'flex-end', // Changed to flex-end for sent messages (right side)
    },
    receivedContainer: {
        alignItems: 'flex-start', // Changed to flex-start for received messages (left side)
    },
    bubble: {
        maxWidth: responsiveWidth(80),
        borderRadius: 15,
        paddingVertical: responsiveHeight(1),
        paddingHorizontal: responsiveWidth(3),
    },
    sentBubble: {
        backgroundColor: '#003B44',
        borderTopRightRadius: 0, // Changed to match right alignment
        borderTopLeftRadius: 15,
    },
    receivedBubble: {
        backgroundColor: '#F2F8F8',
        borderTopLeftRadius: 0, // Changed to match left alignment
        borderTopRightRadius: 15,
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
        textAlign: 'right',
    },
    receivedTime: {
        color: '#7C9A9A',
        textAlign: 'left',
    },
});

export default LiveChatScreen;
