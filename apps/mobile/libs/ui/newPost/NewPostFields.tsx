import { Entypo, Feather } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { getDocumentAsync } from 'expo-document-picker';
import { Button, Column, Input, Row, Text, TextArea, View } from "native-base";
import React, { useState } from "react";
import { Alert } from "react-native";
import { LinkBody, TextBody } from "src/libs/types/posts";
import tw from 'twrnc';
import * as colors from "../colors";


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
  onSubmit?: (body: TextBody) => Promise<boolean | undefined | void>;
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

export interface LinkPostFormProps {
  onSubmit?: (body: LinkBody) => Promise<boolean | undefined | void>;
}
export function LinkPostForm({ onSubmit }: LinkPostFormProps) {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');

  const onHandleSubmit = async () => {
    let clearState: any = true;
    if (onSubmit) {
      clearState = await onSubmit({ title, link });
    }

    if (clearState) {
      setTitle('');
      setLink('');
    }
  }


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
      <SubmitButton onPress={onHandleSubmit} />
    </Column>
  )
}

type FileType = 'Image' | 'Video' | 'File';

const fileMimes: { [K in FileType]: string } = {
  Image: 'image/*',
  Video: 'video/*',
  File: '*/*'
}

export interface MediaPostFormProps { }
export function MediaPostForm(props: MediaPostFormProps) {
  const [fileType, setTileType] = useState<FileType>("Image");
  const [title, setTitle] = useState('');

  const [localFileURI, setLocalFileURI] = useState<null | string>(null);
  const [localFileName, setLocalFileName] = useState<null | string>(null);

  const onPressFileUpload = async () => {

    const fileData = await getDocumentAsync({
      multiple: false,
      type: fileMimes[fileType]
    });

    if (fileData.type === 'cancel') {
      return;
    }

    const { name, uri, size } = fileData;
    if (size! > 80000000) {
      Alert.alert('File too large', 'Your limit is ~80MBs.');
    }

    setLocalFileURI(uri);
    setLocalFileName(name);
  }

  const onClearFiles = () => {
    setLocalFileURI(null);
    setLocalFileName(null);
  }

  return (
    <Column space="4" style={tw`pb-12`}>
      <Text style={tw`text-2xl font-bold text-[${colors.forestGreen400}]`}>File Post</Text>
      <Input style={tw`px-3 py-2 text-base text-white bg-black`}
        placeholder='Title'
        placeholderTextColor='#BFD2CC'
        selectionColor={colors.deepRed200}
        variant='unstyled'
        value={title} onChangeText={setTitle} />
      <Picker placeholder="Choose File Type"
        style={tw`text-base text-white bg-black`}
        selectedValue={fileType}
        onValueChange={itemValue => setTileType(itemValue as FileType)}
        itemStyle={tw`px-4 text-white bg-black`}>
        <Picker.Item style={tw``} label="Image" value="Image" />
        <Picker.Item style={tw``} label="Video" value="Video" />
        <Picker.Item style={tw``} label="File" value="File" />
      </Picker>
      {localFileURI === null && (
        <Button w="full" rounded="md"
          style={tw`bg-[${colors.deepRed50}]`} _pressed={{ style: tw`bg-[${colors.deepRed100}]` }}
          onPress={onPressFileUpload} >
          <Row space="2" style={tw`items-center`}>
            <Feather name="upload-cloud" size={21} color="black" />
            <Text style={tw`font-bold text-black`}>Upload {fileType}</Text>
          </Row>
        </Button>
      )}

      {localFileURI !== null && (
        <Row style={tw`bg-black text-base px-3 py-2 rounded flex-1 items-center`}>
          <Text style={tw`flex-1 text-white text-base`} isTruncated>{localFileName}</Text>
          <Button style={tw`bg-black p-0.5`} onPress={onClearFiles}>
            <Entypo name="cross" size={16} color={colors.deepRed400} />
          </Button>
        </Row>
      )}

      <SubmitButton />
    </Column >
  )
}