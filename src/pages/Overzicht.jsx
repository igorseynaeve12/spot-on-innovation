import companiesData from "../data/companies.json";
import ProjectCard from "../components/ProjectCard";
import SideBar from "../components/SideBar";

export default function ProjectsOverview() {
  const projects = companiesData.companies;

  return (
    <div className="flex min-h-screen bg-white text-[#48365c]">
      {/* Sidebar */}
      <SideBar />

      {/* Content */}
      <div className="flex-1 p-6 lg:p-12 overflow-auto pt-24">
        <h1 className="text-4xl lg:text-5xl font-bold tk-din-arabic text-center mb-12">
          Overzicht projecten
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
