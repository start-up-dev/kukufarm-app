import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, NavigationProp, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from 'container';
import type { StackNavigationProp } from '@react-navigation/stack';

type INavigationProp<T extends {}, RouteName extends keyof T> = CompositeNavigationProp<
    BottomTabNavigationProp<RootStackParamList>,
    StackNavigationProp<T, RouteName>
>;

export interface IScreenProps<T extends {}, RouteName extends keyof T> {
    navigation: INavigationProp<T, RouteName>;
    route: RouteProp<T, RouteName>;
}