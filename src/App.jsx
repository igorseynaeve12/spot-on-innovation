import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import Case from "./pages/Case";
import Calender from "./pages/Calender";
import CaseTemplate from "./pages/cases/Case-Sjab";
import SuccesStories from "./pages/SuccesStories";
import Demo from "./pages/Demo";
import Forms from "./pages/Forms";

function App() {
  const location = useLocation();

  return (
    <>
      {/*<AutoCycleHandler />*/}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/cases" element={<Case></Case>}></Route>
          <Route path="/kalender" element={<Calender></Calender>}></Route>
          <Route
            path="/succesverhalen"
            element={<SuccesStories></SuccesStories>}
          ></Route>
          <Route
            path="/cases/:id"
            element={<CaseTemplate></CaseTemplate>}
          ></Route>
          <Route path="/labs & demo's" element={<Demo></Demo>}></Route>
          <Route path="/forms" element={<Forms></Forms>}></Route>
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
