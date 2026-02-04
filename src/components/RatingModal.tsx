import React, { useState } from 'react';
import {
    Modal,
    View,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AppText from './AppText';
import AppButton from './AppButton';
import { AppColors, responsiveHeight, responsiveWidth, ShowToast } from '../utils';
import { useCreateRatingMutation } from '../redux/services/mainService';

interface RatingModalProps {
    visible: boolean;
    onClose: () => void;
    booking: any;
    onSuccess: () => void;
}

const RatingModal = ({ visible, onClose, booking, onSuccess }: RatingModalProps) => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [createRating, { isLoading }] = useCreateRatingMutation();

    const handleSubmit = async () => {
        if (rating === 0) {
            ShowToast('Please select a rating');
            return;
        }
        if (review.length < 5) {
            ShowToast('Review must be at least 5 characters');
            return;
        }

        try {
            await createRating({
                service: booking.service._id,
                booking: booking._id,
                rating,
                review,
            }).unwrap();

            ShowToast('Rating submitted successfully');
            onSuccess();
            onClose();
            setRating(0);
            setReview('');
        } catch (err: any) {
            ShowToast(err?.data?.message || 'Failed to submit rating');
        }
    };

    return (
        <Modal visible={visible} transparent animationType="fade">
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlay}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.modalContent}>
                            <AppText title="Rate Service" textSize={2.2} textFontWeight textAlignment="center" />
                            <AppText
                                title={booking?.service?.name}
                                textSize={1.8}
                                textColor={AppColors.GRAY}
                                textAlignment="center"
                            />

                            <View style={styles.starsContainer}>
                                {[1, 2, 3, 4, 5].map(step => (
                                    <TouchableOpacity key={step} onPress={() => setRating(step)}>
                                        <Entypo
                                            name={step <= rating ? 'star' : 'star-outlined'}
                                            size={40}
                                            color={AppColors.ThemeColor}
                                        />
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <TextInput
                                style={styles.input}
                                placeholder="Write your review here..."
                                multiline
                                numberOfLines={4}
                                value={review}
                                onChangeText={setReview}
                            />

                            <View style={styles.buttonRow}>
                                <AppButton
                                    title="Cancel"
                                    btnWidth={35}
                                    btnBackgroundColor={AppColors.WHITE}
                                    textColor={AppColors.GRAY}
                                    handlePress={onClose}
                                />
                                <AppButton
                                    title="Submit"
                                    btnWidth={35}
                                    handlePress={handleSubmit}
                                    indicator={isLoading}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: responsiveWidth(90),
        backgroundColor: AppColors.WHITE,
        borderRadius: 20,
        padding: 20,
        gap: 15,
    },
    starsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
        marginVertical: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: AppColors.LIGHTGRAY,
        borderRadius: 10,
        padding: 10,
        height: 100,
        textAlignVertical: 'top',
        fontSize: 16,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
});

export default RatingModal;
