import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();

  const sidebarItems = ["Home", "Succesverhalen", "Cases", "Kalender"];

  return (
    <aside className="w-1/6 bg-gray-900 text-white flex flex-col py-6 px-4">
      <h2 className="text-6xl font-bold mb-8 tk-din-arabic">Innovaties</h2>
      {sidebarItems.map((item) => (
        <div
          key={item}
          className="py-2 px-4 rounded hover:bg-gray-700 cursor-pointer transition-transform tk-din-arabic text-3xl hover:-translate-y-1"
          role="button"
          tabIndex={0}
          onClick={() =>
            navigate(item === "Home" ? "/" : `/${item.toLowerCase()}`)
          }
          onKeyDown={(e) =>
            e.key === "Enter" &&
            navigate(item === "Home" ? "/" : `/${item.toLowerCase()}`)
          }
        >
          {item}
        </div>
      ))}
    </aside>
  );
};

export default SideBar;
