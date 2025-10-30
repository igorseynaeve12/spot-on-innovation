import SideBar from "../components/SideBar";

const events = [
  {
    id: 1,
    name: "Team Meeting",
    date: "2025-10-25",
    time: "10:00 - 11:00",
    location: "Kantoor A",
  },
  {
    id: 2,
    name: "Workshop Design Thinking",
    date: "2025-10-26",
    time: "14:00 - 16:00",
    location: "Kantoor B",
  },
  {
    id: 3,
    name: "Lezing Innovatie",
    date: "2025-10-27",
    time: "19:00 - 20:30",
    location: "Auditorium",
  },
  {
    id: 4,
    name: "Project Kick-off",
    date: "2025-10-28",
    time: "09:00 - 10:30",
    location: "Vergaderzaal 1",
  },
  {
    id: 5,
    name: "Team Lunch",
    date: "2025-10-28",
    time: "12:00 - 13:00",
    location: "Kantine",
  },
  {
    id: 6,
    name: "Innovatie Workshop",
    date: "2025-10-29",
    time: "15:00 - 17:00",
    location: "Vergaderzaal 2",
  },
];

const Calendar = () => {
  const today = new Date();
  const upcomingEvents = events
    .filter((e) => new Date(e.date) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 8); // max 8 evenementen voor 1 scherm

  return (
    <div className="flex bg-gray-800 h-screen">
      <SideBar className="h-full" />

      <div className="flex-1 overflow-hidden py-10 px-6">
        <h1 className="text-white tk-din-arabic font-bold text-5xl mb-8 text-center">
          Kalender
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="bg-[#95c11f] rounded-lg shadow-lg p-6 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-200"
            >
              <h3 className="text-2xl font-bold text-white mb-2 tk-din-arabic truncate">
                {event.name}
              </h3>
              <p className="text-white text-lg mb-1 tk-din-arabic">
                {new Date(event.date).toLocaleDateString("nl-NL", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                })}
              </p>
              <p className="text-white text-lg mb-1 tk-din-arabic">
                Tijd: {event.time}
              </p>
              <p className="text-white text-lg tk-din-arabic">
                Locatie: {event.location}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
