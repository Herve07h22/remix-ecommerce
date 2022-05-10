import { Catalog } from "../interfaces/Catalog";
import { Product } from "../models/Product";

export class CatalogTest implements Catalog {
  _products: Product[] = [
    {
      sku: "iphone-123",
      description: "Iphone 12 white",
      stock: 3,
      price: 1200,
      picture: "https://source.unsplash.com/random/?iphone",
    },
    {
      sku: "samsung-736",
      description: "Samsung S8 black",
      stock: 2,
      price: 800,
      picture: "https://source.unsplash.com/random/?samsung",
    },
  ];
  async getAllProducts() {
    return this._products;
  }
}
