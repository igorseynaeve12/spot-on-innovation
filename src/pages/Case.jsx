import SideBar from "../components/SideBar";

export default function Case() {
  const cases = [
    {
      id: 1,
      name: "Website Redesign",
      description:
        "Volledige redesign van de bedrijfswebsite voor betere UX en conversie.",
      client: "Acme Corp",
      status: "Afgerond",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Mobile App Development",
      description:
        "Ontwikkeling van een cross-platform mobiele applicatie voor interne workflow.",
      client: "Tech Solutions",
      status: "In uitvoering",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Marketing Campagne 2025",
      description:
        "Strategische marketingcampagne om merkbekendheid te vergroten.",
      client: "Green Energy",
      status: "Afgerond",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      name: "Data Analytics Dashboard",
      description: "Dashboard voor realtime data-analyse en KPI monitoring.",
      client: "Finance Inc",
      status: "In uitvoering",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      name: "Employee Training Program",
      description: "Ontwikkeling van een trainingsprogramma voor medewerkers.",
      client: "Global HR",
      status: "Afgerond",
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-800">
      {/* Sidebar */}
      <SideBar className="h-full" />

      {/* Hoofdcontent */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex justify-center py-10">
          <h1 className="tk-din-arabic text-[#95c11f] text-5xl font-bold">
            Cases
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
          {cases.map((caseItem, index) => (
            <a
              key={index}
              href={`/cases/${caseItem.id}`} // link naar detailpagina
              className="block bg-[#95c11f] rounded-lg shadow-md p-4 hover:shadow-lg hover:-translate-y-1 transition-transform duration-200"
            >
              <h3 className="text-lg font-semibold text-white mb-1 tk-din-arabic truncate">
                {caseItem.name}
              </h3>
              {caseItem.description && (
                <p className="text-white text-sm mb-2 line-clamp-3 tk-din-arabic">
                  {caseItem.description}
                </p>
              )}
              {caseItem.type && (
                <span className="inline-block bg-white/30 text-white text-xs px-2 py-1 rounded tk-din-arabic">
                  {caseItem.type}
                </span>
              )}
              {caseItem.image && (
                <img src={caseItem.image} alt="Case image"></img>
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
