import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import Calender from "./pages/Calender";
import Demo from "./pages/Demo";
import LoginWrapper from "./pages/Login";
import XiboCalender from "./pages/Xibo-Calender";
import Overzicht from "./pages/Overzicht";
import ProjectDetail from "./components/ProjectDetail";
import EmbedTest from "./pages/EmbedTest";

function App() {
  const location = useLocation();

  return (
    <>
      {/*<AutoCycleHandler />*/}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/kalender" element={<Calender></Calender>}></Route>
          <Route path="/labs & demo's" element={<Demo></Demo>}></Route>
          <Route path="/login" element={<LoginWrapper></LoginWrapper>}></Route>
          <Route
            path="/xibo-calender"
            element={<XiboCalender></XiboCalender>}
          ></Route>
          <Route path="/test-embed" element={<EmbedTest />} />
          <Route
            path="/overzicht projecten"
            element={<Overzicht></Overzicht>}
          ></Route>
          <Route
            path="/projecten/:id"
            element={<ProjectDetail></ProjectDetail>}
          ></Route>
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
