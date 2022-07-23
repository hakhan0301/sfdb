import { Box, Row, ScrollView, Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import Swiper from 'react-native-swiper';
import tw from 'twrnc';

import type { _Post as PostType } from 'src/libs/types/posts';
import type { ScreenProps } from 'src/libs/types/screen';

import Post from 'src/libs/ui/Post';
import { tables } from 'src/libs/supabase';



export default function Home({ navigation }: ScreenProps) {
  const [index, setIndex] = useState(0);



  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      // tables._posts.
    };

  }, []);
  return (
    <>
      <Swiper
        showsPagination={false} loadMinimal={true}
        horizontal={false} loop={false} index={index} onIndexChanged={setIndex}>
        {posts.map((post, i) => (
          <ScrollView key={post.id} nestedScrollEnabled={true} scrollEnabled={Math.abs(index - 1) <= 1}>
            <Post {...post} />
          </ScrollView>
        ))}
      </Swiper>
    </>
  );
} 