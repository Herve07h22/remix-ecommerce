import { Dependencies } from "~/domain/Dependencies";
import { Cart, newCart } from "../models/Cart";

export async function addToCart(
  params: { productSku: string },
  dependencies: Dependencies
): Promise<Cart> {
  // TODO
  return newCart();
}
