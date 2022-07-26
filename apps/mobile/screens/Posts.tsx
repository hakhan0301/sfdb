import { Box, Button, Center, Row, ScrollView, Text, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import Swiper from 'react-native-swiper';
import tw from 'twrnc';

import type { Post as PostType, _Post } from 'src/libs/types/posts';
import type { ScreenProps } from 'src/libs/types/screen';

import Post from 'src/libs/ui/Post';
import { tables } from 'src/libs/supabase';


function completeMinimalPost(post: PostType): _Post {
  return {
    ...post,
    createdAt: new Date(post.created_at),
    text: post.body,
    likes: 12,
    user: { name: 'OME', streaks: 12, strikes: 1, pfp: 'https://pbs.twimg.com/profile_images/1408387150119243778/j14N_zq__400x400.jpg', },
    comments: [
      { id: 0, createdAt: new Date(), text: 'this is ome susy', user: { name: 'memon', pfp: 'https://avatars.githubusercontent.com/u/21112116?s=120&v=4' } },
      { id: 2, createdAt: new Date(), text: 'ia m shan', user: { name: 'memon', pfp: 'https://avatars.githubusercontent.com/u/21112116?s=120&v=4' } },
      { id: 1, createdAt: new Date(), text: 'jasdfkljfsdjk', user: { name: 'memon', pfp: 'https://avatars.githubusercontent.com/u/21112116?s=120&v=4' } },
    ]
  };
}


export default function PostsPage({ navigation }: ScreenProps) {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const getPosts = async () => {
      const res = await tables.posts()
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      setPosts(res.data ?? []);
      setLoading(false);
    };

    getPosts();
  }, []);


  return (
    <>
      <Swiper
        showsPagination={false} loadMinimal={false}
        horizontal={false} loop={false} index={index} onIndexChanged={setIndex}>
        {posts.map((post, i) => (
          <ScrollView style={tw`bg-yellow-200`} borderTopWidth="1.5" borderColor="slate.800"
            key={post.id} nestedScrollEnabled={true} scrollEnabled={Math.abs(index - 1) <= 1}>
            <Post {...completeMinimalPost(post)} />
          </ScrollView>
        ))}
      </Swiper>
      <View style={tw`absolute w-full h-full`}>
        {loading && <Text>loading</Text>}
        <Button style={tw`absolute w-16 h-16 rounded-full right-8 bottom-6`}
          onPress={() => navigation.navigate('NewPost')}>
          <Text style={tw`text-3xl text-white`}>+</Text>
        </Button>
      </View>
    </>
  );
} 