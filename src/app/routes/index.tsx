import { Hero } from "~/app/components/sections/Hero";

export default function IndexRoute() {
  return (
    <Hero
      title="Best smartphones ever."
      subtitle="Enter our brand new e-commerce website made with Remix.run."
      image="/smartphones.jpg"
      ctaText="Shop now"
      ctaLink="/catalog"
      ctaFooter=""
    ></Hero>
  );
}
