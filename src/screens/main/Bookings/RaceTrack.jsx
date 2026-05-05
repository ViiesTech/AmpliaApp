/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, FlatList, StyleSheet, Image, ScrollView, ActivityIndicator, Modal, Linking, Alert } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import { getImageUrl } from '../../../redux/constant';
import { useLazyGetFilesQuery, useUpdateBookingMutation, useGetBookingByIdQuery, useLazyGetBookingsQuery, useUploadFileMutation, useLazyGetAllServicesQuery, useCreateBookingMutation, useLinkFileMutation, useCreatePaymentIntentMutation } from '../../../redux/services/mainService';
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
import { calculateComplexityScore, getTierInfo, detectMaterialChange } from '../../../utils/complexityScoring';

const initialDocs = [
    { id: 1, name: 'W-2 / 1099', status: 'Pending', rejectionReason: '', type: 'income' },
    { id: 2, name: 'Self-employment', status: 'Pending', rejectionReason: '', type: 'schedule_c' },
    { id: 3, name: 'Rental property', status: 'Pending', rejectionReason: '', type: 'rental' },
    { id: 4, name: 'Investments', status: 'Pending', rejectionReason: '', type: 'investments' },
    { id: 5, name: 'Crypto', status: 'Pending', rejectionReason: '', type: 'crypto' },
    { id: 6, name: 'Foreign income', status: 'Pending', rejectionReason: '', type: 'foreign' },
    { id: 7, name: 'Dependents', status: 'Pending', rejectionReason: '', type: 'dependents' },
    { id: 8, name: 'Prior-year return', status: 'Pending', important: true, rejectionReason: '', type: 'prior_year' },
];

