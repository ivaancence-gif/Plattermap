-- Create recipe_notes table for Premium users
CREATE TABLE public.recipe_notes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  recipe_id TEXT NOT NULL,
  notes TEXT,
  modifications TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.recipe_notes ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own notes" 
ON public.recipe_notes 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own notes" 
ON public.recipe_notes 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own notes" 
ON public.recipe_notes 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own notes" 
ON public.recipe_notes 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create meal_plans table for Pro users
CREATE TABLE public.meal_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  recipe_id TEXT NOT NULL,
  planned_date DATE NOT NULL,
  meal_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.meal_plans ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own meal plans" 
ON public.meal_plans 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own meal plans" 
ON public.meal_plans 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own meal plans" 
ON public.meal_plans 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own meal plans" 
ON public.meal_plans 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create shopping_lists table for Pro users
CREATE TABLE public.shopping_lists (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.shopping_lists ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own shopping lists" 
ON public.shopping_lists 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own shopping lists" 
ON public.shopping_lists 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own shopping lists" 
ON public.shopping_lists 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own shopping lists" 
ON public.shopping_lists 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for updating updated_at on recipe_notes
CREATE TRIGGER update_recipe_notes_updated_at
BEFORE UPDATE ON public.recipe_notes
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();

-- Create trigger for updating updated_at on shopping_lists
CREATE TRIGGER update_shopping_lists_updated_at
BEFORE UPDATE ON public.shopping_lists
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();