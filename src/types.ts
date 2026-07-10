export interface BakeryItem {
  id: string;
  name: string;
  desc: string;
  price: number;
  category: 'starters' | 'schnitzels' | 'grill' | 'more' | 'sides';
  image: string;
  dietary: string[];
}

export type ActivePage = 'home' | 'about' | 'menu' | 'reservations' | 'catering' | 'location';

// External online-ordering (Clover) — opened in a new tab from all "Order Online" CTAs.
export const ORDER_ONLINE_URL = 'https://www.clover.com/online-ordering/kapara-by-keechenpappi-vaughan';
