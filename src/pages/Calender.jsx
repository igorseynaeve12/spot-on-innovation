import { useEffect, useState } from "react";
import SideBar from "../components/SideBar";

const SHEET_ID = "1iqv907ZQ6YWHlxl-dBQMhNBrjbwHOpmoTBNHpsGTF20";
const SHEET_RANGE = "Sheet1"; // pas aan naar jouw tabbladnaam
const GOOGLE_SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;
const Calendar = () => {
  const [events, setEvents] = useState([]);
  const today = new Date();

  useEffect(() => {
    fetch(GOOGLE_SHEET_URL)
      .then((res) => res.text())
      .then((text) => {
        // Google wrapt de JSON-response, dit moet je eruit halen
        const json = JSON.parse(text.substring(47, text.length - 2));

        // Rijen ophalen
        const rows = json.table.rows.map((r) => r.c.map((c) => c?.v));

        // Headers gebruiken om objecten te maken
        const headers = rows[0];
        const dataObjects = rows
          .slice(1)
          .map((r) =>
            Object.fromEntries(r.map((cell, i) => [headers[i], cell]))
          );

        // Filter toekomstige events en sorteer op datum
        const upcomingEvents = dataObjects
          .filter((e) => new Date(e.Datum) >= today)
          .sort((a, b) => new Date(a.Datum) - new Date(b.Datum))
          .slice(0, 8);

        setEvents(upcomingEvents);
      })
      .catch((err) => console.error("Fout bij ophalen:", err));
  }, []);

  return (
    <div className="flex bg-[#ffffff] min-h-screen">
      <SideBar className="h-full" />

      <div className="flex-1 p-4 2xl:ml-64">
        <h1 className="text-black tk-din-arabic font-bold text-5xl mb-12 text-center">
          Kalender
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {events.map((event, index) => {
            const eventDate = new Date(event.Datum);
            const day = eventDate.toLocaleDateString("nl-NL", {
              day: "numeric",
            });
            const month = eventDate.toLocaleDateString("nl-NL", {
              month: "short",
            });
            const dayName = eventDate.toLocaleDateString("nl-NL", {
              weekday: "long",
            });

            return (
              <a
                key={index}
                href={event.URL || "#"} // vervang "URL" door jouw kolomnaam
                target="_blank"
                rel="noopener noreferrer"
                className="block transform hover:scale-105 transition-transform duration-300"
              >
                <div className="relative bg-linear-to-r from-[#afd460] via-[#a2b764] to-[#7b9440] rounded-3xl shadow-2xl p-6 flex flex-col justify-between cursor-pointer">
                  {/* Datum badge */}
                  <div className="absolute bottom-6 right-5 bg-white text-gray-900 px-3 py-1 rounded-xl font-bold text-lg tk-din-arabic shadow">
                    {dayName.charAt(0).toUpperCase() + dayName.slice(1)} {day}{" "}
                    {month}
                  </div>

                  {/* Event naam */}
                  <h3 className="text-2xl font-extrabold text-white mb-4 tk-din-arabic">
                    {event.Eventtitel}
                  </h3>

                  {/* Tijd & Locatie */}
                  <p className="text-white text-lg tk-din-arabic flex items-center mb-1">
                    <span className="mr-2">🕒</span>{" "}
                    {event.Eventtype || "Tijd niet opgegeven"}
                  </p>
                  <p className="text-white text-lg tk-din-arabic flex items-center mb-1">
                    <span className="mr-2">📍</span>{" "}
                    {event.Locatie || "Locatie niet opgegeven"}
                  </p>
                  <p className="text-white text-lg tk-din-arabic flex items-center">
                    <span className="mr-2">🏢</span> {event.Organisator}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
