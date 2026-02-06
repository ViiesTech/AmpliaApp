import React from 'react';
import { View, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import {
    AppColors,
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from '../utils';
import AppText from './AppText';
import LineBreak from './LineBreak';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface WaitingAssignmentModalProps {
    visible: boolean;
    onClose: () => void;
    onContinue?: () => void;
}

const WaitingAssignmentModal: React.FC<WaitingAssignmentModalProps> = ({
    visible,
    onClose,
    onContinue,
}) => {
    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.iconContainer}>
                        <Icon name="account-clock" size={responsiveFontSize(6)} color={AppColors.ThemeColor} />
                    </View>

                    <AppText
                        title="Waiting for Assignment"
                        textSize={2.2}
                        textColor={AppColors.Dark_themeColor}
                        textFontWeight
                        textAlignment="center"
                    />

                    <LineBreak space={1} />
                    <AppText
                        title="A subadmin will be assigned to your booking shortly. You can chat once the assignment is complete."
                        textSize={1.6}
                        textColor={AppColors.GRAY}
                        textAlignment="center"
                    />
                    <LineBreak space={3} />

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.waitButton} onPress={onContinue || onClose}>
                            <AppText
                                title="Okay, I'll Wait"
                                textColor={AppColors.WHITE}
                                textSize={1.6}
                                textFontWeight
                            />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.backButton} onPress={onClose}>
                            <AppText
                                title="Go Back"
                                textColor={AppColors.ThemeColor}
                                textSize={1.4}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        width: responsiveWidth(85),
        backgroundColor: AppColors.WHITE,
        borderRadius: 20,
        padding: responsiveWidth(6),
        alignItems: 'center',
    },
    iconContainer: {
        width: responsiveWidth(20),
        height: responsiveWidth(20),
        borderRadius: responsiveWidth(10),
        backgroundColor: AppColors.app_light,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: responsiveHeight(2),
    },
    buttonContainer: {
        width: '100%',
        gap: responsiveHeight(1.5),
    },
    waitButton: {
        backgroundColor: AppColors.ThemeColor,
        paddingVertical: responsiveHeight(1.5),
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
    },
    backButton: {
        paddingVertical: responsiveHeight(1),
        alignItems: 'center',
        width: '100%',
    },
});

export default WaitingAssignmentModal;
