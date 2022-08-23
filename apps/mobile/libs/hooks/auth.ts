import { useContext, useEffect, useState } from 'react';
import AuthContext from '../contexts/AuthContext';
import { tables } from '../supabase';
import { User } from '../types/posts';

export function useSession() {
  const session = useContext(AuthContext);

  if (!session) throw new Error('No session available.');

  return session;
}

const users: { [userId: string]: User } = {};

async function getUser(userId: string) {
  const user = await tables.users()
    .select('*')
    .eq('id', userId)
    .limit(1);

  if (user.data?.length !== 1) {
    throw new Error('Internal Server error with profile');
  }

  return user.data![0];
}


export function useProfile(userId: string) {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const doUser = async () => {
      if (userId) {
        await getUser(userId).then(setUser);
      }
      setLoading(false);
    };

    doUser();
  }, [userId]);


  return { user, setUser, loading };
}