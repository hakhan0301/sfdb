import { Button as _Button } from "native-base";
import tw from 'twrnc';
import { ButtonProps } from "../types";


export default function Button({ text, onPress = () => { } }: ButtonProps) {
  return (
    <_Button
      style={tw`border-2 border-yellow-300 bg-yellow-300/0 rounded-xl`}
      _pressed={{
        style: tw`bg-yellow-300 border-2 border-yellow-300 rounded-xl`,
        _text: tw`text-black`
      }}
      _text={tw`text-base font-semibold text-yellow-300`}
      onPress={onPress}
    >{text}</_Button>

  )
}


export function SolidButton({ text, onPress = () => { } }: ButtonProps) {
  return (
    <_Button
      style={tw`bg-yellow-300 border-2 border-yellow-300 rounded-xl`}
      _pressed={{
        style: tw`border-2 border-yellow-300 bg-yellow-300/0 rounded-xl`,
        _text: tw`text-yellow-300`
      }}
      _text={tw`text-base font-semibold text-black`}
      onPress={onPress}
    >{text}</_Button>

  )
}