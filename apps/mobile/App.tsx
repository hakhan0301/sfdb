import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackHeaderProps } from '@react-navigation/native-stack';
import { Box, Button, NativeBaseProvider, Row, StatusBar, Text, extendTheme } from "native-base";
import tw from 'twrnc';

import PostsScreen from './screens/Posts';
import CameraScreen from './screens/Camera';
import NewPostScreen from './screens/NewPost';
import ProfileScreen from './screens/Profile';

import WelcomeScreen from './screens/welcome/Welcome';
import LoginScreen from './screens/welcome/Login';

import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';

import AuthContext from './libs/contexts/AuthContext';
import supabase from './libs/supabase';
import { useSession } from './libs/hooks/auth';

const Stack = createNativeStackNavigator();
function NavBar(props: NativeStackHeaderProps) {
  const user = useSession();

  return (
    <Box style={tw`flex flex-row items-center justify-between py-2 pr-4 bg-slate-800`} >
      <Button style={tw`p-0 px-4 bg-white/0`}
        _pressed={{ style: tw`p-0 px-4 bg-white/0 opacity-70` }}
        onPress={() => props.navigation.navigate('Home')}>
        <Text style={tw`text-xl text-white`}>Sussy Baka</Text>
      </Button>
      <Row space={2} style={tw`items-center`}>
        <Text onPress={() => supabase.auth.signOut()}
          style={tw`text-2xl text-center text-white`}>≡</Text>
      </Row>
    </Box >
  );
}


export default function App() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, _session) => {
      setSession(_session);
    });
  }, []);

  const EmptyHeader = () => <></>;

  return (
    <NativeBaseProvider>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <AuthContext.Provider value={session}>
          <Stack.Navigator
            screenOptions={{
              header: (props) => <NavBar {...props} />,
              animation: 'none'
            }}
          >
            {(!session) && [
              <Stack.Screen name="Welcome" key="Welcome" component={WelcomeScreen} options={{ header: EmptyHeader }} />,
              <Stack.Screen name="Login" key="Login" component={LoginScreen} options={{ header: EmptyHeader }} />
            ]}
            {session && [
              <Stack.Screen name="Home" key="Home" component={PostsScreen} />,
              <Stack.Screen name="Profile" key="Profile" component={ProfileScreen} />,
              <Stack.Screen name="NewPost" key="NewPost" component={NewPostScreen} options={{ header: EmptyHeader }} />,
              <Stack.Screen name="Camera" key="Camera" component={CameraScreen} options={{ header: EmptyHeader }} />,
            ]}
          </Stack.Navigator>

        </AuthContext.Provider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}