import { motion } from "framer-motion";
import { useState } from "react";

export default function Squadron() {
  const [loading, setLoading] = useState(true);

  return (
    <motion.div
      className="flex flex-col min-h-screen bg-gradient-to-r from-gray-800 to-gray-600 text-white gap-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Algemene titel bovenaan */}
      <motion.div className="bg-white/25 p-8 rounded-xl shadow-xl flex flex-col justify-center mx-[3vw] my-[2vh]">
        <h1 className="text-5xl md:text-6xl tk-din-arabic font-extrabold tracking-wide text-center md:text-left pb-4">
          Squadron – Communications app
        </h1>
        <h2 className="text-lg tk-din-arabic font-bold leading-relaxed text-white/90">
          Squadron ontwikkelt digitale communicatieoplossingen die bedrijven
          helpen om teams beter te verbinden, workflows te verbeteren en
          samenwerking te versnellen met gebruiksvriendelijke apps en
          dashboards.
        </h2>
      </motion.div>

      {/* Divider */}
      <div className="h-1 bg-white/50 mx-[3vw]"></div>

      {/* Case content en iframe in 2 kolommen */}
      <div
        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 mx-[3vw] mb-[4vh]"
        style={{ minHeight: "60vh" }}
      >
        {/* Linkerkant: Case */}
        <motion.div
          className="flex flex-col gap-6 max-w-md md:max-w-lg"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold tk-din-arabic">
            Case: Digitale communicatie verbeteren
          </h2>
          <p className="text-base tk-din-arabic md:text-lg text-white/80 leading-relaxed">
            Een organisatie wilde de interne communicatie verbeteren en
            afstemmen op moderne werkmethodes. Squadron bouwde een
            gebruiksvriendelijke communicatie-app waarmee teams in real-time
            informatie kunnen delen, meldingen ontvangen en snel feedback kunnen
            geven. Zo werd de samenwerking merkbaar efficiënter.
          </p>

          <motion.a
            href="https://www.squadron.be"
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.95 }}
            className="tk-din-arabic bg-white text-blue-900 px-4 md:px-6 py-2 md:py-3 rounded-full text-sm md:text-base font-semibold shadow-md hover:scale-105 transition-transform w-max"
          >
            🌐 Bezoek website
          </motion.a>
        </motion.div>

        {/* Rechterkant: Iframe */}
        <motion.div
          className="flex-1 flex justify-center relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Loading overlay */}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-white mb-4"></div>
              </div>
            </div>
          )}

          {/* Iframe */}
          <div
            className="overflow-hidden rounded-3xl shadow-2xl border-4 border-white/20 w-full md:w-3/4 lg:w-2/3"
            style={{ height: "45vh" }}
          >
            <iframe
              src="https://www.squadron.be"
              title="Squadron website"
              className="w-full h-full border-0 rounded-3xl"
              onLoad={() => setLoading(false)}
            ></iframe>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
