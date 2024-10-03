import React, { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

const imgs = ["./carou2.jpg", "./carou3.jpg", "./carou4.jpg", "./carou5.jpg"];

const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 5;

const SPRING_OPTIONS = {
  type: "spring",
  mass: 3,
  stiffness: 400,
  damping: 50,
};

export default function Carousel() {
  const [imgIndex, setImgIndex] = useState(0);
  const dragX = useMotionValue(0);

  useEffect(() => {
    const intervalRef = setInterval(() => {
      setImgIndex((prevIndex) => (prevIndex + 1) % imgs.length);
    }, AUTO_DELAY);

    return () => clearInterval(intervalRef);
  }, []);

  const onDragEnd = () => {
    const x = dragX.get();

    if (x <= -50 && imgIndex < imgs.length - 1) {
      setImgIndex((prev) => prev + 1);
    } else if (x >= 50 && imgIndex > 0) {
      setImgIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="relative overflow-hidden h-screen">
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        style={{ x: dragX }}
        animate={{ translateX: `-${imgIndex * 100}%` }}
        transition={SPRING_OPTIONS}
        onDragEnd={onDragEnd}
        className="flex h-[85%]"
      >
        {imgs.map((imgSrc, index) => (
          <motion.div
            key={index}
            style={{
              backgroundImage: `url(${imgSrc})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="aspect-auto h-full w-full shrink-0"
          />
        ))}
      </motion.div>

      <Dots imgIndex={imgIndex} setImgIndex={setImgIndex} />
    </div>
  );
}

const Dots = ({ imgIndex, setImgIndex }) => {
  return (
    <div className="mt-6 flex w-full justify-center gap-2">
      {imgs.map((_, idx) => (
        <button
          key={idx}
          onClick={() => setImgIndex(idx)}
          className={`h-3 w-3 rounded-full transition-colors ${
            idx === imgIndex ? "bg-[--primary]" : "bg-[--secondary]"
          }`}
        />
      ))}
    </div>
  );
};
