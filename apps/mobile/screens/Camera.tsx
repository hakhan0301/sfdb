import { Column, Text } from 'native-base';
import type { ScreenProps } from 'src/libs/types/screen';
import tw from 'twrnc';

// import { Camera, useCameraDevices } from 'react-native-vision-camera';


export default function CameraScreen({ navigation }: ScreenProps) {
  // const devices = useCameraDevices('wide-angle-camera');
  // const device = devices.back;

  // if (device == null) return <Text>Loading</Text>;

  return (
    <Column style={tw`h-full bg-rose-900`}>
      <Text>{JSON.stringify('fdsafss')}</Text>
      {/* <Camera
        device={device}
        isActive={true}
      /> */}
    </Column>
  );
} 