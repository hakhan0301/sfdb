import { createContext } from "react";
import { Session } from '@supabase/supabase-js';

const AuthContext = createContext<Session | null>(null);

export default AuthContext;