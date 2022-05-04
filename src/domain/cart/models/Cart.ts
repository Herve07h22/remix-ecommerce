import { v4 as uuidv4 } from "uuid";
import { Product } from "~/domain/catalog/models/Product";

export type Cart = {
  id: string; // uuid
  userId?: number; // undefined if the user is not authenticaed yet
  products: Product[];
  total: number;
  discount: number;
};

export function newCart(): Cart {
  return {
    id: uuidv4(),
    products: [],
    total: 0,
    discount: 0,
  };
}
