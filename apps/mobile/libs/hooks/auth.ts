import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

export function useSession() {
  const session = useContext(AuthContext);
  return session;
}