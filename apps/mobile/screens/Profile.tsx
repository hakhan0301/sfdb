import { Button, Column, Image, Input, ScrollView, Spinner, Text, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import tw from 'twrnc';

import type { ScreenProps, ScreenPropsRouteless } from 'src/libs/types/screen';
import { useProfile, useSession } from 'src/libs/hooks/auth';
import { tables } from 'src/libs/supabase';
import { User } from 'src/libs/types/posts';
import { Alert } from 'react-native';
import { RouteProp } from '@react-navigation/native';


async function updateUser(user: User) {
  return tables.users()
    .update(user)
    .eq('id', user.id);
}


type ProfileRouteProps = {
  params: {
    cameraResultURI?: string
  }
}

interface ProfileProps extends ScreenPropsRouteless {
  route: RouteProp<ProfileRouteProps>
}
export default function Profile({ navigation, route }: ProfileProps) {
  const session = useSession();
  const [loading, setLoading] = useState(false);
  const userId = session?.user?.id!;
  const { user, setUser } = useProfile(userId);

  const cameraResultURI = route?.params?.cameraResultURI;

  useEffect(() => {
    if (cameraResultURI) {
      setUser((prevUser) => ({
        id: prevUser!.id,
        username: prevUser!.username,
        pfp: cameraResultURI,
      }));

      navigation.setParams({
        cameraResultURI: undefined
      });
    }
  }, [cameraResultURI]);


  const onUsernameInput = (newUsername: string) => {
    setUser((prevUser) => ({
      id: prevUser!.id,
      pfp: prevUser!.pfp,
      username: newUsername
    }));
  }

  const onNewPFP = async () => {
    if (!user) return;

    navigation.navigate('Camera', {
      returnScreen: 'Profile'
    });
  }

  const onSubmit = async () => {
    if (!user) return;

    const res = await updateUser(user);

    if (res.error) {
      Alert.alert('Profile Update Error', res.error.message);
    } else {
      Alert.alert('Success', 'Updated Profile.');
    }
  }

  if (loading) {
    return (
      <View style={tw`flex flex-row items-center justify-center w-full h-full bg-green-500`}>
        <Spinner color='rose.500' size="lg" />
      </View>
    )
  }

  if (!user) {
    return <Text>Error</Text>;
  }

  return (
    <ScrollView style={tw`h-full bg-sky-100`}>
      <Column space='4' style={tw`p-4`}>
        <Text style={tw`text-2xl font-medium text-black`}>
          Profile
        </Text>

        <Column space='2' style={tw``}>
          <Text style={tw`text-lg text-black`}>Username</Text>
          <Input variant='unstyled' style={tw`text-lg bg-white rounded-lg`}
            onChangeText={onUsernameInput}
            value={user.username} />
        </Column>


        <Column space='2'>
          <Text style={tw`text-lg`}>Picture</Text>
          <View style={tw`flex flex-row`}>
            <Image style={tw`w-full aspect-square`}
              source={{ uri: user.pfp }} alt='sus' />
            <Button bg='emerald.500' _pressed={{ bg: 'emerald.700' }}
              style={tw`absolute right-0 shadow-lg rounded-full w-12 h-12 p-0`}
              onPress={onNewPFP}
            ><Text style={tw`text-white font-medium`}>Edit</Text></Button>
          </View>
        </Column>

        <Button bg='emerald.500' _pressed={{ bg: 'emerald.700' }}
          style={tw`self-end px-8 mt-4 shadow-lg`}
          onPress={onSubmit}
        >
          <Text style={tw`text-white font-medium`}>Submit</Text>
        </Button>
      </Column >
    </ScrollView>
  );
} 