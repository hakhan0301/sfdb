import { Avatar, Box, Center, Column, Icon, Image, Input, InputGroup, InputLeftAddon, InputRightAddon, Stack, Text, View } from 'native-base';
import { ScreenProps } from 'src/libs/types/screen';
// @ts-ignore
import { GlitchImage } from 'rn-glitch-effect';

import { yellow100, yellow200, yellow300, yellow400, yellow50, yellow800 } from 'src/libs/ui/colors';

import tw from 'twrnc';
import { SolidButton } from 'src/libs/ui/welcome/Button';
import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

const logo = require('../../assets/glitchmonkey.png');

export default function Login({ navigation }: ScreenProps) {


  const [show, setShow] = useState(false);

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
            <Input
              placeholder='Username'
              selectionColor='white'
              placeholderTextColor={'#DAD7BF'}
              style={{ color: 'white', ...tw`text-base border-2 border-yellow-300 rounded-lg` }}
              variant='unstyled' />
            <Input
              InputRightElement={
                <Icon
                  style={tw`absolute right-2 mr-2`}
                  as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} color="muted.400" onPress={() => setShow(!show)} />
              }
              placeholder='Password'
              selectionColor='white'
              type={show ? 'text' : 'password'}
              placeholderTextColor={'#DAD7BF'}
              style={{ color: 'white', ...tw`text-base border-2 border-yellow-300 rounded-lg` }}
              variant='unstyled' />
            <SolidButton text='Log in' />
            <Center>
              <Text style={tw`text-yellow-100 text-base font-semibold`}>or</Text>
            </Center>
            <SolidButton text='Sign up' />
          </Column>
        </Column>
      </Center>
    </Box>

  );
}