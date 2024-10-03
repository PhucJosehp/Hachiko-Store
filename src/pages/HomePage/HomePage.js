import React, { useState, useEffect } from "react";
import "../../assets/App.css";
import Carousel from "./Carousel";
import AboutUs from "./AboutUs";
import Mainview from "./Mainview";
import { ChevronDoubleUpIcon } from "@heroicons/react/24/outline";

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 1080) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="w-full h-full bg-white">
      <AboutUs />
      <Carousel />
      <Mainview />
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="btn btn-circle fixed bottom-4 right-4 bg-[--secondary] text-white hover:bg-[--hover-secondary] transition duration-300"
        >
          <ChevronDoubleUpIcon className="size-5" />
        </button>
      )}
    </div>
  );
}
