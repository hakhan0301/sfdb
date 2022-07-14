import { AntDesign, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { Avatar, Box, Column, Image, Row, Text } from 'native-base';
import tw from 'twrnc';

import type { Comment as CommentType, Post as PostType } from 'src/libs/types/posts';


interface CommentProps extends CommentType {
  index: number
}

export function Comment({ user, text, createdAt, index }: CommentProps) {
  const isEven = index % 2 === 0;
  const bg = isEven ? 'bg-orange-100' : 'bg-red-100';
  const border = `${index === 0 ? 'border-t' : ''} border-b border-amber-800/20`;

  return (
    <Row space="2" style={tw`px-4 py-2 ${border} ${bg}`} >
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


export default function Post({ user, text, title, likes, createdAt, comments }: PostType) {

  return (
    <Column style={tw``}>
      {/* post header */}
      <Column style={tw``}>
        {/* user */}
        <Row space="2" style={tw`bg-yellow-100 flex flex-row px-4 py-1.75 items-center`}>
          <Avatar
            style={tw`w-6 h-6`}
            source={{ uri: user.pfp }} />

          <Text fontStyle="italic" style={tw`text-lg text-gray-700`}>{user.name}</Text>

          <Text style={tw`text-gray-700`}>•</Text>

          <Row space='2'>
            <Row space='1' style={tw`items-center`}>
              <FontAwesome5 style={tw`text-red-500`} size={18} name="fire" />
              <Text style={tw`text-gray-700`}>{user.streaks}</Text>
            </Row>
            <Row space='1' style={tw`items-center`}>
              <MaterialCommunityIcons style={tw`text-black`} name="alert-circle-outline" size={18} />
              <Text style={tw`text-gray-700`}>{user.streaks}</Text>
            </Row>
          </Row>
        </Row>

        {/* title */}
        <Text style={tw`bg-yellow-200 text-lg px-4 py-2 font-semibold`}>{title}</Text>
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
          <Comment index={i} key={comment.id} {...comment} />
        )}
      </Column>
    </Column >
  )
}