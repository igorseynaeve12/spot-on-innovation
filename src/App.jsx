import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import Squadron from "./pages/Squadron";
import Vintecc from "./pages/Vintecc";
import Playit from "./pages/Playit";
import Case from "./pages/Case";
import Calender from "./pages/Calender";
import CaseTemplate from "./pages/cases/Case-Sjab";

function App() {
  const location = useLocation();

  return (
    <>
      {/*<AutoCycleHandler />*/}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/squadron" element={<Squadron />} />
          <Route path="/vintecc" element={<Vintecc />} />
          <Route path="/playit" element={<Playit />} />
          <Route path="/cases" element={<Case></Case>}></Route>
          <Route path="/kalender" element={<Calender></Calender>}></Route>
          <Route
            path="/cases/:id"
            element={<CaseTemplate></CaseTemplate>}
          ></Route>
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
