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
    <div className="flex h-screen bg-[#ffffff] text-[#48365c] overflow-hidden">
      <SideBar className="h-full" />

      <div className="flex-1 flex flex-col items-center justify-center relative px-20">
        {/* Titel bovenaan */}
        <motion.div className="absolute top-10  p-6 rounded-xl w-full text-center">
          <h1 className="text-5xl md:text-6xl tk-din-arabic font-extrabold tracking-wide pb-2">
            {company.title}
          </h1>
          <p className="text-lg tk-din-arabic font-bold leading-relaxed text-[#48365c]/90">
            {company.description}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={company.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col md:flex-row items-start md:items-stretch justify-between gap-10 mt-48 w-full`}
          >
            {/* Linkerkant: Case info */}
            <motion.div
              className="flex flex-col gap-6 max-w-md md:max-w-lg shrink-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold tk-din-arabic">
                {company.caseTitle}
              </h2>
              <p className="text-base tk-din-arabic md:text-lg text-[#95c11f]/80 leading-relaxed">
                {company.caseDescription}
              </p>

              <motion.a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.95 }}
                className="tk-din-arabic bg-[#552a87] text-white px-4 md:px-6 py-2 md:py-3 text-sm md:text-base font-semibold shadow-md hover:bg-[#552a87]/85 transition-transform w-max"
              >
                Bezoek website
              </motion.a>
            </motion.div>

            {/* Rechterkant: Iframe full width */}
            <motion.div
              className={`flex-1 flex justify-center relative ${company.color} p-6 rounded-3xl shadow-2xl`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-white mb-4"></div>
                  </div>
                </div>
              )}

              <div
                className="overflow-hidden rounded-3xl shadow-2xl border-4 border-white/20 w-full"
                style={{ height: "60vh" }}
              >
                <iframe
                  src={company.iframeUrl}
                  title={`${company.name} website`}
                  className="w-full h-full border-0 rounded-3xl"
                  onLoad={() => setLoading(false)}
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Voortgangsbalk */}
        <motion.div
          key={index}
          className="absolute bottom-6 left-10 right-10 h-1 bg-[#95c11f]/30 rounded"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 12, ease: "linear" }}
        />
      </div>
    </div>
  );
}
