import React from "react";
import HeroSection from "./HeroSection";
import iphone from "../../assets/apple-iphone-14.webp";
import macmini from "../../assets/mac-mini.webp";
import FeaturedProducts from "./FeaturedProducts";

const HomePage = () => {
  return (
    <div>
      <HeroSection
        title="iPhone 14 Pro"
        subtitle="Experience the power of the latest Iphone 14 Pro with our most Pro camera ever"
        link="/products/67971b6ebc4f0f6c13892b23"
        image={iphone}
      />
      <FeaturedProducts />
      <HeroSection
        title="Build the ultimate setup"
        subtitle="You can add Studio Display and colour-matched Magic accessories to your bag after configure your Mac mini"
        link="/products/67971b6ebc4f0f6c13892b2a"
        image={macmini}
      />
    </div>
  );
};

export default HomePage;
