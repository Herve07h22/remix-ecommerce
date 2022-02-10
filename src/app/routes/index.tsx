import { Hero } from "~/app/components/sections/Hero";

export default function IndexRoute() {
  return (
    <Hero
      title="Des idées de noms générées par l'IA."
      subtitle="Obtenez automatiquement des propositions de noms de boutiques et de e-ecommerce en décrivant ce que vous vendez."
      image="/sugggest-exemple-annote.png"
      ctaText="Obtenir un accès gratuit"
      ctaLink="/signup"
      ctaFooter=""
    ></Hero>
  );
}
