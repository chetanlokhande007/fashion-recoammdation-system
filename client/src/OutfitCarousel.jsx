import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function OutfitCarousel({ images }) {
  const [[index, direction], setIndex] = useState([0, 0]);

  const nextSlide = () => {
    setIndex([(index + 1) % images.length, 1]);
  };

  const prevSlide = () => {
    setIndex([
      index === 0 ? images.length - 1 : index - 1,
      -1
    ]);
  };

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [index]);

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">

      <div className="relative h-96 overflow-hidden rounded-3xl shadow-2xl border border-white/10 bg-white/5 backdrop-blur-xl">

        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={index}
            src={images[index]}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                nextSlide();
              } else if (swipe > swipeConfidenceThreshold) {
                prevSlide();
              }
            }}
            className="absolute inset-0 w-full h-full object-cover rounded-3xl cursor-grab active:cursor-grabbing"
          />
        </AnimatePresence>

        {/* Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 px-4 py-2 rounded-full hover:bg-rose-500 transition hidden md:block"
        >
          ◀
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 px-4 py-2 rounded-full hover:bg-rose-500 transition hidden md:block"
        >
          ▶
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-6 gap-3">
        {images.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex([i, i > index ? 1 : -1])}
            className={`h-3 w-3 rounded-full cursor-pointer transition ${
              i === index
                ? "bg-rose-500 scale-125"
                : "bg-gray-500"
            }`}
          />
        ))}
      </div>

    </div>
  );
}