import { Dimensions, StatusBar } from 'react-native'
import { isIos } from './conditions';

export const deviceHeight = Dimensions.get('window').height;
export const deviceWidth = Dimensions.get('window').width;
export const statusbarHeight = isIos ? 40 : (StatusBar.currentHeight || 0)