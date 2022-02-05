import { App } from "@sugggest/core/App";
import { Hero } from "~/components/sections/Hero";

export async function loader() {
  const result = await App.getAToken({ email: "herve@camilab.co" });
  console.log("result: ", result);
  return { status: "success" };
}

export default function IndexRoute() {
  return (
    <Hero
      title="Des idées de noms générées par l'IA."
      subtitle="Obtenez automatiquement des propositions de noms de boutiques et de e-ecommerce en décrivant ce que vous vendez."
      image="https://source.unsplash.com/collection/404339/800x600"
      ctaText="Obtenir un accès gratuit"
      ctaLink="/signup"
      ctaFooter=""
    ></Hero>
  );
}
