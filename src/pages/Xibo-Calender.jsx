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
    <div className="min-h-screen flex flex-col items-center justify-center text-black p-10">
      <h1 className="text-6xl font-bold mb-16">Komende Evenementen</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-[2000px] w-full">
        {events.map((event, index) => {
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
              className="bg-transparent text-black p-8 rounded-3xl shadow-xl text-center flex flex-col justify-between min-h-[300px]"
            >
              <h3 className="text-4xl font-bold">{event.Eventtitel}</h3>
              <p className="text-2xl mt-2">
                🕒 {event.Eventtype || "Tijd onbekend"}
              </p>
              <p className="text-xl mt-2">🏢 {event.Organisator}</p>

              <div className="mt-6 bg-white text-black text-3xl font-bold rounded-xl px-4 py-2 mx-auto">
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
