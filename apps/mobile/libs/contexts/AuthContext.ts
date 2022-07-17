import { createContext } from "react";
import { Session } from '@supabase/supabase-js';

const userContext = createContext<Session | null>(null);

export default userContext;