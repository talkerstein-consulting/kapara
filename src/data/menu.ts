import type { BakeryItem } from '../types';

// Menu mirrors the live kapara.ca/menu — same sections, items, prices & descriptions.
// Schnitzels and On The Grill each list one item per variety with both the
// Sandwich and Plate prices (the base price shown is the sandwich price).
export const BAKERY_ITEMS: BakeryItem[] = [
  // --- STARTERS ---
  {
    id: 'starter_hummus_bowl',
    name: 'Hummus Bowl',
    desc: "Creamy hummus topped with spicy schug, seasoned chickpeas, tangy preserved lemon, & drizzled w/ lemon za'atar olive oil. Served w/ baguette, challah OR pita. Add Mushrooms $3, 1pc Kebab $6, 1pc Schnitzel $8.",
    price: 15.00,
    category: 'starters',
    image: '/menu/hummus.webp',
    dietary: ['COR Kosher', 'Parve', 'Vegetarian', 'Vegan Option']
  },
  {
    id: 'starter_falafel_balls',
    name: 'Falafel Balls',
    desc: '6 per order, served w/ tahini. Gluten Free & Vegan. Sandwich +$4 · Plate +$7.',
    price: 12.00,
    category: 'starters',
    image: '/menu/falafel.webp',
    dietary: ['COR Kosher', 'Gluten Free', 'Vegan', 'Vegetarian']
  },
  {
    id: 'starter_potato_cigars',
    name: 'Moroccan Potato Cigars',
    desc: 'Crispy golden handmade pastry rolls filled with mashed potatoes & caramelized onions, served w/ choice of dipping sauce. Comes w/ 6 pc.',
    price: 13.00,
    category: 'starters',
    image: '/menu/potato-cigars.webp',
    dietary: ['COR Kosher', 'Parve', 'Vegan', 'Vegetarian']
  },
  {
    id: 'starter_wings',
    name: 'Chicken Wings',
    desc: 'Fried w/ sauce of your choice: Sweet chili OR honey garlic. 6 pieces $13 · 12 pieces $23.',
    price: 13.00,
    category: 'starters',
    image: '/menu/wings.webp',
    dietary: ['COR Kosher', 'Meat']
  },
  {
    id: 'starter_cheburek',
    name: 'Crispy Meat Pocket',
    desc: 'Also known as "Cheburek," crispy fried pastry stuffed w/ juicy seasoned ground chicken. Comes w/ 2 pc.',
    price: 13.00,
    category: 'starters',
    image: '/menu/cheburek.webp',
    dietary: ['COR Kosher', 'Meat']
  },
  {
    id: 'starter_loaded_fries',
    name: 'Kapara Loaded Fries',
    desc: 'Homemade fries, schnitzel (your flavor of choice), coleslaw, topped w/ tahini, kapara sauce, & fried eggplant.',
    price: 22.00,
    category: 'starters',
    image: '/menu/loaded-fries.webp',
    dietary: ['COR Kosher', 'Meat', 'House Special']
  },
  {
    id: 'starter_cant_choose_combo',
    name: '"I Can\'t Choose" Combo',
    desc: '3 falafel balls, 3 Moroccan meat cigars, 1 schnitzel, & French fries.',
    price: 22.00,
    category: 'starters',
    image: '/menu/combo.webp',
    dietary: ['COR Kosher', 'Meat']
  },
  {
    id: 'starter_soup',
    name: 'Soup of the Day',
    desc: 'Ask cashier for your options. Veg $8 · Meat $11.',
    price: 8.00,
    category: 'starters',
    image: '/menu/soup.webp',
    dietary: ['COR Kosher', 'Vegetarian Option']
  },

  // --- SCHNITZELS --- (Sandwich $22 · Plate $25)
  {
    id: 'schnitzel_classic',
    name: 'Classic Schnitzel',
    desc: 'Just the way it sounds, your classic golden delicious schnitzel. Gluten Free option available. Sandwich $22 · Plate $25.',
    price: 22.00,
    category: 'schnitzels',
    image: '/menu/schnitzel-classic.webp',
    dietary: ['COR Kosher', 'Meat']
  },
  {
    id: 'schnitzel_asian',
    name: 'Asian Schnitzel',
    desc: 'Golden bread crumbs & sesame seeds in our special Asian-inspired batter. Sandwich $22 · Plate $25.',
    price: 22.00,
    category: 'schnitzels',
    image: '/menu/schnitzel-asian.webp',
    dietary: ['COR Kosher', 'Meat']
  },
  {
    id: 'schnitzel_moroccan',
    name: 'Moroccan Schnitzel',
    desc: 'Golden breadcrumbs with a spicy chili-flakes blend. Sandwich $22 · Plate $25.',
    price: 22.00,
    category: 'schnitzels',
    image: '/menu/schnitzel-moroccan.webp',
    dietary: ['COR Kosher', 'Meat', 'Spicy']
  },
  {
    id: 'schnitzel_french',
    name: 'French Schnitzel',
    desc: 'Golden bread crumbs with a traditional mix of Dijon mustard batter. Sandwich $22 · Plate $25.',
    price: 22.00,
    category: 'schnitzels',
    image: '/menu/schnitzel-french.webp',
    dietary: ['COR Kosher', 'Meat']
  },
  {
    id: 'schnitzel_vegan',
    name: 'Vegan Schnitzel',
    desc: 'Or as we like to call it "Schnitzel Tiras," a savory corn schnitzel. Sandwich $22 · Plate $25.',
    price: 22.00,
    category: 'schnitzels',
    image: '/menu/schnitzel-vegan.webp',
    dietary: ['COR Kosher', 'Parve', 'Vegan', 'Vegetarian']
  },

  // --- ON THE GRILL --- (Plate served w/ rice or fries, salads & sauces)
  {
    id: 'grill_kebab',
    name: 'Kebab',
    desc: 'Flame-grilled seasoned beef & lamb kebab, served in fresh challah, baguette, or wrap. Sandwich $23 · Plate $25.',
    price: 23.00,
    category: 'grill',
    image: '/menu/kebab.webp',
    dietary: ['COR Kosher', 'Meat']
  },
  {
    id: 'grill_chicken_breast',
    name: 'Chicken Breast',
    desc: 'Tender marinated flame-grilled chicken breast, served in challah, baguette, or wrap. Sandwich $22 · Plate $24.',
    price: 22.00,
    category: 'grill',
    image: '/menu/chicken-breast.webp',
    dietary: ['COR Kosher', 'Meat']
  },
  {
    id: 'grill_dark_chicken',
    name: 'Dark Chicken Skewers',
    desc: 'Marinated dark chicken (pargiot) skewers, flame-grilled to juicy perfection. Sandwich $23 · Plate $25.',
    price: 23.00,
    category: 'grill',
    image: '/menu/dark-chicken.webp',
    dietary: ['COR Kosher', 'Meat']
  },
  {
    id: 'grill_steak',
    name: 'Steak Skewers',
    desc: 'Premium flame-grilled Canadian beef steak skewers, seasoned & grilled over open fire. Sandwich $24 · Plate $26.',
    price: 24.00,
    category: 'grill',
    image: '/menu/steak.webp',
    dietary: ['COR Kosher', 'Meat']
  },

  // --- MORE KAPARA... ---
  {
    id: 'more_san_francisco',
    name: 'San Francisco',
    desc: 'Grilled chicken breast OR fried schnitzel, cooked in tomato sauce with sautéed mushrooms & onion. Served on challah bread.',
    price: 39.00,
    category: 'more',
    image: '/menu/schnitzel-classic.webp',
    dietary: ['COR Kosher', 'Meat', 'House Special']
  },
  {
    id: 'more_kapara_burger',
    name: 'Kapara Burger',
    desc: '5oz Canadian beef patty topped with hummus, pickles, banana peppers, tomatoes, lettuce, ketchup, & mayonnaise. Add Fries $2.',
    price: 17.00,
    category: 'more',
    image: '/menu/burger.jpg',
    dietary: ['COR Kosher', 'Meat']
  },
  {
    id: 'more_american_burger',
    name: 'American Burger',
    desc: '5oz Canadian beef patty topped with lettuce, tomato, pickles, ketchup, & mayonnaise. Add Fries $2, Add Parve Cheese $2.',
    price: 17.00,
    category: 'more',
    image: '/menu/burger.jpg',
    dietary: ['COR Kosher', 'Meat']
  },
  {
    id: 'more_mc_cheekan',
    name: 'Mc Cheekan Burger',
    desc: 'Homemade crispy chicken burger on a sesame seed bun, with lettuce & mayonnaise. Add Fries $2.',
    price: 15.00,
    category: 'more',
    image: '/menu/chicken-burger.jpg',
    dietary: ['COR Kosher', 'Meat']
  },
  {
    id: 'more_chicken_caesar_wrap',
    name: 'Crunchy Chicken Caesar Wrap',
    desc: 'Grilled chicken breast OR fried schnitzel, with lettuce, tomato, & Kapara Caesar dressing, wrapped in a white OR whole wheat wrap.',
    price: 22.00,
    category: 'more',
    image: '/menu/caesar-wrap.jpg',
    dietary: ['COR Kosher', 'Meat']
  },
  {
    id: 'more_caesar_salad',
    name: 'Caesar Salad',
    desc: 'Romaine lettuce tossed in our house-made parve Caesar dressing with challah croutons. Add Grilled Chicken OR Schnitzel $10.',
    price: 15.00,
    category: 'more',
    image: '/menu/caesar-salad.jpg',
    dietary: ['COR Kosher', 'Parve', 'Vegetarian']
  },
  {
    id: 'more_shakshuka',
    name: 'Shakshuka',
    desc: '2 poached eggs nested in a warmly spiced tomato & bell pepper sauce. Served with baguette, challah, OR pita. Hamshuka $3 extra (with hummus).',
    price: 15.00,
    category: 'more',
    image: '/menu/shakshuka.jpg',
    dietary: ['COR Kosher', 'Vegetarian']
  },
  {
    id: 'more_loaded_hot_dog',
    name: 'Fully Loaded Kapara Hot Dog',
    desc: '12-inch all-beef hot dog, in a baguette, with your choice of toppings & sauces. Add Fries $2.',
    price: 15.00,
    category: 'more',
    image: '/menu/hot-dog.jpg',
    dietary: ['COR Kosher', 'Meat']
  },
  {
    id: 'more_kids_nuggets',
    name: 'Kids Nuggets & Fries',
    desc: '5 chicken nuggets & fries.',
    price: 13.00,
    category: 'more',
    image: '/menu/nuggets.jpg',
    dietary: ['COR Kosher', 'Meat', 'Kids Option']
  },

  // --- SIDES ---
  {
    id: 'side_small_fries',
    name: 'Small Fries',
    desc: 'Crispy hot hand-cut golden fries.',
    price: 5.00,
    category: 'sides',
    image: '/menu/fries.jpg',
    dietary: ['COR Kosher', 'Parve', 'Vegan', 'Vegetarian', 'Gluten Free']
  },
  {
    id: 'side_large_fries',
    name: 'Large Fries',
    desc: 'A generous basket of hot crispy hand-cut golden fries.',
    price: 8.00,
    category: 'sides',
    image: '/menu/fries.jpg',
    dietary: ['COR Kosher', 'Parve', 'Vegan', 'Vegetarian', 'Gluten Free']
  },
  {
    id: 'side_basmati_rice',
    name: 'Basmati Rice',
    desc: 'Fluffy, fragrant seasoned basmati rice prepared fresh daily.',
    price: 6.00,
    category: 'sides',
    image: '/menu/rice.jpg',
    dietary: ['COR Kosher', 'Parve', 'Vegan', 'Vegetarian', 'Gluten Free']
  },
  {
    id: 'side_salad_plate',
    name: 'Salad Plate',
    desc: 'A fresh, crisp plate of Israeli salad, house coleslaw, sumac onions, and pickled turnip.',
    price: 15.00,
    category: 'sides',
    image: '/menu/salad-plate.jpg',
    dietary: ['COR Kosher', 'Parve', 'Vegan', 'Vegetarian']
  },
  {
    id: 'side_steak_skewer',
    name: '1 Steak Skewer',
    desc: 'A single flame-grilled premium steak skewer.',
    price: 10.00,
    category: 'sides',
    image: '/menu/steak.webp',
    dietary: ['COR Kosher', 'Meat']
  },
  {
    id: 'side_dark_chicken_skewer',
    name: '1 Dark Chicken Skewer',
    desc: 'A single skewer of flame-grilled tender dark chicken (pargiot).',
    price: 9.00,
    category: 'sides',
    image: '/menu/dark-chicken.webp',
    dietary: ['COR Kosher', 'Meat']
  },
  {
    id: 'side_chicken_breast_skewer',
    name: '1 Chicken Breast Skewer',
    desc: 'A single skewer of flame-grilled marinated chicken breast.',
    price: 8.00,
    category: 'sides',
    image: '/menu/chicken-breast.webp',
    dietary: ['COR Kosher', 'Meat']
  },
  {
    id: 'side_kebab_piece',
    name: '1 Kebab Piece',
    desc: 'A single piece of our flame-grilled minced meat kebab.',
    price: 6.00,
    category: 'sides',
    image: '/menu/kebab.webp',
    dietary: ['COR Kosher', 'Meat']
  },
  {
    id: 'side_schnitzel_piece',
    name: '1 Schnitzel Piece',
    desc: 'A single piece of our crispy classic golden chicken schnitzel.',
    price: 8.00,
    category: 'sides',
    image: '/menu/schnitzel-classic.webp',
    dietary: ['COR Kosher', 'Meat']
  }
];
