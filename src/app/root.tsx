import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";
import type { MetaFunction } from "remix";
import { ChakraProvider } from "@chakra-ui/react";
import customTheme from "./utils/theme";
import { LandingLayout } from "./components/layouts/LandingLayout";

export const meta: MetaFunction = () => {
  return {
    title: "RemixCommerce | E-commerce sample with Remix",
    description: "E-commerce website with Remix",
  };
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ChakraProvider theme={customTheme}>
          <LandingLayout>
            <Outlet />
          </LandingLayout>
        </ChakraProvider>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
