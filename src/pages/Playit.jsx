import { motion } from "framer-motion";
import { useState } from "react";

export default function Playit() {
  const [loading, setLoading] = useState(true);

  return (
    <motion.div
      className="flex flex-col min-h-screen bg-gradient-to-r from-gray-800 to-gray-600
 text-white py-10 gap-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Header met fade + marge aan zijkanten */}
      <motion.div
        className="bg-white/25 p-8 rounded-xl shadow-xl flex flex-col justify-center mx-[3vw]"
        style={{ height: "20vh" }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-wide text-center md:text-left pb-5 tk-din-arabic">
          PlayIt – Interactieve VR microlearnings
        </h1>
        <h2 className="text-lg font-bold max-w-6xl text-white/90 leading-relaxed tk-din-arabic">
          PlayIt helpt bedrijven om hun medewerkers sneller en leuker op te
          leiden via interactieve VR-simulaties. Het platform is toegankelijk op
          pc, tablet, telefoon en VR-brillen en biedt inzichten in kennis en
          gedragsverandering.
        </h2>
      </motion.div>

      {/* Divider */}
      <div className="h-1 bg-white/50 my-6 w-[94vw] mx-auto"></div>

      {/* Case content + iframe */}
      <div
        className="flex flex-col md:flex-row items-center justify-between gap-16 max-w-[1600px] mx-auto px-[6vw]"
        style={{ height: "70vh" }}
      >
        {/* Linkerkant: Case */}
        <motion.div
          className="flex flex-col gap-6 max-w-xl justify-center text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold tk-din-arabic">
            Case: Verbeteren van onboarding met VR
          </h2>
          <p className="text-base md:text-lg text-white/80 leading-relaxed tk-din-arabic">
            Een bedrijf wil nieuwe medewerkers sneller vertrouwd maken met
            complexe werkomgevingen. Door korte VR-microlearnings te
            ontwikkelen, kunnen medewerkers veilig oefenen met processen en
            machines. Dit verhoogt kennisretentie en maakt de onboarding leuker
            en efficiënter.
          </p>

          <motion.a
            href="https://playit.training/nl"
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.95 }}
            className="tk-din-arabic bg-white text-orange-800 px-6 py-3 rounded-full text-base font-semibold shadow-md hover:scale-105 transition-transform w-max mx-auto md:mx-0"
          >
            🌐 Bezoek website
          </motion.a>
        </motion.div>

        {/* Rechterkant: Iframe */}
        <motion.div
          className="flex justify-center relative items-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          style={{ height: "100%" }}
        >
          {/* Loading overlay */}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-white mb-4"></div>
              </div>
            </div>
          )}

          {/* Iframe container */}
          <div
            className="overflow-hidden rounded-3xl shadow-2xl border-4 border-white/20"
            style={{
              width: "70vh",
              height: "40vh",
            }}
          >
            <iframe
              src="https://playit.training/nl"
              title="PlayIt website"
              className="w-full h-full border-0 rounded-3xl"
              onLoad={() => setLoading(false)}
            ></iframe>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
