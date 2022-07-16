import { Avatar, Box, Button, Center, Column, Icon, Image, Text, View } from "native-base";
import { ScreenProps } from "src/libs/types/screen";
// @ts-ignore
import { Glitch, GlitchImage } from 'rn-glitch-effect';

import tw from 'twrnc';

const logo = require('../assets/glitchmonkey.png');

export default function Login({ navigation }: ScreenProps) {

  return (
    <Box style={tw`w-full h-full bg-stone-900`}>
      <Center style={tw`h-[75%]`}>
        <Column space="7" style={tw`items-stretch justify-center`}>
          <Column space="4" style={tw`items-center justify-center px-14`}>
            <GlitchImage mainColor={'rgb(120, 25, 23, 0)'} source={logo}
              glitchAmplitude={2} glitchDuration={2000} repeatDelay={1000}
              imageStyle={{
                height: 100, width: 100, resizeMode: 'contain',
                tintColor: 'rgb(251,191,36)'
              }} />
            <Text style={tw`text-4xl font-bold text-amber-400`}>sFoolar DB</Text>
          </Column>
          <Column space="5" style={tw`items-stretch`}>
            <Button style={tw`bg-yellow-300 rounded-xl`}>
              <Text style={tw`text-base font-semibold text-black`}>Log in</Text>
            </Button>
            <Button style={tw`bg-yellow-300 rounded-xl`}>
              <Text style={tw`text-base font-semibold text-black`}>Sign up</Text>
            </Button>
          </Column>
        </Column>
      </Center>
    </Box>

  );
}