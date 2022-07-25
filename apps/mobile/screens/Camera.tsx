import { Button, Column, Image, Row, Text, View } from 'native-base';
import type { ScreenProps } from 'src/libs/types/screen';
import tw from 'twrnc';

import { Camera, CameraProps, CameraType, } from 'expo-camera';
import { useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';

interface RatiodCameraProps extends CameraProps {
  _ref?: (r: Camera) => void
}

function RatiodCamera(props: RatiodCameraProps) {
  const { width } = useWindowDimensions();
  const height = Math.round((width * 16) / 9);

  return (
    <Camera style={{ height }} ratio="16:9" {...props} ref={props._ref} />
  );
}


export default function CameraScreen({ navigation }: ScreenProps) {
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [hasPermission, setHasPermission] = useState(false);
  const [camera, setCamera] = useState<Camera | null>(null);

  const [pictureURI, setPictureURI] = useState<string | null>(null);


  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const flipCamera = () => {
    setCameraType(
      cameraType === CameraType.back
        ?
        CameraType.front
        : CameraType.back
    )
  };

  const takePicture = async () => {
    if (!camera) return;
    const picture = await camera.takePictureAsync();
    setPictureURI(picture.uri);
  }


  if (!hasPermission) {
    return <Text style={tw`text-black`}>grant me permissions</Text>;
  }

  if (pictureURI !== null) {
    return (
      <View style={tw`w-full h-full bg-stone-800`}>
        <Image
          style={tw`w-full h-full`}
          source={{ uri: pictureURI }} alt='sussy iage' />
        <View style={tw`absolute w-full px-6 bottom-12`}>
          <Row style={tw`items-center justify-end w-full h-16 p-2 px-6 rounded-full bg-slate-800/0`}>
            <Button style={tw`w-10 h-10 p-0 bg-white/0`} onPress={() => setPictureURI(null)}>X</Button>
          </Row>
        </View>
      </View>
    );
  }

  return (
    <Column style={tw`h-full bg-rose-900`}>

      <RatiodCamera
        type={cameraType}
        _ref={(ref) => { setCamera(ref); }}
      />

      <Column space="2"
        style={tw`absolute p-2 rounded-full top-4 right-4 bg-slate-800/100`}>
        <Button style={tw`w-10 h-10 p-0 bg-white/0`} onPress={flipCamera}>s</Button>
        <Button style={tw`w-10 h-10 p-0 bg-white/0`} onPress={flipCamera}>s</Button>
      </Column>
      <View style={tw`absolute w-full px-6 bottom-12`}>
        <Row style={tw`items-center justify-end w-full h-16 p-2 px-6 rounded-full bg-slate-800/0`}>
          {/* <Button style={tw`w-10 h-10 p-0 bg-white/0`} onPress={flipCamera}>s</Button> */}
        </Row>
      </View>
      <View style={tw`absolute self-center bottom-12`}>
        <Button style={tw`self-center w-16 h-16 border-4 border-white rounded-full bg-white/0`}
          onPress={takePicture}
        />
      </View>
    </Column>
  );
} 