import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import tw from 'twrnc';

export default function App() {
  return (
    <View style={tw`w-full h-full flex justify-center items-center`}>
      <Text style={tw``}>Sussy baka app2</Text>
      <StatusBar style="auto" />
    </View>
  );
}