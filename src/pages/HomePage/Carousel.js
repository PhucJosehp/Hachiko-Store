/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 4;

  const listImageCarousel = [
    { imgLink: "./carou2.jpg" },
    { imgLink: "./carou3.jpg" },
    { imgLink: "./carou4.jpg" },
    { imgLink: "./carou5.jpg" },
  ];

  function handleNext() {
    setCurrentSlide((prev) => (prev % totalSlides) + 1);
  }

  function handlePrev() {
    setCurrentSlide((prev) => (prev - 1 === 0 ? totalSlides : prev - 1));
  }

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel w-full ">
      {listImageCarousel.map(({ imgLink }, index) => (
        <div
          key={index}
          className={`carousel-item relative w-full bg-[--secondary] transition-opacity duration-1000 ease-in-out ${
            currentSlide === index + 1 ? "block" : "hidden"
          }`}
        >
          <img
            src={imgLink}
            className="w-[80%] h-auto object-cover aspect-video object-center m-auto"
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <button
              onClick={handlePrev}
              className="btn btn-circle bg-transparent border-0"
            >
              ❮
            </button>
            <button
              onClick={handleNext}
              className="btn btn-circle bg-transparent border-0"
            >
              ❯
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
