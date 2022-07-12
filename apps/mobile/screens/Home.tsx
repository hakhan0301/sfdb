import { Box, Button, Text, Row } from 'native-base';
import { useEffect, useState } from 'react';
import tw from 'twrnc';

import type { ScreenProps } from './types';
import type { CreatePost, Post } from 'src/libs/types';

import supabase, { tables } from 'src/libs/supabase';

function makeid(length: number) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}

async function getPosts() {
  const { data, error } = await tables
    .posts()
    .select('*');

  if (error) {
    console.log(error);
    return undefined;
  }

  return data;
}

export default function Home({ navigation }: ScreenProps) {
  const [count, setCount] = useState(0);
  const [posts, setPosts] = useState<string[]>([]);

  const addPost = async (post: CreatePost) => {
    const { data, error } = await tables.posts().insert(post);
    if (error) {
      console.log(error);
      return;
    };

    // setPosts(prevPosts => [...prevPosts, data[0].text]);
  };

  const deletePosts = async () => {
    await tables
      .posts()
      .delete()
      .gte('id', 0);
  };
  const fetchPosts = () => getPosts().then(data => setPosts(data?.map(post => post.text) || []));

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Box style={tw`flex items-center justify-center w-full h-full bg-purple-500`} >
      <Row space='8' justifyContent="space-between" >
        <Button style={tw`px-3 py-2 bg-pink-500 rounded-xl`}
          _pressed={{ style: tw`px-3 py-2 bg-pink-600 rounded-xl` }}
          onPress={() => fetchPosts()}
        >
          <Text style={tw`text-blue-500`}>fetch</Text>
        </Button>
        <Button style={tw`px-3 py-2 bg-orange-500 rounded-xl`}
          _pressed={{ style: tw`px-3 py-2 bg-orange-600 rounded-xl` }}
          onPress={() => addPost({ text: makeid(12) })}
        >
          <Text style={tw`text-blue-500`}>add</Text>
        </Button>
        <Button style={tw`px-3 py-2 bg-orange-500 rounded-xl`}
          _pressed={{ style: tw`px-3 py-2 bg-orange-600 rounded-xl` }}
          onPress={() => deletePosts()}
        >
          <Text style={tw`text-blue-500`}>reset</Text>
        </Button>
      </Row>
      <Text style={tw`w-full p-4 text-white bg-gray-700`}>{JSON.stringify(posts, null, 2)}</Text>
    </Box >
  );
} 