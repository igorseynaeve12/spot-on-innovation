import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SideBar from "../components/SideBar";
import companiesData from "../data/companies.json";

export default function Home() {
  const companies = companiesData.companies;
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % companies.length);
      setLoading(true);
    }, 12000);
    return () => clearInterval(interval);
  }, [companies.length]);

  const company = companies[index];
  if (!company) return null;

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-[#ffffff] text-[#48365c] overflow-auto">
      {/* Sidebar */}

      <SideBar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-evenly px-4 lg:px-10 py-2 lg:py-6">
        {/* Titel */}
        <motion.div className="py-0 lg:py-2">
          <h1 className="text-3xl sm:text-5xl tk-din-arabic font-extrabold pb-2 text-center lg:text-left">
            {company.title}
          </h1>
          <p className="text-sm sm:text-lg tk-din-arabic font-bold leading-relaxed text-[#48365c]/90 text-center lg:text-left">
            {company.description}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={company.id}
            className="flex flex-col lg:flex-row items-center lg:items-center justify-center lg:justify-around gap-6 lg:gap-10 w-full"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8 }}
          >
            {/* Case info */}
            <motion.div
              className="flex flex-col gap-4 lg:gap-6 shrink-0 w-full lg:w-1/3 text-center lg:text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tk-din-arabic">
                {company.caseTitle}
              </h2>
              <p className="text-sm sm:text-base md:text-lg tk-din-arabic text-[#95c11f]/80 leading-relaxed">
                {company.caseDescription}
              </p>
              <motion.a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.95 }}
                className="tk-din-arabic bg-[#552a87] text-white px-4 md:px-6 py-2 md:py-3 text-sm md:text-base font-semibold shadow-md hover:bg-[#552a87]/85 transition-transform w-max mx-auto lg:mx-0"
              >
                Bezoek website
              </motion.a>
            </motion.div>

            {/* Iframe */}
            <motion.div
              className="flex-1 flex justify-center w-full lg:w-2/3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/10 rounded-3xl">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-white"></div>
                </div>
              )}

              <div
                className="overflow-hidden rounded-3xl border-4 border-white/20 w-full"
                style={{ aspectRatio: "16/9", minHeight: "300px" }}
              >
                <iframe
                  src={company.iframeUrl}
                  title={`${company.name} website`}
                  className="w-full h-full border-6 rounded-3xl"
                  onLoad={() => setLoading(false)}
                />
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Voortgangsbalk */}
        <motion.div
          key={index}
          className="h-1 bg-[#95c11f]/30 rounded w-full max-w-6xl mt-8"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 12, ease: "linear" }}
        />
      </div>
    </div>
  );
}
