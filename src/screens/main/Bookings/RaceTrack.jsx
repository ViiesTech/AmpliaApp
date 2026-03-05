/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, FlatList, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import { useLazyGetFilesQuery, useUpdateBookingMutation, useGetBookingByIdQuery, useLazyGetBookingsQuery, useUploadFileMutation } from '../../../redux/services/mainService';
import { useSelector } from 'react-redux';
import { pick, types, isErrorWithCode, errorCodes } from '@react-native-documents/picker';
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
    { id: 1, name: 'W-2 / 1099', status: 'Pending', rejectionReason: '' },
    { id: 2, name: 'Self-employment', status: 'Pending', rejectionReason: '' },
    { id: 3, name: 'Rental property', status: 'Pending', rejectionReason: '' },
    { id: 4, name: 'Investments', status: 'Pending', rejectionReason: '' },
    { id: 5, name: 'Crypto', status: 'Pending', rejectionReason: '' },
    { id: 6, name: 'Foreign income', status: 'Pending', rejectionReason: '' },
    { id: 7, name: 'Dependents', status: 'Pending', rejectionReason: '' },
    { id: 8, name: 'Prior-year return', status: 'Pending', important: true, rejectionReason: '' },
];

const RaceTrack = ({ navigation, route }) => {
    const { user } = useSelector(state => state.persistedData);
    const [getBookings] = useLazyGetBookingsQuery();
    const [internalBookingId, setInternalBookingId] = useState(route?.params?.bookingId);

    // If no bookingId, try to find the user's latest booking
    useEffect(() => {
        if (!internalBookingId && user?._id) {
            getBookings(user._id).unwrap().then(res => {
                const bookings = res?.bookings || [];
                if (bookings.length > 0) {
                    // Sort by date or just pick first active
                    const latest = bookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
                    setInternalBookingId(latest._id);
                }
            });
        }
    }, [user, internalBookingId]);

    const bookingId = internalBookingId || '67c740203f19e487da23a789'; // Fallback to mock
    const { data: bookingData } = useGetBookingByIdQuery(bookingId, {
        pollingInterval: 3000,
        skip: !bookingId
    });
    const [getFiles, { data: filesData }] = useLazyGetFilesQuery();
    const [updateBooking] = useUpdateBookingMutation();
    const [uploadFile] = useUploadFileMutation();
    const [documents, setDocuments] = useState(initialDocs);
    const [bookingStatus, setBookingStatus] = useState('new');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (bookingData?.success && bookingData?.data?.status) {
            setBookingStatus(bookingData.data.status);
        }
    }, [bookingData]);

    useEffect(() => {
        if (bookingId) {
            getFiles({ bookingId });
        }
    }, [bookingId, getFiles]);

    useEffect(() => {
        if (filesData?.success && filesData?.files) {
            setDocuments(prev => prev.map(doc => {
                // Find any file that matches this document category name
                const backendFile = filesData.files.find(f => f.name === doc.name);
                if (backendFile) {
                    // Map backend status to UI status
                    let uiStatus = 'Pending';
                    const backendStatus = backendFile.status?.toLowerCase();
                    if (backendStatus === 'sent') uiStatus = 'Sent';
                    if (backendStatus === 'received') uiStatus = 'Received';
                    if (backendStatus === 'rejected') uiStatus = 'Rejected';

                    return {
                        ...doc,
                        status: uiStatus,
                        rejectionReason: backendFile.rejectionReason || '',
                    };
                }
                return doc;
            }));
        }
    }, [filesData]);

    const handlePick = async (category) => {
        try {
            const results = await pick({
                type: [types.allFiles],
                allowMultiSelection: true,
            });

            setDocuments(prev => prev.map(doc =>
                doc.id === category.id ? { ...doc, files: results, status: 'Picked', rejectionReason: '' } : doc
            ));

            ShowToast(`${results.length} document(s) selected`);

        } catch (err) {
            if (isErrorWithCode(err, errorCodes.OPERATION_CANCELED)) {
                console.log('User cancelled document picker');
            } else {
                console.error('Picker Error: ', err);
                ShowToast('Failed to pick document(s)');
            }
        }
    };

    const handleStartFilling = async () => {
        try {
            setIsSubmitting(true);

            // 1. Upload all picked files
            const categoriesWithFiles = documents.filter(d => d.status === 'Picked' && d.files?.length > 0);

            if (categoriesWithFiles.length === 0 && !documents.some(d => d.status === 'Received' || d.status === 'Sent')) {
                ShowToast('Please upload at least one document');
                setIsSubmitting(false);
                return;
            }

            for (const cat of categoriesWithFiles) {
                for (const file of cat.files) {
                    const formData = new FormData();
                    formData.append('file', {
                        uri: file.uri,
                        type: file.type || 'application/pdf',
                        name: file.name || `document_${Date.now()}.pdf`,
                    });
                    formData.append('name', cat.name);
                    formData.append('year', 2024);
                    formData.append('bookingId', bookingId);
                    formData.append('type', 'user_doc');

                    await uploadFile(formData).unwrap();
                }
            }

            // 2. Update booking status
            await updateBooking({ id: bookingId, data: { status: 'sent' } }).unwrap();
            setBookingStatus('sent');
            ShowToast('Documents sent to admin panel');
        } catch (error) {
            console.error('Start Error:', error);
            ShowToast('Failed to start process');
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderDocItem = ({ item }) => {
        const isReceived = item.status === 'Received';
        const isSent = item.status === 'Sent';
        const isRejected = item.status === 'Rejected';
        const isPicked = item.status === 'Picked';

        const getStatusColor = () => {
            if (isReceived) return "#60C14C";
            if (isRejected) return "#F44336";
            if (isSent) return "#FF9800";
            if (isPicked) return AppColors.ThemeColor;
            return AppColors.LIGHTGRAY;
        };

        return (
            <View style={styles.docItem}>
                <View style={styles.docLeft}>
                    <Icon
                        name={isReceived ? "check-circle" : isRejected ? "alert-circle" : (isSent || isPicked) ? "clock-outline" : "checkbox-blank-circle-outline"}
                        size={responsiveFontSize(2.5)}
                        color={getStatusColor()}
                    />
                    <View style={{ marginLeft: 10, flex: 1 }}>
                        <AppText
                            title={item.name}
                            textSize={1.8}
                            textColor={AppColors.ThemeColor}
                            textFontWeight
                        />
                        {(isReceived || isSent || isRejected || isPicked) && (
                            <AppText
                                title={isRejected ? `Rejected: ${item.rejectionReason}` : isSent ? "Waiting for review" : isPicked ? "Ready to start" : "Received"}
                                textSize={1.4}
                                textColor={getStatusColor()}
                            />
                        )}
                    </View>
                </View>

                {!isReceived && !isSent && !isPicked ? (
                    <TouchableOpacity
                        style={styles.uploadButton}
                        onPress={() => handlePick(item)}
                    >
                        <Feather
                            name="upload"
                            size={responsiveFontSize(2)}
                            color={AppColors.GRAY}
                        />
                        <AppText
                            title={isRejected ? "Re-upload" : "Upload"}
                            textSize={1.4}
                            textColor={AppColors.GRAY}
                            style={{ marginLeft: 5 }}
                        />
                    </TouchableOpacity>
                ) : isPicked ? (
                    <TouchableOpacity
                        style={[styles.uploadButton, { backgroundColor: '#E0F2F1' }]}
                        onPress={() => handlePick(item)}
                    >
                        <Icon name="file-document-outline" size={responsiveFontSize(2)} color={AppColors.ThemeColor} />
                        <AppText
                            title="Selected"
                            textSize={1.4}
                            textColor={AppColors.ThemeColor}
                            textFontWeight
                            style={{ marginLeft: 5 }}
                        />
                    </TouchableOpacity>
                ) : isSent ? (
                    <View style={[styles.uploadButton, { backgroundColor: '#FFF3E0' }]}>
                        <AppText
                            title="Sent"
                            textSize={1.4}
                            textColor="#FF9800"
                            textFontWeight
                        />
                    </View>
                ) : (
                    <View style={[styles.uploadButton, styles.receivedButton]}>
                        <Icon
                            name="check"
                            size={responsiveFontSize(2)}
                            color="#60C14C"
                        />
                        <AppText
                            title="Received"
                            textSize={1.4}
                            textColor="#60C14C"
                            textFontWeight
                            style={{ marginLeft: 5 }}
                        />
                    </View>
                )}
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
                            <AppText title="Start" textSize={1.4} textColor={['sent', 'received', 'preparation', 'review', 'approved', 'filed'].includes(bookingStatus) ? AppColors.ThemeColor : AppColors.GRAY} textFontWeight={['sent', 'received', 'preparation', 'review', 'approved', 'filed'].includes(bookingStatus)} />
                            <AppText title="Prep" textSize={1.4} textColor={['preparation', 'review', 'approved', 'filed'].includes(bookingStatus) ? AppColors.ThemeColor : AppColors.GRAY} textFontWeight={['preparation', 'review', 'approved', 'filed'].includes(bookingStatus)} />
                            <AppText title="Review" textSize={1.4} textColor={['review', 'approved', 'filed'].includes(bookingStatus) ? AppColors.ThemeColor : AppColors.GRAY} textFontWeight={['review', 'approved', 'filed'].includes(bookingStatus)} />
                            <AppText title="Filed" textSize={1.4} textColor={bookingStatus === 'filed' ? AppColors.ThemeColor : AppColors.GRAY} textFontWeight={bookingStatus === 'filed'} />
                        </View>

                        <View style={styles.trackLineContainer}>
                            <View style={styles.trackLine} />
                            <View style={[styles.activeTrack, {
                                width: bookingStatus === 'sent' ? '25%' :
                                    bookingStatus === 'received' ? '35%' :
                                        bookingStatus === 'preparation' ? '50%' :
                                            bookingStatus === 'review' ? '75%' :
                                                bookingStatus === 'approved' ? '85%' :
                                                    bookingStatus === 'filed' ? '100%' : '15%'
                            }]} />
                            <View style={styles.trackDots}>
                                <View style={[styles.dot, ['sent', 'received', 'preparation', 'review', 'approved', 'filed'].includes(bookingStatus) ? styles.activeDot : null]} />
                                <View style={[styles.dot, ['preparation', 'review', 'approved', 'filed'].includes(bookingStatus) ? styles.activeDot : null]} />
                                <View style={[styles.dot, ['review', 'approved', 'filed'].includes(bookingStatus) ? styles.activeDot : null]} />
                                <View style={[styles.dot, bookingStatus === 'filed' ? styles.activeDot : null]} />
                            </View>
                            <Image
                                source={AppImages.horse_racing_icon}
                                style={[styles.horseIcon, {
                                    left: bookingStatus === 'sent' ? '18%' :
                                        bookingStatus === 'received' ? '28%' :
                                            bookingStatus === 'preparation' ? '42%' :
                                                bookingStatus === 'review' ? '68%' :
                                                    bookingStatus === 'approved' ? '78%' :
                                                        bookingStatus === 'filed' ? '92%' : '8%'
                                }]}
                                resizeMode="contain"
                            />
                        </View>
                    </View>
                </View>

                {/* Full Screen Stages */}
                {bookingStatus === 'preparation' && (
                    <View style={styles.prepScreen}>
                        <View style={styles.loaderContainer}>
                            <View style={styles.spinner} />
                        </View>
                        <AppText
                            title="PREPARATION"
                            textSize={4}
                            textColor={AppColors.ThemeColor}
                            textFontWeight
                        />
                        <AppText
                            title="Your tax return is being prepared by our experts."
                            textSize={1.8}
                            textColor={AppColors.GRAY}
                            style={{ marginTop: 10, textAlign: 'center' }}
                        />
                    </View>
                )}

                {bookingStatus !== 'preparation' && (
                    <>
                        <LineBreak space={2} />

                        {/* Documents Needed Section */}
                        <View style={styles.docsContainer}>
                            <AppText title={bookingStatus === 'review' || bookingStatus === 'approved' ? "Review Your Return" : "Documents Needed"} textSize={2} textColor={AppColors.ThemeColor} textFontWeight />
                            <LineBreak space={1} />

                            {bookingStatus === 'review' || bookingStatus === 'approved' ? (
                                <View style={styles.returnDocCard}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={styles.fileIconBig}>
                                            <Icon name="file-pdf-box" size={30} color="#F44336" />
                                        </View>
                                        <View style={{ marginLeft: 15, flex: 1 }}>
                                            <AppText title="Tax Return 2024 (Final)" textSize={1.8} textColor={AppColors.ThemeColor} textFontWeight />
                                            <AppText title="Uploaded by Admin" textSize={1.4} textColor={AppColors.GRAY} />
                                        </View>
                                    </View>
                                    <TouchableOpacity
                                        style={styles.viewButton}
                                        onPress={() => ShowToast('Opening return document...')}
                                    >
                                        <AppText title="View Return" textSize={1.6} textColor={AppColors.WHITE} textFontWeight />
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <FlatList
                                    data={documents}
                                    renderItem={renderDocItem}
                                    keyExtractor={item => item.id.toString()}
                                    scrollEnabled={false}
                                />
                            )}

                            {bookingStatus === 'new' && (documents.some(d => d.status === 'Sent' || d.status === 'Received' || d.status === 'Picked')) && (
                                <TouchableOpacity
                                    style={[styles.startButton, isSubmitting && { opacity: 0.7 }]}
                                    onPress={handleStartFilling}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <ActivityIndicator size="small" color={AppColors.WHITE} />
                                    ) : (
                                        <AppText title="START" textSize={2} textColor={AppColors.WHITE} textFontWeight />
                                    )}
                                </TouchableOpacity>
                            )}
                        </View>

                        <LineBreak space={2} />

                        {/* Bottom Message Box / Action Button */}
                        {bookingStatus === 'review' ? (
                            <TouchableOpacity
                                style={styles.filedButton}
                                onPress={async () => {
                                    try {
                                        await updateBooking({ id: bookingId, data: { status: 'approved' } }).unwrap();
                                        setBookingStatus('approved');
                                        ShowToast('Return approved and marked as Filed');
                                    } catch (error) {
                                        ShowToast('Approval failed');
                                    }
                                }}
                            >
                                <AppText title="FILED" textSize={2} textColor={AppColors.WHITE} textFontWeight />
                            </TouchableOpacity>
                        ) : (
                            <View style={styles.messageBox}>
                                <AppText
                                    title={bookingStatus === 'sent' ? "Waiting for admin to review your documents." :
                                        bookingStatus === 'received' ? "All documents received. Waiting for preparation to start." :
                                            bookingStatus === 'approved' ? "You have approved your return. Waiting for final filing confirmation." :
                                                bookingStatus === 'filed' ? "Filing completed! You can start a new request for next year." :
                                                    "Please upload your documents and press START to begin."}
                                    textSize={1.6}
                                    textColor={AppColors.ThemeColor}
                                    textAlignment="center"
                                />
                            </View>
                        )}
                    </>
                )}

                <LineBreak space={4} />

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
    prepScreen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: responsiveHeight(5),
    },
    loaderContainer: {
        marginBottom: 20,
    },
    spinner: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 4,
        borderColor: '#E6EBED',
        borderTopColor: '#007B7F',
    },
    startButton: {
        backgroundColor: AppColors.ThemeColor,
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 20,
    },
    filedButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginVertical: 10,
    },
    returnDocCard: {
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 15,
        padding: 15,
        marginTop: 10,
    },
    fileIconBig: {
        width: 50,
        height: 50,
        backgroundColor: '#FFEBEE',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewButton: {
        backgroundColor: AppColors.ThemeColor,
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 15,
    }
});
