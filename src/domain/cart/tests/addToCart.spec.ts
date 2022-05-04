import { CatalogTest } from "../../catalog/tests/CatalogTest";
import { Dependencies } from "~/domain/Dependencies";
import { addToCart } from "../usecases/addToCart";
import { CartRepositoryTest } from "./CartRepositoryTest";

var dependencies: Dependencies;

beforeEach(() => {
  dependencies = {
    cartRepository: new CartRepositoryTest(),
    catalog: new CatalogTest(),
  };
});

it("A user can add a single product to en empty cart", async () => {
  const cart = await addToCart({ productSku: "iphone-123" }, dependencies);
  expect(cart.total).toBe(1200);
  expect(cart.discount).toBe(0);
});

it("A user can add 2 different products to en empty cart", async () => {
  await addToCart({ productSku: "iphone-123" }, dependencies);
  const cart = await addToCart({ productSku: "samsung-736" }, dependencies);
  expect(cart.total).toBe(2000);
  expect(cart.discount).toBe(0);
});

it("When a user add a the same product twice, he earns a 20% discount on the 2nd product", async () => {
  await addToCart({ productSku: "iphone-123" }, dependencies);
  const cart = await addToCart({ productSku: "iphone-123" }, dependencies);
  expect(cart.total).toBe(2160);
  expect(cart.discount).toBe(240);
});
