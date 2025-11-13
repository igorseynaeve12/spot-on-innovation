import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SideBar from "../components/SideBar";
import casesData from "../data/cases.json";

export default function Case() {
  const cases = casesData.cases;
  const itemsPerPage = 4; // aantal cases per "slide"
  const [page, setPage] = useState(0);

  // Bereken hoeveel pagina's er zijn
  const totalPages = Math.ceil(cases.length / itemsPerPage);

  // Automatisch van pagina wisselen elke 10 seconden
  useEffect(() => {
    const interval = setInterval(() => {
      setPage((prev) => (prev + 1) % totalPages);
    }, 10000);
    return () => clearInterval(interval);
  }, [totalPages]);

  // Huidige cases selecteren
  const startIndex = page * itemsPerPage;
  const visibleCases = cases.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="flex h-screen bg-[#ffffff] text-[#48365c] overflow-hidden">
      {/* Sidebar */}
      <SideBar className="h-full" />

      {/* Hoofdcontent */}
      <div className="flex-1 flex flex-col p-10 relative overflow-hidden">
        {/* Titel */}
        <h1 className="text-6xl font-bold text-[#95c11f] tk-din-arabic text-center mb-10">
          Cases
        </h1>

        {/* Slideshow grid */}
        <div className="flex-1 flex justify-center items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8 w-full max-w-5xl"
            >
              {visibleCases.map((caseItem) => (
                <div
                  key={caseItem.id}
                  className="bg-[#552a87] rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition-all duration-300"
                >
                  <img
                    src={caseItem.image}
                    alt={caseItem.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-2xl font-semibold text-white mb-2 tk-din-arabic">
                    {caseItem.name}
                  </h3>
                  <p className="text-white text-sm mb-3 line-clamp-3 tk-din-arabic">
                    {caseItem.description}
                  </p>
                  <p className="text-sm text-gray-200 tk-din-arabic">
                    <strong>Klant:</strong> {caseItem.client}
                  </p>
                  <p
                    className={`text-lg font-semibold mt-2 tk-din-arabic ${
                      caseItem.status === "Afgerond"
                        ? "text-green-200"
                        : "text-yellow-200"
                    }`}
                  >
                    {caseItem.status}
                  </p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Optionele voortgangsbalk */}
        <motion.div
          key={page}
          className="absolute bottom-6 left-0 right-0 h-1 bg-[#95c11f]/30"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 10, ease: "linear" }}
        />
      </div>
    </div>
  );
}
