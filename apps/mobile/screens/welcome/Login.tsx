// @ts-ignore
import { GlitchImage } from 'rn-glitch-effect';
import { Box, Center, Column, FormControl, Icon, Input, Text } from 'native-base';
import { ScreenProps } from 'src/libs/types/screen';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import tw from 'twrnc';
import { ApiError, Session } from "@supabase/supabase-js";

import supabase from 'src/libs/supabase';

import { SolidButton } from 'src/libs/ui/welcome/Button';
import { yellow300 } from 'src/libs/ui/colors';
import { Alert } from 'react-native';

const logo = require('../../assets/glitchmonkey.png');

const isValidInput = (str: string) => str.length >= 3 && str.length <= 50;


export default function Login({ navigation }: ScreenProps) {
  const [show, setShow] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    let { user, error } = await supabase.auth.signIn({
      email: email,
      password: password
    });

    if (error) {
      Alert.alert('Auth Error', error.message);
    };
  }

  const signUp = async () => {
    let { user, error } = await supabase.auth.signUp({
      email: email,
      password: password
    });

    if (error) {
      Alert.alert('Auth Error', error.message);
      return;
    };

    Alert.alert(
      'Successfully Signed Up',
      'Please log in after confirming your email.'
    )
  }

  return (
    <Box style={tw`w-full h-full bg-stone-900`}>
      <Center style={tw``}>
        <Column space='8' style={tw`justify-center py-12`}>
          <Column space='4' style={tw`items-center justify-center px-14`}>
            <GlitchImage mainColor={'rgb(0,0,0,0)'} source={logo}
              glitchAmplitude={2} glitchDuration={2000} repeatDelay={1000}
              imageStyle={{
                height: 100, width: 100, resizeMode: 'contain',
                tintColor: yellow300
              }} />
            <Text style={tw`text-4xl font-bold text-yellow-300`}>sFoolar DB</Text>
          </Column>
          <Column space='5' style={tw`items-stretch justify-start`}>
            <FormControl isInvalid={email !== '' && !isValidInput(email)}>

              <Input
                value={email} onChangeText={setEmail}
                placeholder='Email'
                selectionColor='white'
                placeholderTextColor={'#DAD7BF'}
                style={{ color: 'white', ...tw`text-base border-2 border-yellow-300 rounded-lg` }}
                variant='unstyled' />
              <FormControl.ErrorMessage>
                Invalid email.
              </FormControl.ErrorMessage>

            </FormControl>
            <FormControl isInvalid={password !== '' && !isValidInput(password)}>
              <Input
                InputRightElement={
                  <Icon
                    style={tw`absolute right-2 mr-2`}
                    as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} color="muted.400" onPress={() => setShow(!show)} />
                }
                value={password} onChangeText={setPassword}
                autoCapitalize='none'
                autoCorrect={false}
                placeholder='Password'
                selectionColor='white'
                type={show ? 'text' : 'password'}
                placeholderTextColor={'#DAD7BF'}
                style={{ color: 'white', ...tw`text-base border-2 border-yellow-300 rounded-lg` }}
                variant='unstyled' />
              <FormControl.ErrorMessage>
                Invalid password.
              </FormControl.ErrorMessage>

            </FormControl>
            <SolidButton text='Log in' onPress={login} />
            <Center>
              <Text style={tw`text-yellow-100 text-base font-semibold`}>or</Text>
            </Center>
            <SolidButton text='Sign up' onPress={signUp} />
          </Column>
        </Column>
      </Center>
    </Box>

  );
}