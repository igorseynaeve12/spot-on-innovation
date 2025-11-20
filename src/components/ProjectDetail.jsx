import { useParams } from "react-router-dom";
import SideBar from "../components/SideBar"; // ← Sidebar importeren
import projects from "../data/companies.json";

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projects.companies.find((p) => p.id === id);

  if (!project) return <p>Project niet gevonden.</p>;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar links */}
      <SideBar />

      {/* Content rechts */}
      <div className="flex-1 p-8 mx-auto tk-din-arabic">
        {/* Titel */}
        <div className="py-10 text-[#48365c]">
          <h1 className="text-5xl font-bold mb-6">{project.title}</h1>
          <p className="text-lg mb-4">{project.description}</p>
        </div>

        {/* Website knop */}
        {project.website && (
          <a
            href={project.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#552a87] text-white py-4 px-6 rounded-lg hover:bg-[#764cc2] transition-transform hover:-translate-y-1 mb-6 text-xl"
          >
            Bezoek de website →
          </a>
        )}

        {/* 2-column layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Linkse kolom: Uitleg */}
          {project.caseDescription && (
            <div className="flex-1 bg-[#f5f5f5] p-6 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-semibold mb-4">
                {project.caseTitle}
              </h2>
              <p className="text-lg">
                {project.caseDescription.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            </div>
          )}

          {/* Rechtse kolom: Iframe */}
          {project.iframeUrl && (
            <div className="flex-1 rounded-2xl overflow-hidden shadow-xl">
              <iframe
                src={project.iframeUrl}
                className="w-full h-[60vh] border-0"
                title={project.name}
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
