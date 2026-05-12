// Import all recipe images
import mediterraneanPastaBowl from "@/assets/recipes/mediterranean-pasta-bowl.jpg";
import beefTacos from "@/assets/recipes/beef-tacos.jpg";
import chickenStirFry from "@/assets/recipes/chicken-stir-fry.jpg";
import margheritaPizza from "@/assets/recipes/margherita-pizza.jpg";
import salmonTeriyaki from "@/assets/recipes/salmon-teriyaki.jpg";
import lambCurry from "@/assets/recipes/lamb-curry.jpg";
import padThai from "@/assets/recipes/pad-thai.jpg";
import lasagna from "@/assets/recipes/lasagna.jpg";
import bbqRibs from "@/assets/recipes/bbq-ribs.jpg";
import sushiRolls from "@/assets/recipes/sushi-rolls.jpg";
import freshGardenSalad from "@/assets/recipes/fresh-garden-salad.jpg";
import caesarSalad from "@/assets/recipes/caesar-salad.jpg";
import greekSalad from "@/assets/recipes/greek-salad.jpg";
import capreseSalad from "@/assets/recipes/caprese-salad.jpg";
import chocolateLayerCake from "@/assets/recipes/chocolate-layer-cake.jpg";
import tiramisu from "@/assets/recipes/tiramisu.jpg";
import applePie from "@/assets/recipes/apple-pie.jpg";
import cremeBrulee from "@/assets/recipes/creme-brulee.jpg";
import cheesecake from "@/assets/recipes/cheesecake.jpg";
import fruitSmoothieBowl from "@/assets/recipes/fruit-smoothie-bowl.jpg";
import icedCoffee from "@/assets/recipes/iced-coffee.jpg";
import mangoSmoothie from "@/assets/recipes/mango-smoothie.jpg";
import matchaLatte from "@/assets/recipes/matcha-latte.jpg";
import freshLemonade from "@/assets/recipes/fresh-lemonade.jpg";
import hotChocolate from "@/assets/recipes/hot-chocolate.jpg";
import greenDetoxSmoothie from "@/assets/recipes/green-detox-smoothie.jpg";
import vegetableSoup from "@/assets/recipes/vegetable-soup.jpg";
import butternutSquashSoup from "@/assets/recipes/butternut-squash-soup.jpg";
import tomatoBasilSoup from "@/assets/recipes/tomato-basil-soup.jpg";
import chickenNoodleSoup from "@/assets/recipes/chicken-noodle-soup.jpg";
import frenchOnionSoup from "@/assets/recipes/french-onion-soup.jpg";
import tomYumSoup from "@/assets/recipes/tom-yum-soup.jpg";
import minestrone from "@/assets/recipes/minestrone.jpg";
import gazpacho from "@/assets/recipes/gazpacho.jpg";
import classicPancakes from "@/assets/recipes/classic-pancakes.jpg";
import avocadoToast from "@/assets/recipes/avocado-toast.jpg";
import belgianWaffles from "@/assets/recipes/belgian-waffles.jpg";
import acaiBowl from "@/assets/recipes/acai-bowl.jpg";
import eggsBenedict from "@/assets/recipes/eggs-benedict.jpg";
import frenchToast from "@/assets/recipes/french-toast.jpg";
import omelette from "@/assets/recipes/omelette.jpg";
import risottoAllaMilanese from "@/assets/recipes/risotto-alla-milanese.jpg";
import ossoBuco from "@/assets/recipes/osso-buco.jpg";
import chickenMolePoblano from "@/assets/recipes/chicken-mole-poblano.jpg";
import chilesRellenos from "@/assets/recipes/chiles-rellenos.jpg";
import greenCurry from "@/assets/recipes/green-curry.jpg";
import somTam from "@/assets/recipes/som-tam.jpg";
import butterChicken from "@/assets/recipes/butter-chicken.jpg";
import palakPaneer from "@/assets/recipes/palak-paneer.jpg";
import chanaMasala from "@/assets/recipes/chana-masala.jpg";
import ramen from "@/assets/recipes/ramen.jpg";
import tempura from "@/assets/recipes/tempura.jpg";
import misoSoup from "@/assets/recipes/miso-soup.jpg";
import coqAuVin from "@/assets/recipes/coq-au-vin.jpg";
import ratatouille from "@/assets/recipes/ratatouille.jpg";
import moussaka from "@/assets/recipes/moussaka.jpg";
import spanakopita from "@/assets/recipes/spanakopita.jpg";
import kungPaoChicken from "@/assets/recipes/kung-pao-chicken.jpg";
import mapoTofu from "@/assets/recipes/mapo-tofu.jpg";
import falafel from "@/assets/recipes/falafel.jpg";
import hummus from "@/assets/recipes/hummus.jpg";
import tabbouleh from "@/assets/recipes/tabbouleh.jpg";
import bibimbap from "@/assets/recipes/bibimbap.jpg";
import kimchi from "@/assets/recipes/kimchi.jpg";
import pho from "@/assets/recipes/pho.jpg";
import banhMi from "@/assets/recipes/banh-mi.jpg";
import paella from "@/assets/recipes/paella.jpg";
import tagine from "@/assets/recipes/tagine.jpg";

// Image mappings for all recipes
export const recipeImageMap: Record<string, string> = {
  // Meals
  "1": mediterraneanPastaBowl,
  "7": beefTacos,
  "8": chickenStirFry,
  "9": margheritaPizza,
  "10": salmonTeriyaki,
  "11": lambCurry,
  "12": padThai,
  "13": lasagna,
  "14": bbqRibs,
  "15": sushiRolls,
  
  // Salads
  "2": freshGardenSalad,
  "16": caesarSalad,
  "17": greekSalad,
  "18": capreseSalad,
  
  // Desserts
  "3": chocolateLayerCake,
  "19": tiramisu,
  "20": applePie,
  "21": cremeBrulee,
  "22": cheesecake,
  
  // Drinks
  "4": mangoSmoothie,
  "23": greenDetoxSmoothie,
  "24": icedCoffee,
  "25": freshLemonade,
  "26": hotChocolate,
  
  // Soups
  "5": vegetableSoup,
  "27": chickenNoodleSoup,
  "28": frenchOnionSoup,
  "29": tomYumSoup,
  "30": minestrone,
  
  // Breakfast
  "6": avocadoToast,
  "31": classicPancakes,
  "32": eggsBenedict,
  "33": acaiBowl,
  "34": frenchToast,
  "35": omelette,
  
  // International - Italian
  "100": risottoAllaMilanese,
  "101": ossoBuco,
  
  // International - Mexican
  "102": chickenMolePoblano,
  "103": chilesRellenos,
  
  // International - Thai
  "104": greenCurry,
  "105": somTam,
  
  // International - Indian
  "106": butterChicken,
  "107": palakPaneer,
  "108": chanaMasala,
  
  // International - Japanese
  "109": ramen,
  "110": tempura,
  "111": misoSoup,
  
  // International - French
  "112": coqAuVin,
  "113": ratatouille,
  
  // International - Greek
  "114": moussaka,
  "115": spanakopita,
  
  // International - Chinese
  "116": kungPaoChicken,
  "117": mapoTofu,
  
  // International - Middle Eastern
  "118": falafel,
  "119": hummus,
  "120": tabbouleh,
  
  // International - Korean
  "121": bibimbap,
  "122": kimchi,
  
  // International - Vietnamese
  "123": pho,
  "124": banhMi,
  
  // International - Spanish
  "125": paella,
  
  // International - Spanish (Gazpacho)
  "126": gazpacho,
  
  // International - Moroccan
  "127": tagine,
};
