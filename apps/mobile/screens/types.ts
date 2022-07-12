import { RouteProp } from '@react-navigation/native';
import type {
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

export interface ScreenProps {
  navigation: NativeStackNavigationProp<any>;
  route: RouteProp<any>;
}