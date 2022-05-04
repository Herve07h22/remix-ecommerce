import { Product } from "../models/Product";

export interface Catalog {
  getAllProducts: () => Promise<Product[]>;
}
