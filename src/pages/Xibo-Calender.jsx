import { useEffect, useState } from "react";

const SHEET_ID = "1St5pHQVe8XDK6IwPRi24gSZDpbfeZhEVZRBsE_eJ7SY";
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
        padding: "2vh",
        fontFamily: "din-arabic",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(24px, 4vw, 64px)",
          fontWeight: "bold",
          marginBottom: "3vh",
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
          gap: "24px",
          width: "100%",
          maxWidth: "1800px",
          margin: "0 auto",
          paddingBottom: "4vh",
          maxHeight: "80vh", // vaste hoogte
          overflowY: "auto", // scroll als er te veel zijn
        }}
      >
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
              style={{
                background: "#222",
                borderRadius: "16px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                padding: "16px",
                flex: "1 1 250px", // flex-grow, flex-shrink, basis
                maxWidth: "300px", // limiet op grote schermen
                minWidth: "220px", // limiet op kleine schermen
                minHeight: "220px",
                margin: "12px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                textAlign: "center",
              }}
            >
              <h3
                style={{
                  fontSize: "clamp(14px, 1.4vw, 22px)",
                  fontWeight: "bold",
                  lineHeight: "1.2",
                }}
              >
                {event.Eventtitel}
              </h3>

              <p
                style={{
                  fontSize: "clamp(12px, 1vw, 18px)",
                  paddingTop: "15px",
                }}
              >
                📌 {event.Eventtype || "Type onbekend"}
              </p>

              <p style={{ fontSize: "clamp(12px, 1vw, 18px)" }}>
                🏢 {event.Organisator}
              </p>

              <div
                style={{
                  marginTop: "12px",
                  background: "#444",
                  color: "white",
                  fontSize: "clamp(14px, 1.2vw, 20px)",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  padding: "6px 10px",
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
