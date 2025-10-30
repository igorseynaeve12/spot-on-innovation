import SideBar from "../components/SideBar";

const events = [
  {
    id: 1,
    name: "Team Meeting",
    date: "2025-10-25",
    time: "10:00 - 11:00",
    location: "Kantoor A",
    organisation: "Hogeschool Vives",
  },
  {
    id: 2,
    name: "Workshop Design Thinking",
    date: "2025-12-26",
    time: "14:00 - 16:00",
    location: "Kantoor B",
    organisation: "POM West-Vlaanderen",
  },
  {
    id: 3,
    name: "Lezing Innovatie",
    date: "2025-12-24",
    time: "19:00 - 20:30",
    location: "Auditorium",
    organisation: "Howest",
  },
  {
    id: 4,
    name: "Project Kick-off",
    date: "2025-11-28",
    time: "09:00 - 10:30",
    location: "Vergaderzaal 1",
    organisation: "Hogeschool Vives",
  },
  {
    id: 5,
    name: "Team Lunch",
    date: "2025-12-1",
    time: "12:00 - 13:00",
    location: "Kantine",
    organisation: "POM West-Vlaanderen",
  },
  {
    id: 6,
    name: "Innovatie Workshop",
    date: "2025-11-1",
    time: "15:00 - 17:00",
    location: "Vergaderzaal 2",
    organisation: "Hogeschool Vives",
  },
];

const Calendar = () => {
  const today = new Date();
  const upcomingEvents = events
    .filter((e) => new Date(e.date) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 8);

  return (
    <div className="flex bg-gray-900 min-h-screen">
      <SideBar className="h-full" />

      <div className="flex-1 overflow-auto py-10 px-6 sm:px-8">
        <h1 className="text-white tk-din-arabic font-bold text-5xl mb-12 text-center">
          Kalender
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {upcomingEvents.map((event) => {
            const eventDate = new Date(event.date);
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
              <div
                key={event.id}
                className="relative bg-linear-to-r from-[#afd460] via-[#a2b764] to-[#7b9440] rounded-3xl shadow-2xl p-6 flex flex-col justify-between transform hover:scale-105 transition-transform duration-300"
              >
                {/* Datum badge */}
                <div className="absolute top-4 right-4 bg-white text-gray-900 px-3 py-1 rounded-xl font-bold text-lg tk-din-arabic shadow">
                  {dayName.charAt(0).toUpperCase() + dayName.slice(1)} {day}{" "}
                  {month}
                </div>

                {/* Event naam */}
                <h3 className="text-2xl font-extrabold text-white mb-4 tk-din-arabic">
                  {event.name}
                </h3>

                {/* Tijd & Locatie */}
                <p className="text-white text-lg tk-din-arabic flex items-center mb-1">
                  <span className="mr-2">🕒</span> {event.time}
                </p>
                <p className="text-white text-lg tk-din-arabic flex items-center mb-1">
                  <span className="mr-2">📍</span> {event.location}
                </p>
                <p className="text-white text-lg tk-din-arabic flex items-center">
                  <span className="mr-2">🏢</span> {event.organisation}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
