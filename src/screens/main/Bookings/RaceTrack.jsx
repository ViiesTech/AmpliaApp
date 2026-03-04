/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, TouchableOpacity, FlatList, StyleSheet, Image, ScrollView } from 'react-native';
import Container from '../../../components/Container';
import {
    AppColors,
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
    ShowToast,
} from '../../../utils';
import AppHeader from '../../../components/AppHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import LineBreak from '../../../components/LineBreak';
import AppText from '../../../components/AppText';
import { AppImages } from '../../../assets/images';

const initialDocs = [
    { id: 1, name: 'W-2 / 1099', status: 'Pending' },
    { id: 2, name: 'Self-employment', status: 'Pending' },
    { id: 3, name: 'Rental property', status: 'Pending' },
    { id: 4, name: 'Investments', status: 'Pending' },
    { id: 5, name: 'Crypto', status: 'Pending' },
    { id: 6, name: 'Foreign income', status: 'Pending' },
    { id: 7, name: 'Dependents', status: 'Pending' },
    { id: 8, name: 'Prior-year return', status: 'Pending', important: true },
];

const RaceTrack = () => {
    const [documents, setDocuments] = useState(initialDocs);

    const handleUpload = (id) => {
        setDocuments(prev => prev.map(doc =>
            doc.id === id ? { ...doc, status: 'Received' } : doc
        ));
        // ShowToast('Document uploaded successfully');
    };

    const renderDocItem = ({ item }) => {
        const isReceived = item.status === 'Received';
        return (
            <View style={styles.docItem}>
                <View style={styles.docLeft}>
                    <Icon
                        name={isReceived ? "check-circle" : "checkbox-blank-circle-outline"}
                        size={responsiveFontSize(2.5)}
                        color={isReceived ? "#60C14C" : AppColors.LIGHTGRAY}
                    />
                    <View style={{ marginLeft: 10 }}>
                        <AppText
                            title={item.name}
                            textSize={1.8}
                            textColor={AppColors.ThemeColor}
                            textFontWeight
                        />
                        {isReceived && (
                            <AppText
                                title="1 received"
                                textSize={1.4}
                                textColor={AppColors.GRAY}
                            />
                        )}
                    </View>
                </View>

                <TouchableOpacity
                    style={[styles.uploadButton, isReceived && styles.receivedButton]}
                    onPress={() => !isReceived && handleUpload(item.id)}
                >
                    <Feather
                        name="upload"
                        size={responsiveFontSize(2)}
                        color={isReceived ? "#60C14C" : AppColors.GRAY}
                    />
                    <AppText
                        title={isReceived ? "Received" : "Upload"}
                        textSize={1.4}
                        textColor={isReceived ? "#60C14C" : AppColors.GRAY}
                        style={{ marginLeft: 5 }}
                    />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <Container scrollEnabled={true}>
            <View style={styles.content}>
                <AppHeader onBackPress={false} heading="Race Track" />

                <View style={styles.yearHeader}>
                    <AppText title="Taxes 2024" textSize={2.2} textColor={AppColors.ThemeColor} textFontWeight />
                </View>

                {/* Race Track Progress Bar */}
                <View style={styles.progressContainer}>
                    <View style={styles.raceInfo}>
                        <View style={styles.raceMarkers}>
                            <AppText title="Start" textSize={1.4} textColor={AppColors.GRAY} />
                            <AppText title="Prep" textSize={1.4} textColor={AppColors.ThemeColor} textFontWeight />
                            <AppText title="Prep" textSize={1.4} textColor={AppColors.GRAY} />
                            <AppText title="Review" textSize={1.4} textColor={AppColors.GRAY} />
                            <AppText title="Filed" textSize={1.4} textColor={AppColors.GRAY} />
                        </View>

                        <View style={styles.trackLineContainer}>
                            <View style={styles.trackLine} />
                            <View style={[styles.activeTrack, { width: '35%' }]} />
                            <View style={styles.trackDots}>
                                <View style={[styles.dot, styles.activeDot]} />
                                <View style={[styles.dot, styles.activeDot]} />
                                <View style={styles.dot} />
                                <View style={styles.dot} />
                                <View style={styles.dot} />
                            </View>
                            <Image
                                source={AppImages.horse_racing_icon}
                                style={styles.horseIcon}
                                resizeMode="contain"
                            />
                        </View>
                    </View>
                </View>

                <LineBreak space={2} />

                {/* Documents Needed Section */}
                <View style={styles.docsContainer}>
                    <AppText title="Documents Needed" textSize={2} textColor={AppColors.ThemeColor} textFontWeight />
                    <LineBreak space={1} />

                    <FlatList
                        data={documents}
                        renderItem={renderDocItem}
                        keyExtractor={item => item.id.toString()}
                        scrollEnabled={false}
                    />
                </View>

                <LineBreak space={2} />

                {/* Bottom Message Box */}
                <View style={styles.messageBox}>
                    <AppText
                        title="Your return is currently being prepared. We'll notify you if anything is needed."
                        textSize={1.6}
                        textColor={AppColors.ThemeColor}
                        textAlignment="center"
                    />
                </View>

                <LineBreak space={4} />
            </View>
        </Container>
    );
};

export default RaceTrack;

const styles = StyleSheet.create({
    content: {
        marginHorizontal: responsiveWidth(5),
        flex: 1,
    },
    yearHeader: {
        alignItems: 'center',
        marginVertical: responsiveHeight(1),
    },
    progressContainer: {
        backgroundColor: AppColors.WHITE,
        borderRadius: 15,
        padding: 15,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.1,
        // shadowRadius: 4,
        // elevation: 3,
    },
    raceInfo: {
        width: '100%',
    },
    raceMarkers: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: responsiveHeight(5),
        paddingHorizontal: 10,
    },
    trackLineContainer: {
        position: 'relative',
        height: 10,
        justifyContent: 'center',
    },
    trackLine: {
        position: 'absolute',
        width: '100%',
        height: 3,
        backgroundColor: '#E6EBED',
        borderRadius: 2,
    },
    activeTrack: {
        position: 'absolute',
        height: 3,
        backgroundColor: '#007B7F',
        borderRadius: 2,
    },
    trackDots: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#E6EBED',
        borderWidth: 2,
        borderColor: '#E6EBED',
    },
    activeDot: {
        backgroundColor: '#007B7F',
        borderColor: '#007B7F',
    },
    horseIcon: {
        position: 'absolute',
        width: 60,
        height: 60,
        top: -55,
        left: '25%', // Moves based on progress
    },
    docsContainer: {
        backgroundColor: AppColors.WHITE,
        borderRadius: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    docItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F3F6',
    },
    docLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    uploadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F7F8',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 8,
    },
    receivedButton: {
        backgroundColor: '#E8F5E9',
    },
    messageBox: {
        backgroundColor: '#F1F7F8',
        padding: 25,
        borderRadius: 15,
        marginVertical: 10,
    },
});
