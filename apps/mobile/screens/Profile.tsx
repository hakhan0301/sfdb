import { Column, Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import tw from 'twrnc';

import type { ScreenProps } from 'src/libs/types/screen';
import { useSession } from 'src/libs/hooks/auth';

async function getUser(userId: string) {

}


export default function Home({ navigation }: ScreenProps) {
  const session = useSession();
  const [user, setUser] = useState<any>(null);

  const userId = session?.user?.id;

  useEffect(() => {
    if (!userId) return;

    getUser(userId);
  }, [userId]);

  return (
    <Column space='2' style={tw`h-full bg-rose-900`}>
      <Text style={tw`p-4 text-sm font-bold bg-white`}>
        {JSON.stringify(user, null, 2)}
      </Text>
      <Text style={tw`p-4 text-sm font-bold bg-white`}>
        {JSON.stringify(session, null, 2)}
      </Text>

    </Column >
  );
} 