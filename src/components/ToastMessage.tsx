import React from 'react';
import CustomToast, { BaseToast } from 'react-native-toast-message';
import { AppColors } from '../utils';

const ToastMessage = ({ position }) => {

    const toastConfig = {
        success: (props) => (
            <BaseToast
                {...props}
                style={{ borderLeftColor: AppColors.ThemeColor, borderLeftWidth: 7 }}
                contentContainerStyle={{ paddingHorizontal: 15, backgroundColor: AppColors.WHITE }}
                text1Style={{
                    fontSize: 15,
                    color: AppColors.ThemeColor,
                    fontWeight: '400'
                }}
            />
        ),
    }

    return (
        <CustomToast
            config={toastConfig}
            position={position}
            visibilityTime={3000}
        />
    )

}

export default ToastMessage;