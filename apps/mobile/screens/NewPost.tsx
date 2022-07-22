import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Button, Column, Row, ScrollView, Text, View } from 'native-base';
import React, { useState } from 'react';
import tw from 'twrnc';

import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import type { ScreenProps } from 'src/libs/types/screen';
import { ButtonOf3 } from 'src/libs/ui/newPost/Buttons';
import { LinkPostForm, MediaPostForm, TextPostForm } from 'src/libs/ui/newPost/NewPostFields';

import * as colors from 'src/libs/ui/colors';
import supabase from 'src/libs/supabase';
import { Entypo } from '@expo/vector-icons';
import { ImageBackground } from 'react-native';


type ActiveSections = 'Text' | 'Link' | 'Upload';

export default function Home({ navigation }: ScreenProps) {
  const [activeSection, setActiveSession]
    = useState<ActiveSections>('Text');

  return (
    <ImageBackground source={{ uri: 'https://media.discordapp.net/attachments/748688944966664205/1000170121584709652/unsplash_kcKiBcDTJt4.png?width=336&height=661' }}
      style={tw`bg-[${colors.deepRed400}]`} >
      <Column style={tw`w-full h-full`}>
        <View style={tw`m-6 rounded-3xl bg-stone-900`}>
          <Row space="5"
            style={tw`p-5 items-center`}>
            <AntDesign name="clockcircleo" size={96} color={colors.deepRed400} />

            <Column>
              <Text style={tw`text-4xl text-[${colors.deepRed400}] -mb-2`}>3 hours</Text>
              <Text style={tw`text-[${colors.deepRed400}] text-base`}>remaining</Text>
            </Column>
          </Row>
        </View>

        <View style={tw`bg-stone-900 flex-grow pt-11`}>
          <LinearGradient
            colors={[`${colors.blue600}ff`, `${colors.blue400}ff`]}
            style={tw`absolute self-center rounded-lg rounded-t-none`}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Row style={tw``}>
              <ButtonOf3 index={0}
                onPress={() => setActiveSession('Text')} isActive={activeSection === 'Text'}
                text='Text' />
              <ButtonOf3 index={1}
                onPress={() => setActiveSession('Link')} isActive={activeSection === 'Link'}
                text='Link' />
              <ButtonOf3 index={2}
                onPress={() => setActiveSession('Upload')} isActive={activeSection === 'Upload'}
                text='Upload' />
            </Row>
          </LinearGradient>
          <ScrollView style={tw`px-6 flex-1`}>
            {activeSection === "Text" && <TextPostForm />}
            {activeSection === "Link" && <LinkPostForm />}
            {activeSection === "Upload" && <MediaPostForm />}
          </ScrollView>

        </View>
        <View style={tw`h-11`}>
          <Row style={tw`w-full absolute items-center top-[-8] justify-between px-9`}>
            <Button h="12" w='12' rounded='full' borderWidth='4' borderColor='black' shadow='8'
              style={tw`bg-[${colors.deepRed300}]`}
              _pressed={{ style: tw`bg-[${colors.deepRed400}]` }}
              onPress={() => navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Home')}
            >
              <Entypo name="back" size={18} color="black" />
            </Button>
            <Button h="16" w='16' rounded='full' borderWidth='4' borderColor='black' shadow='8'
              style={tw`bg-[${colors.deepRed300}]`}
              _pressed={{ style: tw`bg-[${colors.deepRed400}]` }}
              onPress={() => { }}
            >
              <FontAwesome5 name="camera" size={24} color="black" />
            </Button>
          </Row>
        </View>

      </Column>
    </ImageBackground >
  );
} 