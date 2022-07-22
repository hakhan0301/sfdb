import { Column, Input, Text, TextArea, View } from "native-base";
import tw from 'twrnc';
import { blue400, deepOrange100, deepOrange200, deepOrange400, deepOrange800 } from "../colors";

export interface NewTextFormProps {

}
export function NewTextForm(props: NewTextFormProps) {
  return (
    <Column space="4">
      <Column space="2">
        <Text style={tw`text-2xl font-bold text-yellow-400`}>Title</Text>
        <Input style={tw`h-12 text-base font-medium bg-blue-50`}
          selectionColor={blue400}
          variant='unstyled' />
      </Column>
      <Column space="2">
        <Text style={tw`text-2xl font-bold text-yellow-400`}>Content</Text>
        {/* @ts-ignore */}
        <TextArea style={tw`text-base font-medium bg-blue-50`}
          selectionColor={blue400}
          variant='unstyled' />
      </Column>
    </Column>
  )
}