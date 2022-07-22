import { BlurView } from 'expo-blur';
import { Button, Text } from 'native-base';
import React from 'react';
import tw from 'twrnc';

import { ButtonProps } from "../types";
import * as colors from 'src/libs/ui/colors';

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

  const bgColor = isActive ? `bg-[${colors.deepRed300}]` : `bg-[${colors.forestGreen400}]`;
  const pressedBgColor = isActive ? `bg-[${colors.deepRed400}]` : `bg-[${colors.forestGreen500}]`;


  const style = tw`rounded-none ${roundedStyle[index]} ${bgColor}`;
  return (
    <Button onPress={onPress}
      w='24' py="1.5"
      _pressed={{
        style: { ...style, ...tw`${pressedBgColor}` },
      }}
      style={style}>
      <Text style={tw`${isActive ? 'text-black' : 'text-black'} font-bold`}>{text}</Text>
    </Button>
  );
}