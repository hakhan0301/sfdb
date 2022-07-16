import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackHeaderProps } from '@react-navigation/native-stack';
import { Box, Button, NativeBaseProvider, Row, StatusBar, Text, extendTheme } from "native-base";
import tw from 'twrnc';

import PostsScreen from './screens/Posts';
import WelcomeScreen from './screens/welcome/Welcome';
import LoginScreen from './screens/welcome/Login';
import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import supabase from './libs/supabase';

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
        <Text style={tw`text-lg text-center text-white`}
          onPress={() => props.navigation.navigate('Welcome')}>d</Text>
        <Text style={tw`text-2xl text-center text-white`}>+</Text>
        <Text style={tw`text-2xl text-center text-white`}>≡</Text>
      </Row>
    </Box >
  );
}


export default function App() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      console.log('session: ', session);
      setSession(session)
    });
  }, []);




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
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ header: () => <></> }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ header: () => <></> }} />
          <Stack.Screen name="Home" component={PostsScreen} />
        </Stack.Navigator>

      </NavigationContainer>
    </NativeBaseProvider>
  );
}