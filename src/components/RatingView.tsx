import React from 'react'
import { View } from 'react-native'
import StarRating from 'react-native-star-rating-widget'
import { AppColors, responsiveWidth } from '../utils'

type Prop = {
    starSize?:any,
    width?:any,
}

const RatingView = ({starSize, width}: Prop) => {
    return (
        <View style={{marginLeft: responsiveWidth(-1.5)}}>
            <StarRating
                rating={4.5}
                onChange={() => { }}
                starStyle={{ width: width ? responsiveWidth(width) : responsiveWidth(3) }}
                starSize={starSize ? starSize : 20}
                color={AppColors.ThemeColor}
                enableHalfStar
                emptyColor={AppColors.DARKGRAY}
            />
        </View>
    )
}

export default RatingView