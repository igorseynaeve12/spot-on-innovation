import { useNavigate } from "react-router-dom";

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 rounded-3xl shadow-lg overflow-hidden hover:scale-105 transform transition duration-300 h-full">
      {/* Container van de volledige kaart */}
      <div className="p-6 flex flex-col h-full">
        <h2 className="text-2xl font-bold tk-din-arabic mb-2">
          {project.title}
        </h2>
        <p className="text-gray-600 mb-4 flex-1">{project.description}</p>

        {/* Button binnen dezelfde flex container */}
        <button
          onClick={() => navigate(`/projecten/${project.id}`)}
          className="bg-[#552a87] hover:bg-[#805cb8] text-white text-lg py-2 px-6 rounded-xl transition-transform hover:-translate-y-1 mt-auto cursor-pointer"
        >
          Meer info →
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
