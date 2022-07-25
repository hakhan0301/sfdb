import { Entypo, Feather } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { getDocumentAsync } from 'expo-document-picker';
import { Button, Column, Input, Row, Text, TextArea, View } from "native-base";
import React, { useState } from "react";
import { Alert } from "react-native";
import { FileBody, fileMimes, FileType, LinkBody, TextBody } from "src/libs/types/posts";
import tw from 'twrnc';
import * as colors from "../colors";


type SubmitButtonProps = {
  onPress?: () => void,
  disabled?: boolean
}
function SubmitButton({ onPress, disabled }: SubmitButtonProps) {
  return (
    <View style={tw`flex items-end mt-3`}>
      <Button rounded="md" w="24" py="2"
        style={tw`bg-[${colors.deepRed300}]`} _pressed={{ style: tw`bg-[${colors.deepRed400}]` }}
        onPress={onPress} disabled={disabled}
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
      <Text style={tw`text-2xl font-bold text-[${colors.forestGreen400}]`}>Post Text</Text>
      <Input style={tw`px-3 py-2 text-base text-white bg-black`}
        placeholder='Title'
        placeholderTextColor='#BFD2CC'
        selectionColor={colors.deepRed200}
        variant='unstyled'
        value={title} onChangeText={setTitle} />
      {/* @ts-ignore */}
      <TextArea style={tw`p-3 text-base text-white bg-black`}
        selectionColor={colors.deepRed200}
        placeholder='Content'
        placeholderTextColor='#BFD2CC'
        variant='unstyled'
        value={content} onChangeText={setContent} />
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
      <Text style={tw`text-2xl font-bold text-[${colors.forestGreen400}]`}>Post Link</Text>
      <Input style={tw`px-3 py-2 text-base text-white bg-black`}
        placeholder='Title'
        placeholderTextColor='#BFD2CC'
        selectionColor={colors.deepRed200}
        variant='unstyled'
        value={title} onChangeText={setTitle} />
      <Input style={tw`px-3 py-2 text-base text-white bg-black`}
        placeholder='Link'
        placeholderTextColor='#BFD2CC'
        selectionColor={colors.deepRed200}
        variant='unstyled'
        value={link} onChangeText={setLink} />
      <SubmitButton onPress={onHandleSubmit} />
    </Column>
  )
}

export interface MediaPostFormProps {
  onSubmit?: (body: FileBody) => Promise<boolean | undefined | void>;
  initialFile?: string;
}
export function MediaPostForm({ onSubmit, initialFile }: MediaPostFormProps) {
  const [loading, setLoading] = useState(false);

  const [localFileURI, setLocalFileURI] = useState<null | string>(initialFile ?? null);
  const [localFileName, setLocalFileName] = useState<null | string>(initialFile ?? null);
  const [fileType, setTileType] = useState<FileType>("Image");
  const [title, setTitle] = useState('');


  const onPressFileUpload = async () => {
    const fileData = await getDocumentAsync({
      multiple: false,
      type: fileMimes[fileType],
      copyToCacheDirectory: true
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

  const clearFile = () => {
    setLocalFileURI(null);
    setLocalFileName(null);
  }

  const onHandleSubmit = async () => {
    if (!localFileURI) return;
    if (!title) return;

    setLoading(true);

    let clearState: any = true;
    if (onSubmit) {
      clearState = await onSubmit({
        title,
        url: localFileURI,
        fileType
      });
    }


    if (clearState) {
      clearFile();
      setTitle('');
    }

    setLoading(false);
  }


  return (
    <Column space="4" style={tw`pb-12`}>
      <Text style={tw`text-2xl font-bold text-[${colors.forestGreen400}]`}>Upload File</Text>
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
          <Button style={tw`bg-black p-0.5`} onPress={clearFile}>
            <Entypo name="cross" size={16} color={colors.deepRed400} />
          </Button>
        </Row>
      )}

      <SubmitButton onPress={onHandleSubmit} disabled={loading} />
    </Column >
  )
}