import { useState } from "react";

export default function CompanyDescription({ text }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="text-center lg:text-left">
      <p
        className={`text-sm sm:text-base md:text-lg tk-din-arabic text-gray-600 leading-relaxed ${
          !expanded ? "line-clamp-5" : ""
        }`}
      >
        {text.split("\n").map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ))}
      </p>

      <button
        className="text-[#552a87] font-semibold mt-2"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Lees minder" : "Lees meer"}
      </button>
    </div>
  );
}
