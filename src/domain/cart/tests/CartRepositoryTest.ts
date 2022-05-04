import { CartRepository } from "../interfaces/CartRepository";
import { Cart, newCart } from "../models/Cart";

export class CartRepositoryTest implements CartRepository {
  _cart: Cart = newCart();

  async save(cart: Cart) {
    this._cart = cart;
  }

  async load() {
    return this._cart;
  }
}
