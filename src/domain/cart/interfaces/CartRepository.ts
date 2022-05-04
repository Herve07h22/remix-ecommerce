import { Cart } from "../models/Cart";

export interface CartRepository {
  save: (cart: Cart) => Promise<void>;
  load: () => Promise<Cart>; // assume there is only 1 cart at the same time in the browser
}
