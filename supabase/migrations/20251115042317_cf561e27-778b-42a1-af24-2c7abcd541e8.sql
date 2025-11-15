-- Add email notification preferences to user_preferences table
ALTER TABLE public.user_preferences
ADD COLUMN email_recipe_updates boolean DEFAULT true,
ADD COLUMN email_new_features boolean DEFAULT true,
ADD COLUMN email_weekly_recommendations boolean DEFAULT true;