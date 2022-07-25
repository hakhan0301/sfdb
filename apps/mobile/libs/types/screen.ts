import { RouteProp } from '@react-navigation/native';
import type {
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';


export interface ScreenPropsRouteless {
  navigation: NativeStackNavigationProp<any>;
}

export interface ScreenProps extends ScreenPropsRouteless {
  route: RouteProp<any>;
}