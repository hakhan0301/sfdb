import { Box, Button, Text } from 'native-base';
import { useState } from 'react';
import tw from 'twrnc';

import type { ScreenProps } from './types';

export default function Home({ navigation }: ScreenProps) {
  const [count, setCount] = useState(0);

  return (
    <Box style={tw`flex items-center justify-center w-full h-full bg-purple-500`} >
      <Text >
        {count}
      </Text>
      <Button style={tw`px-3 py-2 bg-orange-500 rounded-xl`}
        _pressed={{ style: tw`px-3 py-2 bg-orange-600 rounded-xl` }}
        onPress={() => setCount(prevCount => prevCount + 1)}
      >
        <Text style={tw`text-blue-500`}>Sussy button</Text>
      </Button>
    </Box >
  );
} 