import { Avatar, Box, Button, Center, Column, Icon, Image, Input, Text, View } from "native-base";
import { ScreenProps } from "src/libs/types/screen";
// @ts-ignore
import { GlitchImage } from 'rn-glitch-effect';

import tw from 'twrnc';

const logo = require('assets/glitchmonkey.png');

export default function Login({ navigation }: ScreenProps) {

  return (
    <Box style={tw`w-full h-full bg-stone-900`}>
      <Center style={tw`h-full`}>
        <Column space="0" style={tw`justify-center h-full`}>
          <Column space="4" style={tw`h-[35%] items-center justify-center px-14`}>
            <GlitchImage mainColor={'rgb(0,0,0,0)'} source={logo}
              glitchAmplitude={2} glitchDuration={2000} repeatDelay={1000}
              imageStyle={{
                height: 100, width: 100, resizeMode: 'contain',
                tintColor: 'rgb(253,224,71)'
              }} />
            <Text style={tw`text-4xl font-bold text-yellow-300`}>sFoolar DB</Text>
          </Column>
          <Column space="5" style={tw`h-[65%] items-stretch justify-start`}>
            <Input style={tw`border-2 border-yellow-300 rounded-lg`} variant="unstyled" />
          </Column>
        </Column>
      </Center>
    </Box>

  );
}