import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

export function useSession() {
  const session = useContext(AuthContext);

  if (!session) throw new Error('No session available.');

  return session;
}