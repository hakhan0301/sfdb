import { Box, Row, ScrollView, Text } from 'native-base';
import React, { useState } from 'react';
import Swiper from 'react-native-swiper';
import tw from 'twrnc';

import type { Post as PostType } from 'src/libs/types/posts';
import type { ScreenProps } from 'src/libs/types/screen';

import Post from 'src/libs/ui/Post';



export default function Home({ navigation }: ScreenProps) {
  const [index, setIndex] = useState(0);

  const [posts, setPosts] = useState<PostType[]>([
    {
      id: 0, title: 'is this SUSSY?', createdAt: new Date(), likes: 1, text: 'https://steamuserimages-a.akamaihd.net/ugc/1772707788143102214/2EB84E86640D917614EB57D517AFB3FB2F024A4C/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false',
      user: { name: 'OME', streaks: 12, strikes: 1, pfp: 'https://pbs.twimg.com/profile_images/1408387150119243778/j14N_zq__400x400.jpg', },
      comments: [
        { id: 0, createdAt: new Date(), text: 'this is ome susy', user: { name: 'memon', pfp: 'https://avatars.githubusercontent.com/u/21112116?s=120&v=4' } },
        { id: 2, createdAt: new Date(), text: 'ia m shan', user: { name: 'memon', pfp: 'https://avatars.githubusercontent.com/u/21112116?s=120&v=4' } },
        { id: 1, createdAt: new Date(), text: 'jasdfkljfsdjk', user: { name: 'memon', pfp: 'https://avatars.githubusercontent.com/u/21112116?s=120&v=4' } },
      ]
    },
    {
      id: 1, title: 'this is pretty SuSy', createdAt: new Date(), likes: 12, text: 'https://pbs.twimg.com/media/EzsXbgtXMAEmqIr.jpg',
      user: { name: 'OMEgaga', streaks: 1, strikes: 2, pfp: 'https://pbs.twimg.com/profile_images/1408387150119243778/j14N_zq__400x400.jpg', },
      comments: [
        { id: 0, createdAt: new Date(), text: 'this fdsaf', user: { name: 'memon2', pfp: 'https://avatars.githubusercontent.com/u/21112116?s=120&v=4' } },
        { id: 2, createdAt: new Date(), text: 'ia m f shan', user: { name: 'memon2', pfp: 'https://avatars.githubusercontent.com/u/21112116?s=120&v=4' } },
        { id: 1, createdAt: new Date(), text: 'wahooo', user: { name: 'memon2', pfp: 'https://avatars.githubusercontent.com/u/21112116?s=120&v=4' } },
      ]
    },
  ]);

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