export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  activeSize: number;
  activeType: number;
  count: number;
};

export interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}
