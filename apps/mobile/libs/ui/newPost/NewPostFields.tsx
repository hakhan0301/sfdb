import { Button, Column, Flex, Input, Row, Select, Text, TextArea, View } from "native-base";
import React, { useState } from "react";
import tw from 'twrnc';
import * as colors from "../colors";
import { Picker } from '@react-native-picker/picker';
import DocumentPicker from 'expo-document-picker';
import { Feather } from '@expo/vector-icons';

function SubmitButton() {
  return (
    <View style={tw`flex items-end mt-3`}>
      <Button rounded="md" w="24" py="2"
        style={tw`bg-[${colors.deepRed300}]`} _pressed={{ style: tw`bg-[${colors.deepRed400}]` }}
      >
        <Text style={tw`font-bold text-black`}>Submit</Text>
      </Button>
    </View>
  );
}

export interface TextPostFormProps { }
export function TextPostForm(props: TextPostFormProps) {
  return (
    <Column space="4">
      <Column space="2">
        <Text style={tw`text-2xl font-bold text-[${colors.forestGreen400}]`}>Title</Text>
        <Input style={tw`px-3 py-2 text-base font-medium text-white bg-black`}
          placeholder='Title'
          placeholderTextColor='white'
          selectionColor={colors.deepRed200}
          variant='unstyled' />
      </Column>
      <Column space="2">
        <Text style={tw`text-2xl font-bold text-[${colors.forestGreen400}]`}>Content</Text>
        {/* @ts-ignore */}
        <TextArea style={tw`p-3 text-base font-medium text-white bg-black`}
          selectionColor={colors.deepRed200}
          placeholder='Content'
          placeholderTextColor='white'
          variant='unstyled' />
      </Column>
      <SubmitButton />
    </Column>
  )
}

export interface LinkPostFormProps { }
export function LinkPostForm(props: LinkPostFormProps) {
  return (
    <Column space="4">
      <Column space="2">
        <Text style={tw`text-2xl font-bold text-[${colors.forestGreen400}]`}>Title</Text>
        <Input style={tw`px-3 py-2 text-base font-medium text-white bg-black`}
          placeholder='Title'
          placeholderTextColor='white'
          selectionColor={colors.deepRed200}
          variant='unstyled' />

      </Column>
      <Column space="2">
        <Text style={tw`text-2xl font-bold text-[${colors.forestGreen400}]`}>Link</Text>
        <Input style={tw`px-3 py-2 text-base font-medium text-white bg-black`}
          placeholder='Link'
          placeholderTextColor='white'
          selectionColor={colors.deepRed200}
          variant='unstyled' />

      </Column>

      <SubmitButton />
    </Column>
  )
}

type FileType = 'Image' | 'Video' | 'File';

export interface MediaPostFormProps { }
export function MediaPostForm(props: MediaPostFormProps) {
  const [fileType, setTileType] = useState<FileType>("Image");

  return (
    <Column space="4" style={tw`pb-12`}>
      <Column space="2">
        <Text style={tw`text-2xl font-bold text-[${colors.forestGreen400}]`}>Title</Text>
        <Input style={tw`px-3 py-2 text-base font-medium text-white bg-black`}
          placeholder='Insert Title'
          placeholderTextColor='white'
          selectionColor={colors.deepRed200}
          variant='unstyled' />
      </Column>
      <Column space="2">
        <Text style={tw`text-2xl font-bold text-[${colors.forestGreen400}]`}>File Type</Text>
        <Picker placeholder="Choose File Type"

          style={tw`text-base font-medium text-white bg-black`}
          selectedValue={fileType}
          onValueChange={itemValue => setTileType(itemValue as FileType)}
          itemStyle={tw`px-4 font-medium text-white bg-black`}>
          <Picker.Item style={tw`font-medium`} label="Image" value="Image" />
          <Picker.Item style={tw`font-medium`} label="Video" value="Video" />
          <Picker.Item style={tw`font-medium`} label="File" value="File" />
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