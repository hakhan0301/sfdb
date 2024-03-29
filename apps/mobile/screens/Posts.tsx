import { Box, Button, Center, Row, ScrollView, Text, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import Swiper from 'react-native-swiper';
import tw from 'twrnc';

import type { Post as PostType, _Post } from 'src/libs/types/posts';
import type { ScreenProps } from 'src/libs/types/screen';

import Post from 'src/libs/ui/Post';
import supabase from 'src/libs/supabase';
import { useSession } from 'src/libs/hooks/auth';
import { KeyboardAvoidingView } from 'native-base';

function completeMinimalPost(post: PostType): _Post {
  return {
    ...post,
    user: {
      pfp: post.user.pfp, name: post.user.username,
      streaks: 12, strikes: 1,
    },
    createdAt: new Date(post.created_at),
    text: post.body,
    likes: post.likes && post.likes.length,
    likedByUser: post.likedByUser && post.likedByUser.length === 1,
    comments: post.comments.map(comment => ({
      id: comment.id,
      createdAt: new Date(comment.created_at),
      text: comment.body,
      user: {
        name: comment.user.username,
        pfp: comment.user.pfp
      }
    }))
  };
}


export default function PostsPage({ navigation }: ScreenProps) {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);

  const session = useSession();

  useEffect(() => {
    const getPosts = async () => {
      const res = await supabase
        .from<PostType>('Posts')
        .select(`
          *,
          user:Users(*), 
          comments:Comments(
            id,
            created_at,
            user:Users(username, pfp),
            body
          ),
          likes:Likes(user_id),
          likedByUser:Likes(user_id)&likedByUser.user_id=eq.${session.user?.id},
        `)
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
            nestedScrollEnabled={true} scrollEnabled={Math.abs(index - 1) <= 1} key={post.id} >
            <Post {...completeMinimalPost(post)} />
          </ScrollView>
        ))}
      </Swiper>
      <View style={tw`absolute w-full h-full`}>
        {loading && <Text>loading</Text>}
        <Button style={tw`absolute w-16 h-16 bg-yellow-500 rounded-full right-6 bottom-6`}
          onPress={() => navigation.navigate('NewPost')}>
          <Text style={tw`text-3xl text-black`}>+</Text>
        </Button>
      </View>
    </>
  );
} 