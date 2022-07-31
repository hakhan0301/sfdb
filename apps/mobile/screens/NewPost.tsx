import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Button, Center, Column, Row, ScrollView, Spinner, Text, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import tw from 'twrnc';

import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import type { ScreenProps, ScreenPropsRouteless } from 'src/libs/types/screen';
import { ButtonOf3 } from 'src/libs/ui/newPost/Buttons';
import { LinkPostForm, MediaPostForm, TextPostForm } from 'src/libs/ui/newPost/NewPostFields';

import * as colors from 'src/libs/ui/colors';
import supabase, { tables } from 'src/libs/supabase';
import { Entypo } from '@expo/vector-icons';
import { Alert, Dimensions, ImageBackground } from 'react-native';
import { FileBody, fileMimes, LinkBody, TextBody } from 'src/libs/types/posts';
import { useSession } from 'src/libs/hooks/auth';
import uuid from 'react-native-uuid';
import { decode } from 'base64-arraybuffer'

import * as FileSystem from 'expo-file-system';
import { RouteProp } from '@react-navigation/native';

type ActiveSections = 'Text' | 'Link' | 'Upload';

type NewPostRouteProps = {
  params: {
    cameraResultURI?: string
  }
}

interface NewPost extends ScreenPropsRouteless {
  route: RouteProp<NewPostRouteProps>
}

export default function NewPost({ navigation, route }: NewPost) {
  const [loading, setLoading] = useState(false);
  const session = useSession();

  const cameraResultURI = route?.params?.cameraResultURI;
  const [activeSection, setActiveSession] = useState<ActiveSections>('Text');

  useEffect(() => {
    if (cameraResultURI) setActiveSession('Upload');
  }, [cameraResultURI]);


  const handleLinkContentSubmit = async (postBody: LinkBody) => {
    setLoading(true);
    const { body, error } = await tables.posts().insert({
      title: postBody.title,
      body: postBody.link,
      user_id: session.user?.id,
      post_type: 'LINK'
    }, { returning: 'representation' });

    setLoading(false);

    if (error) {
      Alert.alert(error.message);
      return false;
    }

    return true;
  }

  const handleTextContentSubmit = async (postBody: TextBody) => {
    setLoading(true);

    const { body, error } = await tables.posts().insert({
      title: postBody.title,
      body: postBody.content,
      user_id: session.user?.id,
      post_type: 'TEXT'
    }, { returning: 'representation' });

    setLoading(false);

    if (error) {
      Alert.alert(error.message);
      return false;
    }

    return true;
  }

  const handleFileContentSubmit = async (postBody: FileBody) => {
    setLoading(true);

    const fileBase64 = await FileSystem.readAsStringAsync(
      postBody.url,
      { encoding: 'base64' }
    );

    const uploadResult = await supabase.storage
      .from('post-files')
      .upload(`public/${uuid.v4()}`, decode(fileBase64), {
        contentType: fileMimes[postBody.fileType]
      });

    navigation.setParams({
      cameraResultURI: undefined
    });


    if (uploadResult.error) {
      setLoading(false);

      Alert.alert(uploadResult.error.message);
      return false;
    }

    const postResult = await tables.posts().insert({
      title: postBody.title,
      body: JSON.stringify({
        title: postBody.title,
        fileType: postBody.fileType,
        url: uploadResult.data?.Key
      }),
      user_id: session.user?.id,
      post_type: 'MEDIA'
    }, { returning: 'representation' });

    setLoading(false);

    if (postResult.error) {
      Alert.alert(postResult.error.message);
      return false;
    }

    return true;
  }

  const onCamera = () => {
    navigation.navigate('Camera', {
      returnScreen: 'NewPost'
    });
  }


  return (
    <ImageBackground source={{ uri: 'https://media.discordapp.net/attachments/748688944966664205/1000170121584709652/unsplash_kcKiBcDTJt4.png?width=336&height=661' }}
      style={{ ...tw`bg-[${colors.deepRed300}]`, minHeight: Math.round(Dimensions.get('window').height) }} >
      <Column style={tw`w-full h-full`}>
        <View style={tw`m-6 rounded-3xl bg-stone-900`}>
          <Row space="5"
            style={tw`p-5 items-center`}>
            <AntDesign name="clockcircleo" size={96} color={colors.deepRed300} />

            <Column>
              <Text style={tw`text-4xl text-[${colors.deepRed300}] -mb-2`}>TODO</Text>
              {/* <Text style={tw`text-4xl text-[${colors.deepRed300}] -mb-2`}>3 hours</Text> */}
              {/* <Text style={tw`text-[${colors.deepRed300}] text-base`}>remaining</Text> */}
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
            {activeSection === "Text" && <TextPostForm onSubmit={handleTextContentSubmit} />}
            {activeSection === "Link" && <LinkPostForm onSubmit={handleLinkContentSubmit} />}
            {activeSection === "Upload" && <MediaPostForm onSubmit={handleFileContentSubmit} initialFile={cameraResultURI} />}
          </ScrollView>

        </View>
        <View style={tw`h-11`}>
          <Row style={tw`w-full absolute items-center top-[-10] justify-between px-9`}>
            <Button h="16" w='16' rounded='full' borderWidth='4' borderColor='black' shadow='8'
              style={tw`bg-[${colors.deepRed300}]`}
              _pressed={{ style: tw`bg-[${colors.deepRed400}]` }}
              onPress={() => navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Home')}
            >
              <Entypo name="back" size={20} color="black" />
            </Button>
            <Button h="20" w='20' rounded='full' borderWidth='4' borderColor='black' shadow='8'
              style={tw`bg-[${colors.deepRed300}]`}
              _pressed={{ style: tw`bg-[${colors.deepRed400}]` }}
              onPress={onCamera}
            >
              <FontAwesome5 name="camera" size={26} color="black" />
            </Button>
          </Row>
        </View>

        {loading && (
          <Center style={tw`absolute w-full h-full bg-stone-900/50`}>
            <Spinner accessibilityLabel="Loading posts" />
          </Center>
        )}

      </Column>
    </ImageBackground >
  );
} 