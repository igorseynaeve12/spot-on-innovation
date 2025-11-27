import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SideBar from "../components/SideBar";

const videoList = [
  {
    id: "JObkfDHl_j8",
    title: "360° view Innovatielab The Ultimate Machine - Reverb Chamber",
  },
  {
    id: "69c1D5w4TA0",
    title: " 360° view Innovatielab The Ultimate Machine - Anechoic Chamber ",
  },
  {
    id: "VMYGkXuFQsI",
    title:
      " 360° view - Innovationlab The Ultimate Machine - Machine vision for pick & place ",
  },
  {
    id: "O2n3v-HujGc",
    title: " 360° view Innovatielab The Ultimate Machine - HALT kamer ",
  },
  {
    id: "9Mei7gLlf8s",
    title: "360° view Innovatielab The Ultimate Factory",
  },
  {
    id: "mAgaPoOm8ec",
    title:
      "360° view Applicatielab Smart Production & Assembly - Smart Assembly Line ",
  },
  {
    id: "_lYBBssdUQU",
    title:
      "360° view Applicatielab Smart Production Organisation - Digital Twin",
  },
  {
    id: "KIrnGRBRoJ8",
    title: "360° view Technologielab Augmented & Virtual Reality",
  },
  {
    id: "ya3J4cWXKaw",
    title: "360° view Compilatievideo Machinebouw & Mechatronicalabs",
  },
];

const Demo = () => {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <div className="flex h-screen bg-white text-[#48365c] overflow-hidden">
      {/* Sidebar */}
      <SideBar className="h-full" />

      {/* Main content */}
      <div className="flex-1 flex flex-col px-6 md:px-12 py-10 overflow-y-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-[#48365c] text-center mb-10 tk-din-arabic">
          Labs & Demo's
        </h1>

        {/* Video grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {videoList.map((video) => (
            <motion.div
              key={video.id}
              className="relative overflow-hidden rounded-3xl shadow-xl cursor-pointer border border-[#552a87]/30 hover:shadow-2xl transition"
              whileHover={{ scale: 1.03 }}
              onClick={() => setActiveVideo(video)}
            >
              <img
                src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                alt={video.title}
                className="w-full h-56 object-cover"
              />
              <div className="absolute bottom-0 w-full bg-[#552a87]/80 text-white py-2 text-center text-sm font-semibold">
                {video.title}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Overlay for active video */}
        <AnimatePresence>
          {activeVideo && (
            <motion.div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveVideo(null)}
            >
              <motion.div
                className="relative bg-[#552a87] rounded-3xl shadow-2xl overflow-hidden w-full max-w-7xl h-[80vh]"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 120 }}
                onClick={(e) => e.stopPropagation()} // voorkomt sluiten bij klik binnen video
              >
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1&rel=0`}
                  title={activeVideo.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>

                {/* Close button */}
                <button
                  onClick={() => setActiveVideo(null)}
                  className="absolute top-3 right-3 text-white bg-black/40 hover:bg-black/70 rounded-full p-2 transition"
                >
                  ✕
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Demo;
