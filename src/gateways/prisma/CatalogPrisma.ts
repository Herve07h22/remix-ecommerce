import { Catalog } from "~/domain/catalog/interfaces/Catalog";
import { db } from "./db.server";

export class CatalogPrisma implements Catalog {
  async getAllProducts() {
    return db.product.findMany();
  }
}
