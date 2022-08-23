import { AntDesign, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { Avatar, Box, Button, Center, Column, FormControl, Image, Input, Row, Spinner, Text, View } from 'native-base';
import tw from 'twrnc';
import type { Comment as CommentType, _Post as PostType, PostType as TypeOfPost, FileBody } from 'src/libs/types/posts';
import supabase, { tables } from '../supabase';
import { useEffect, useMemo, useState } from 'react';
import { useProfile, useSession } from '../hooks/auth';
import { Alert } from 'react-native';

// @ts-ignore
import timeago from 'time-ago';

interface CommentProps extends CommentType {
  index: number
}

function Comment({ user, text, createdAt, index }: CommentProps) {
  const isEven = index % 2 === 0;
  const bg = isEven ? 'bg-orange-100' : 'bg-orange-50';
  const border = `${index === 0 ? 'border-t' : ''} border-b border-amber-800/20`;

  return (
    <Row space="2" style={tw`px-4 py-2 ${border} ${bg}`} >
      <Avatar
        style={tw`w-9 h-9 mt-1`}
        source={{ uri: user.pfp }} />

      <Column>
        <Row style={tw`items-baseline`} space="1" >
          <Text style={tw`font-semibold`}>{user.name}</Text>
          <Text style={tw`text-xs text-gray-500`}>{timeago.ago(createdAt)}</Text>
        </Row>
        <Text>{text}</Text>
      </Column>
    </Row >
  )
}

function MediaPostBody({ fileType, title, url }: FileBody) {
  const [signedURL, setSignedURL] = useState<string | null>(null);

  useEffect(() => {
    const createdSignedURL = async () => {
      const file = url.substring(url.indexOf('/') + 1);

      const res = await supabase.storage
        .from('post-files')
        .createSignedUrl(file, 60);

      setSignedURL(res.signedURL);
    }

    if (fileType === 'Image') {
      createdSignedURL();
    }
  }, [fileType, url]);


  if (fileType === 'Image') {
    if (!signedURL) return <Spinner />;
    return (
      <Image style={{ height: undefined, aspectRatio: 9 / 16, width: '100%' }}
        source={{ uri: signedURL }} alt="user picture" />
    )
  }

  return (
    <Text>{JSON.stringify(signedURL)}</Text>
  )
}

interface PostBodyProps {
  post_type: TypeOfPost,
  text: string
}
function PostBody({ post_type, text }: PostBodyProps) {
  switch (post_type) {
    case 'TEXT':
      return (
        <View style={tw`bg-yellow-100 w-full px-4 py-4`}>
          <Text style={tw`text-base text-black`}>
            {text}
          </Text>
        </View>
      );
    case 'LINK':
      return (
        <View style={tw`bg-yellow-100 w-full px-4 py-4`}>
          <Text style={tw`text-base text-black`}>
            link: {text}
          </Text>
        </View>
      );
    case 'MEDIA':
      return <MediaPostBody {...JSON.parse(text)} />;
  }

  throw new Error("INVALID POST_TYPE");
}


export default function Post({ id, user, text, title, likes: _likes, createdAt, comments: _comments, post_type, likedByUser: _likedByUser }: PostType) {
  const session = useSession();
  const { user: currentUser } = useProfile(session.user?.id!);

  const [likes, setLikes] = useState(_likes);
  useEffect(() => setLikes(_likes), [_likes]);

  const [likedByUser, setLikedByUser] = useState(_likedByUser);
  useEffect(() => setLikedByUser(_likedByUser), [_likedByUser]);

  const [comments, setComments] = useState(_comments);
  useEffect(() => setComments(_comments), [_comments]);

  const [comment, setComment] = useState('');

  const commentsByTime = useMemo(() =>
    comments.sort(
      (a, b) => b.createdAt.getMilliseconds() - a.createdAt.getMilliseconds()
    ).slice(0, 3),
    [comments]
  );

  const submitComment = async () => {
    const tempComment = comment;
    const { error, data } = await tables.comments().insert({
      post_id: id,
      user_id: session.user?.id as any,
      body: tempComment
    });

    if (error) Alert.alert("Error commenting", error.message);

    const newComment = data![0];

    setComment('');
    setComments(prevComments => [
      {
        id: newComment.id, createdAt: new Date(newComment.created_at), text: newComment.body,
        user: { name: currentUser!.username, pfp: currentUser!.pfp }
      },
      ...prevComments
    ]);
  }

  const likePost = async () => {
    setLikedByUser(true);
    setLikes(likes + 1);
    const { error } = await tables.likes().insert({
      post_id: id,
      user_id: session.user?.id as any
    });

    if (error) Alert.alert("Error liking", error.message);
  };

  const dislikePost = async () => {
    setLikedByUser(false);
    setLikes(likes - 1);
    const { error } = await tables.likes()
      .delete()
      .match({
        post_id: id,
        user_id: session.user?.id as any
      })

    if (error) Alert.alert("Error disliking", error.message);
  };

  return (
    <Column style={tw`h-full`}>
      {/* post header */}
      <Column style={tw``}>
        {/* user */}
        <Row space="2" style={tw`bg-yellow-100 flex flex-row px-4 py-1.75 items-center`}>
          <Avatar
            style={tw`w-8 h-8`}
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

      {/* content */}
      <Box flexDir='row' justifyContent='center'>
        <PostBody post_type={post_type} text={text} />
      </Box>

      {/* post footer */}
      <Row space="3" style={tw`flex flex-row px-4 py-2 bg-yellow-200 items-center justify-between`}>
        <Row space='1.5' style={tw`items-center`}>
          <AntDesign size={24} name={likedByUser ? 'heart' : 'hearto'}
            color={likedByUser ? 'red' : 'black'}
            onPress={likedByUser ? dislikePost : likePost} />
          <Text style={tw`text-lg`}>{likes ?? 'ERROR'}</Text>
        </Row>

        <Text>{timeago.ago(createdAt)}</Text>
      </Row>

      {/* comments */}
      <Column style={tw``}>
        <Row style={tw`px-4 items-center`}>
          <Box style={{ ...tw`text-base grow` }} >
            <Input
              placeholder='Comment'
              placeholderTextColor={'#555'}
              style={{ color: 'black', ...tw`px-0 text-base` }}
              value={comment} onChangeText={setComment}
              variant='unstyled' />
          </Box>
          <Button bg='yellow.400' _pressed={{ bg: 'yellow.500' }}
            onPress={submitComment}>
            <Text>Submit</Text>
          </Button>
        </Row>


        {commentsByTime.map((comment, i) =>
          <Comment index={i} key={comment.id} {...comment} />
        )}
      </Column>


      <Box style={tw`h-8 bg-yellow-200`} />
    </Column >
  )
}