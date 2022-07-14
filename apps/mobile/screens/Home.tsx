import { FontAwesome5 } from '@expo/vector-icons';
import { Box, Column, Image, Row, ScrollView, Text, Avatar } from 'native-base';
import { useState } from 'react';
import tw from 'twrnc';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import type { Comment as CommentType, Post as PostType } from 'src/libs/types';
import type { ScreenProps } from './types';


interface CommentProps extends CommentType {
  isEven: boolean
}

function Comment({ user, text, createdAt, isEven }: CommentProps) {
  return (
    <Row space="2" style={tw`px-4 py-2 ${isEven ? 'bg-rose-200' : 'bg-rose-100'}`} >
      <Avatar
        style={tw`w-9 h-9 mt-1`}
        source={{ uri: user.pfp }} />


      <Column>
        <Row style={tw`items-baseline`} space="1" >
          <Text style={tw`font-semibold`}>{user.name}</Text>
          <Text style={tw`text-xs text-gray-500`}>{createdAt.toDateString()}</Text>
        </Row>
        <Text>{text}</Text>
      </Column>

    </Row >

  )
}


function Post({ user, text, likes, createdAt, comments }: PostType) {

  return (
    <Column style={tw``}>
      {/* post header */}
      <Column style={tw``}>
        {/* user */}
        <Row space="3" style={tw`bg-rose-200 flex flex-row px-4 py-2 items-center`}>
          <Row space='2' style={tw``}>
            <Avatar
              style={tw`w-8 h-8`}
              source={{ uri: user.pfp }} />
            <Text style={tw`text-lg`}>{user.name}</Text>
          </Row>


          <Text>•</Text>

          <Row space='2'>
            <Row space='1' style={tw`items-center`}>
              <FontAwesome5 style={tw`text-red-500`} size={18} name="fire" />
              <Text style={tw``}>{user.streaks}</Text>
            </Row>
            <Row space='1' style={tw`items-center`}>
              <MaterialCommunityIcons style={tw`text-black`} name="alert-circle-outline" size={18} />
              <Text style={tw``}>{user.streaks}</Text>
            </Row>
          </Row>
        </Row>

        {/* title */}
        <Text style={tw`bg-yellow-200 text-xl px-4 py-1 font-semibold`}>{user.name}</Text>

      </Column>



      {/* image */}
      <Box flexDir='row' justifyContent='center'>
        <Image
          style={{ height: undefined, aspectRatio: 9 / 16, width: '100%' }}
          source={{ uri: text }} alt="user picture" />
      </Box>

      {/* post footer */}
      <Row space="3" style={tw`flex flex-row px-4 py-2 bg-yellow-200 items-center justify-between`}>
        <Row space='1.5' style={tw`items-center`}>
          <AntDesign name="hearto" size={24} color="black" />
          <Text style={tw`text-lg`}>{likes}</Text>
        </Row>

        <Text>{createdAt.toDateString()}</Text>
      </Row>

      {/* comments */}
      <Column >
        {comments.map((comment, i) =>
          <Comment isEven={i % 2 == 0} key={comment.id} {...comment} />
        )}
        {/* <Comment {...comments[0]} /> */}
      </Column>
    </Column >
  )
}

export default function Home({ navigation }: ScreenProps) {
  const [posts, setPosts] = useState<PostType[]>([
    {
      id: 0, title: 'is this SUSSY?', createdAt: new Date(), likes: 4, text: 'https://steamuserimages-a.akamaihd.net/ugc/1772707788143102214/2EB84E86640D917614EB57D517AFB3FB2F024A4C/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false',
      user: { name: 'ome', streaks: 12, strikes: 1, pfp: 'https://pbs.twimg.com/profile_images/1408387150119243778/j14N_zq__400x400.jpg', },
      comments: [
        { id: 0, createdAt: new Date(), text: 'this is omega susy', user: { name: 'memon', pfp: 'https://avatars.githubusercontent.com/u/21112116?s=120&v=4' } },
        { id: 1, createdAt: new Date(), text: 'this is omega susy', user: { name: 'memon', pfp: 'https://avatars.githubusercontent.com/u/21112116?s=120&v=4' } },
      ]
    },
  ]);

  return (
    <ScrollView>
      <Box style={tw`flex flex-row items-center justify-between px-4 py-2 bg-slate-700`} >
        <Text style={tw`text-xl text-white`}>Sussy Baka</Text>
        <Text style={tw`text-2xl text-white`}>≡</Text>
      </Box>
      <Post {...posts[0]} />
      {/* <Box style={tw`flex items-center justify-center bg-purple-500 grow`} >
        <Text style={tw`w-full p-4 text-white bg-gray-700`}>{JSON.stringify(posts, null, 2)}</Text>
      </Box > */}

      <Box style={tw`h-2`} />

    </ScrollView>
  );
} 