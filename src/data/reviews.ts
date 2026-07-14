// Curated 5-star Google reviews for Kapara, lightly trimmed for card length.
// Source: Kapara's Google Maps listing, 4.7 stars, 225+ reviews.
export const GOOGLE_RATING = '4.7';
export const GOOGLE_REVIEW_COUNT = '225+';
export const GOOGLE_REVIEWS_URL =
  'https://www.google.com/maps/place/Kapara/@43.8100041,-79.4547879,17z/data=!3m1!4b1!4m6!3m5!1s0x882b2d617a6bccdb:0x65eedf331e1f9d4!8m2!3d43.8100041!4d-79.452213!16s%2Fg%2F11ssl2ckgw';

export interface Review {
  name: string;
  stars: number;
  emoji: string;
  quote: string;
}

export const REVIEWS: Review[] = [
  { name: 'Nayomi Shapiro', stars: 5, emoji: '🍔', quote: "I had such a great experience here! The food was fresh, flavorful, and served in generous portions. The burger was perfectly cooked, juicy, and packed with flavor." },
  { name: 'Emily ESB', stars: 5, emoji: '🥡', quote: "Fantastic find! Wide selection and options to customize, very tasty food, large portions, fast service and very reasonable pricing. Highly recommend!" },
  { name: 'Marcus Kadoch', stars: 5, emoji: '🥪', quote: "Not my first time here and I don't normally leave reviews, but the food here is amazing. Always fresh and the staff is really friendly. Best schnitzel sandwich!" },
  { name: 'Emily Hawkes', stars: 5, emoji: '🧆', quote: "Wow! The pita is so light and fluffy. Hummus is amazing! The falafel is nice and crispy with a soft middle — just perfect! Great for a quick bite to eat!" },
  { name: 'Mark Anhang', stars: 5, emoji: '🎉', quote: "Delicious and savoury menu with exceptional service and presentation for takeout catering! Best schnitzels ever, wings, salads, and don't forget the Moroccan cigars!" },
  { name: 'Emily Cardwell', stars: 5, emoji: '😋', quote: "The absolute best experience! I tried the authentic Israeli schnitzel sandwich and it was packed with flavour — crispy outside, juicy inside, perfectly seasoned." },
  { name: 'Shira Kirzner', stars: 5, emoji: '🌙', quote: "Fresh food plus authentic Israeli shnitzel with a crunch. Good service and open late — will definitely be back!" },
  { name: 'Matthew Firszt', stars: 5, emoji: '🕯️', quote: "We had a very large group in for a preset Shabbat dinner style meal with salads, shnitzel, wings, beef kebabs. Everyone loved the food and atmosphere!" },
  { name: 'michelle konnyi', stars: 5, emoji: '🌽', quote: "My favourite spot in Thornhill. Delicious middle eastern inspired food with vegetarian and vegan options! Great vibes & friendly staff." },
  { name: 'Refael Babaev', stars: 5, emoji: '🙏', quote: "Amazing customer service. They accidentally forgot my order of fries — the manager apologized and delivered it right to my door, no extra charge." },
  { name: 'Jacob S', stars: 5, emoji: '🥙', quote: "Delicious schnitzel sandwiches, kebabs, and fresh salads. Lots of seating and fast service. Reasonably priced. Highly recommended." },
  { name: 'Michael Khaikin', stars: 5, emoji: '🍖', quote: "I highly recommend this place to anyone looking to have a meaty experience. Recently expanded with an outdoor patio. Great food and atmosphere." },
  { name: 'Moises Assa Kassin', stars: 5, emoji: '⭐', quote: "Excellent place to eat, food quality great, great pricing, clean, food made with high quality ingredients and good portions. Highly recommended!" },
  { name: 'David K', stars: 5, emoji: '🍔', quote: "My burger was excellent, the best I've had in years. My wife got the Moroccan flavored schnitzel, and she also enjoyed it completely. Not to be missed." },
  { name: 'Tal Mozes', stars: 5, emoji: '❤️', quote: "This place serves the most delicious schnitzel I've ever had! The owner is incredibly kind and generous. Perfectly crispy and flavorful." },
  { name: 'Sasha', stars: 5, emoji: '🍗', quote: "From the moment we walked in, my wife and I were greeted by friendly staff who guided us through the menu. Chicken schnitzel sandwich and beef kebab — both great." },
  { name: 'KJ de Leon', stars: 5, emoji: '🌱', quote: "The vegan schnitzel is so good!! The meal was so delicious, you won't be disappointed — everything tastes fresh." },
  { name: 'Akiva Levinson', stars: 5, emoji: '🌶️', quote: "The Moroccan sandwich was absolutely phenomenal! Fresh, flavorful veggies and perfectly balanced sauces — crispy, creamy, tangy, and savory all at once." },
  { name: 'Eden Aronovich', stars: 5, emoji: '🏆', quote: "Atmosphere and food is amazing! Had the Moroccan schnitzel sandwich — by far the best schnitzel sandwich I've ever had. 12 out of 10 would highly recommend." },
  { name: 'Alexander V', stars: 5, emoji: '🙌', quote: "Kapara is my go to spot in the city for quality, kosher food. Crispy and juicy homemade schnitzel sandwiches to freshly grilled kebabs — you can't go wrong." },
];
