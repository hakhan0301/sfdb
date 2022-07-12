import tw from 'twrnc';
import { Button, View, Text } from 'react-native';

import type { ScreenProps } from './types';

export default function Home({ navigation }: ScreenProps) {
  return (
    <View style={tw`w-full h-full flex justify-center items-center`}>
      <Text style={tw``}>Sussy baka app23</Text>

    </View>
  );
}