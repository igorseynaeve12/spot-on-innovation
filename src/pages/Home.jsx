import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";

export default function Home() {
  const navigate = useNavigate();

  const isDev = true;

  const companies = [
    {
      name: "Squadron",
      color: "bg-[#305984]",
      route: "/squadron",
      image: "/images/36199_squadron.png",
    },
    {
      name: "Vintecc",
      color: "bg-[#95c11f]",
      route: "/vintecc",
      image: "/images/vintecc_logo.png",
    },
    {
      name: "Playit",
      color: "bg-[#305984]",
      route: "/playit",
      image: "/images/Play-IT-Logo-website-1.jpg",
    },
    {
      name: "Festo",
      color: "bg-[#95c11f]",
      route: "/festo",
      image: "/images/festo.png",
    },
    {
      name: "24Flow",
      color: "bg-[#305984]",
      route: "/24flow",
      image: "/images/24flow.png",
    },
    {
      name: "Innoptus",
      color: "bg-[#95c11f]",
      route: "/innoptus",
      image: "/images/innoptus.png",
    },
  ];

  // Sidebar items (niet gerelateerd aan bedrijven)

  return (
    <div className="flex min-h-screen bg-gray-800">
      <SideBar></SideBar>

      {/* Main content */}
      <motion.div
        className="flex-1 flex flex-col items-center gap-10 pt-6 px-4 md:px-0 overflow-auto"
        initial={isDev ? {} : { opacity: 0 }}
        animate={isDev ? {} : { opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="tk-din-arabic font-bold text-4xl md:text-6xl text-[#95c11f] text-center mb-10">
          Spot On Innovations
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 w-full max-w-6xl">
          {companies.map((company) => (
            <motion.div
              key={company.name}
              className={`${company.color} flex items-center justify-center rounded-3xl shadow-2xl cursor-pointer hover:scale-105 transition-transform`}
              style={{ aspectRatio: "4/3" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(company.route)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && navigate(company.route)}
            >
              <div className="flex items-center justify-center overflow-hidden rounded-xl bg-white p-4 w-3/4 h-3/4">
                <img
                  src={company.image}
                  alt={`${company.name} Logo`}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
