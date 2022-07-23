import { Button, Column, Flex, Input, Row, Select, Text, TextArea, View } from "native-base";
import React, { useState } from "react";
import tw from 'twrnc';
import * as colors from "../colors";
import { Picker } from '@react-native-picker/picker';
import DocumentPicker from 'expo-document-picker';
import { Feather } from '@expo/vector-icons';
import { TextPostBody } from "src/libs/types/posts";


type SubmitButtonProps = {
  onPress?: () => void
}
function SubmitButton({ onPress }: SubmitButtonProps) {
  return (
    <View style={tw`flex items-end mt-3`}>
      <Button rounded="md" w="24" py="2"
        style={tw`bg-[${colors.deepRed300}]`} _pressed={{ style: tw`bg-[${colors.deepRed400}]` }}
        onPress={onPress}
      >
        <Text style={tw`font-bold text-black`}>Submit</Text>
      </Button>
    </View>
  );
}

export interface TextPostFormProps {
  onSubmit?: (body: TextPostBody) => Promise<boolean | undefined | void>;
}
export function TextPostForm({ onSubmit }: TextPostFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onHandleSubmit = async () => {
    let clearState: any = true;
    if (onSubmit) {
      clearState = await onSubmit({ title, content });
    }

    if (clearState) {
      setTitle('');
      setContent('');
    }
  }

  return (
    <Column space="4">
      <Text style={tw`text-2xl font-bold text-[${colors.forestGreen400}]`}>Text Post</Text>
      <Column space="2">
        <Input style={tw`px-3 py-2 text-base text-white bg-black`}
          placeholder='Title'
          placeholderTextColor='#BFD2CC'
          selectionColor={colors.deepRed200}
          variant='unstyled'
          value={title} onChangeText={setTitle} />
      </Column>
      <Column space="2">
        {/* <Text style={tw`text-2xl font-bold text-[${colors.forestGreen400}]`}>Content</Text> */}
        {/* @ts-ignore */}
        <TextArea style={tw`p-3 text-base text-white bg-black`}
          selectionColor={colors.deepRed200}
          placeholder='Content'
          placeholderTextColor='#BFD2CC'
          variant='unstyled'
          value={content} onChangeText={setContent} />
      </Column>
      <SubmitButton onPress={onHandleSubmit} />
    </Column>
  )
}

export interface LinkPostFormProps { }
export function LinkPostForm(props: LinkPostFormProps) {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');

  return (
    <Column space="4">
      <Column space="2">
        <Text style={tw`text-2xl font-bold text-[${colors.forestGreen400}]`}>Title</Text>
        <Input style={tw`px-3 py-2 text-base text-white bg-black`}
          placeholder='Title'
          placeholderTextColor='#BFD2CC'
          selectionColor={colors.deepRed200}
          variant='unstyled'
          value={title} onChangeText={setTitle} />
      </Column>
      <Column space="2">
        <Text style={tw`text-2xl font-bold text-[${colors.forestGreen400}]`}>Link</Text>
        <Input style={tw`px-3 py-2 text-base text-white bg-black`}
          placeholder='Link'
          placeholderTextColor='#BFD2CC'
          selectionColor={colors.deepRed200}
          variant='unstyled'
          value={link} onChangeText={setLink} />
      </Column>
      <SubmitButton />
    </Column>
  )
}

type FileType = 'Image' | 'Video' | 'File';

export interface MediaPostFormProps { }
export function MediaPostForm(props: MediaPostFormProps) {
  const [fileType, setTileType] = useState<FileType>("Image");
  const [title, setTitle] = useState('');

  return (
    <Column space="4" style={tw`pb-12`}>
      <Column space="2">
        <Text style={tw`text-2xl font-bold text-[${colors.forestGreen400}]`}>Title</Text>
        <Input style={tw`px-3 py-2 text-base text-white bg-black`}
          placeholder='Insert Title'
          placeholderTextColor='#BFD2CC'
          selectionColor={colors.deepRed200}
          variant='unstyled'
          value={title} onChangeText={setTitle} />

      </Column>
      <Column space="2">
        <Text style={tw`text-2xl font-bold text-[${colors.forestGreen400}]`}>File Type</Text>
        <Picker placeholder="Choose File Type"

          style={tw`text-base text-white bg-black`}
          selectedValue={fileType}
          onValueChange={itemValue => setTileType(itemValue as FileType)}
          itemStyle={tw`px-4 text-white bg-black`}>
          <Picker.Item style={tw``} label="Image" value="Image" />
          <Picker.Item style={tw``} label="Video" value="Video" />
          <Picker.Item style={tw``} label="File" value="File" />
        </Picker>
      </Column>
      <Column space="2">
        <Text style={tw`text-2xl font-bold text-[${colors.forestGreen400}]`}>Upload</Text>
        <Button w="full" rounded="md"
          style={tw`bg-[${colors.deepRed50}]`} _pressed={{ style: tw`bg-[${colors.deepRed100}]` }}
        >
          <Row space="2" style={tw`items-center`}>
            <Feather name="upload-cloud" size={24} color="black" />
            <Text style={tw`font-bold text-black`}>Select File</Text>
          </Row>
        </Button>
      </Column>

      <SubmitButton />
    </Column>
  )
}