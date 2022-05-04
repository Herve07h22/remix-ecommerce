import * as dotenv from "dotenv";
import { CartRepositoryTest } from "./domain/cart/tests/CartRepositoryTest";
import { addToCart } from "./domain/cart/usecases/addToCart";
import { CatalogTest } from "./domain/catalog/tests/CatalogTest";
import { Dependencies } from "./domain/Dependencies";

const path = require("path");

dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

const dependencies: Dependencies = {
  cartRepository: new CartRepositoryTest(),
  catalog: new CatalogTest(),
};

export const App = {
  addToCart: async (params: { productSku: string }) =>
    addToCart(params, dependencies),
  getAllProducts: async () => dependencies.catalog.getAllProducts(),
  getCart: async () => dependencies.cartRepository.load(),
};
