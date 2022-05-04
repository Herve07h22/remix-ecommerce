import { CartRepository } from "./cart/interfaces/CartRepository";
import { Catalog } from "./catalog/interfaces/Catalog";

export type Dependencies = {
  cartRepository: CartRepository;
  catalog: Catalog;
};
