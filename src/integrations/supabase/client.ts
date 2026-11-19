import { createClient } from '@supabase/supabase-js';
import { Capacitor } from '@capacitor/core';
import { authStorage } from './authStorage';

const isNative = Capacitor.isNativePlatform();

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    // Native-durable storage on the installed app, localStorage on web.
    storage: authStorage,
    persistSession: true,
    autoRefreshToken: true,
    // Native Google sign-in returns to the app via a plattermap:// deep link
    // carrying ?code=, which useAuth exchanges for a session (PKCE). The web
    // keeps the default implicit flow, handled by detectSessionInUrl.
    flowType: isNative ? 'pkce' : 'implicit',
    detectSessionInUrl: !isNative,
  }
});