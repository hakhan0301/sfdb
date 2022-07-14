import { Box, Button, ScrollView, Text, View } from 'native-base';
import { useState } from 'react';
import tw from 'twrnc';
import { useRef } from 'react';

import type { Post as PostType } from 'src/libs/types/posts';
import type { ScreenProps } from 'src/libs/types/screen';

import Post from 'src/libs/ui/Post';
import GestureRecognizer from 'react-native-swipe-gestures';

export default function Home({ navigation }: ScreenProps) {
  const scrollRef = useRef();

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
      id: 0, title: 'this is pretty SuSy', createdAt: new Date(), likes: 12, text: 'https://pbs.twimg.com/media/EzsXbgtXMAEmqIr.jpg',
      user: { name: 'OMEgaga', streaks: 1, strikes: 2, pfp: 'https://pbs.twimg.com/profile_images/1408387150119243778/j14N_zq__400x400.jpg', },
      comments: [
        { id: 0, createdAt: new Date(), text: 'this fdsaf', user: { name: 'memon2', pfp: 'https://avatars.githubusercontent.com/u/21112116?s=120&v=4' } },
        { id: 2, createdAt: new Date(), text: 'ia m f shan', user: { name: 'memon2', pfp: 'https://avatars.githubusercontent.com/u/21112116?s=120&v=4' } },
        { id: 1, createdAt: new Date(), text: 'wahooo', user: { name: 'memon2', pfp: 'https://avatars.githubusercontent.com/u/21112116?s=120&v=4' } },
      ]
    },
  ]);

  const onPrevPost = () => {
    setIndex(prevIndex => {
      const newIndex = Math.min(posts.length - 1, prevIndex + 1);
      if (newIndex != prevIndex) {
        //@ts-ignore
        // scrollRef.current?.scrollTo({
        //   y: 0, animated: false
        // })
      }

      return newIndex;
    });
    //@ts-ignore
    scrollRef.current?.scrollTo({
      y: 0, animated: false
    })
  }

  const onNextPost = () => {
    setIndex(prevIndex => {
      const newIndex = Math.max(0, prevIndex - 1);
      if (newIndex != prevIndex) {
        //@ts-ignore
        // scrollRef.current?.scrollTo({
        //   y: 0, animated: false
        // })
      }

      return newIndex;
    });
  }

  return (
    <ScrollView ref={scrollRef}>
      <Box style={tw`flex flex-row items-center justify-between px-4 py-2 bg-slate-700`} >
        <Text style={tw`text-xl text-white`}>Sussy Baka</Text>
        <Text style={tw`text-2xl text-white`}>≡</Text>
      </Box>
      <GestureRecognizer
        onSwipeUp={() => onPrevPost()}
        onSwipeDown={() => onNextPost()}
        config={{
          velocityThreshold: 0.3,
          directionalOffsetThreshold: 80
        }}
      >
        <Post {...posts[index]} />
      </GestureRecognizer>

      <Box style={tw`h-2 bg-slate-700`} />

    </ScrollView>
  );
} 