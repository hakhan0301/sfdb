import { Button, Column, Image, Row, Text, View } from 'native-base';
import type { ScreenProps, ScreenPropsRouteless } from 'src/libs/types/screen';
import tw from 'twrnc';

import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { Camera, CameraProps, CameraType } from 'expo-camera';
import { useEffect, useState } from 'react';
import { BackHandler, Dimensions, Platform } from 'react-native';
import type { RouteProp } from '@react-navigation/native';

import * as colors from 'src/libs/ui/colors';

interface RatiodCameraProps extends CameraProps {
  _ref?: (r: Camera) => void
}

function RatiodCamera(props: RatiodCameraProps) {
  const [hasPermission, setHasPermission] = useState(false);
  const [camera, setCamera] = useState<Camera | null>(null);

  const [imagePadding, setImagePadding] = useState(0);
  const [ratio, setRatio] = useState('4:3');
  const { height, width } = Dimensions.get('window');
  const screenRatio = height / width;
  const [isRatioSet, setIsRatioSet] = useState(false);


  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getCameraPermissions();
  }, []);

  const prepareRatio = async () => {
    let desiredRatio: string = '4:3';
    if (Platform.OS === 'android') {
      const ratios = await camera!.getSupportedRatiosAsync();
      let distances: { [key: string]: number } = {};
      let realRatios: { [key: string]: number } = {};
      let minDistance = null;
      for (const ratio of ratios) {
        const parts = ratio.split(':');
        const realRatio = parseInt(parts[0]) / parseInt(parts[1]);
        realRatios[ratio] = realRatio;
        const distance = screenRatio - realRatio;
        distances[ratio] = realRatio;
        if (minDistance == null) {
          minDistance = ratio;
        } else {
          if (distance >= 0 && distance < distances[minDistance]) {
            minDistance = ratio;
          }
        }
      }
      desiredRatio = minDistance!;
      const remainder = Math.floor(
        (height - realRatios[desiredRatio] * width) / 2
      );
      setImagePadding(remainder);
      setRatio(desiredRatio);
      setIsRatioSet(true);
    }
  };

  const setCameraReady = async () => {
    if (!isRatioSet) {
      await prepareRatio();
    }
  };


  if (!hasPermission) {
    return <Text style={tw`text-black`}>grant me permissions</Text>;
  }

  return (

    <Camera {...props}
      style={{ flex: 1, marginTop: imagePadding, marginBottom: imagePadding }}
      onCameraReady={setCameraReady}
      ratio={ratio}
      ref={(ref) => {
        setCamera(ref);
        if (props._ref && ref) props._ref(ref);
      }} />
  );
}

export default function CameraScreen({ navigation }: ScreenProps) {
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [camera, setCamera] = useState<Camera | null>(null);

  const [pictureURI, setPictureURI] = useState<string | null>(null);

  const flipCamera = () => {
    setCameraType(
      cameraType === CameraType.back
        ? CameraType.front
        : CameraType.back
    )
  };

  const takePicture = async () => {
    if (!camera) return;
    const picture = await camera.takePictureAsync();
    setPictureURI(picture.uri);
  }

  const clearPicture = () => setPictureURI(null);

  const backAction = () => {
    if (pictureURI !== null) {
      clearPicture();
      return true;
    }
    return false;
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  const onSubmitPicture = () => {
    if (pictureURI === null) throw new Error('image submitted, but no image??');

    navigation.navigate('NewPost', {
      imageURI: pictureURI
    });
  }


  if (pictureURI !== null) {
    return (
      <View style={tw`w-full h-full bg-stone-800`}>
        <Image
          style={{
            ...tw`w-full h-full`,
            transform: [{ scaleX: cameraType === CameraType.back ? 1 : -1 }]
          }}
          source={{ uri: pictureURI }} alt='sussy iage' />
        <View style={tw`absolute w-full px-6 bottom-12`}>
          <Row style={tw`items-center justify-between w-full h-16 p-2 px-6 rounded-full bg-slate-800/0`}>
            <Button style={tw`w-10 h-10 p-0 bg-[${colors.deepRed400}] border border-white`}
              onPress={clearPicture}>
              <MaterialCommunityIcons name="trash-can-outline" size={24} color="white" />
            </Button>
            <Button style={tw`w-10 h-10 p-0 bg-[${colors.forestGreen300}] border border-white`}
              onPress={onSubmitPicture}>
              <MaterialCommunityIcons name="send" size={24} color="white" />
            </Button>
          </Row>
        </View>
      </View >
    );
  }

  return (
    <Column style={tw`h-full bg-black`}>

      <RatiodCamera
        type={cameraType}
        _ref={(ref) => { setCamera(ref); }}
      />

      {/* <Column space="2"
        style={tw`absolute p-2 rounded-full top-4 right-4 bg-slate-800/100`}>
        <Button style={tw`w-10 h-10 p-0 bg-white/0`} onPress={flipCamera}>s</Button>
        <Button style={tw`w-10 h-10 p-0 bg-white/0`} onPress={flipCamera}>s</Button>
      </Column> */}


      {/* center toolbar */}
      <View style={tw`absolute w-full px-6 bottom-12`}>
        <Row style={tw`items-center justify-between w-full h-16 p-2 px-6 rounded-full bg-slate-800/0`}>
          <Button style={tw`w-10 h-10 p-0 bg-white/0`} onPress={navigation.goBack}>
            <AntDesign name="back" size={24} color="white" />
          </Button>
          <Button style={tw`w-10 h-10 p-0 bg-white/0`} onPress={flipCamera}>
            <MaterialCommunityIcons name="camera-flip-outline" size={24} color="white" />
          </Button>
        </Row>
      </View>

      {/* center button */}
      <View style={tw`absolute self-center bottom-12`}>
        <Button
          style={tw`self-center w-16 h-16 border-4 border-white rounded-full bg-white/0`}
          onPress={takePicture}
        />
      </View>
    </Column>
  );
} 