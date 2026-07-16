# PlatterMap

Recipe discovery app (web + Android) conceptualized by a 7-year-old founder, originally built in Lovable, now developed independently in this repo.

## Live infrastructure (all dedicated to PlatterMap — never mix with other projects)
- **Website**: https://plattermap.app — Vercel account `ivaancence-gif` (team "plattermap"). Domain registered at Hostinger; Hostinger nameservers with `A @ → 76.76.21.21`.
- **Backend**: own Supabase project `wggdvvdlhoqzpxxlhcgn` (us-east-1, org "PlatterMap" under ivaancence@gmail.com). DB password: `~/.plattermap-db-password.txt` on the dev Mac. The old Lovable Cloud project (`ohetssiqfzafipmkfmfj`) is abandoned.
- **GitHub**: ivaancence-gif/Plattermap (dev Mac's `gh` CLI is logged in as the owner).

## Architecture notes
- Vite + React + shadcn SPA; PWA enabled; Capacitor 8 wraps it for Android (`android/`, appId `app.plattermap`).
- Recipes live in the Supabase `recipes` table (public-read RLS). `src/hooks/useRecipes.tsx` fetches them with the bundled arrays in `src/data/` as instant/offline placeholder. Recipe images stay bundled, resolved by `image_key` via `recipeImageMap`. Adding recipes = DB insert, no app release.
- User data tables (favorites, meal_plans, shopping_lists, recipe_notes, profiles, user_preferences) all have per-user RLS.
- Edge functions in `supabase/functions/` (generate-recipe, health-facts, Stripe checkout trio, send-notification) are NOT yet deployed to the new Supabase — they came from Lovable and need new secrets (old AI calls used Lovable's gateway; pick a provider, e.g. Gemini, and set the key as a function secret).

## Build & deploy
- Web: `npm run build`; deploy with `npx vercel --prod --yes` (CLI logged in as ivaancence-gif).
- Android: `npm run build && npx cap sync android`, then `cd android && JAVA_HOME=/opt/homebrew/opt/openjdk@21 ANDROID_HOME=/opt/homebrew/share/android-commandlinetools ./gradlew assembleDebug` → `android/app/build/outputs/apk/debug/app-debug.apk`.
- DB migrations: `npx supabase db push --password "$(cat ~/.plattermap-db-password.txt)"` (project already linked).

## Product decisions (July 2026)
- Launch **100% free** on Google Play first ($25 account; Apple later). Add a single paid tier afterwards: "PlatterMap Plus" ~$3.99/mo or $29.99/yr via Google Play Billing (Stripe stays web-only — store policy).
- Audience: global/US-English first; pricing display should be clean USD (the old ₹886.51 was a converted-currency artifact).
- Marketing may use the kid-founder story: first name only, no face/school/location.

## Roadmap
1. ✅ Capacitor production setup, own backend, domain, recipes in DB
2. Deploy AI edge functions to own Supabase (Gemini free tier suggested)
3. Mobile UX: bottom tab navigation, touch targets, USD pricing, app icons/splash
4. Signed release AAB + Play Console listing (needs privacy policy page on plattermap.app)
5. Launch + Plus tier via Play Billing