const RaceTrack = ({ navigation, route }) => {
    const { user } = useSelector(state => state.persistedData);
    const [getBookings, { isFetching: isBookingsListFetching }] = useLazyGetBookingsQuery();
    const [internalBookingId, setInternalBookingId] = useState(route?.params?.bookingId);

    const [getAllServices] = useLazyGetAllServicesQuery();
    const [createBooking] = useCreateBookingMutation();


    const getScoringData = (docs) => {
        const data = {
            w2Count: 0,
            necMisc1099Count: 0,
            k1Count: 0,
            ssa1099Count: 0,
            unemploymentCount: 0,
            hasScheduleC: false,
            rentalPropertyCount: 0,
            hasCapitalGains: false,
            hasCrypto: false,
            additionalStatesCount: 0,
            hasForeignIncome: false,
            hasITIN: false,
            isAmended: false,
            hasPriorYearIssues: false,
            dependentCount: 0,
            hasChildcareCredit: false,
            hasEducationCredit: false,
        };

        docs.forEach(doc => {
            const fileCount = (doc.localFiles?.length || 0) + (doc.serverCount || 0);
            if (fileCount === 0) return;

            switch (doc.type) {
                case 'income':
                    data.w2Count = fileCount; // Simplified mapping
                    break;
                case 'schedule_c':
                    data.hasScheduleC = true;
                    break;
                case 'rental':
                    data.rentalPropertyCount = fileCount;
                    break;
                case 'investments':
                    data.hasCapitalGains = true;
                    break;
                case 'crypto':
                    data.hasCrypto = true;
                    break;
                case 'foreign':
                    data.hasForeignIncome = true;
                    break;
                case 'dependents':
                    data.dependentCount = fileCount;
                    break;
                case 'prior_year':
                    data.hasPriorYearIssues = true;
                    break;
            }
        });
        return data;
    };


    const bookingId = internalBookingId;
    const { data: bookingData, isLoading: isBookingLoading, isFetching: isBookingFetching, refetch: refetchBooking } = useGetBookingByIdQuery(bookingId, {
        skip: !bookingId
    });
    const [getFiles, { data: filesData, isLoading: isFilesLoading, isFetching: isFilesFetching }] = useLazyGetFilesQuery();
    const [updateBooking] = useUpdateBookingMutation();
    const [uploadFile] = useUploadFileMutation();
    const [linkFile] = useLinkFileMutation();
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [createPaymentIntent] = useCreatePaymentIntentMutation();
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

    const [showEstimateModal, setShowEstimateModal] = useState(false);
    const [estimateInfo, setEstimateInfo] = useState(null);
    const [materialChange, setMaterialChange] = useState(null);

    const liveScoringData = getScoringData(documents);
    const liveScore = calculateComplexityScore(liveScoringData);
    const liveTier = getTierInfo(liveScore);
    const hasPickedDocs = documents.some(d => d.localFiles?.length > 0);


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
            const hasLocalPicks = documents.some(d => d.localFiles?.length > 0);
            if (!hasLocalPicks) {
                setDocuments(initialDocs);
            }
            return;
        }

        if (filesData?.success && filesData?.files) {
            const backendFiles = filesData.files;
            setDocuments(prev => prev.map(doc => {
                const categoryFiles = backendFiles.filter(f => f.name.toLowerCase().includes(doc.name.toLowerCase()));
                if (categoryFiles.length > 0) {
                    const statuses = categoryFiles.map(f => f.status.toLowerCase());
                    let finalStatus = 'Sent';
                    if (statuses.includes('rejected')) finalStatus = 'Rejected';
                    else if (statuses.every(s => s === 'approved' || s === 'received')) finalStatus = 'Approved';

                    return { ...doc, status: finalStatus, serverCount: categoryFiles.length };
                }
                return doc;
            }));
        } else {
            // Only reset if no locally picked docs
            const hasLocalPicks = documents.some(d => d.localFiles?.length > 0);
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

    const handleDeselect = (categoryId) => {
        setDocuments(prev => prev.map(doc =>
            doc.id === categoryId ? { ...doc, localFiles: [], status: doc.serverCount > 0 ? 'Sent' : 'Pending' } : doc
        ));
    };

    const handleUpload = async (id) => {
        try {
            const res = await pick({
                type: [types.allFiles],
                allowMultiSelection: true,
            });

            if (res) {
                setDocuments(prev => prev.map(doc =>
                    doc.id === id ? {
                        ...doc,
                        status: 'Picked',
                        localFiles: [...(doc.localFiles || []), ...res]
                    } : doc
                ));
            }
        } catch (err) {
            if (isErrorWithCode(err, errorCodes.OPERATION_CANCELED)) {
                console.log('User cancelled document picker');
            } else {
                console.error('Picker Error: ', err);
                ShowToast('Failed to pick document(s)');
            }
        }
    };

    const handleResetSession = () => {
        Alert.alert(
            "Reset Session",
            "Are you sure you want to delete the whole session? This will cancel all uploads and start fresh.",
            [
                { text: "Cancel", style: "cancel" },
                { 
                    text: "Reset", 
                    style: "destructive",
                    onPress: async () => {
                        setIsSubmitting(true);
                        try {
                            const newId = await handleStartNewBooking();
                            if (newId) {
                                setBookingStatus('new');
                                setDocuments(initialDocs);
                                ShowToast('Session reset. You can now start fresh.');
                            }
                        } finally {
                            setIsSubmitting(false);
                        }
                    }
                }
            ]
        );
    };

    const handleStartNewBooking = async () => {
        try {
            // Try to find real service from backend
            const servicesRes = await getAllServices().unwrap();
            let taxService = servicesRes?.services?.find(s => s.name.toLowerCase().includes('tax')) || servicesRes?.services?.[0];

            // If no services in DB, use a predefined fallback to ensure flow works
            if (!taxService) {
                taxService = {
                    _id: '69ea2279ea0c6bab0b10c4ff',
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

    const handleConfirmEstimate = async () => {
        const isStartingNew = bookingStatus === 'approved' || bookingStatus === 'filed';
        const hasPickedDocs = documents.some(d => d.localFiles?.length > 0);

        setShowEstimateModal(false);

        if (isStartingNew) {
            setIsSubmitting(true);
            const newId = await handleStartNewBooking();
            setIsSubmitting(false);
            if (!newId) return;
            setBookingStatus('new');
            setDocuments(initialDocs);
            ShowToast('Filing restarted. Please upload your documents.');
            return;
        }

        if (!bookingId) {
            setIsSubmitting(true);
            const newId = await handleStartNewBooking();
            setIsSubmitting(false);
            if (!newId) return;

            if (hasPickedDocs) {
                await handleStartProcessWithId(newId);
            } else {
                ShowToast('Booking created. Please upload your documents.');
            }
        } else {
            if (hasPickedDocs) {
                await handleStartProcess();
                ShowToast('Documents submitted for review');
            } else {
                await updateBooking({ id: bookingId, data: { status: 'sent', price: estimateInfo.tier.basePrice } }).unwrap();
                ShowToast('Documents submitted for review');
            }
        }
        setMaterialChange(null);
    };

    const handleStartFilling = async () => {
        const isStartingNew = bookingStatus === 'approved' || bookingStatus === 'filed';
        const hasPickedDocs = documents.some(d => d.localFiles?.length > 0);

        // 1. If starting new and no docs picked yet, just reset immediately
        if (isStartingNew && !hasPickedDocs) {
            setIsSubmitting(true);
            try {
                const newId = await handleStartNewBooking();
                if (newId) {
                    setBookingStatus('new');
                    setDocuments(initialDocs);
                    ShowToast('Started fresh filing.');
                }
            } finally {
                setIsSubmitting(false);
            }
            return;
        }

        // 2. Calculate complexity
        const currentScoringData = getScoringData(documents);
        const score = calculateComplexityScore(currentScoringData);
        const tier = getTierInfo(score);

        // 3. Always show estimate if starting new OR if new documents are picked OR no price yet
        if (!bookingId || bookingStatus === 'new' || isStartingNew || hasPickedDocs || !bookingData?.booking?.price) {
            setEstimateInfo({ score, tier });
            setShowEstimateModal(true);
            return;
        }

        // 3. If no new docs picked and already submitted, just remind user to upload more
        if (bookingStatus === 'sent') {
            ShowToast('Please upload new documents to update your filing.');
        }
    };



    const handleStartProcessWithId = async (id) => {
        setIsSubmitting(true);
        try {
            const pickedDocs = documents.filter(d => d.localFiles?.length > 0);
            // 1. Upload picked documents
            for (const doc of pickedDocs) {
                const filesToUpload = doc.localFiles || [];
                for (const file of filesToUpload) {
                    const formData = new FormData();
                    formData.append('file', {
                        uri: file.uri,
                        type: file.type || 'application/pdf',
                        name: file.name || `document_${Date.now()}.pdf`,
                    });
                    formData.append('name', doc.name);
                    formData.append('year', selectedYear.toString());
                    formData.append('bookingId', id);
                    formData.append('type', 'user_doc');

                    await uploadFile(formData).unwrap();
                }
            }
            // 2. Update booking status to 'sent'
            await updateBooking({ id: id, data: { status: 'sent', price: estimateInfo?.tier?.basePrice || 0 } }).unwrap();

            // 3. Re-fetch files so the UI shows them as 'Sent'
            await getFiles({ bookingId: id });

            // 4. Update local status
            setDocuments(prev => prev.map(d =>
                d.localFiles?.length > 0 ? { ...d, localFiles: [], status: 'Sent' } : d
            ));
            setBookingStatus('sent');

            ShowToast('Documents submitted successfully');
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
        await handleStartProcessWithId(bookingId);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Approved': return "#60C14C";
            case 'Rejected': return "#F44336";
            case 'Sent': return "#FF9800";
            case 'Picked': return AppColors.ThemeColor;
            default: return AppColors.LIGHTGRAY;
        }
    };

    const getStatusMessage = (item) => {
        const { status, localFiles, serverCount } = item;
        const totalFiles = (localFiles?.length || 0) + (serverCount || 0);
        const countText = totalFiles > 0 ? ` (${totalFiles} ${totalFiles === 1 ? 'file' : 'files'})` : '';

        switch (status) {
            case 'Sent': return `Waiting for review${countText}`;
            case 'Approved': return `Document approved${countText}`;
            case 'Rejected': return `Document rejected${countText}`;
            case 'Picked': return `${localFiles?.length || 1} file${(localFiles?.length || 1) === 1 ? '' : 's'} selected`;
            default: return 'Needs to be uploaded';
        }
    };

    const renderDocItem = ({ item }) => {
        return (
            <View style={styles.docItem}>
                <View style={styles.docInfo}>
                    <View style={[styles.statusDot, { backgroundColor: getStatusColor(item.status) }]} />
                    <View style={{ flex: 1 }}>
                        <AppText title={item.name} textSize={1.8} textColor={AppColors.ThemeColor} textFontWeight />
                        <AppText
                            title={getStatusMessage(item)}
                            textSize={1.4}
                            textColor={item.status === 'Rejected' ? AppColors.RED_COLOR : AppColors.GRAY}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity
                            style={styles.uploadButton}
                            onPress={() => handleUpload(item.id)}
                            disabled={bookingStatus === 'filed'}
                        >
                            <Icon name="upload" size={14} color={AppColors.ThemeColor} />
                            <AppText
                                title="Upload"
                                textSize={1.4}
                                textColor={AppColors.ThemeColor}
                                textFontWeight
                                style={{ marginLeft: 4 }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <Container scrollEnabled={true}>
            <View style={styles.content}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <AppHeader 
                        onBackPress={false} 
                        heading="Race Track" 
                        rightIcon={
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableOpacity
                                    onPress={handleResetSession}
                                    style={{ marginRight: 15 }}
                                    disabled={isSubmitting}
                                >
                                    <Icon name="trash-can-outline" size={responsiveFontSize(3)} color={AppColors.RED_COLOR} />
                                </TouchableOpacity>
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
                        }
                    />
                </View>



                {/* Race Track Progress Bar */}
                <View style={styles.progressContainer}>
                    <View style={styles.raceInfo}>
                        <View style={styles.raceMarkers}>
                            <AppText title="Start" textSize={1.4} textColor={AppColors.ThemeColor} textFontWeight />
                            <AppText title="Prep" textSize={1.4} textColor={(documents.some(d => d.localFiles?.length > 0) || ['sent', 'received', 'payment_pending', 'preparation', 'review', 'approved', 'filed'].includes(bookingStatus)) ? AppColors.ThemeColor : AppColors.GRAY} textFontWeight={documents.some(d => d.localFiles?.length > 0) || ['sent', 'received', 'payment_pending', 'preparation', 'review', 'approved', 'filed'].includes(bookingStatus)} />
                            <AppText title="Review" textSize={1.4} textColor={(bookingStatus === 'received' || (bookingStatus === 'sent' && documents.some(d => d.status === 'Approved')) || ['payment_pending', 'preparation', 'review', 'approved', 'filed'].includes(bookingStatus)) ? AppColors.ThemeColor : AppColors.GRAY} textFontWeight={(bookingStatus === 'received' || (bookingStatus === 'sent' && documents.some(d => d.status === 'Approved')) || ['payment_pending', 'preparation', 'review', 'approved', 'filed'].includes(bookingStatus))} />
                            <AppText title="Pay" textSize={1.4} textColor={['payment_pending', 'preparation', 'review', 'approved', 'filed'].includes(bookingStatus) ? AppColors.ThemeColor : AppColors.GRAY} textFontWeight={['payment_pending', 'preparation', 'review', 'approved', 'filed'].includes(bookingStatus)} />
                            <AppText title="Filed" textSize={1.4} textColor={bookingStatus === 'filed' ? AppColors.ThemeColor : AppColors.GRAY} textFontWeight={bookingStatus === 'filed'} />
                        </View>

                        <View style={styles.trackLineContainer}>
                            <View style={styles.trackLine} />
                            <View style={[styles.activeTrack, {
                                width: bookingStatus === 'filed' ? '100%' :
                                    (['payment_pending', 'preparation', 'review', 'approved'].includes(bookingStatus)) ? '75%' :
                                        (bookingStatus === 'received' || (bookingStatus === 'sent' && documents.some(d => d.status === 'Approved'))) ? '50%' :
                                            (documents.some(d => d.localFiles?.length > 0) || bookingStatus === 'sent') ? '25%' : '5%'
                            }]} />
                            <View style={styles.trackDots}>
                                <View style={[styles.dot, styles.activeDot]} />
                                <View style={[styles.dot, (documents.some(d => d.localFiles?.length > 0) || ['sent', 'received', 'payment_pending', 'preparation', 'review', 'approved', 'filed'].includes(bookingStatus)) ? styles.activeDot : null]} />
                                <View style={[styles.dot, (bookingStatus === 'received' || (bookingStatus === 'sent' && documents.some(d => d.status === 'Approved')) || ['payment_pending', 'preparation', 'review', 'approved', 'filed'].includes(bookingStatus)) ? styles.activeDot : null]} />
                                <View style={[styles.dot, (['payment_pending', 'preparation', 'review', 'approved', 'filed'].includes(bookingStatus)) ? styles.activeDot : null]} />
                                <View style={[styles.dot, bookingStatus === 'filed' ? styles.activeDot : null]} />
                            </View>
                            <Image
                                source={AppImages.horse_racing_icon}
                                style={[styles.horseIcon, {
                                    left: bookingStatus === 'filed' ? '92%' :
                                        (['payment_pending', 'preparation', 'review', 'approved'].includes(bookingStatus)) ? '71%' :
                                            (bookingStatus === 'received' || (bookingStatus === 'sent' && documents.some(d => d.status === 'Approved'))) ? '46%' :
                                                (documents.some(d => d.localFiles?.length > 0) || bookingStatus === 'sent') ? '21%' : '-2%'
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
                {bookingStatus === 'payment_pending' && (
                    <View style={styles.prepScreen}>
                        <View style={styles.loaderWrapper}>
                            <Icon name="credit-card-outline" size={responsiveFontSize(6)} color={AppColors.ThemeColor} />
                            <View style={{ marginTop: 20 }}>
                                <AppText
                                    title="PAYMENT REQUIRED"
                                    textSize={2.8}
                                    textColor={AppColors.ThemeColor}
                                    textFontWeight
                                    textAlignment="center"
                                />
                            </View>
                        </View>
                        <AppText
                            title={`Your documents have been approved. Please pay the estimated fee of $${bookingData?.booking?.price || 0} to begin the tax preparation process.`}
                            textSize={1.6}
                            textColor={AppColors.GRAY}
                            style={{ marginTop: 20, textAlign: 'center', paddingHorizontal: 20 }}
                        />
                        <TouchableOpacity
                            style={[styles.startButton, { width: '80%', marginTop: 30 }]}
                            onPress={async () => {
                                const price = bookingData?.booking?.price || 0;
                                if (price <= 0) {
                                    ShowToast('Invalid payment amount');
                                    return;
                                }
                                setIsSubmitting(true);
                                try {
                                    const intentRes = await createPaymentIntent({ amount: price, currency: 'usd' }).unwrap();
                                    if (!intentRes.success) {
                                        ShowToast('Failed to initialize payment');
                                        setIsSubmitting(false);
                                        return;
                                    }

                                    const { error: initError } = await initPaymentSheet({
                                        merchantDisplayName: 'Amplia App',
                                        paymentIntentClientSecret: intentRes.clientSecret,
                                        defaultBillingDetails: {
                                            name: user?.name || '',
                                        },
                                    });

                                    if (initError) {
                                        ShowToast(initError.message);
                                        setIsSubmitting(false);
                                        return;
                                    }

                                    const { error: presentError } = await presentPaymentSheet();
                                    if (presentError) {
                                        if (presentError.code !== 'Canceled') {
                                            ShowToast(presentError.message);
                                        }
                                        setIsSubmitting(false);
                                        return;
                                    }
                                    
                                    // Update status to preparation after successful payment
                                    await updateBooking({ id: bookingId, data: { status: 'preparation' } }).unwrap();
                                    setBookingStatus('preparation');
                                    ShowToast('Payment Successful! Preparation started.');
                                } catch (err) {
                                    console.error('Payment Flow Error:', err);
                                    ShowToast('Payment failed');
                                } finally {
                                    setIsSubmitting(false);
                                }
                            }}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <ActivityIndicator size="small" color={AppColors.WHITE} />
                            ) : (
                                <AppText title="PAY NOW" textSize={2} textColor={AppColors.WHITE} textFontWeight />
                            )}
                        </TouchableOpacity>
                    </View>
                )}

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

                            {/* Live Estimate Bar */}
                            {(bookingStatus === 'new' || bookingStatus === 'sent' || bookingStatus === 'rejected') && (
                                <View style={styles.liveEstimateBar}>
                                    <View style={styles.liveEstimateItem}>
                                        <AppText title="Est. Price" textSize={1.2} textColor={AppColors.GRAY} />
                                        <AppText title={`$${liveTier.basePrice}`} textSize={1.6} textColor={AppColors.ThemeColor} textFontWeight />
                                    </View>
                                    <View style={styles.liveEstimateDivider} />
                                    <View style={styles.liveEstimateItem}>
                                        <AppText title="Tier" textSize={1.2} textColor={AppColors.GRAY} />
                                        <AppText title={liveTier.name} textSize={1.6} textColor={AppColors.ThemeColor} textFontWeight />
                                    </View>
                                </View>
                            )}
                            <LineBreak space={1} />
                            <LineBreak space={1} />

                            {bookingStatus === 'review' || bookingStatus === 'approved' ? (
                                (() => {
                                    const returnDoc = (filesData?.files || []).find(f => f.type === 'return_doc');

                                    console.log("returnDoc", returnDoc)
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
                                    data={bookingStatus === 'payment_pending' ? documents.filter(d => d.status === 'Approved') : documents}
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
                                        <AppText
                                            title={(bookingStatus === 'approved' || bookingStatus === 'filed') ? "START NEW" : "SUBMIT"}
                                            textSize={2}
                                            textColor={AppColors.WHITE}
                                            textFontWeight
                                        />
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
                                    title={bookingStatus === 'sent' ? "Waiting for admin to review and approve your documents." :
                                        bookingStatus === 'received' ? "Documents approved! Please proceed to payment." :
                                            bookingStatus === 'payment_pending' ? "Please complete your payment to start the tax preparation." :
                                                bookingStatus === 'approved' ? "You have approved your return. Waiting for final filing confirmation." :
                                                    bookingStatus === 'filed' ? "Filing completed! You can start a new request for next year." :
                                                        "Please upload your documents and press SUBMIT to begin."}
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

                {/* Estimate & Confirmation Modal */}
                <Modal
                    visible={showEstimateModal}
                    animationType="fade"
                    transparent={true}
                    onRequestClose={() => setShowEstimateModal(false)}
                    style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.estimateContainer}>
                            <View style={styles.estimateHeader}>
                                <Icon name="calculator" size={40} color={AppColors.ThemeColor} />
                                <LineBreak space={1} />
                                <AppText
                                    title="Submission Summary"
                                    textSize={2.4}
                                    textColor={AppColors.ThemeColor}
                                    textFontWeight
                                />
                            </View>

                            <View style={styles.estimateBody}>
                                <View style={styles.tierBox}>
                                    <AppText title="Your Return Tier:" textSize={1.4} textColor={AppColors.GRAY} />
                                    <AppText title={estimateInfo?.tier?.name} textSize={2.2} textColor={AppColors.ThemeColor} textFontWeight />
                                    <AppText title={`Complexity Score: ${estimateInfo?.score}`} textSize={1.2} textColor={AppColors.GRAY} />
                                </View>

                                <View style={styles.priceRow}>
                                    <AppText title="Total Estimate" textSize={1.8} textColor={AppColors.ThemeColor} />
                                    <AppText title={`$${estimateInfo?.tier?.basePrice}`} textSize={2.4} textColor={AppColors.ThemeColor} textFontWeight />
                                </View>
                                <AppText title="Final pricing may adjust if additional documents are added." textSize={1.2} textColor={AppColors.GRAY} textAlignment="center" />
                            </View>

                            <View style={styles.estimateFooter}>
                                <TouchableOpacity
                                    style={styles.cancelButton}
                                    onPress={() => {
                                        setShowEstimateModal(false);
                                        setMaterialChange(null);
                                    }}
                                >
                                    <AppText title="Cancel" textSize={1.6} textColor={AppColors.GRAY} textFontWeight />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.confirmButton}
                                    onPress={handleConfirmEstimate}
                                >
                                    <AppText title="Confirm & Submit" textSize={1.6} textColor={AppColors.WHITE} textFontWeight />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>



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
        width: 50,
        height: 50,
        top: -40,
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
    docInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    statusDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 10,
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
        justifyContent: 'center',
        alignItems: 'center'
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
    },
    estimateContainer: {
        width: responsiveWidth(90),
        backgroundColor: AppColors.WHITE,
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
    },
    estimateHeader: {
        alignItems: 'center',
        marginBottom: 20,
    },
    estimateBody: {
        width: '100%',
        marginBottom: 20,
    },
    tierBox: {
        backgroundColor: '#F5F7F8',
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
        marginBottom: 20,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderColor: '#EEE',
        marginTop: 10,
    },
    materialNotice: {
        backgroundColor: '#FFF3CD',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#FFEeba',
        alignItems: 'center',
    },
    estimateFooter: {
        flexDirection: 'row',
        gap: 15,
    },
    cancelButton: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#EEE',
    },
    confirmButton: {
        flex: 2,
        backgroundColor: AppColors.ThemeColor,
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 10,
    },
    liveEstimateBar: {
        flexDirection: 'row',
        backgroundColor: '#F5F7F8',
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    liveEstimateItem: {
        flex: 1,
        alignItems: 'center',
    },
    liveEstimateDivider: {
        width: 1,
        height: '100%',
        backgroundColor: '#E0E0E0',
        marginHorizontal: 10,
    },
    submissionSummary: {
        backgroundColor: '#F9FAFB',
        padding: 15,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        marginBottom: 15,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 4,
    },
});
