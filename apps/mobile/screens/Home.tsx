import { Box, Button, Text } from 'native-base';
import { useEffect, useState } from 'react';
import tw from 'twrnc';

import type { ScreenProps } from './types';
import type { Post } from 'src/libs/types';

import { tables } from 'src/libs/supabase';



export default function Home({ navigation }: ScreenProps) {
  const [count, setCount] = useState(0);
  const [posts, setPosts] = useState<string[]>([]);

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await tables
        .posts
        .select('text');

      if (error) {
        console.log(error);
      } else {
        setPosts(data!.map(post => post.text));
      }
    };

    getData();

  }, []);

  return (
    <Box style={tw`flex items-center justify-center w-full h-full bg-purple-500`} >
      <Text >
        {count}
      </Text>
      <Button style={tw`px-3 py-2 bg-orange-500 rounded-xl`}
        _pressed={{ style: tw`px-3 py-2 bg-orange-600 rounded-xl` }}
        onPress={() => setCount(prevCount => prevCount + 1)}
      >
        <Text style={tw`text-blue-500`}>Sussy button</Text>
      </Button>
      <Text style={tw`w-full p-4 text-white bg-gray-700`}>{JSON.stringify(posts, null, 2)}</Text>
    </Box >
  );
} 