import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CustomRangeCalendar = () => {
    const [selectedRange, setSelectedRange] = useState({
        start: '2024-12-05',
        end: '2024-12-08',
    });

    const [secondRange, setSecondRange] = useState({
        start: '2024-12-11',
        end: '2024-12-17',
    });

    // helper to mark ranges
    const getMarkedDates = () => {
        let marked = {};

        const addRange = (start, end, color) => {
            const startDate = new Date(start);
            const endDate = new Date(end);
            const date = new Date(startDate);

            while (date <= endDate) {
                const dateStr = date.toISOString().split('T')[0];
                marked[dateStr] = {
                    color: color,
                    textColor: '#06283D',
                    startingDay: dateStr === start,
                    endingDay: dateStr === end,
                };
                date.setDate(date.getDate() + 1);
            }
        };

        addRange(selectedRange.start, selectedRange.end, '#D7E7EB');
        addRange(secondRange.start, secondRange.end, '#A6C7CC');

        return marked;
    };

    return (
        <View style={styles.container}>
            <Calendar
                current={'2024-12-01'}
                markingType={'period'}
                markedDates={getMarkedDates()}
                style={{borderRadius: 10}}
                theme={{
                    textMonthFontWeight: '600',
                    textMonthFontSize: 18,
                    arrowColor: '#06283D',
                    monthTextColor: '#06283D',
                    textSectionTitleColor: '#A0A0A0',
                    calendarBackground: '#FFFFFF',
                    todayTextColor: '#06283D',
                }}
                renderArrow={(direction) => (
                    <View style={styles.arrow}>
                        <View
                            style={[
                                styles.arrowTriangle,
                                direction === 'left' && { transform: [{ rotate: '270deg' }] },
                            ]}
                        />
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 200,
        backgroundColor: '#F7FAFA',
    },
    arrow: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#F0F4F5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    arrowTriangle: {
        width: 0,
        height: 0,
        borderLeftWidth: 6,
        borderRightWidth: 6,
        borderBottomWidth: 8,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#06283D',
        transform: [{ rotate: '90deg' }],
    },
});

export default CustomRangeCalendar;
