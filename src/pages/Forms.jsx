import { useState, useEffect } from "react";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbws9YN9oKPV-4ZgA6D503y0F0b8lxAm_AjIneLzpgysIyw7S9nETWLRPHIXQx7qVnRH/exec";

export default function Forms() {
  const [formData, setFormData] = useState({
    datum: "",
    type: "",
    titel: "",
    organisator: "",
    url: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Formatteer datetime-local naar "YYYY-MM-DD HH:MM:SS"
      let formattedDatum = formData.datum.replace("T", " "); // verwijder T tijdelijk
      if (!formattedDatum.includes(":")) {
        formattedDatum += " 00:00:00"; // fallback voor alleen datum
      } else {
        // voeg seconden toe
        formattedDatum += ":00";
      }

      const payload = { ...formData, datum: "'" + formattedDatum };
      setLoading(true);
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setLoading(false);

      setFormData({
        datum: "",
        type: "",
        titel: "",
        organisator: "",
        url: "",
        location: "",
      });
    } catch (err) {
      console.error(err);
      alert("❌ Fout bij verzenden");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-16 p-8 bg-white rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold text-center mb-8 text-[#552a87]">
        Voeg nieuw event toe
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="datetime-local"
          name="datum"
          value={formData.datum}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#552a87] outline-none"
        />
        <input
          type="text"
          name="type"
          placeholder="Eventtype"
          value={formData.type}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#552a87] outline-none"
        />
        <input
          type="text"
          name="titel"
          placeholder="Eventtitel"
          value={formData.titel}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#552a87] outline-none"
        />
        <input
          type="text"
          name="organisator"
          placeholder="Organisator"
          value={formData.organisator}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#552a87] outline-none"
        />
        <input
          type="text"
          name="url"
          placeholder="URL"
          value={formData.url}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#552a87] outline-none"
        />
        <input
          type="text"
          name="location"
          placeholder="Locatie"
          value={formData.location}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#552a87] outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className={`bg-[#552a87] text-white w-full py-3 rounded-lg hover:bg-[#46206f] transition cursor-pointer ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#46206f]"
          }`}
        >
          {loading ? "Versturen..." : "Versturen"}
        </button>
      </form>
    </div>
  );
}
