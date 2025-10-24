/* eslint-disable react-native/no-inline-styles */
import React, { ReactNode } from 'react'
import { KeyboardAvoidingView, ScrollView, StyleProp, StyleSheet, ViewStyle } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { responsiveHeight } from '../utils'
import LinearGradient from 'react-native-linear-gradient';

type props = {
    children: ReactNode,
    scrollEnabled?: boolean,
    image?: any,
    showScrollBar?: boolean,
    paddingBottom?: number,
    safeAreaViewStyle?: StyleProp<ViewStyle>,
}

const Container = ({ children, scrollEnabled = true, showScrollBar, paddingBottom, safeAreaViewStyle }: props) => {
    return (
        <LinearGradient
            colors={['#C8D4D7', '#F3F6F8', '#FFFFFF']} // Top gray → middle fade → white
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            locations={[0, 0.1, 1]} // smooth transition
            style={styles.container}
        >
            <SafeAreaView style={{ flex: 1, ...safeAreaViewStyle, }}>
                <KeyboardAvoidingView style={{flex: 1}} behavior='padding'>
                <ScrollView contentContainerStyle={{flex: scrollEnabled ? null : 1, paddingBottom: responsiveHeight(paddingBottom) }} showsVerticalScrollIndicator={showScrollBar} scrollEnabled={scrollEnabled} style={styles.container}>
                    {children}
                </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </LinearGradient>
    )
}

export default Container

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageStyle: {
        height: responsiveHeight(40),
        alignSelf: 'center',
        resizeMode: 'contain',
        marginTop: responsiveHeight(3),
        width: responsiveHeight(40)
    }
})