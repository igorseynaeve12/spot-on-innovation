import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import Squadron from "./pages/Squadron";
import Vintecc from "./pages/Vintecc";
import Playit from "./pages/Playit";
import AutoCycleHandler from "./components/AutoCycleHandler";
import CsvAutoPagination from "./pages/csvtest";

function App() {
  const location = useLocation();

  return (
    <>
      <AutoCycleHandler />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/squadron" element={<Squadron />} />
          <Route path="/vintecc" element={<Vintecc />} />
          <Route path="/playit" element={<Playit />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
