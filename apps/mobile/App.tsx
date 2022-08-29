import { FontAwesome } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackHeaderProps } from '@react-navigation/native-stack';
import { Box, Button, NativeBaseProvider, Row, StatusBar, Text } from "native-base";

import tw from 'twrnc';

import CameraScreen from './screens/Camera';
import NewPostScreen from './screens/NewPost';
import PostsScreen from './screens/Posts';
import ProfileScreen from './screens/Profile';

import LoginScreen from './screens/welcome/Login';
import WelcomeScreen from './screens/welcome/Welcome';

import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

import AuthContext from './libs/contexts/AuthContext';
import { useNotifications } from './libs/hooks/useNotifications';
import supabase from './libs/supabase';

const Stack = createNativeStackNavigator();
function NavBar({ navigation }: NativeStackHeaderProps) {
  return (
    <Box style={tw`flex flex-row items-center justify-between py-2 pr-4 bg-slate-800`} >
      <Button style={tw`p-0 px-4 bg-white/0`}
        _pressed={{ style: tw`p-0 px-4 bg-white/0 opacity-70` }}
        onPress={() => navigation.navigate('Home')}>
        <Text style={tw`text-xl text-white`}>Sussy Baka</Text>
      </Button>
      <Row space={4} style={tw`items-center`}>
        <Button variant='unstyled' style={tw`p-0`} onPress={() => navigation.navigate('Profile')}>
          <FontAwesome name="user" size={16} color="white" />
        </Button>
        <Button variant='unstyled' style={tw`p-0`} onPress={() => supabase.auth.signOut()}>
          <FontAwesome name="user-times" size={16} color="white" />
        </Button>
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

  useNotifications(session?.user?.id);

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
            {[
              ...(session ? [
                <Stack.Screen name="Home" key="Home" component={PostsScreen} />,
                <Stack.Screen name="Profile" key="Profile" component={ProfileScreen} />,
                <Stack.Screen name="NewPost" key="NewPost" component={NewPostScreen}
                  options={{ header: EmptyHeader }} />,
                <Stack.Screen name="Camera" key="Camera" component={CameraScreen}
                  options={{ header: EmptyHeader }} />,
              ] : []),
              <Stack.Screen name="Welcome" key="Welcome" component={WelcomeScreen}
                options={{ header: EmptyHeader }} />,
              <Stack.Screen name="Login" key="Login" component={LoginScreen}
                options={{ header: EmptyHeader }} />,
            ]}
          </Stack.Navigator>

        </AuthContext.Provider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
