export interface Recipe {
  id: string;
  title: string;
  category: string;
  image: string;
  cookTime: string;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  ingredients: string[];
  instructions: string[];
  nutrition: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
    fiber: string;
  };
  description: string;
}

export const recipes: Recipe[] = [
  {
    id: "1",
    title: "Mediterranean Pasta Bowl",
    category: "Meals",
    image: "/placeholder.svg",
    cookTime: "25 min",
    servings: 4,
    difficulty: "Easy",
    description: "A fresh and flavorful pasta dish with cherry tomatoes, basil, and garlic.",
    ingredients: [
      "400g pasta of choice",
      "2 cups cherry tomatoes, halved",
      "4 cloves garlic, minced",
      "1/4 cup fresh basil, chopped",
      "3 tbsp olive oil",
      "1/2 cup parmesan cheese, grated",
      "Salt and pepper to taste",
      "Red pepper flakes (optional)"
    ],
    instructions: [
      "Bring a large pot of salted water to boil and cook pasta according to package directions.",
      "While pasta cooks, heat olive oil in a large pan over medium heat.",
      "Add garlic and sauté for 1 minute until fragrant.",
      "Add cherry tomatoes and cook for 5-7 minutes until they start to burst.",
      "Drain pasta, reserving 1 cup of pasta water.",
      "Add pasta to the pan with tomatoes, tossing to combine.",
      "Add pasta water as needed to create a light sauce.",
      "Stir in fresh basil and parmesan cheese.",
      "Season with salt, pepper, and red pepper flakes if desired.",
      "Serve immediately with extra parmesan on top."
    ],
    nutrition: {
      calories: 450,
      protein: "15g",
      carbs: "65g",
      fat: "14g",
      fiber: "4g"
    }
  },
  {
    id: "2",
    title: "Fresh Garden Salad",
    category: "Salads",
    image: "/placeholder.svg",
    cookTime: "10 min",
    servings: 2,
    difficulty: "Easy",
    description: "Crisp mixed greens with colorful vegetables and a tangy vinaigrette.",
    ingredients: [
      "4 cups mixed salad greens",
      "1 cucumber, sliced",
      "1 cup cherry tomatoes, halved",
      "1 red bell pepper, sliced",
      "1/4 red onion, thinly sliced",
      "1/2 cup shredded carrots",
      "3 tbsp olive oil",
      "2 tbsp balsamic vinegar",
      "1 tsp honey",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Wash and dry all vegetables thoroughly.",
      "In a large bowl, combine mixed greens, cucumber, tomatoes, bell pepper, onion, and carrots.",
      "In a small bowl, whisk together olive oil, balsamic vinegar, honey, salt, and pepper.",
      "Pour dressing over salad just before serving.",
      "Toss gently to coat all ingredients.",
      "Serve immediately for best crispness."
    ],
    nutrition: {
      calories: 180,
      protein: "3g",
      carbs: "15g",
      fat: "12g",
      fiber: "5g"
    }
  },
  {
    id: "3",
    title: "Chocolate Layer Cake",
    category: "Desserts",
    image: "/placeholder.svg",
    cookTime: "60 min",
    servings: 12,
    difficulty: "Medium",
    description: "Rich, moist chocolate cake with creamy chocolate ganache frosting.",
    ingredients: [
      "2 cups all-purpose flour",
      "2 cups sugar",
      "3/4 cup cocoa powder",
      "2 tsp baking soda",
      "1 tsp baking powder",
      "1 tsp salt",
      "2 eggs",
      "1 cup buttermilk",
      "1 cup hot coffee",
      "1/2 cup vegetable oil",
      "2 tsp vanilla extract",
      "For ganache: 2 cups heavy cream, 16 oz dark chocolate"
    ],
    instructions: [
      "Preheat oven to 350°F (175°C). Grease and flour two 9-inch round pans.",
      "In a large bowl, mix flour, sugar, cocoa, baking soda, baking powder, and salt.",
      "Add eggs, buttermilk, coffee, oil, and vanilla. Beat on medium for 2 minutes.",
      "Pour batter evenly into prepared pans.",
      "Bake for 30-35 minutes or until toothpick inserted comes out clean.",
      "Cool in pans for 10 minutes, then remove to wire racks.",
      "For ganache: Heat cream until just boiling, pour over chopped chocolate, let sit 5 minutes, then stir until smooth.",
      "Let ganache cool to spreadable consistency.",
      "Place one cake layer on serving plate, spread with ganache.",
      "Top with second layer and cover entire cake with remaining ganache.",
      "Refrigerate for 30 minutes before serving."
    ],
    nutrition: {
      calories: 520,
      protein: "6g",
      carbs: "62g",
      fat: "28g",
      fiber: "3g"
    }
  },
  {
    id: "4",
    title: "Tropical Mango Smoothie",
    category: "Drinks",
    image: "/placeholder.svg",
    cookTime: "5 min",
    servings: 2,
    difficulty: "Easy",
    description: "Refreshing and creamy smoothie packed with tropical flavors.",
    ingredients: [
      "2 cups frozen mango chunks",
      "1 banana",
      "1 cup coconut milk",
      "1/2 cup orange juice",
      "2 tbsp honey",
      "1/2 cup Greek yogurt",
      "Ice cubes (optional)",
      "Fresh mint for garnish"
    ],
    instructions: [
      "Add frozen mango, banana, coconut milk, orange juice, and honey to blender.",
      "Add Greek yogurt for extra creaminess.",
      "Blend on high until completely smooth, about 1-2 minutes.",
      "Add ice cubes if you want it thicker.",
      "Taste and adjust sweetness with more honey if needed.",
      "Pour into glasses and garnish with fresh mint.",
      "Serve immediately while cold."
    ],
    nutrition: {
      calories: 280,
      protein: "8g",
      carbs: "52g",
      fat: "6g",
      fiber: "4g"
    }
  },
  {
    id: "5",
    title: "Hearty Vegetable Soup",
    category: "Soups",
    image: "/placeholder.svg",
    cookTime: "45 min",
    servings: 6,
    difficulty: "Easy",
    description: "Comforting vegetable soup loaded with nutritious ingredients.",
    ingredients: [
      "2 tbsp olive oil",
      "1 onion, diced",
      "3 carrots, sliced",
      "3 celery stalks, sliced",
      "3 cloves garlic, minced",
      "1 can diced tomatoes",
      "6 cups vegetable broth",
      "2 cups green beans, chopped",
      "2 cups potatoes, diced",
      "1 cup corn kernels",
      "2 bay leaves",
      "1 tsp thyme",
      "Salt and pepper to taste",
      "Fresh parsley for garnish"
    ],
    instructions: [
      "Heat olive oil in a large pot over medium heat.",
      "Add onion, carrots, and celery. Cook for 5 minutes until softened.",
      "Add garlic and cook for 1 minute.",
      "Pour in diced tomatoes and vegetable broth.",
      "Add potatoes, green beans, corn, bay leaves, and thyme.",
      "Bring to a boil, then reduce heat and simmer for 30 minutes.",
      "Season with salt and pepper to taste.",
      "Remove bay leaves before serving.",
      "Garnish with fresh parsley.",
      "Serve hot with crusty bread."
    ],
    nutrition: {
      calories: 160,
      protein: "4g",
      carbs: "28g",
      fat: "4g",
      fiber: "6g"
    }
  },
  {
    id: "6",
    title: "Avocado Toast Breakfast",
    category: "Breakfast",
    image: "/placeholder.svg",
    cookTime: "10 min",
    servings: 2,
    difficulty: "Easy",
    description: "Trendy and nutritious breakfast with perfectly seasoned avocado.",
    ingredients: [
      "4 slices whole grain bread",
      "2 ripe avocados",
      "2 eggs",
      "1 tbsp lemon juice",
      "Red pepper flakes",
      "Salt and pepper",
      "Cherry tomatoes, halved",
      "Microgreens or arugula",
      "Everything bagel seasoning"
    ],
    instructions: [
      "Toast bread slices until golden and crispy.",
      "Mash avocados in a bowl with lemon juice, salt, and pepper.",
      "Spread mashed avocado evenly on toast.",
      "Fry or poach eggs to your preference.",
      "Top each toast with a cooked egg.",
      "Add cherry tomatoes and microgreens.",
      "Sprinkle with everything bagel seasoning and red pepper flakes.",
      "Serve immediately while toast is still warm."
    ],
    nutrition: {
      calories: 380,
      protein: "14g",
      carbs: "35g",
      fat: "22g",
      fiber: "12g"
    }
  }
];

export const categories = [
  { name: "Meals", count: recipes.filter(r => r.category === "Meals").length },
  { name: "Desserts", count: recipes.filter(r => r.category === "Desserts").length },
  { name: "Drinks", count: recipes.filter(r => r.category === "Drinks").length },
  { name: "Soups", count: recipes.filter(r => r.category === "Soups").length },
  { name: "Salads", count: recipes.filter(r => r.category === "Salads").length },
  { name: "Breakfast", count: recipes.filter(r => r.category === "Breakfast").length }
];
