import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Ask the browser to keep this site's storage (the Supabase auth session lives
// in localStorage on the web) instead of treating it as evictable. Without
// this, installed PWAs on some mobile devices clear "best-effort" storage when
// the app is closed, logging the user out on every relaunch. No-op where
// unsupported; the native app keeps its session in Capacitor Preferences.
if (typeof navigator !== "undefined" && navigator.storage?.persist) {
  navigator.storage.persist().catch(() => {
    /* ignore — storage stays best-effort */
  });
}

createRoot(document.getElementById("root")!).render(<App />);
