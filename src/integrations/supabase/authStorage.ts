import { Capacitor } from "@capacitor/core";
import { Preferences } from "@capacitor/preferences";

// Where the Supabase auth session is stored.
//
// Installed app: Capacitor Preferences (Android SharedPreferences / iOS
// UserDefaults) — native device storage the OS keeps across restarts, unlike the
// WebView's localStorage which can be wiped when the app's process is killed.
// supabase-js awaits async storage while it initializes, so the saved session is
// restored on a cold start.
//
// Web: localStorage, which desktop browsers persist reliably.
const nativeStorage = {
  getItem: (key: string) => Preferences.get({ key }).then(({ value }) => value),
  setItem: (key: string, value: string) =>
    Preferences.set({ key, value }).then(() => undefined),
  removeItem: (key: string) => Preferences.remove({ key }).then(() => undefined),
};

export const authStorage = Capacitor.isNativePlatform()
  ? nativeStorage
  : localStorage;
