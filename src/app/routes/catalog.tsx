import { Container, VStack } from "@chakra-ui/react";
import {
  ActionFunction,
  Form,
  json,
  LoaderFunction,
  useLoaderData,
} from "remix";
import { Cart } from "~/domain/cart/models/Cart";
import { Product } from "~/domain/catalog/models/Product";
import { App } from "../../App.server";

export const loader: LoaderFunction = async () => {
  const products = await App.getAllProducts();
  const cart = await App.getCart();
  return json({ products, cart });
};

export const action: ActionFunction = async ({ request }) => {
  const body = await request.formData();
  const productSkuToAdd = body.get("addToCart");
  console.log("productSkuToAdd:", productSkuToAdd);
  return json({
    message: `product ${productSkuToAdd} added to cart`,
    error: "",
  });
};

export default function CatalogRoute() {
  const { products, cart } = useLoaderData<{
    products: Product[];
    cart: Cart;
  }>();

  return (
    <Container maxW="2xl">
      <VStack spacing={8} align="stretch" mb="5rem">
        <div>TODO : display the list of products</div>
        <div>{cart.products.length} products in the cart</div>
        <div>{products.length} products in the catalog</div>
        <Form method="post">
          <button type="submit" name="addToCart" value="iphone-123">
            +
          </button>
        </Form>
      </VStack>
    </Container>
  );
}
