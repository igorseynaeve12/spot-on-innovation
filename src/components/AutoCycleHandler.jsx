import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function AutoCycleHandler() {
  const navigate = useNavigate();
  const location = useLocation();
  const timeoutRef = useRef(null);

  const pages = ["/", "/squadron", "/vintecc", "/playit"];
  const cycleTime = 8000; // 8 seconden per pagina

  const startCycle = () => {
    timeoutRef.current = setTimeout(() => {
      const currentIndex = pages.indexOf(location.pathname);
      const nextPage = pages[(currentIndex + 1) % pages.length];
      navigate(nextPage);
    }, cycleTime);
  };

  useEffect(() => {
    const resetCycle = () => {
      clearTimeout(timeoutRef.current);
      startCycle();
    };

    window.addEventListener("click", resetCycle);
    window.addEventListener("touchstart", resetCycle);
    window.addEventListener("mousemove", resetCycle);

    startCycle();

    return () => {
      clearTimeout(timeoutRef.current);
      window.removeEventListener("click", resetCycle);
      window.removeEventListener("touchstart", resetCycle);
      window.removeEventListener("mousemove", resetCycle);
    };
  }, [location]);

  return null;
}
