import { Box, Button, Center, Column, Row, ScrollView, Text, View } from 'native-base';
import React, { useState } from 'react';
import Swiper from 'react-native-swiper';
import tw from 'twrnc';
import { AntDesign } from '@expo/vector-icons';

import type { Post as PostType } from 'src/libs/types/posts';
import type { ScreenProps } from 'src/libs/types/screen';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

export default function Home({ navigation }: ScreenProps) {
  const [index, setIndex] = useState(0);

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

        <View style={tw`bg-stone-800 flex-grow mt-5 p-4 pt-9`}>
          <LinearGradient
            colors={['#1e88e5', '#42a5f5']}
            style={tw`absolute -top-5 self-center rounded-xl`}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >

            <Row style={tw`rounded-xl`}>
              <Button onPress={() => setIndex(0)}
                style={tw`${index == 0 ? 'bg-yellow-400' : 'bg-white/0'} w-24 rounded-l-lg rounded-r-none`}>
                <Text style={tw`${index == 0 ? 'text-black' : 'text-white'} font-bold`}>Text</Text>
              </Button>
              <Button onPress={() => setIndex(1)}
                style={tw`${index == 1 ? 'bg-yellow-400' : 'bg-white/0'} w-24 rounded-none`}>
                <Text style={tw`${index == 1 ? 'text-black' : 'text-white'} font-bold`}>Text</Text>
              </Button>
              <Button onPress={() => setIndex(2)}
                style={tw`${index == 2 ? 'bg-yellow-400' : 'bg-white/0'} w-24 rounded-r-lg rounded-l-none`}>
                <Text style={tw`${index == 2 ? 'text-black' : 'text-white'} font-bold`}>Text</Text>
              </Button>
            </Row>
          </LinearGradient>
          <Text style={tw`text-white`}>fasdfsd</Text>

        </View>
        <View style={tw`h-12`}>
          <Text>fsd</Text>
        </View>

      </Column>
    </LinearGradient>
  );
} 