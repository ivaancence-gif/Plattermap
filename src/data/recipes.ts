export type DietaryTag = "Vegetarian" | "Vegan" | "Gluten-Free" | "Dairy-Free" | "Keto" | "Paleo";

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
  dietaryTags: DietaryTag[];
  cuisine?: string;
}

import { internationalRecipes } from "./internationalRecipes";
import { recipeImageMap } from "./recipeImageMap";

export const recipes: Recipe[] = [
  // MEALS
  {
    id: "1",
    title: "Mediterranean Pasta Bowl",
    category: "Meals",
    cuisine: "Italian",
    image: recipeImageMap["1"],
    cookTime: "25 min",
    servings: 4,
    difficulty: "Easy",
    description: "A fresh and flavorful pasta dish with cherry tomatoes, basil, and garlic.",
    dietaryTags: ["Vegetarian"],
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
    id: "7",
    title: "Beef Tacos",
    category: "Meals",
    cuisine: "Mexican",
    image: recipeImageMap["7"],
    cookTime: "30 min",
    servings: 6,
    difficulty: "Easy",
    description: "Classic Mexican street tacos with seasoned beef and fresh toppings.",
    dietaryTags: ["Gluten-Free"],
    ingredients: ["1 lb ground beef", "Taco seasoning", "12 corn tortillas", "Lettuce, tomatoes, cheese", "Sour cream", "Salsa", "Lime wedges"],
    instructions: [
      "Brown ground beef in a large skillet over medium-high heat.",
      "Drain excess fat and add taco seasoning with 1/4 cup water.",
      "Simmer for 5 minutes until sauce thickens.",
      "Warm tortillas in a dry skillet or microwave.",
      "Fill tortillas with beef and desired toppings.",
      "Serve with lime wedges and extra salsa."
    ],
    nutrition: { calories: 380, protein: "22g", carbs: "32g", fat: "18g", fiber: "4g" }
  },
  {
    id: "8",
    title: "Chicken Stir Fry",
    category: "Meals",
    cuisine: "Asian",
    image: recipeImageMap["8"],
    cookTime: "20 min",
    servings: 4,
    difficulty: "Easy",
    description: "Quick and healthy Asian-inspired chicken with colorful vegetables.",
    dietaryTags: ["Gluten-Free"],
    ingredients: ["500g chicken breast, sliced", "Mixed vegetables (broccoli, peppers, carrots)", "Soy sauce", "Ginger, garlic", "Sesame oil", "Rice for serving"],
    instructions: [
      "Heat sesame oil in a wok or large pan over high heat.",
      "Add chicken and stir-fry for 5-6 minutes until cooked.",
      "Remove chicken and set aside.",
      "Add vegetables and stir-fry for 4 minutes.",
      "Return chicken to pan with soy sauce and seasonings.",
      "Toss everything together and serve over rice."
    ],
    nutrition: { calories: 320, protein: "35g", carbs: "25g", fat: "8g", fiber: "5g" }
  },
  {
    id: "9",
    title: "Margherita Pizza",
    category: "Meals",
    cuisine: "Italian",
    image: recipeImageMap["9"],
    cookTime: "45 min",
    servings: 4,
    difficulty: "Medium",
    description: "Classic Italian pizza with fresh mozzarella, tomatoes, and basil.",
    dietaryTags: ["Vegetarian"],
    ingredients: ["Pizza dough", "San Marzano tomatoes", "Fresh mozzarella", "Fresh basil", "Olive oil", "Salt"],
    instructions: [
      "Preheat oven to 475°F with pizza stone if available.",
      "Roll out pizza dough to desired thickness.",
      "Spread crushed tomatoes over dough.",
      "Add torn mozzarella pieces.",
      "Drizzle with olive oil and season with salt.",
      "Bake for 12-15 minutes until crust is golden.",
      "Top with fresh basil leaves before serving."
    ],
    nutrition: { calories: 420, protein: "18g", carbs: "55g", fat: "14g", fiber: "3g" }
  },
  {
    id: "10",
    title: "Salmon Teriyaki",
    category: "Meals",
    cuisine: "Japanese",
    image: recipeImageMap["10"],
    cookTime: "25 min",
    servings: 4,
    difficulty: "Easy",
    description: "Glazed salmon with sweet and savory teriyaki sauce.",
    dietaryTags: ["Gluten-Free"],
    ingredients: ["4 salmon fillets", "Teriyaki sauce", "Honey", "Garlic", "Sesame seeds", "Green onions"],
    instructions: [
      "Mix teriyaki sauce with honey and minced garlic.",
      "Marinate salmon for 15 minutes.",
      "Heat oven to 400°F.",
      "Place salmon on baking sheet and brush with marinade.",
      "Bake for 12-15 minutes until flaky.",
      "Garnish with sesame seeds and green onions."
    ],
    nutrition: { calories: 380, protein: "42g", carbs: "18g", fat: "15g", fiber: "0g" }
  },
  {
    id: "11",
    title: "Lamb Curry",
    category: "Meals",
    cuisine: "Indian",
    image: recipeImageMap["11"],
    cookTime: "90 min",
    servings: 6,
    difficulty: "Hard",
    description: "Rich Indian curry with tender lamb in aromatic spices.",
    dietaryTags: ["Gluten-Free"],
    ingredients: ["1kg lamb shoulder, cubed", "Curry powder", "Coconut milk", "Tomatoes", "Onions, ginger, garlic", "Cilantro"],
    instructions: [
      "Brown lamb pieces in a large pot.",
      "Remove lamb and sauté onions, ginger, and garlic.",
      "Add curry powder and toast for 1 minute.",
      "Return lamb with tomatoes and coconut milk.",
      "Simmer for 75 minutes until lamb is tender.",
      "Garnish with cilantro and serve with rice or naan."
    ],
    nutrition: { calories: 520, protein: "38g", carbs: "15g", fat: "35g", fiber: "3g" }
  },
  {
    id: "12",
    title: "Pad Thai",
    category: "Meals",
    cuisine: "Thai",
    image: recipeImageMap["12"],
    cookTime: "30 min",
    servings: 4,
    difficulty: "Medium",
    description: "Authentic Thai stir-fried noodles with shrimp and peanuts.",
    dietaryTags: ["Gluten-Free"],
    ingredients: ["Rice noodles", "Shrimp", "Eggs", "Bean sprouts", "Peanuts", "Tamarind paste", "Fish sauce", "Lime"],
    instructions: [
      "Soak rice noodles in warm water for 30 minutes.",
      "Make sauce with tamarind paste, fish sauce, and sugar.",
      "Stir-fry shrimp in hot wok, then remove.",
      "Scramble eggs, add drained noodles and sauce.",
      "Add shrimp and bean sprouts, toss well.",
      "Serve with crushed peanuts and lime wedges."
    ],
    nutrition: { calories: 460, protein: "28g", carbs: "58g", fat: "12g", fiber: "3g" }
  },
  {
    id: "13",
    title: "Lasagna",
    category: "Meals",
    cuisine: "Italian",
    image: recipeImageMap["13"],
    cookTime: "90 min",
    servings: 8,
    difficulty: "Medium",
    description: "Classic Italian layered pasta with rich meat sauce and cheese.",
    dietaryTags: [],
    ingredients: ["Lasagna noodles", "Ground beef", "Ricotta cheese", "Mozzarella", "Parmesan", "Marinara sauce", "Italian herbs"],
    instructions: [
      "Brown beef with onions and garlic, add marinara.",
      "Cook lasagna noodles according to package.",
      "Mix ricotta with egg and herbs.",
      "Layer sauce, noodles, ricotta, and mozzarella in baking dish.",
      "Repeat layers, ending with mozzarella and parmesan.",
      "Bake at 375°F for 45 minutes.",
      "Let rest 15 minutes before serving."
    ],
    nutrition: { calories: 580, protein: "32g", carbs: "48g", fat: "28g", fiber: "4g" }
  },
  {
    id: "14",
    title: "BBQ Ribs",
    category: "Meals",
    cuisine: "American",
    image: recipeImageMap["14"],
    cookTime: "180 min",
    servings: 4,
    difficulty: "Hard",
    description: "Slow-cooked pork ribs with smoky BBQ glaze.",
    dietaryTags: ["Gluten-Free"],
    ingredients: ["2 racks pork ribs", "BBQ rub", "BBQ sauce", "Apple cider vinegar", "Brown sugar"],
    instructions: [
      "Remove membrane from ribs and apply dry rub.",
      "Wrap ribs in foil and refrigerate for 2 hours.",
      "Preheat oven to 275°F.",
      "Bake wrapped ribs for 2.5 hours.",
      "Unwrap, brush with BBQ sauce.",
      "Broil for 5 minutes until caramelized.",
      "Let rest 10 minutes before cutting."
    ],
    nutrition: { calories: 680, protein: "45g", carbs: "28g", fat: "42g", fiber: "1g" }
  },
  {
    id: "15",
    title: "Sushi Rolls",
    category: "Meals",
    cuisine: "Japanese",
    image: recipeImageMap["15"],
    cookTime: "60 min",
    servings: 4,
    difficulty: "Hard",
    description: "Homemade sushi with fresh fish and vegetables.",
    dietaryTags: ["Gluten-Free"],
    ingredients: ["Sushi rice", "Nori sheets", "Fresh salmon or tuna", "Cucumber", "Avocado", "Rice vinegar", "Soy sauce", "Wasabi"],
    instructions: [
      "Cook sushi rice and season with rice vinegar.",
      "Let rice cool to room temperature.",
      "Place nori on bamboo mat, spread rice evenly.",
      "Add fish and vegetables in a line.",
      "Roll tightly using the mat.",
      "Slice with sharp wet knife.",
      "Serve with soy sauce, wasabi, and pickled ginger."
    ],
    nutrition: { calories: 380, protein: "18g", carbs: "62g", fat: "8g", fiber: "3g" }
  },

  // SALADS
  {
    id: "2",
    title: "Fresh Garden Salad",
    category: "Salads",
    image: recipeImageMap["2"],
    cookTime: "10 min",
    servings: 2,
    difficulty: "Easy",
    description: "Crisp mixed greens with colorful vegetables and a tangy vinaigrette.",
    dietaryTags: ["Vegetarian", "Vegan", "Gluten-Free"],
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
    id: "16",
    title: "Caesar Salad",
    category: "Salads",
    image: recipeImageMap["16"],
    cookTime: "15 min",
    servings: 4,
    difficulty: "Easy",
    description: "Classic Caesar with crispy romaine, croutons, and creamy dressing.",
    dietaryTags: ["Vegetarian"],
    ingredients: ["Romaine lettuce", "Parmesan cheese", "Croutons", "Caesar dressing", "Lemon", "Black pepper"],
    instructions: [
      "Tear romaine into bite-sized pieces.",
      "Toss lettuce with Caesar dressing.",
      "Add croutons and shaved parmesan.",
      "Squeeze fresh lemon juice over top.",
      "Grind black pepper generously.",
      "Serve immediately while croutons are crispy."
    ],
    nutrition: { calories: 220, protein: "8g", carbs: "12g", fat: "16g", fiber: "3g" }
  },
  {
    id: "17",
    title: "Greek Salad",
    category: "Salads",
    image: recipeImageMap["17"],
    cookTime: "12 min",
    servings: 4,
    difficulty: "Easy",
    description: "Mediterranean salad with feta, olives, and fresh vegetables.",
    dietaryTags: ["Vegetarian", "Gluten-Free"],
    ingredients: ["Cucumbers", "Tomatoes", "Red onion", "Feta cheese", "Kalamata olives", "Olive oil", "Oregano", "Lemon juice"],
    instructions: [
      "Chop cucumbers, tomatoes, and onion into chunks.",
      "Combine vegetables in a large bowl.",
      "Add olives and crumbled feta.",
      "Drizzle with olive oil and lemon juice.",
      "Sprinkle with oregano.",
      "Toss gently and serve chilled."
    ],
    nutrition: { calories: 190, protein: "6g", carbs: "10g", fat: "14g", fiber: "3g" }
  },
  {
    id: "18",
    title: "Caprese Salad",
    category: "Salads",
    image: recipeImageMap["18"],
    cookTime: "8 min",
    servings: 2,
    difficulty: "Easy",
    description: "Simple Italian salad with tomatoes, mozzarella, and basil.",
    dietaryTags: ["Vegetarian", "Gluten-Free"],
    ingredients: ["Fresh mozzarella", "Ripe tomatoes", "Fresh basil", "Extra virgin olive oil", "Balsamic glaze", "Sea salt"],
    instructions: [
      "Slice tomatoes and mozzarella into 1/4 inch rounds.",
      "Arrange alternating on a plate.",
      "Tuck basil leaves between slices.",
      "Drizzle with olive oil and balsamic glaze.",
      "Sprinkle with sea salt.",
      "Serve at room temperature."
    ],
    nutrition: { calories: 260, protein: "14g", carbs: "8g", fat: "20g", fiber: "2g" }
  },

  // DESSERTS
  {
    id: "3",
    title: "Chocolate Layer Cake",
    category: "Desserts",
    image: recipeImageMap["3"],
    cookTime: "60 min",
    servings: 12,
    difficulty: "Medium",
    description: "Rich, moist chocolate cake with creamy chocolate ganache frosting.",
    dietaryTags: ["Vegetarian"],
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
    id: "19",
    title: "Tiramisu",
    category: "Desserts",
    image: recipeImageMap["19"],
    cookTime: "30 min + chill",
    servings: 8,
    difficulty: "Medium",
    description: "Classic Italian coffee-flavored dessert with mascarpone cream.",
    dietaryTags: ["Vegetarian"],
    ingredients: ["Ladyfinger cookies", "Mascarpone cheese", "Eggs", "Sugar", "Strong espresso", "Cocoa powder", "Coffee liqueur"],
    instructions: [
      "Whip egg yolks with sugar until thick.",
      "Fold in mascarpone cheese gently.",
      "Beat egg whites to stiff peaks and fold in.",
      "Dip ladyfingers quickly in espresso mixed with liqueur.",
      "Layer soaked cookies in dish.",
      "Spread half the mascarpone cream over cookies.",
      "Repeat layers, ending with cream.",
      "Dust with cocoa powder and refrigerate 4 hours."
    ],
    nutrition: { calories: 420, protein: "8g", carbs: "38g", fat: "26g", fiber: "1g" }
  },
  {
    id: "20",
    title: "Apple Pie",
    category: "Desserts",
    image: recipeImageMap["20"],
    cookTime: "90 min",
    servings: 8,
    difficulty: "Medium",
    description: "All-American apple pie with flaky crust and cinnamon filling.",
    dietaryTags: ["Vegetarian"],
    ingredients: ["Pie crust (2)", "6 apples", "Sugar", "Cinnamon", "Nutmeg", "Butter", "Lemon juice", "Flour"],
    instructions: [
      "Preheat oven to 425°F.",
      "Peel and slice apples, toss with sugar, cinnamon, and lemon.",
      "Line pie dish with bottom crust.",
      "Fill with apple mixture and dot with butter.",
      "Cover with top crust, seal edges, and cut vents.",
      "Brush with egg wash and sprinkle with sugar.",
      "Bake for 45-50 minutes until golden.",
      "Cool before slicing."
    ],
    nutrition: { calories: 380, protein: "4g", carbs: "58g", fat: "16g", fiber: "4g" }
  },
  {
    id: "21",
    title: "Crème Brûlée",
    category: "Desserts",
    image: recipeImageMap["21"],
    cookTime: "50 min + chill",
    servings: 6,
    difficulty: "Hard",
    description: "French custard dessert with caramelized sugar topping.",
    dietaryTags: ["Vegetarian", "Gluten-Free"],
    ingredients: ["Heavy cream", "Egg yolks", "Sugar", "Vanilla bean", "Extra sugar for topping"],
    instructions: [
      "Heat cream with vanilla bean until just simmering.",
      "Whisk egg yolks with sugar until pale.",
      "Slowly add hot cream to yolks while whisking.",
      "Strain mixture and pour into ramekins.",
      "Bake in water bath at 325°F for 40 minutes.",
      "Chill for at least 4 hours.",
      "Sprinkle sugar on top and torch until caramelized."
    ],
    nutrition: { calories: 380, protein: "5g", carbs: "28g", fat: "28g", fiber: "0g" }
  },
  {
    id: "22",
    title: "Cheesecake",
    category: "Desserts",
    image: recipeImageMap["22"],
    cookTime: "90 min + chill",
    servings: 12,
    difficulty: "Medium",
    description: "Creamy New York style cheesecake with graham cracker crust.",
    dietaryTags: ["Vegetarian"],
    ingredients: ["Cream cheese", "Sugar", "Eggs", "Sour cream", "Vanilla", "Graham crackers", "Butter"],
    instructions: [
      "Make crust by mixing crushed graham crackers with melted butter.",
      "Press into springform pan and bake 10 minutes.",
      "Beat cream cheese until smooth.",
      "Add sugar, then eggs one at a time.",
      "Mix in sour cream and vanilla.",
      "Pour over crust and bake at 325°F for 60 minutes.",
      "Cool completely then refrigerate overnight."
    ],
    nutrition: { calories: 480, protein: "8g", carbs: "42g", fat: "32g", fiber: "1g" }
  },

  // DRINKS
  {
    id: "4",
    title: "Tropical Mango Smoothie",
    category: "Drinks",
    image: recipeImageMap["4"],
    cookTime: "5 min",
    servings: 2,
    difficulty: "Easy",
    description: "Refreshing and creamy smoothie packed with tropical flavors.",
    dietaryTags: ["Vegetarian", "Gluten-Free"],
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
    id: "23",
    title: "Green Detox Smoothie",
    category: "Drinks",
    image: recipeImageMap["23"],
    cookTime: "5 min",
    servings: 2,
    difficulty: "Easy",
    description: "Healthy green smoothie packed with nutrients.",
    dietaryTags: ["Vegan", "Gluten-Free"],
    ingredients: ["Spinach", "Kale", "Banana", "Apple", "Ginger", "Lemon juice", "Water or coconut water"],
    instructions: [
      "Add all greens to blender first.",
      "Add chopped fruits and ginger.",
      "Pour in liquid.",
      "Blend until completely smooth.",
      "Add more liquid if too thick.",
      "Serve immediately over ice."
    ],
    nutrition: { calories: 140, protein: "3g", carbs: "32g", fat: "1g", fiber: "6g" }
  },
  {
    id: "24",
    title: "Iced Coffee",
    category: "Drinks",
    image: recipeImageMap["24"],
    cookTime: "5 min",
    servings: 1,
    difficulty: "Easy",
    description: "Refreshing cold coffee with milk and ice.",
    dietaryTags: ["Vegetarian", "Gluten-Free"],
    ingredients: ["Strong brewed coffee, chilled", "Ice cubes", "Milk or cream", "Sugar or sweetener", "Vanilla extract (optional)"],
    instructions: [
      "Fill glass with ice cubes.",
      "Pour chilled coffee over ice.",
      "Add milk to desired creaminess.",
      "Sweeten to taste.",
      "Stir well and enjoy."
    ],
    nutrition: { calories: 80, protein: "2g", carbs: "12g", fat: "2g", fiber: "0g" }
  },
  {
    id: "25",
    title: "Fresh Lemonade",
    category: "Drinks",
    image: recipeImageMap["25"],
    cookTime: "10 min",
    servings: 6,
    difficulty: "Easy",
    description: "Classic homemade lemonade with fresh squeezed lemons.",
    dietaryTags: ["Vegan", "Gluten-Free"],
    ingredients: ["8 lemons", "1 cup sugar", "6 cups cold water", "Ice", "Mint for garnish"],
    instructions: [
      "Juice all lemons to get about 1.5 cups of juice.",
      "Make simple syrup by heating sugar with 1 cup water.",
      "Mix lemon juice, simple syrup, and remaining water.",
      "Stir well and taste, adjust sweetness.",
      "Chill in refrigerator.",
      "Serve over ice with mint garnish."
    ],
    nutrition: { calories: 110, protein: "0g", carbs: "28g", fat: "0g", fiber: "0g" }
  },
  {
    id: "26",
    title: "Hot Chocolate",
    category: "Drinks",
    image: recipeImageMap["26"],
    cookTime: "8 min",
    servings: 2,
    difficulty: "Easy",
    description: "Rich and creamy hot chocolate with marshmallows.",
    dietaryTags: ["Vegetarian", "Gluten-Free"],
    ingredients: ["Milk", "Dark chocolate", "Cocoa powder", "Sugar", "Vanilla", "Marshmallows", "Whipped cream"],
    instructions: [
      "Heat milk in saucepan over medium heat.",
      "Whisk in cocoa powder and sugar.",
      "Add chopped chocolate and stir until melted.",
      "Add vanilla extract.",
      "Pour into mugs.",
      "Top with marshmallows and whipped cream."
    ],
    nutrition: { calories: 320, protein: "10g", carbs: "42g", fat: "14g", fiber: "3g" }
  },

  // SOUPS
  {
    id: "5",
    title: "Hearty Vegetable Soup",
    category: "Soups",
    image: recipeImageMap["5"],
    cookTime: "45 min",
    servings: 6,
    difficulty: "Easy",
    description: "Comforting vegetable soup loaded with nutritious ingredients.",
    dietaryTags: ["Vegan", "Gluten-Free"],
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
    id: "27",
    title: "Chicken Noodle Soup",
    category: "Soups",
    image: recipeImageMap["27"],
    cookTime: "40 min",
    servings: 6,
    difficulty: "Easy",
    description: "Classic comfort soup with tender chicken and noodles.",
    dietaryTags: [],
    ingredients: ["Chicken breast", "Egg noodles", "Carrots", "Celery", "Onion", "Chicken broth", "Bay leaf", "Thyme"],
    instructions: [
      "Bring chicken broth to boil with chicken breast.",
      "Simmer for 20 minutes until chicken is cooked.",
      "Remove chicken, shred, and set aside.",
      "Add chopped vegetables to broth.",
      "Simmer until vegetables are tender.",
      "Add noodles and cook until done.",
      "Return shredded chicken to pot.",
      "Season and serve hot."
    ],
    nutrition: { calories: 220, protein: "18g", carbs: "24g", fat: "5g", fiber: "2g" }
  },
  {
    id: "28",
    title: "French Onion Soup",
    category: "Soups",
    image: recipeImageMap["28"],
    cookTime: "60 min",
    servings: 4,
    difficulty: "Medium",
    description: "Rich caramelized onion soup with cheese-topped croutons.",
    dietaryTags: ["Vegetarian"],
    ingredients: ["5 large onions", "Butter", "Beef broth", "White wine", "Thyme", "French bread", "Gruyere cheese"],
    instructions: [
      "Thinly slice onions.",
      "Caramelize in butter for 30-40 minutes on low heat.",
      "Add wine and simmer until reduced.",
      "Add broth and thyme, simmer 20 minutes.",
      "Toast bread slices.",
      "Ladle soup into oven-safe bowls.",
      "Top with bread and cheese, broil until melted."
    ],
    nutrition: { calories: 340, protein: "14g", carbs: "32g", fat: "18g", fiber: "4g" }
  },
  {
    id: "29",
    title: "Tom Yum Soup",
    category: "Soups",
    cuisine: "Thai",
    image: recipeImageMap["29"],
    cookTime: "25 min",
    servings: 4,
    difficulty: "Medium",
    description: "Spicy and sour Thai soup with shrimp and lemongrass.",
    dietaryTags: ["Gluten-Free"],
    ingredients: ["Shrimp", "Lemongrass", "Galangal", "Lime leaves", "Thai chilies", "Fish sauce", "Lime juice", "Mushrooms", "Tomatoes"],
    instructions: [
      "Bring broth to boil with lemongrass, galangal, and lime leaves.",
      "Add mushrooms and simmer 5 minutes.",
      "Add shrimp and cook until pink.",
      "Add tomatoes and chilies.",
      "Season with fish sauce and lime juice.",
      "Garnish with cilantro and serve hot."
    ],
    nutrition: { calories: 180, protein: "22g", carbs: "12g", fat: "4g", fiber: "2g" }
  },
  {
    id: "30",
    title: "Minestrone",
    category: "Soups",
    cuisine: "Italian",
    image: recipeImageMap["29"],
    cookTime: "50 min",
    servings: 8,
    difficulty: "Easy",
    description: "Italian vegetable soup with beans and pasta.",
    dietaryTags: ["Vegetarian"],
    ingredients: ["Onion, carrots, celery", "Tomatoes", "Kidney beans", "Green beans", "Zucchini", "Small pasta", "Vegetable broth", "Italian herbs", "Parmesan"],
    instructions: [
      "Sauté onion, carrots, and celery in olive oil.",
      "Add garlic and cook 1 minute.",
      "Add broth, tomatoes, and beans.",
      "Simmer 20 minutes.",
      "Add zucchini, green beans, and pasta.",
      "Cook until pasta is tender.",
      "Season with herbs, salt, and pepper.",
      "Serve with grated parmesan."
    ],
    nutrition: { calories: 190, protein: "8g", carbs: "32g", fat: "3g", fiber: "7g" }
  },

  // BREAKFAST
  {
    id: "6",
    title: "Avocado Toast Breakfast",
    category: "Breakfast",
    image: recipeImageMap["6"],
    cookTime: "10 min",
    servings: 2,
    difficulty: "Easy",
    description: "Trendy and nutritious breakfast with perfectly seasoned avocado.",
    dietaryTags: ["Vegetarian"],
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
  },
  {
    id: "31",
    title: "Pancakes",
    category: "Breakfast",
    image: recipeImageMap["30"],
    cookTime: "20 min",
    servings: 4,
    difficulty: "Easy",
    description: "Fluffy American-style pancakes with maple syrup.",
    dietaryTags: ["Vegetarian"],
    ingredients: ["Flour", "Milk", "Eggs", "Baking powder", "Sugar", "Butter", "Vanilla", "Maple syrup", "Berries"],
    instructions: [
      "Mix dry ingredients in a bowl.",
      "Whisk together wet ingredients.",
      "Combine wet and dry, don't overmix.",
      "Heat griddle and melt butter.",
      "Pour 1/4 cup batter per pancake.",
      "Flip when bubbles form.",
      "Serve with syrup and berries."
    ],
    nutrition: { calories: 340, protein: "10g", carbs: "52g", fat: "10g", fiber: "2g" }
  },
  {
    id: "32",
    title: "Eggs Benedict",
    category: "Breakfast",
    image: recipeImageMap["31"],
    cookTime: "25 min",
    servings: 2,
    difficulty: "Hard",
    description: "Classic brunch dish with poached eggs and hollandaise sauce.",
    dietaryTags: [],
    ingredients: ["English muffins", "Eggs", "Canadian bacon", "Butter", "Lemon juice", "Cayenne", "White vinegar"],
    instructions: [
      "Make hollandaise: whisk egg yolks with lemon over double boiler.",
      "Slowly add melted butter while whisking.",
      "Season with cayenne and salt.",
      "Poach eggs in simmering water with vinegar.",
      "Toast English muffins.",
      "Warm Canadian bacon in pan.",
      "Assemble: muffin, bacon, egg, hollandaise."
    ],
    nutrition: { calories: 520, protein: "24g", carbs: "28g", fat: "36g", fiber: "2g" }
  },
  {
    id: "33",
    title: "Acai Bowl",
    category: "Breakfast",
    image: recipeImageMap["33"],
    cookTime: "10 min",
    servings: 2,
    difficulty: "Easy",
    description: "Nutritious Brazilian breakfast bowl with frozen acai and toppings.",
    dietaryTags: ["Vegan", "Gluten-Free"],
    ingredients: ["Acai packets", "Banana", "Berries", "Granola", "Honey", "Coconut flakes", "Almond butter"],
    instructions: [
      "Blend frozen acai with banana and a splash of juice.",
      "Pour into bowl.",
      "Top with sliced banana and berries.",
      "Add granola and coconut flakes.",
      "Drizzle with honey and almond butter.",
      "Serve immediately while frozen."
    ],
    nutrition: { calories: 380, protein: "8g", carbs: "62g", fat: "12g", fiber: "10g" }
  },
  {
    id: "34",
    title: "French Toast",
    category: "Breakfast",
    image: recipeImageMap["34"],
    cookTime: "15 min",
    servings: 4,
    difficulty: "Easy",
    description: "Classic breakfast with cinnamon-vanilla battered bread.",
    dietaryTags: ["Vegetarian"],
    ingredients: ["Brioche or thick bread", "Eggs", "Milk", "Cinnamon", "Vanilla", "Butter", "Powdered sugar", "Maple syrup"],
    instructions: [
      "Whisk eggs, milk, cinnamon, and vanilla.",
      "Dip bread slices in egg mixture.",
      "Cook in buttered pan until golden on both sides.",
      "Dust with powdered sugar.",
      "Serve with maple syrup and berries."
    ],
    nutrition: { calories: 360, protein: "12g", carbs: "48g", fat: "14g", fiber: "2g" }
  },
  {
    id: "35",
    title: "Classic Omelette",
    category: "Breakfast",
    cuisine: "French",
    image: recipeImageMap["35"],
    cookTime: "10 min",
    servings: 1,
    difficulty: "Easy",
    description: "A perfectly folded French omelette with creamy cheese filling and fresh herbs.",
    dietaryTags: ["Vegetarian", "Gluten-Free", "Keto"],
    ingredients: [
      "3 large eggs",
      "1 tbsp butter",
      "2 tbsp grated cheese (gruyère or cheddar)",
      "1 tbsp fresh chives, chopped",
      "Salt and pepper to taste",
      "1 tbsp milk or cream (optional)"
    ],
    instructions: [
      "Crack eggs into a bowl and whisk until well combined.",
      "Add milk or cream if using, season with salt and pepper.",
      "Heat a non-stick pan over medium heat and add butter.",
      "When butter foams, pour in the egg mixture.",
      "Let eggs set slightly, then gently push edges toward center.",
      "When omelette is still slightly wet on top, add cheese to one half.",
      "Fold the omelette in half and slide onto a plate.",
      "Garnish with fresh chives and serve immediately."
    ],
    nutrition: { calories: 320, protein: "21g", carbs: "2g", fat: "25g", fiber: "0g" }
  },

  ...internationalRecipes
];

export const categories = [
  { name: "Meals", count: recipes.filter(r => r.category === "Meals").length },
  { name: "Salads", count: recipes.filter(r => r.category === "Salads").length },
  { name: "Desserts", count: recipes.filter(r => r.category === "Desserts").length },
  { name: "Drinks", count: recipes.filter(r => r.category === "Drinks").length },
  { name: "Soups", count: recipes.filter(r => r.category === "Soups").length },
  { name: "Breakfast", count: recipes.filter(r => r.category === "Breakfast").length }
];
