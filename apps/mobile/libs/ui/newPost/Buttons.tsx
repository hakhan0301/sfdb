import { BlurView } from 'expo-blur';
import { Button, Text } from 'native-base';
import React from 'react';
import tw from 'twrnc';

import { ButtonProps } from "../types";

export interface ButtonOf3Props extends ButtonProps {
  index: 0 | 1 | 2;
  isActive: boolean;
}

export function ButtonOf3({ text, onPress, index, isActive }: ButtonOf3Props) {
  let roundedStyle = {
    0: 'rounded-l-lg rounded-r-none',
    1: 'rounded-none',
    2: 'rounded-r-lg rounded-l-none'
  }

  const style = tw`
  ${isActive ? 'bg-yellow-300' : 'bg-white/0'} ${roundedStyle[index]} 
  `

  return (
    <BlurView style={tw`${roundedStyle[index]}`} intensity={5} tint="dark">
      <Button onPress={onPress}
        w='24' py="1.5"
        _pressed={{
          style: { ...style, ...tw`${isActive ? 'bg-yellow-400' : 'bg-black/10'}` },
        }}
        style={style}>
        <Text style={tw`${isActive ? 'text-black' : 'text-white'} font-bold`}>{text}</Text>
      </Button>
    </BlurView>
  )
}