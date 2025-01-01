import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
    name: "Charles Dickens",
    title: "A Tale of Two Cities",
  },
  {
    quote:
      "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
    name: "William Shakespeare",
    title: "Hamlet",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
  },
  {
    quote:
      "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    name: "Jane Austen",
    title: "Pride and Prejudice",
  },
  {
    quote:
      "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
];

export function InfiniteMovingCardsDemo() {
  const [duplicatedTestimonials, setDuplicatedTestimonials] = useState([]);

  useEffect(() => {
    // Duplicate the testimonials to create a seamless loop
    setDuplicatedTestimonials([...testimonials, ...testimonials]);
  }, []);

  return (
    <div className="relative h-[40rem] max-w-6xl mx-auto overflow-hidden bg-white dark:bg-gray-800">
      <motion.div
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 5,
            ease: "linear",
          },
        }}
        className="flex gap-4 px-2"
      >
        {duplicatedTestimonials.map((testimonial, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-[350px] h-[400px] rounded-2xl bg-gray-100 dark:bg-gray-700 p-8 flex flex-col justify-between"
          >
            <p className="text-gray-800 dark:text-gray-200 line-clamp-6">
              "{testimonial.quote}"
            </p>
            <div>
              <p className="text-gray-900 dark:text-gray-100 font-semibold">
                {testimonial.name}
              </p>
              <p className="text-gray-600 dark:text-gray-400">{testimonial.title}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}


