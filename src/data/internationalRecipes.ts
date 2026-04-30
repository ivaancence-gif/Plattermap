import { Recipe } from "./recipes";

export const internationalRecipes: Recipe[] = [
  // ITALIAN
  {
    id: "100",
    title: "Risotto alla Milanese",
    category: "Meals",
    cuisine: "Italian",
    image: "/placeholder.svg",
    cookTime: "35 min",
    servings: 4,
    difficulty: "Medium",
    description: "Creamy saffron risotto from Milan, rich and aromatic.",
    dietaryTags: ["Vegetarian", "Gluten-Free"],
    ingredients: ["Arborio rice", "Saffron threads", "White wine", "Parmesan", "Butter", "Onion", "Chicken broth"],
    instructions: [
      "Toast saffron threads and soak in warm broth.",
      "Sauté finely diced onion in butter until soft.",
      "Add rice and toast for 2 minutes.",
      "Add wine and stir until absorbed.",
      "Add broth one ladle at a time, stirring constantly.",
      "Cook for 20 minutes until creamy.",
      "Stir in butter and parmesan before serving."
    ],
    nutrition: { calories: 420, protein: "12g", carbs: "58g", fat: "15g", fiber: "2g" }
  },
  {
    id: "101",
    title: "Osso Buco",
    category: "Meals",
    cuisine: "Italian",
    image: "/placeholder.svg",
    cookTime: "150 min",
    servings: 6,
    difficulty: "Hard",
    description: "Braised veal shanks in white wine with vegetables.",
    dietaryTags: ["Gluten-Free"],
    ingredients: ["Veal shanks", "White wine", "Tomatoes", "Carrots", "Celery", "Onion", "Garlic", "Gremolata"],
    instructions: [
      "Tie veal shanks with kitchen twine.",
      "Brown shanks in olive oil on all sides.",
      "Sauté vegetables until soft.",
      "Add wine and reduce by half.",
      "Add tomatoes and broth, bring to simmer.",
      "Braise in oven at 325°F for 2 hours.",
      "Top with gremolata before serving."
    ],
    nutrition: { calories: 520, protein: "42g", carbs: "18g", fat: "28g", fiber: "3g" }
  },

  // MEXICAN
  {
    id: "102",
    title: "Chicken Mole Poblano",
    category: "Meals",
    cuisine: "Mexican",
    image: "/placeholder.svg",
    cookTime: "120 min",
    servings: 8,
    difficulty: "Hard",
    description: "Complex sauce with chocolate and chilies over chicken.",
    dietaryTags: ["Gluten-Free"],
    ingredients: ["Chicken pieces", "Dried chilies", "Dark chocolate", "Tomatoes", "Almonds", "Sesame seeds", "Spices"],
    instructions: [
      "Toast and rehydrate dried chilies.",
      "Blend chilies with tomatoes, nuts, and spices.",
      "Fry the mole paste in oil.",
      "Add chocolate and chicken broth.",
      "Simmer for 45 minutes.",
      "Add cooked chicken pieces.",
      "Simmer 30 more minutes, serve with rice."
    ],
    nutrition: { calories: 480, protein: "38g", carbs: "24g", fat: "26g", fiber: "5g" }
  },
  {
    id: "103",
    title: "Chiles Rellenos",
    category: "Meals",
    cuisine: "Mexican",
    image: "/placeholder.svg",
    cookTime: "45 min",
    servings: 6,
    difficulty: "Medium",
    description: "Roasted poblano peppers stuffed with cheese.",
    dietaryTags: ["Vegetarian", "Gluten-Free"],
    ingredients: ["Poblano peppers", "Queso fresco", "Eggs", "Flour", "Tomato sauce", "Onion", "Garlic"],
    instructions: [
      "Char peppers over flame until blackened.",
      "Peel skin and make slit to remove seeds.",
      "Stuff with cheese.",
      "Coat in flour, then egg batter.",
      "Fry until golden.",
      "Serve with warm tomato sauce."
    ],
    nutrition: { calories: 320, protein: "16g", carbs: "22g", fat: "18g", fiber: "4g" }
  },

  // THAI
  {
    id: "104",
    title: "Green Curry",
    category: "Meals",
    cuisine: "Thai",
    image: "/placeholder.svg",
    cookTime: "35 min",
    servings: 4,
    difficulty: "Medium",
    description: "Aromatic Thai curry with coconut milk and vegetables.",
    dietaryTags: ["Gluten-Free"],
    ingredients: ["Green curry paste", "Coconut milk", "Chicken or tofu", "Thai basil", "Bamboo shoots", "Thai eggplant", "Fish sauce"],
    instructions: [
      "Fry curry paste in coconut cream until fragrant.",
      "Add remaining coconut milk and bring to simmer.",
      "Add protein and cook through.",
      "Add vegetables and simmer until tender.",
      "Season with fish sauce and sugar.",
      "Add Thai basil and serve with rice."
    ],
    nutrition: { calories: 420, protein: "28g", carbs: "18g", fat: "28g", fiber: "3g" }
  },
  {
    id: "105",
    title: "Som Tam (Papaya Salad)",
    category: "Salads",
    cuisine: "Thai",
    image: "/placeholder.svg",
    cookTime: "15 min",
    servings: 4,
    difficulty: "Easy",
    description: "Spicy and tangy green papaya salad.",
    dietaryTags: ["Vegan", "Gluten-Free"],
    ingredients: ["Green papaya", "Cherry tomatoes", "Long beans", "Peanuts", "Thai chilies", "Lime", "Palm sugar", "Tamarind"],
    instructions: [
      "Shred green papaya into thin strips.",
      "Pound chilies and garlic in mortar.",
      "Add palm sugar, lime juice, and tamarind.",
      "Add papaya, tomatoes, and beans.",
      "Pound lightly to bruise.",
      "Top with peanuts and serve."
    ],
    nutrition: { calories: 140, protein: "4g", carbs: "22g", fat: "5g", fiber: "4g" }
  },

  // INDIAN
  {
    id: "106",
    title: "Butter Chicken",
    category: "Meals",
    cuisine: "Indian",
    image: "/placeholder.svg",
    cookTime: "50 min",
    servings: 6,
    difficulty: "Medium",
    description: "Creamy tomato-based curry with tender chicken.",
    dietaryTags: ["Gluten-Free"],
    ingredients: ["Chicken", "Tomatoes", "Butter", "Cream", "Garam masala", "Ginger", "Garlic", "Fenugreek leaves"],
    instructions: [
      "Marinate chicken in yogurt and spices.",
      "Grill or bake chicken until cooked.",
      "Make sauce with butter, tomatoes, and spices.",
      "Blend sauce until smooth.",
      "Add cream and cooked chicken.",
      "Simmer for 15 minutes.",
      "Garnish with cream and fenugreek."
    ],
    nutrition: { calories: 480, protein: "36g", carbs: "12g", fat: "32g", fiber: "2g" }
  },
  {
    id: "107",
    title: "Palak Paneer",
    category: "Meals",
    cuisine: "Indian",
    image: "/placeholder.svg",
    cookTime: "40 min",
    servings: 4,
    difficulty: "Medium",
    description: "Spinach curry with Indian cottage cheese.",
    dietaryTags: ["Vegetarian", "Gluten-Free"],
    ingredients: ["Spinach", "Paneer", "Onion", "Tomatoes", "Cream", "Ginger", "Garlic", "Garam masala"],
    instructions: [
      "Blanch spinach and blend to smooth paste.",
      "Fry paneer cubes until golden, set aside.",
      "Sauté onion, ginger, and garlic.",
      "Add tomatoes and cook until soft.",
      "Add spinach puree and spices.",
      "Simmer for 10 minutes.",
      "Add paneer and cream, heat through."
    ],
    nutrition: { calories: 340, protein: "18g", carbs: "15g", fat: "24g", fiber: "5g" }
  },
  {
    id: "108",
    title: "Chana Masala",
    category: "Meals",
    cuisine: "Indian",
    image: "/placeholder.svg",
    cookTime: "35 min",
    servings: 6,
    difficulty: "Easy",
    description: "Spiced chickpea curry, hearty and flavorful.",
    dietaryTags: ["Vegan", "Gluten-Free"],
    ingredients: ["Chickpeas", "Tomatoes", "Onion", "Ginger", "Garlic", "Garam masala", "Cumin", "Coriander"],
    instructions: [
      "Sauté onion until golden.",
      "Add ginger, garlic, and spices.",
      "Add tomatoes and cook until soft.",
      "Add chickpeas and water.",
      "Simmer for 20 minutes.",
      "Mash some chickpeas for thickness.",
      "Garnish with cilantro."
    ],
    nutrition: { calories: 280, protein: "12g", carbs: "42g", fat: "6g", fiber: "10g" }
  },

  // JAPANESE
  {
    id: "109",
    title: "Ramen",
    category: "Soups",
    cuisine: "Japanese",
    image: "/placeholder.svg",
    cookTime: "120 min",
    servings: 4,
    difficulty: "Hard",
    description: "Rich broth with noodles, pork, and toppings.",
    dietaryTags: [],
    ingredients: ["Pork belly", "Ramen noodles", "Pork bones", "Soy sauce", "Mirin", "Soft boiled eggs", "Green onions", "Nori"],
    instructions: [
      "Simmer pork bones for 8 hours for broth.",
      "Braise pork belly in soy and mirin.",
      "Cook ramen noodles.",
      "Assemble: broth, noodles, sliced pork.",
      "Top with egg, green onions, and nori."
    ],
    nutrition: { calories: 580, protein: "32g", carbs: "62g", fat: "22g", fiber: "3g" }
  },
  {
    id: "110",
    title: "Tempura",
    category: "Meals",
    cuisine: "Japanese",
    image: "/placeholder.svg",
    cookTime: "30 min",
    servings: 4,
    difficulty: "Medium",
    description: "Light and crispy battered vegetables and seafood.",
    dietaryTags: [],
    ingredients: ["Shrimp", "Vegetables", "Tempura batter mix", "Ice water", "Oil for frying", "Tentsuyu dipping sauce"],
    instructions: [
      "Prepare vegetables and shrimp.",
      "Make batter with ice cold water.",
      "Heat oil to 350°F.",
      "Dip ingredients in batter.",
      "Fry until light golden.",
      "Drain on paper towels.",
      "Serve immediately with dipping sauce."
    ],
    nutrition: { calories: 380, protein: "18g", carbs: "38g", fat: "16g", fiber: "3g" }
  },
  {
    id: "111",
    title: "Miso Soup",
    category: "Soups",
    cuisine: "Japanese",
    image: "/placeholder.svg",
    cookTime: "15 min",
    servings: 4,
    difficulty: "Easy",
    description: "Traditional Japanese soup with tofu and seaweed.",
    dietaryTags: ["Vegan", "Gluten-Free"],
    ingredients: ["Miso paste", "Dashi", "Tofu", "Wakame seaweed", "Green onions"],
    instructions: [
      "Heat dashi broth until simmering.",
      "Add cubed tofu and wakame.",
      "Remove from heat.",
      "Dissolve miso paste in small amount of broth.",
      "Stir miso into soup.",
      "Garnish with green onions.",
      "Serve immediately, do not boil."
    ],
    nutrition: { calories: 90, protein: "6g", carbs: "8g", fat: "3g", fiber: "2g" }
  },

  // FRENCH
  {
    id: "112",
    title: "Coq au Vin",
    category: "Meals",
    cuisine: "French",
    image: "/placeholder.svg",
    cookTime: "120 min",
    servings: 6,
    difficulty: "Hard",
    description: "Chicken braised in red wine with mushrooms and bacon.",
    dietaryTags: ["Gluten-Free"],
    ingredients: ["Chicken", "Red wine", "Bacon", "Pearl onions", "Mushrooms", "Thyme", "Bay leaf", "Chicken stock"],
    instructions: [
      "Brown bacon and remove.",
      "Brown chicken pieces in bacon fat.",
      "Sauté onions and mushrooms.",
      "Deglaze pan with wine.",
      "Add stock, herbs, and chicken back.",
      "Braise for 90 minutes until tender.",
      "Reduce sauce and serve."
    ],
    nutrition: { calories: 520, protein: "42g", carbs: "12g", fat: "28g", fiber: "2g" }
  },
  {
    id: "113",
    title: "Ratatouille",
    category: "Meals",
    cuisine: "French",
    image: "/placeholder.svg",
    cookTime: "60 min",
    servings: 6,
    difficulty: "Medium",
    description: "Provençal vegetable stew with herbs.",
    dietaryTags: ["Vegan", "Gluten-Free"],
    ingredients: ["Eggplant", "Zucchini", "Bell peppers", "Tomatoes", "Onion", "Garlic", "Herbes de Provence", "Olive oil"],
    instructions: [
      "Slice vegetables thinly.",
      "Sauté onion and garlic in olive oil.",
      "Add tomatoes and cook into sauce.",
      "Arrange vegetable slices in dish.",
      "Pour sauce over vegetables.",
      "Drizzle with olive oil and herbs.",
      "Bake at 375°F for 45 minutes."
    ],
    nutrition: { calories: 180, protein: "4g", carbs: "24g", fat: "8g", fiber: "8g" }
  },

  // GREEK
  {
    id: "114",
    title: "Moussaka",
    category: "Meals",
    cuisine: "Greek",
    image: "/placeholder.svg",
    cookTime: "90 min",
    servings: 8,
    difficulty: "Hard",
    description: "Layered eggplant casserole with meat sauce and béchamel.",
    dietaryTags: [],
    ingredients: ["Eggplant", "Ground lamb", "Tomatoes", "Onion", "Béchamel sauce", "Parmesan", "Cinnamon"],
    instructions: [
      "Slice and salt eggplant, let drain.",
      "Make meat sauce with lamb, tomatoes, and spices.",
      "Fry eggplant slices until golden.",
      "Make béchamel sauce.",
      "Layer: eggplant, meat sauce, repeat.",
      "Top with béchamel and cheese.",
      "Bake at 350°F for 45 minutes."
    ],
    nutrition: { calories: 480, protein: "28g", carbs: "32g", fat: "26g", fiber: "6g" }
  },
  {
    id: "115",
    title: "Spanakopita",
    category: "Meals",
    cuisine: "Greek",
    image: "/placeholder.svg",
    cookTime: "60 min",
    servings: 8,
    difficulty: "Medium",
    description: "Spinach and feta pie wrapped in phyllo.",
    dietaryTags: ["Vegetarian"],
    ingredients: ["Phyllo dough", "Spinach", "Feta cheese", "Eggs", "Dill", "Onion", "Butter"],
    instructions: [
      "Sauté onion until soft.",
      "Add spinach and cook until wilted.",
      "Mix with feta, eggs, and dill.",
      "Layer phyllo sheets, brushing with butter.",
      "Add spinach filling.",
      "Top with more phyllo layers.",
      "Bake at 350°F for 45 minutes until golden."
    ],
    nutrition: { calories: 340, protein: "14g", carbs: "28g", fat: "20g", fiber: "3g" }
  },

  // CHINESE
  {
    id: "116",
    title: "Kung Pao Chicken",
    category: "Meals",
    cuisine: "Chinese",
    image: "/placeholder.svg",
    cookTime: "25 min",
    servings: 4,
    difficulty: "Medium",
    description: "Spicy stir-fry with peanuts and dried chilies.",
    dietaryTags: [],
    ingredients: ["Chicken breast", "Peanuts", "Dried chilies", "Sichuan peppercorns", "Soy sauce", "Rice vinegar", "Sugar", "Cornstarch"],
    instructions: [
      "Marinate chicken in soy sauce and cornstarch.",
      "Stir-fry chicken until golden, remove.",
      "Fry chilies and peppercorns in oil.",
      "Add sauce mixture and bring to boil.",
      "Return chicken to wok.",
      "Add peanuts and toss.",
      "Serve over rice."
    ],
    nutrition: { calories: 420, protein: "32g", carbs: "18g", fat: "24g", fiber: "3g" }
  },
  {
    id: "117",
    title: "Mapo Tofu",
    category: "Meals",
    cuisine: "Chinese",
    image: "/placeholder.svg",
    cookTime: "30 min",
    servings: 4,
    difficulty: "Easy",
    description: "Spicy Sichuan tofu dish with ground pork.",
    dietaryTags: ["Gluten-Free"],
    ingredients: ["Soft tofu", "Ground pork", "Doubanjiang", "Sichuan peppercorns", "Garlic", "Ginger", "Green onions"],
    instructions: [
      "Cut tofu into cubes.",
      "Brown ground pork in wok.",
      "Add garlic, ginger, and doubanjiang.",
      "Add broth and bring to simmer.",
      "Gently add tofu.",
      "Simmer for 10 minutes.",
      "Garnish with green onions and peppercorns."
    ],
    nutrition: { calories: 320, protein: "22g", carbs: "8g", fat: "22g", fiber: "2g" }
  },

  // MIDDLE EASTERN
  {
    id: "118",
    title: "Falafel",
    category: "Meals",
    cuisine: "Middle Eastern",
    image: "/placeholder.svg",
    cookTime: "40 min",
    servings: 6,
    difficulty: "Medium",
    description: "Crispy chickpea fritters with herbs and spices.",
    dietaryTags: ["Vegan", "Gluten-Free"],
    ingredients: ["Dried chickpeas", "Parsley", "Cilantro", "Onion", "Garlic", "Cumin", "Coriander", "Baking powder"],
    instructions: [
      "Soak chickpeas overnight.",
      "Blend chickpeas with herbs and spices.",
      "Form into small balls or patties.",
      "Let rest in fridge for 1 hour.",
      "Deep fry at 350°F until golden.",
      "Drain on paper towels.",
      "Serve in pita with tahini sauce."
    ],
    nutrition: { calories: 280, protein: "12g", carbs: "38g", fat: "8g", fiber: "10g" }
  },
  {
    id: "119",
    title: "Hummus",
    category: "Salads",
    cuisine: "Middle Eastern",
    image: "/placeholder.svg",
    cookTime: "15 min",
    servings: 8,
    difficulty: "Easy",
    description: "Creamy chickpea dip with tahini and lemon.",
    dietaryTags: ["Vegan", "Gluten-Free"],
    ingredients: ["Chickpeas", "Tahini", "Lemon juice", "Garlic", "Cumin", "Olive oil", "Paprika"],
    instructions: [
      "Blend chickpeas until smooth.",
      "Add tahini, lemon juice, and garlic.",
      "Blend until creamy, adding water as needed.",
      "Season with cumin and salt.",
      "Transfer to serving bowl.",
      "Drizzle with olive oil.",
      "Sprinkle with paprika."
    ],
    nutrition: { calories: 180, protein: "6g", carbs: "18g", fat: "10g", fiber: "5g" }
  },
  {
    id: "120",
    title: "Tabbouleh",
    category: "Salads",
    cuisine: "Middle Eastern",
    image: "/placeholder.svg",
    cookTime: "20 min",
    servings: 6,
    difficulty: "Easy",
    description: "Fresh parsley salad with bulgur and tomatoes.",
    dietaryTags: ["Vegan"],
    ingredients: ["Bulgur wheat", "Parsley", "Mint", "Tomatoes", "Cucumber", "Lemon juice", "Olive oil"],
    instructions: [
      "Soak bulgur in water for 15 minutes.",
      "Finely chop parsley and mint.",
      "Dice tomatoes and cucumber.",
      "Drain bulgur and mix with herbs and vegetables.",
      "Dress with lemon juice and olive oil.",
      "Season with salt and pepper.",
      "Chill before serving."
    ],
    nutrition: { calories: 140, protein: "4g", carbs: "22g", fat: "5g", fiber: "5g" }
  },

  // KOREAN
  {
    id: "121",
    title: "Bibimbap",
    category: "Meals",
    cuisine: "Korean",
    image: "/placeholder.svg",
    cookTime: "45 min",
    servings: 4,
    difficulty: "Medium",
    description: "Mixed rice bowl with vegetables, egg, and gochujang.",
    dietaryTags: ["Gluten-Free"],
    ingredients: ["Rice", "Beef", "Spinach", "Bean sprouts", "Carrots", "Mushrooms", "Egg", "Gochujang", "Sesame oil"],
    instructions: [
      "Cook rice and keep warm.",
      "Marinate and cook beef.",
      "Blanch spinach and bean sprouts separately.",
      "Sauté carrots and mushrooms.",
      "Fry eggs sunny-side up.",
      "Arrange vegetables and beef over rice in bowl.",
      "Top with egg and gochujang."
    ],
    nutrition: { calories: 520, protein: "28g", carbs: "68g", fat: "14g", fiber: "6g" }
  },
  {
    id: "122",
    title: "Kimchi",
    category: "Salads",
    cuisine: "Korean",
    image: "/placeholder.svg",
    cookTime: "30 min + ferment",
    servings: 16,
    difficulty: "Medium",
    description: "Fermented spicy cabbage, Korean staple.",
    dietaryTags: ["Vegan", "Gluten-Free"],
    ingredients: ["Napa cabbage", "Korean chili flakes", "Fish sauce (or soy)", "Garlic", "Ginger", "Sugar", "Green onions"],
    instructions: [
      "Salt cabbage and let sit 2 hours.",
      "Rinse and drain cabbage.",
      "Make paste with chili flakes, garlic, ginger, and fish sauce.",
      "Coat cabbage with paste.",
      "Pack into jars.",
      "Ferment at room temperature for 2-5 days.",
      "Store in refrigerator."
    ],
    nutrition: { calories: 30, protein: "2g", carbs: "6g", fat: "0g", fiber: "2g" }
  },

  // VIETNAMESE
  {
    id: "123",
    title: "Pho",
    category: "Soups",
    cuisine: "Vietnamese",
    image: "/placeholder.svg",
    cookTime: "180 min",
    servings: 6,
    difficulty: "Hard",
    description: "Aromatic beef noodle soup with herbs.",
    dietaryTags: ["Gluten-Free"],
    ingredients: ["Beef bones", "Rice noodles", "Beef slices", "Star anise", "Cinnamon", "Fish sauce", "Bean sprouts", "Thai basil", "Lime"],
    instructions: [
      "Char onion and ginger.",
      "Simmer bones with spices for 6+ hours.",
      "Strain broth and season with fish sauce.",
      "Cook rice noodles.",
      "Assemble: noodles, raw beef, hot broth.",
      "Top with herbs, bean sprouts, lime.",
      "Serve with hoisin and sriracha."
    ],
    nutrition: { calories: 420, protein: "32g", carbs: "52g", fat: "8g", fiber: "2g" }
  },
  {
    id: "124",
    title: "Banh Mi",
    category: "Meals",
    cuisine: "Vietnamese",
    image: "/placeholder.svg",
    cookTime: "30 min",
    servings: 4,
    difficulty: "Easy",
    description: "Vietnamese sandwich with pickled vegetables and pâté.",
    dietaryTags: [],
    ingredients: ["Baguette", "Pork", "Pâté", "Pickled carrots and daikon", "Cucumber", "Cilantro", "Jalapeños", "Mayo"],
    instructions: [
      "Marinate and grill pork.",
      "Make quick pickled vegetables.",
      "Slice baguette and toast lightly.",
      "Spread pâté and mayo on bread.",
      "Layer with pork, pickles, cucumber.",
      "Add cilantro and jalapeños.",
      "Serve immediately."
    ],
    nutrition: { calories: 480, protein: "26g", carbs: "52g", fat: "18g", fiber: "4g" }
  },

  // SPANISH
  {
    id: "125",
    title: "Paella",
    category: "Meals",
    cuisine: "Spanish",
    image: "/placeholder.svg",
    cookTime: "60 min",
    servings: 6,
    difficulty: "Hard",
    description: "Saffron rice with seafood and chicken.",
    dietaryTags: ["Gluten-Free"],
    ingredients: ["Bomba rice", "Chicken", "Shrimp", "Mussels", "Saffron", "Bell peppers", "Peas", "Paprika", "Chicken stock"],
    instructions: [
      "Brown chicken in paella pan.",
      "Sauté peppers and tomatoes.",
      "Add rice and toast.",
      "Add saffron-infused stock.",
      "Arrange chicken and seafood on top.",
      "Cook without stirring for 20 minutes.",
      "Let rest 5 minutes before serving."
    ],
    nutrition: { calories: 520, protein: "38g", carbs: "56g", fat: "14g", fiber: "3g" }
  },
  {
    id: "126",
    title: "Gazpacho",
    category: "Soups",
    cuisine: "Spanish",
    image: "/placeholder.svg",
    cookTime: "15 min + chill",
    servings: 6,
    difficulty: "Easy",
    description: "Cold tomato soup, refreshing and healthy.",
    dietaryTags: ["Vegan", "Gluten-Free"],
    ingredients: ["Tomatoes", "Cucumber", "Bell pepper", "Onion", "Garlic", "Olive oil", "Sherry vinegar", "Bread (optional)"],
    instructions: [
      "Roughly chop all vegetables.",
      "Blend until smooth.",
      "Add olive oil and vinegar.",
      "Season with salt and pepper.",
      "Chill for at least 2 hours.",
      "Serve cold with garnishes.",
      "Drizzle with olive oil."
    ],
    nutrition: { calories: 120, protein: "2g", carbs: "14g", fat: "7g", fiber: "3g" }
  },

  // MOROCCAN
  {
    id: "127",
    title: "Tagine",
    category: "Meals",
    cuisine: "Moroccan",
    image: recipeImageMap["127"],
    cookTime: "120 min",
    servings: 6,
    difficulty: "Medium",
    description: "Slow-cooked stew with lamb, dried fruits, and spices.",
    dietaryTags: ["Gluten-Free"],
    ingredients: ["Lamb", "Onions", "Dried apricots", "Almonds", "Honey", "Cinnamon", "Cumin", "Saffron", "Chickpeas"],
    instructions: [
      "Brown lamb in tagine or heavy pot.",
      "Add onions and spices.",
      "Add broth and chickpeas.",
      "Simmer for 90 minutes.",
      "Add dried fruits and almonds.",
      "Cook 20 more minutes.",
      "Drizzle with honey before serving."
    ],
    nutrition: { calories: 540, protein: "36g", carbs: "42g", fat: "24g", fiber: "8g" }
  }
];
