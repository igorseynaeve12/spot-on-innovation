import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const SideBar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const sidebarItems = [
    "Spot-on Innovation",
    "Overzicht projecten",
    /*"Succesverhalen",
    "Cases",*/
    "Labs & demo's",
    "Kalender",
  ];

  const handleNavigate = (item) => {
    setIsOpen(false); // sluit menu bij navigatie
    navigate(item === "Spot-on Innovation" ? "/" : `/${item.toLowerCase()}`);
  };

  return (
    <>
      {/* Hamburger button voor mobiel */}
      <div className="lg:hidden fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded bg-white/80 backdrop-blur-md shadow-lg flex-1"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-[#ffffff] text-[#48365c] flex flex-col py-6 px-4 transition-transform duration-300 z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:relative lg:translate-x-0 lg:flex lg:w-1/6
        `}
      >
        <h2 className="text-[#95c11f] text-6xl font-bold mb-8 tk-din-arabic">
          Innovaties
        </h2>
        {sidebarItems.map((item) => (
          <div
            key={item}
            className="py-2 px-4 rounded hover:bg-[#95c11f]/40 cursor-pointer transition-transform tk-din-arabic text-3xl hover:-translate-y-1 mb-2"
            role="button"
            tabIndex={0}
            onClick={() => handleNavigate(item)}
            onKeyDown={(e) => e.key === "Enter" && handleNavigate(item)}
          >
            {item}
          </div>
        ))}
      </aside>
    </>
  );
};

export default SideBar;
