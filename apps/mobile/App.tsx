import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackHeaderProps } from '@react-navigation/native-stack';
import { Box, Button, NativeBaseProvider, Row, StatusBar, Text } from "native-base";
import tw from 'twrnc';
import { ScreenProps } from './libs/types/screen';

import HomeScreen from './screens/Home';
import PostsScreen from './screens/Posts';
import LoginScreen from './screens/Login';

const Stack = createNativeStackNavigator();

function NavBar(props: NativeStackHeaderProps) {

  return (

    <Box style={tw`flex flex-row items-center justify-between py-2 pr-4 bg-slate-800`} >
      <Button style={tw`p-0 px-4 bg-white/0`}
        _pressed={{ style: tw`p-0 px-4 bg-white/0 opacity-70` }}
        onPress={() => props.navigation.navigate('Home')}>
        <Text style={tw`text-xl text-white`}>Sussy Baka</Text>
      </Button>
      <Row space={2} style={tw`items-center`}>
        <Text style={tw`text-lg text-center text-white`}>d</Text>
        <Text style={tw`text-2xl text-center text-white`}>+</Text>
        <Text style={tw`text-2xl text-center text-white`}>≡</Text>
      </Row>
    </Box >
  );
}


export default function App() {
  return (
    <NativeBaseProvider>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            header: (props) => <NavBar {...props} />,
            animation: 'none'
          }}
        >
          <Stack.Screen name="Home" component={PostsScreen} />
          {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>

      </NavigationContainer>
    </NativeBaseProvider>
  );
}