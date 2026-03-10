/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, FlatList, StyleSheet, Image, ScrollView, ActivityIndicator, Modal, Linking, Alert } from 'react-native';
import { getImageUrl } from '../../../redux/constant';
import { useLazyGetFilesQuery, useUpdateBookingMutation, useGetBookingByIdQuery, useLazyGetBookingsQuery, useUploadFileMutation, useLazyGetAllServicesQuery, useCreateBookingMutation, useLinkFileMutation } from '../../../redux/services/mainService';
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
    const [getBookings, { isFetching: isBookingsListFetching }] = useLazyGetBookingsQuery();
    const [internalBookingId, setInternalBookingId] = useState(route?.params?.bookingId);

    const [getAllServices] = useLazyGetAllServicesQuery();
    const [createBooking] = useCreateBookingMutation();





    const bookingId = internalBookingId;
    const { data: bookingData, isLoading: isBookingLoading, isFetching: isBookingFetching, refetch: refetchBooking } = useGetBookingByIdQuery(bookingId, {
        skip: !bookingId
    });
    const [getFiles, { data: filesData, isLoading: isFilesLoading, isFetching: isFilesFetching }] = useLazyGetFilesQuery();
    const [updateBooking] = useUpdateBookingMutation();
    const [uploadFile] = useUploadFileMutation();
    const [linkFile] = useLinkFileMutation();
    const [documents, setDocuments] = useState(initialDocs);
    const [bookingStatus, setBookingStatus] = useState('new');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [showVault, setShowVault] = useState(false);
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear.toString());
    const [vaultYear, setVaultYear] = useState(currentYear.toString());
    const [showYearPicker, setShowYearPicker] = useState(false);
    const startYearBound = currentYear + 1;
    const years = Array.from({ length: startYearBound - 1900 + 1 }, (_, i) => (startYearBound - i).toString());

    // Find the booking that matches the currently selected year

    useEffect(() => {

        // Alert.alert("selectedYear", selectedYear)
        if (user?._id) {
            getBookings({ userId: user._id, FiledYear: Number(selectedYear) }).unwrap().then(res => {
                const bookings = res?.bookings || [];
                // Backend already filters by year and sorts by latest
                const matching = bookings[0];

                console.log("bookings>>>!!>>", bookings)

                if (matching) {
                    setInternalBookingId(matching._id);
                } else {
                    // No booking for this year, reset to 'new' state
                    setInternalBookingId(null);
                    setBookingStatus('new');
                    setDocuments(initialDocs);
                }
            });
        }
    }, [selectedYear]);

    useEffect(() => {
        if (!bookingId) {
            setBookingStatus('new');
            return;
        }
        if (bookingData?.success && bookingData?.booking?.status) {
            setBookingStatus(bookingData?.booking?.status);
        }
    }, [bookingData, bookingId]);

    useEffect(() => {
        if (bookingId) {
            getFiles({ bookingId });
        }
    }, [bookingId, getFiles]);

    useEffect(() => {
        if (!bookingId) {
            // Only reset if no docs are locally picked
            const hasLocalPicks = documents.some(d => d.status === 'Picked');
            if (!hasLocalPicks) {
                setDocuments(initialDocs);
            }
            return;
        }
        if (filesData?.success && filesData?.files) {
            setDocuments(prev => prev.map(doc => {
                // Don't overwrite locally picked files
                if (doc.status === 'Picked') return doc;
                const backendFile = filesData.files.find(f => f.name === doc.name);
                if (backendFile) {
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
                return { ...doc, status: 'Pending', rejectionReason: '' };
            }));
        } else {
            // Only reset if no locally picked docs
            const hasLocalPicks = documents.some(d => d.status === 'Picked');
            if (!hasLocalPicks) {
                setDocuments(initialDocs);
            }
        }
    }, [filesData, bookingId]);

    const handleLinkDocument = async (vaultFile) => {
        if (!bookingId) {
            ShowToast('No active booking to link documents');
            return;
        }

        setIsSubmitting(true);
        try {
            // Find which document category this vault file should fulfill
            // If the user picked a specific doc slot before opening vault, we'd use that.
            // For now, let's try to match by name or just use 'user_doc' type.
            const payload = {
                bookingId: bookingId,
                name: vaultFile.name,
                url: vaultFile.url,
                year: selectedYear,
                type: vaultFile.type || 'user_doc'
            };

            await linkFile(payload).unwrap();
            ShowToast(`${vaultFile.name} linked successfully`);

            // Refresh files
            getFiles({ bookingId });
        } catch (error) {
            console.error('Link File Error:', error);
            ShowToast('Failed to link document');
        } finally {
            setIsSubmitting(false);
        }
    };

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

    const handleStartNewBooking = async () => {
        try {
            // Try to find real service from backend
            const servicesRes = await getAllServices().unwrap();
            let taxService = servicesRes?.services?.find(s => s.name.toLowerCase().includes('tax')) || servicesRes?.services?.[0];

            // If no services in DB, use a predefined fallback to ensure flow works
            if (!taxService) {
                taxService = {
                    _id: '67c740203f19e487da23a002',
                    name: 'Tax Preparation & Filing',
                    category: 'Tax',
                    price: 250,
                    description: 'Professional tax preparation and filing service (Fallback).',
                    cover: 'service_one.png'
                };
            }

            const payload = {
                service: taxService._id,
                serviceName: taxService.name,
                category: typeof taxService.category === 'object' ? taxService.category?.name : (taxService.category || 'Tax'),
                planName: 'Standard',
                price: taxService.price || 0,
                description: taxService.description || '',
                cover: taxService.cover || '',
                status: 'new',
                year: selectedYear,
                FiledYear: Number(selectedYear),
                startDate: new Date().toISOString(),
                endDate: new Date().toISOString(),
            };

            const res = await createBooking(payload).unwrap();
            if (res?.success && res?.booking?._id) {
                setInternalBookingId(res.booking._id);
                return res.booking._id;
            }
            return null;
        } catch (error) {
            console.error('Create Booking Error:', error);
            ShowToast('Failed to create new booking');
            return null;
        }
    };

    const handleStartFilling = async () => {
        const isStartingNew = bookingStatus === 'approved' || bookingStatus === 'filed';

        // 1. If starting fresh after approval/filing, create new booking + reset
        if (isStartingNew) {
            if (!user?._id) {
                ShowToast('User identity missing, please re-login');
                return;
            }
            setIsSubmitting(true);
            const newId = await handleStartNewBooking();
            setIsSubmitting(false);
            if (!newId) return;
            setDocuments(initialDocs);
            ShowToast('Filing restarted. Please upload new documents.');
            return;
        }

        // 2. If no booking exists yet, create one first
        if (!bookingId) {
            if (!user?._id) {
                ShowToast('User identity missing, please re-login');
                return;
            }
            setIsSubmitting(true);
            const newId = await handleStartNewBooking();
            setIsSubmitting(false);
            if (!newId) return;

            // If user already picked docs, upload them right away
            const hasPickedDocs = documents.some(d => d.status === 'Picked' && d.files?.length > 0);
            if (hasPickedDocs) {
                // bookingId state hasn't updated yet, pass newId directly
                await handleStartProcessWithId(newId);
            } else {
                ShowToast('Booking created. Please upload your documents.');
            }
            return;
        }

        // 3. Booking exists — check if user has picked any documents to upload
        const hasPickedDocs = documents.some(d => d.status === 'Picked' && d.files?.length > 0);

        if (hasPickedDocs) {
            // Upload picked docs and mark booking as 'sent'
            await handleStartProcess();
        } else {
            // No new docs picked — open vault so user can link existing files
            try {
                await getFiles({ userId: user._id, year: selectedYear }).unwrap();
                setVaultYear(selectedYear);
                setShowVault(true);
            } catch (error) {
                console.error('Fetch Vault Error:', error);
                ShowToast('Failed to fetch document vault');
            }
        }
    };

    const handleStartProcessWithId = async (id) => {
        setIsSubmitting(true);
        try {
            // 1. Upload all NEWLY picked files (if any)
            const categoriesWithFiles = documents.filter(d => d.status === 'Picked' && d.files?.length > 0);

            for (const cat of categoriesWithFiles) {
                for (const file of cat.files) {
                    const formData = new FormData();
                    formData.append('file', {
                        uri: file.uri,
                        type: file.type || 'application/pdf',
                        name: file.name || `document_${Date.now()}.pdf`,
                    });
                    formData.append('name', cat.name);
                    formData.append('year', selectedYear);
                    formData.append('bookingId', id);
                    formData.append('type', 'user_doc');

                    await uploadFile(formData).unwrap();
                }
            }
            // 2. Update booking status to 'sent'
            await updateBooking({ id: id, data: { status: 'sent' } }).unwrap();

            // 3. Re-fetch files so the UI shows them as 'Sent'
            await getFiles({ bookingId: id });

            // 4. Update local status instantly
            setDocuments(prev => prev.map(d =>
                d.status === 'Picked' ? { ...d, status: 'Sent' } : d
            ));
            setBookingStatus('sent');

            ShowToast('Filing process started successfully');
            if (showVault) setShowVault(false);
        } catch (error) {
            console.error('Start Error:', error);
            ShowToast(error?.data?.message || 'Failed to start filing process');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleStartProcess = async () => {
        if (!bookingId) return;

        setIsSubmitting(true);
        try {
            // 1. Upload all NEWLY picked files (if any)
            const categoriesWithFiles = documents.filter(d => d.status === 'Picked' && d.files?.length > 0);

            for (const cat of categoriesWithFiles) {
                for (const file of cat.files) {
                    const formData = new FormData();
                    formData.append('file', {
                        uri: file.uri,
                        type: file.type || 'application/pdf',
                        name: file.name || `document_${Date.now()}.pdf`,
                    });
                    formData.append('name', cat.name);
                    formData.append('year', selectedYear);
                    formData.append('bookingId', bookingId);
                    formData.append('type', 'user_doc');

                    await uploadFile(formData).unwrap();
                }
            }
            // 2. Update booking status to 'sent'
            await updateBooking({ id: bookingId, data: { status: 'sent' } }).unwrap();

            // 3. Re-fetch files so the UI shows them as 'Sent'
            await getFiles({ bookingId });

            // 4. Update local status instantly
            setDocuments(prev => prev.map(d =>
                d.status === 'Picked' ? { ...d, status: 'Sent' } : d
            ));
            setBookingStatus('sent');

            ShowToast('Filing process started successfully');
            if (showVault) setShowVault(false);
        } catch (error) {
            console.error('Start Error:', error);
            ShowToast(error?.data?.message || 'Failed to start filing process');
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

                {(isRejected || ((bookingStatus === 'new' || bookingStatus === 'sent') && !isReceived && !isSent && !isPicked)) ? (
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
                ) : isReceived ? (
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
                ) : (
                    // Default: not sent, not received — show Upload button
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
                            title="Upload"
                            textSize={1.4}
                            textColor={AppColors.GRAY}
                            style={{ marginLeft: 5 }}
                        />
                    </TouchableOpacity>
                )}
            </View>
        );
    };

    return (
        <Container scrollEnabled={true}>
            <View style={styles.content}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <AppHeader onBackPress={false} heading="Race Track" />
                    <TouchableOpacity
                        onPress={async () => {
                            if (!bookingId) return;
                            setIsRefreshing(true);
                            try {
                                await refetchBooking();
                                await getFiles({ bookingId });
                            } finally {
                                setIsRefreshing(false);
                            }
                        }}
                        disabled={!bookingId || isRefreshing}
                        style={{ opacity: !bookingId ? 0.3 : 1 }}
                    >
                        {isRefreshing
                            ? <ActivityIndicator size="small" color={AppColors.ThemeColor} />
                            : <Icon name="refresh" size={responsiveFontSize(3)} color={AppColors.ThemeColor} />}
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.yearHeader}
                    onPress={() => (bookingStatus === 'new' || bookingStatus === 'approved' || bookingStatus === 'filed') && setShowYearPicker(true)}
                    disabled={!['new', 'approved', 'filed'].includes(bookingStatus)}
                >
                    <AppText title={`Taxes ${selectedYear}`} textSize={2.2} textColor={AppColors.ThemeColor} textFontWeight />
                    {['new', 'approved', 'filed'].includes(bookingStatus) && (
                        <Icon name="chevron-down" size={20} color={AppColors.ThemeColor} style={{ marginLeft: 5 }} />
                    )}
                </TouchableOpacity>

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
                                width: (bookingStatus === 'sent' || bookingStatus === 'received') ? '15%' :
                                    bookingStatus === 'preparation' ? '40%' :
                                        (bookingStatus === 'review' || bookingStatus === 'approved') ? '70%' :
                                            bookingStatus === 'filed' ? '100%' : '10%'
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
                                    left: (bookingStatus === 'sent' || bookingStatus === 'received') ? '0%' :
                                        bookingStatus === 'preparation' ? '30%' :
                                            (bookingStatus === 'review' || bookingStatus === 'approved') ? '62%' :
                                                bookingStatus === 'filed' ? '88%' : '-2%'
                                }]}
                                resizeMode="contain"
                            />
                        </View>
                    </View>
                </View>

                {(isBookingLoading || isBookingFetching || isBookingsListFetching || isFilesFetching) && (
                    <View style={{ position: 'absolute', top: '50%', left: '50%', transform: [{ translateX: -25 }, { translateY: -25 }], zIndex: 10 }}>
                        <ActivityIndicator size="large" color={AppColors.ThemeColor} />
                    </View>
                )}

                {/* Full Screen Stages */}
                {bookingStatus === 'preparation' && (
                    <View style={styles.prepScreen}>
                        <View style={styles.loaderWrapper}>
                            <ActivityIndicator size="large" color={AppColors.ThemeColor} />
                            <View style={{ marginTop: 20 }}>
                                <AppText
                                    title="PREPARING..."
                                    textSize={2.8}
                                    textColor={AppColors.ThemeColor}
                                    textFontWeight
                                    textAlignment="center"
                                />
                            </View>
                        </View>
                        <AppText
                            title="Our experts are currently working on your tax return. You will be notified once it's ready for review."
                            textSize={1.6}
                            textColor={AppColors.GRAY}
                            style={{ marginTop: 20, textAlign: 'center', paddingHorizontal: 20 }}
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
                                (() => {
                                    const returnDoc = (filesData?.files || []).find(f => f.type === 'return_doc');
                                    return (
                                        <View style={styles.returnDocCard}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <View style={styles.fileIconBig}>
                                                    <Icon name="file-pdf-box" size={30} color="#F44336" />
                                                </View>
                                                <View style={{ marginLeft: 15, flex: 1 }}>
                                                    <AppText title={returnDoc?.name || `Tax Return ${selectedYear} (Final)`} textSize={1.8} textColor={AppColors.ThemeColor} textFontWeight />
                                                    <AppText title="Uploaded by Admin" textSize={1.4} textColor={AppColors.GRAY} />
                                                </View>
                                            </View>
                                            <TouchableOpacity
                                                style={[styles.viewButton, !returnDoc && { opacity: 0.5 }]}
                                                disabled={!returnDoc}
                                                onPress={() => {
                                                    if (returnDoc) {
                                                        const url = getImageUrl(returnDoc.url, 'file');
                                                        Linking.openURL(url).catch(err =>
                                                            console.error("Couldn't load page", err),
                                                        );
                                                    } else {
                                                        ShowToast('Return document not found');
                                                    }
                                                }}
                                            >
                                                <AppText title="View Return" textSize={1.6} textColor={AppColors.WHITE} textFontWeight />
                                            </TouchableOpacity>
                                        </View>
                                    );
                                })()
                            ) : (
                                <FlatList
                                    data={documents}
                                    renderItem={renderDocItem}
                                    keyExtractor={item => item.id.toString()}
                                    scrollEnabled={false}
                                />
                            )}

                            {(bookingStatus === 'new' || bookingStatus === 'sent' || bookingStatus === 'rejected' || bookingStatus === 'approved' || bookingStatus === 'filed') && (
                                <TouchableOpacity
                                    style={[styles.startButton, isSubmitting && { opacity: 0.7 }]}
                                    onPress={handleStartFilling}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <ActivityIndicator size="small" color={AppColors.WHITE} />
                                    ) : (
                                        <AppText title={(bookingStatus === 'approved' || bookingStatus === 'filed') ? "START NEW" : bookingStatus === 'rejected' ? "UPDATE FILING" : bookingStatus === 'sent' ? "SEND UPDATE" : "START"} textSize={2} textColor={AppColors.WHITE} textFontWeight />
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

                <Modal
                    visible={showVault}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => setShowVault(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.vaultContainer}>
                            <View style={styles.vaultHeader}>
                                <AppText title="Your Document Vault" textSize={2.2} textColor={AppColors.ThemeColor} textFontWeight />
                                <TouchableOpacity onPress={() => setShowVault(false)}>
                                    <Icon name="close" size={25} color={AppColors.GRAY} />
                                </TouchableOpacity>
                            </View>
                            <AppText title="Select documents you've previously uploaded to link them with this booking." textSize={1.4} textColor={AppColors.GRAY} style={{ marginBottom: 15 }} />

                            <View style={{ height: 50, marginBottom: 15 }}>
                                <FlatList
                                    data={years}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={item => `vault-year-${item}`}
                                    renderItem={({ item: y }) => (
                                        <TouchableOpacity
                                            style={[styles.vaultYearTab, vaultYear === y && styles.activeVaultYearTab]}
                                            onPress={async () => {
                                                setVaultYear(y);
                                                try {
                                                    await getFiles({ userId: user._id, year: y }).unwrap();
                                                } catch (e) {
                                                    console.error("Vault Year Fetch Error", e);
                                                }
                                            }}
                                        >
                                            <AppText title={y} textSize={1.4} textColor={vaultYear === y ? AppColors.WHITE : AppColors.ThemeColor} textFontWeight={vaultYear === y} />
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>

                            {(isFilesLoading || isFilesFetching) ? (
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <ActivityIndicator size="large" color={AppColors.ThemeColor} />
                                </View>
                            ) : (
                                <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                                    {(() => {
                                        const filtered = filesData?.files || [];
                                        const filedByAdmin = filtered.filter(f => f.type === 'return_doc');
                                        const userDocs = filtered.filter(f => f.type === 'user_doc');

                                        if (filtered.length === 0) {
                                            return (
                                                <View style={{ alignItems: 'center', padding: 20 }}>
                                                    <AppText title={`No documents found for ${vaultYear}.`} textSize={1.6} textColor={AppColors.GRAY} />
                                                </View>
                                            );
                                        }

                                        const renderVaultItem = (item, index, prefix) => (
                                            <View key={`${prefix}-${index}`} style={styles.vaultItem}>
                                                <View style={{ flex: 1 }}>
                                                    <AppText title={item.name} textSize={1.6} textColor={AppColors.ThemeColor} textFontWeight />
                                                    <AppText title={`${prefix === 'admin' ? 'Received' : 'Uploaded'} on ${new Date(item.createdAt).toLocaleDateString()}`} textSize={1.2} textColor={AppColors.GRAY} />
                                                </View>
                                                <TouchableOpacity
                                                    style={styles.linkButton}
                                                    onPress={() => handleLinkDocument(item)}
                                                >
                                                    <AppText title="Link" textSize={1.4} textColor={AppColors.WHITE} textFontWeight />
                                                </TouchableOpacity>
                                            </View>
                                        );

                                        return (
                                            <>
                                                {filedByAdmin.length > 0 && (
                                                    <View style={{ marginBottom: 20 }}>
                                                        <AppText title="FILED DOCUMENTS (From Admin)" textSize={1.4} textColor={AppColors.GRAY} textFontWeight style={{ marginBottom: 10 }} />
                                                        {filedByAdmin.map((item, index) => renderVaultItem(item, index, 'admin'))}
                                                    </View>
                                                )}

                                                <View style={{ marginBottom: 20 }}>
                                                    <AppText title="YOUR DOCUMENTS" textSize={1.4} textColor={AppColors.GRAY} textFontWeight style={{ marginBottom: 10 }} />
                                                    {userDocs.length > 0 ? (
                                                        userDocs.map((item, index) => renderVaultItem(item, index, 'user'))
                                                    ) : (
                                                        <View style={{ alignItems: 'center', padding: 20 }}>
                                                            <AppText title="No user documents found." textSize={1.4} textColor={AppColors.GRAY} />
                                                        </View>
                                                    )}
                                                </View>
                                            </>
                                        );
                                    })()}
                                </ScrollView>
                            )}

                            <TouchableOpacity
                                style={[styles.proceedButton, isSubmitting && { opacity: 0.7 }]}
                                onPress={handleStartProcess}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <ActivityIndicator color={AppColors.WHITE} />
                                ) : (
                                    <AppText title="START FILING" textColor={AppColors.WHITE} textFontWeight />
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {/* Year Picker Modal */}
                <Modal
                    visible={showYearPicker}
                    animationType="fade"
                    transparent={true}
                    onRequestClose={() => setShowYearPicker(false)}
                >
                    <TouchableOpacity
                        style={styles.modalOverlay}
                        activeOpacity={1}
                        onPress={() => setShowYearPicker(false)}
                    >
                        <View style={styles.yearPickerContainer}>
                            <AppText title="Select Tax Year" textSize={2} textColor={AppColors.ThemeColor} textFontWeight style={{ marginBottom: 15 }} />
                            <FlatList
                                data={years}
                                keyExtractor={item => item}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={[styles.yearOption, selectedYear === item && styles.selectedYearOption]}
                                        onPress={() => {
                                            setSelectedYear(item);
                                            console.log("selected item", item)
                                            setShowYearPicker(false);
                                            getFiles({ userId: user?._id, year: item });
                                        }}
                                    >

                                        <AppText title={item} textSize={1.8} textColor={selectedYear === item ? AppColors.WHITE : AppColors.ThemeColor} textFontWeight={selectedYear === item} />
                                        {selectedYear === item && <Icon name="check" size={20} color={AppColors.WHITE} />}
                                    </TouchableOpacity>
                                )}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{ paddingBottom: 10 }}
                                initialScrollIndex={years.indexOf(selectedYear) !== -1 ? years.indexOf(selectedYear) : 0}
                                getItemLayout={(data, index) => (
                                    { length: 55, offset: 55 * index, index }
                                )}
                            />
                        </View>
                    </TouchableOpacity>
                </Modal>
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: responsiveHeight(1),
        paddingVertical: 5,
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
        paddingVertical: 40,
        backgroundColor: '#F9FAFB',
        borderRadius: 20,
        marginTop: 20,
    },
    loaderWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
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
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    vaultContainer: {
        backgroundColor: AppColors.WHITE,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: 20,
        maxHeight: '80%',
    },
    vaultHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    vaultItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F3F6',
    },
    vaultLinkButton: {
        backgroundColor: AppColors.ThemeColor,
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 8,
    },
    proceedButton: {
        backgroundColor: AppColors.ThemeColor,
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 30,
        width: '100%',
    },
    yearPickerContainer: {
        backgroundColor: AppColors.WHITE,
        borderRadius: 20,
        padding: 20,
        width: '85%',
        alignSelf: 'center',
        maxHeight: '70%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
        elevation: 10,
    },
    yearOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 12,
        marginBottom: 5,
        height: 50, // Fixed height for FlatList layout
    },
    selectedYearOption: {
        backgroundColor: AppColors.ThemeColor,
    },
    vaultYearTab: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#F0F3F6',
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
    },
    activeVaultYearTab: {
        backgroundColor: AppColors.ThemeColor,
    }
});
