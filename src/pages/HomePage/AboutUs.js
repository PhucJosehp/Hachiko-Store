import React from "react";

export default function AboutUs() {
  const scrollToSection = () => {
    window.scrollTo({
      top: 1450, // Replace with desired Y position
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full h-fit p-10 bg-[--secondary] font-breeSerif flex items-center flex-wrap justify-evenly gap-6">
      <div className="w-[450px] flex flex-col gap-y-4 text-[--primary]">
        <p className="text-5xl">About Us</p>
        <p className="text-lg">
          Our team is dedicated to helping you find exactly what you're looking
          for, whether it's a specific item or advice on what might suit you
          best. Visit us today and experience our commitment to excellence.
        </p>
        <div className="flex flex-col gap-2 text-xl">
          <p>"Stylish. Sustainable. Simply You."</p>
          <p>Eco-chic fashion for the conscious trendsetter</p>
          <p
            onClick={scrollToSection}
            className="underline hover:cursor-pointer w-fit"
          >
            Shop now
          </p>
        </div>
      </div>
      <img src="./thumbnail.jpg" alt="thumbnail" />
    </div>
  );
}
