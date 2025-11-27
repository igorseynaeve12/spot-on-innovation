import { useEffect, useState } from "react";

const SHEET_ID = "1iqv907ZQ6YWHlxl-dBQMhNBrjbwHOpmoTBNHpsGTF20";
const GOOGLE_SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;

const XiboCalender = () => {
  const [events, setEvents] = useState([]);
  const today = new Date();

  useEffect(() => {
    const fetchData = () => {
      fetch(GOOGLE_SHEET_URL)
        .then((res) => res.text())
        .then((text) => {
          const json = JSON.parse(text.substring(47, text.length - 2));
          const rows = json.table.rows.map((r) => r.c.map((c) => c?.v));

          const headers = rows[0];
          const dataObjects = rows
            .slice(1)
            .map((r) =>
              Object.fromEntries(r.map((cell, i) => [headers[i], cell]))
            );

          const upcomingEvents = dataObjects
            .filter((e) => new Date(e.Datum) >= today)
            .sort((a, b) => new Date(a.Datum) - new Date(b.Datum))
            .slice(0, 8);

          setEvents(upcomingEvents);
        })
        .catch((err) => console.error("Fout bij ophalen:", err));
    };

    fetchData();
    const interval = setInterval(fetchData, 1000 * 60 * 5); // elke 5 minuten refresh

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="tk-din-arabic w-full h-full bg-transparent text-white flex flex-col items-center justify-start p-4 overflow-hidden">
      <h1 className="text-5xl font-bold mb-8 text-center">
        Aanstaande evenementen
      </h1>

      <div className="flex flex-wrap justify-center items-stretch gap-6 w-full h-full">
        {events.slice(0, 8).map((event, index) => {
          const eventDate = new Date(event.Datum);
          const day = eventDate.toLocaleDateString("nl-NL", { day: "numeric" });
          const month = eventDate.toLocaleDateString("nl-NL", {
            month: "short",
          });
          const dayName = eventDate.toLocaleDateString("nl-NL", {
            weekday: "long",
          });

          return (
            <div
              key={index}
              className="flex flex-col justify-between text-center bg-[#222] rounded-2xl shadow-lg p-4"
              style={{
                flex: "1 1 calc(25% - 24px)", // Max 4 per rij
                minWidth: "250px",
                maxWidth: "350px",
                minHeight: "200px",
              }}
            >
              <h3 className="text-2xl font-bold leading-tight">
                {event.Eventtitel}
              </h3>
              <p className="text-lg">📌 {event.Eventtype || "Type onbekend"}</p>
              <p className="text-lg">🏢 {event.Organisator}</p>
              <div className="mt-3 bg-[#444] text-white text-xl font-bold rounded-lg px-3 py-2">
                {dayName.charAt(0).toUpperCase() + dayName.slice(1)} {day}{" "}
                {month}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default XiboCalender;
