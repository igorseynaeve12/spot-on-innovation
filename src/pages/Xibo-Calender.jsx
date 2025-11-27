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
    const interval = setInterval(fetchData, 1000 * 60 * 5);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "transparent",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "16px",
        overflow: "hidden",
        fontFamily: "din-arabic",
      }}
    >
      <h1
        style={{
          fontSize: "48px",
          fontWeight: "bold",
          marginBottom: "32px",
          textAlign: "center",
        }}
      >
        Aanstaande evenementen
      </h1>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "stretch",
          gap: "24px",
          width: "100%",
          height: "100%",
        }}
      >
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
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                textAlign: "center",
                background: "#222",
                borderRadius: "16px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                padding: "16px",
                flex: "1 1 calc(25% - 24px)",
                minWidth: "250px",
                maxWidth: "350px",
                minHeight: "200px",
                fontSize: "16px",
              }}
            >
              <h3
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  lineHeight: "1.2",
                }}
              >
                {event.Eventtitel}
              </h3>
              <p style={{ fontSize: "18px" }}>
                📌 {event.Eventtype || "Type onbekend"}
              </p>
              <p style={{ fontSize: "18px" }}>🏢 {event.Organisator}</p>
              <div
                style={{
                  marginTop: "12px",
                  background: "#444",
                  color: "white",
                  fontSize: "20px",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  padding: "8px 12px",
                }}
              >
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
