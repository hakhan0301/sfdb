import { Box, Button, Center, Column, Row, ScrollView, Text, View } from 'native-base';
import React, { useState } from 'react';
import tw from 'twrnc';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import type { ScreenProps } from 'src/libs/types/screen';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { FontAwesome5 } from '@expo/vector-icons';
import { ButtonProps } from 'src/libs/ui/types';

interface ButtonOf3Props extends ButtonProps {
  index: 0 | 1 | 2;
  isActive: boolean;
}
function ButtonOf3({ text, onPress, index, isActive }: ButtonOf3Props) {
  let roundedStyle = {
    0: 'rounded-l-lg rounded-r-none',
    1: 'rounded-none',
    2: 'rounded-r-lg rounded-l-none'
  }

  const style = tw`${isActive ? 'bg-yellow-300' : 'bg-white/0'} ${roundedStyle[index]}`

  return (
    <Button onPress={onPress}
      w='24'
      _pressed={{
        style: { ...style, ...tw`${isActive ? 'bg-yellow-400' : 'bg-black/10'}` },
      }}
      style={style}>
      <Text style={tw`${isActive ? 'text-black' : 'text-white'} font-bold`}>{text}</Text>
    </Button>
  )
}

type ActiveSections = 'Text' | 'Link' | 'Image';

export default function Home({ navigation }: ScreenProps) {
  const [activeSection, setActiveSession]
    = useState<ActiveSections>('Text');

  return (
    <LinearGradient
      colors={['#ff7043', '#e040fb']}
      style={tw``}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <Column style={tw`w-full h-full`}>
        <BlurView style={tw`m-6 rounded-3xl border-4 border-white`} intensity={50}>
          <Row space="5"
            style={tw`p-5 items-center`}>
            <AntDesign name="clockcircleo" size={96} color="white" />

            <Column>
              <Text style={tw`text-4xl text-white -mb-2`}>3 hours</Text>
              <Text style={tw`text-white text-base`}>remaining</Text>
            </Column>
          </Row>
        </BlurView>

        <View style={tw`bg-stone-800 flex-grow mt-5 p-6 pt-11`}>
          <LinearGradient
            colors={['#1e88e5', '#42a5f5']}
            style={tw`absolute -top-5 self-center rounded-lg`}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Row style={tw`rounded-xl`}>
              <ButtonOf3 index={0}
                onPress={() => setActiveSession('Text')} isActive={activeSection === 'Text'}
                text='Text' />
              <ButtonOf3 index={1}
                onPress={() => setActiveSession('Link')} isActive={activeSection === 'Link'}
                text='Link' />
              <ButtonOf3 index={2}
                onPress={() => setActiveSession('Image')} isActive={activeSection === 'Image'}
                text='Image' />
            </Row>
          </LinearGradient>
          <Text style={tw`text-white`}>fasdfsd</Text>

        </View>
        <View style={tw`h-14`}>
          <Row style={tw`w-full absolute items-center top-[-8] justify-between px-9`}>
            <Button h="12" w='12' rounded='full' style={tw`bg-yellow-300`}
              _pressed={{ style: tw`bg-yellow-400` }}>
              <Ionicons name="ios-home-sharp" size={18} color="black" />
            </Button>
            <Button h="16" w='16' rounded='full' style={tw`bg-yellow-300`}
              _pressed={{ style: tw`bg-yellow-400` }}>
              <FontAwesome5 name="camera" size={24} color="black" />
            </Button>
          </Row>
        </View>

      </Column>
    </LinearGradient>
  );
} 