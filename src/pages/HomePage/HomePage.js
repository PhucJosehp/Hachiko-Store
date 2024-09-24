import React from "react";
import "../../assets/App.css";
import Carousel from "./Carousel";
import AboutUs from "./AboutUs";
import Mainview from "./Mainview";

export default function HomePage() {
  return (
    <div className="w-full h-full bg-white">
      <AboutUs />
      <Carousel />
      <Mainview />
    </div>
  );
}
