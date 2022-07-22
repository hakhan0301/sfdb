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
    0: 'rounded-bl-lg',
    1: '',
    2: 'rounded-r-none rounded-br-lg'
  }


  const style = tw`rounded-none ${roundedStyle[index]} ${isActive ? 'bg-yellow-300' : 'bg-white/0'}`;
  return (
    <Button onPress={onPress}
      w='24' py="1.5"
      _pressed={{
        style: { ...style, ...tw`${isActive ? 'bg-yellow-400' : 'bg-black/10'}` },
      }}
      style={style}>
      <Text style={tw`${isActive ? 'text-black' : 'text-white'} font-bold`}>{text}</Text>
    </Button>
  );
}