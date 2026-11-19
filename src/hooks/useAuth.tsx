import { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Capacitor } from "@capacitor/core";
import { Browser } from "@capacitor/browser";
import { App as CapApp } from "@capacitor/app";

// On the installed app, Google OAuth can't complete inside the app's own window
// (Google blocks embedded sign-in), so it opens the system browser and must be
// sent back in via this deep link. The scheme is registered in AndroidManifest,
// and this URL must be added to Supabase → Auth → URL Configuration → Redirect URLs.
const NATIVE_AUTH_REDIRECT = "plattermap://auth/callback";
const isNative = Capacitor.isNativePlatform();

interface AuthContextType {
  user: User | null;
  session: Session | null;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signInWithGoogle: () => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // On the installed app, finish OAuth when the browser redirects back via the
    // deep link: pull the ?code= out of the URL and exchange it for a session
    // inside the app (the code verifier is in app storage from signInWithGoogle).
    let removeUrlListener: (() => void) | undefined;
    if (isNative) {
      CapApp.addListener("appUrlOpen", async ({ url }) => {
        if (!url.startsWith(NATIVE_AUTH_REDIRECT.split("://")[0] + "://")) return;
        try {
          const parsed = new URL(url);
          const code = parsed.searchParams.get("code");
          const hash = new URLSearchParams(parsed.hash.replace(/^#/, ""));
          const access_token = hash.get("access_token");
          const refresh_token = hash.get("refresh_token");
          if (code) {
            const { error } = await supabase.auth.exchangeCodeForSession(code);
            if (error) throw error;
          } else if (access_token && refresh_token) {
            // Fallback if the server returned tokens directly (implicit flow).
            const { error } = await supabase.auth.setSession({ access_token, refresh_token });
            if (error) throw error;
          }
        } catch (err) {
          console.error("OAuth deep-link exchange failed:", err);
        } finally {
          await Browser.close().catch(() => {});
          navigate("/");
        }
      }).then((handle) => {
        removeUrlListener = () => handle.remove();
      });
    }

    return () => {
      subscription.unsubscribe();
      removeUrlListener?.();
    };
  }, []);

  const signUp = async (email: string, password: string, fullName?: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName,
        },
      },
    });
    
    if (!error) {
      navigate("/");
    }
    
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (!error) {
      navigate("/");
    }
    
    return { error };
  };

  const signInWithGoogle = async () => {
    // Native: get the OAuth URL, open it in the system browser, and let the
    // appUrlOpen listener above finish sign-in when it redirects back to the app.
    if (isNative) {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: NATIVE_AUTH_REDIRECT,
          skipBrowserRedirect: true,
        },
      });
      if (error) return { error };
      if (data?.url) {
        await Browser.open({ url: data.url });
      }
      return { error: null };
    }

    // Web: redirect in place back to the site origin.
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });

    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, session, signUp, signIn, signInWithGoogle, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
