import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SideBar from "../components/SideBar";
import storiesData from "../data/succes.json";

export default function SuccesStories() {
  const stories = storiesData.successStories;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % stories.length);
    }, 10000); // wissel elke 10 seconden
    return () => clearInterval(interval);
  }, [stories.length]);

  const story = stories[index];

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      <SideBar className="h-full" />

      <div className="flex-1 flex flex-col items-center justify-center relative px-20">
        <h1 className="absolute top-10 text-6xl font-bold text-[#95c11f] tk-din-arabic">
          Onze Succesverhalen
        </h1>

        <AnimatePresence mode="wait">
          <motion.div
            key={story.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center max-w-4xl space-y-6"
          >
            {/* Afbeelding */}
            <img
              src={story.image}
              alt={story.title}
              className="w-full h-96 object-cover rounded-3xl shadow-2xl"
            />

            {/* Titel */}
            <h2 className="text-5xl font-bold text-[#95c11f] tk-din-arabic">
              {story.title}
            </h2>

            {/* Beschrijving */}
            <p className="text-xl text-gray-300 tk-din-arabic">
              {story.description}
            </p>

            {/* Klant & Status */}
            <p className="text-lg text-gray-400 tk-din-arabic">
              <strong>Klant:</strong> {story.client} | <strong>Status:</strong>{" "}
              <span
                className={
                  story.status === "Afgerond"
                    ? "text-green-400"
                    : "text-yellow-400"
                }
              >
                {story.status}
              </span>
            </p>

            {/* Meer info knop */}
            <a
              href={`/succesverhalen/${story.id}`}
              className="bg-[#95c11f] text-gray-900 px-6 py-3 rounded-xl font-bold hover:bg-green-400 transition"
            >
              Meer info
            </a>
          </motion.div>
        </AnimatePresence>

        {/* Voortgangsbalk onderaan */}
        <motion.div
          key={index}
          className="absolute bottom-6 left-20 right-20 h-1 bg-[#95c11f]/30 rounded"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 10, ease: "linear" }}
        />
      </div>
    </div>
  );
}
