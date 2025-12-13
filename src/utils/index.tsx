import { Dimensions } from "react-native";
import Toast from "react-native-toast-message";

const percentageCalculation = (max: number, val: number) => max * (val / 100);

const fontCalculation = (height: number, width: number, val: number) => {
    const widthDimension = height > width ? width : height;
    const aspectRatioBasedHeight = (16 / 9) * widthDimension;
    return percentageCalculation(Math.sqrt(Math.pow(aspectRatioBasedHeight, 2) + Math.pow(widthDimension, 2)), val);
};
export const responsiveFontSize = (f: number) => {
    const { height, width } = Dimensions.get("window");
    return fontCalculation(height, width, f);
};
export const responsiveHeight = (h: number) => {
    const { height } = Dimensions.get("window");
    return height * (h / 100)
}
export const responsiveWidth = (w: number) => {
    const { width } = Dimensions.get("window");
    return width * (w / 100)
}

export const AppColors = {
    BLACK: "#000000",
    WHITE: "#FFFFFF",
    BTNCOLOURS: "#F48A88",
    LIGHT_BTNCOLOURS: "#6e3357",
    LIGHTGRAY: "#D9D9D9",
    LIGHTESTGRAY: "#F0F3F6",
    BLUE: "#001AB0",
    GRAY: "#777777",
    CRNBERRY: "#ED4C5C",
    DARKGRAY: "#939393",
    PEACHCOLOUR: "#F7D794",
    INPUTBG: "#F5F5F5",
    BGCOLOURS: "#FDFDFD",
    PRIMARY: "#7DD6F7",
    THEME_COLOR: '#924dbf',
    RED_COLOR: '#F75555',
    DARK_RED: 'red',
    ThemeBlue: '#009CBD',
    ThemeColor: '#003846',
    Yellow: '#FF9C12',
    lightRed: '#FFD7D7',
    appBgColor: '#e7e4e4',
    hotPink: '#E74B90',
    royalBlue: '#2F6CAD',
    darkBlue: '#33434F',
    darkYellow: '#E55B13',
    lowGreen: '#587B58',
    appGreen: '#60C14C',
    darkGreen: '#32C73E',
    lighttest_yellow: '#EFECC8',
    dark_yellow: '#E9C300',
    lighttest_gray: '#C1D1D4',
    darkest: '#305E6A',
    lighttest_green: '#D1F2D9',
    lightGreen: '#5EC246',
    inputBg: '#fafafa',
    inputGrayBg: '#DEDEDE',
    inputBlur: '#f2f1fe',
    lightestBlue: '#CDECF3',
    light_themeColor: '#B0C1C6',
    app_light: '#F1F7F8',
    Dark_themeColor: '#001F27',
};

export const ShowToast = (message: string) => {
  return Toast.show({
    type: 'success',
    text1: message
  })
}