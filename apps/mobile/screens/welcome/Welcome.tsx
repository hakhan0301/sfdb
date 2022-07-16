import { Avatar, Box, Center, Column, Icon, Image, Text, View } from "native-base";
import Button from "src/libs/ui/welcome/Button";
import { ScreenProps } from "src/libs/types/screen";
// @ts-ignore
import { GlitchImage } from 'rn-glitch-effect';

import tw from 'twrnc';

const logo = require('../../assets/glitchmonkey.png');

export default function Login({ navigation }: ScreenProps) {

  return (
    <Box style={tw`w-full h-full bg-stone-900`}>
      <Center style={tw`h-full`}>
        <Column space="0" style={tw`justify-center h-full`}>
          <Column space="4" style={tw`h-[50%] items-center justify-center px-14`}>
            <GlitchImage mainColor={'rgb(0,0,0,0)'} source={logo}
              glitchAmplitude={2} glitchDuration={2000} repeatDelay={1000}
              imageStyle={{
                height: 100, width: 100, resizeMode: 'contain',
                tintColor: 'rgb(253,224,71)'
              }} />
            <Text style={tw`text-4xl font-bold text-yellow-300`}>sFoolar DB</Text>
          </Column>
          <Column space="5" style={tw`h-[50%] items-stretch justify-start`}>
            <Button
              text="Log in"
              onPress={() => navigation.navigate('Login')}
            />
            <Button
              text="Sign up"
              onPress={() => navigation.navigate('Signup')}
            />
          </Column>
        </Column>
      </Center>
    </Box>

  );
}