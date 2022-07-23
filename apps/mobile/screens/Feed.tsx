import { Avatar, Box, Column, Row, ScrollView, Text } from 'native-base';
import React, { useState } from 'react';
import Swiper from 'react-native-swiper';
import tw from 'twrnc';

import type { _Post as PostType, User } from 'src/libs/types/posts';
import type { ScreenProps } from 'src/libs/types/screen';

import Post from 'src/libs/ui/Post';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

import CountDown from 'react-native-countdown-component';



export default function Home({ navigation }: ScreenProps) {
  const user: User = {
    name: 'OME', streaks: 12, strikes: 1, pfp: 'https://pbs.twimg.com/profile_images/1408387150119243778/j14N_zq__400x400.jpg'
  };

  const feed = (
    <Row style={tw`items-center justify-between`}>
      <Row space="2" style={tw`flex flex-row py-1.75 items-center`}>
        <Avatar
          style={tw`w-6 h-6`}
          source={{ uri: user.pfp }} />
        <Text fontStyle="italic" style={tw`text-lg text-white `}>{user.name}</Text>
        <Text fontStyle="italic" style={tw`text-sm text-white `}>posted, with 2hr left</Text>

      </Row>
      <Row space='2'>
        <Row space='1' style={tw`items-center`}>
          <FontAwesome5 style={tw`text-red-500`} size={18} name="fire" />
          <Text style={tw`text-white`}>{user.streaks}</Text>
        </Row>
        <Row space='1' style={tw`items-center`}>
          <MaterialCommunityIcons style={tw`text-white`} name="alert-circle-outline" size={18} />
          <Text style={tw`text-white`}>{user.streaks}</Text>
        </Row>
      </Row>
    </Row>
  );


  return (
    <Column style={tw`h-full bg-rose-900`}>

      {/* you */}
      <Column style={tw`px-4 py-3`} space="1">
        <Text style={tw`text-xl font-extrabold text-teal-100`}>You:</Text>
        <Row style={tw`items-center justify-between`}>
          <Row space="2" style={tw`flex flex-row py-1.75 items-center`}>
            <Avatar
              style={tw`w-8 h-8`}
              source={{ uri: user.pfp }} />
            <Text fontStyle="italic" style={tw`text-xl text-white `}>{user.name}</Text>
            <Text style={tw`text-white `}>•</Text>

            <Row space='2'>
              <Row space='1' style={tw`items-center`}>
                <FontAwesome5 style={tw`text-red-500`} size={18} name="fire" />
                <Text style={tw`text-white`}>{user.streaks}</Text>
              </Row>
              <Row space='1' style={tw`items-center`}>
                <MaterialCommunityIcons style={tw`text-white`} name="alert-circle-outline" size={18} />
                <Text style={tw`text-white`}>{user.streaks}</Text>
              </Row>
            </Row>
          </Row>
          <Text style={tw`font-bold text-red-400`}>
            00 : 10 : 30
          </Text>
        </Row>
      </Column>

      <Column style={tw`px-4 py-3 bg-red-800`} space="1">
        <Text style={tw`text-xl font-extrabold text-teal-100`}>Feed:</Text>

        <Column>
          {feed}{feed}{feed}{feed}{feed}
        </Column>
      </Column>

    </Column>
  );
} 