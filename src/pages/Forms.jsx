import { useState } from "react";

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
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // verwijder error als gebruiker iets invult
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Valideer velden
    const newErrors = {};
    if (!formData.datum) newErrors.datum = "Datum is verplicht";
    if (!formData.type) newErrors.type = "Eventtype is verplicht";
    if (!formData.titel) newErrors.titel = "Eventtitel is verplicht";
    if (!formData.organisator)
      newErrors.organisator = "Organisator is verplicht";
    if (!formData.url) newErrors.url = "URL is verplicht";
    if (!formData.location) newErrors.location = "Locatie is verplicht";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // Formatteer datetime-local naar "YYYY-MM-DD HH:MM:SS"
      let formattedDatum = formData.datum.replace("T", " ");
      if (!formattedDatum.includes(":")) {
        formattedDatum += " 00:00:00";
      } else {
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

  const inputStyle =
    "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#552a87] outline-none";

  return (
    <div className="max-w-lg mx-auto mt-16 p-8 bg-white rounded-2xl shadow-xl tk-din-arabic">
      <h2 className="text-3xl font-bold text-center mb-8 text-[#552a87]">
        Voeg nieuw event toe
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/** Datum */}
        <div>
          <input
            type="datetime-local"
            name="datum"
            value={formData.datum}
            onChange={handleChange}
            className={inputStyle}
          />
          {errors.datum && <p className="text-red-600 mt-1">{errors.datum}</p>}
        </div>

        {/** Type */}
        <div>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className={inputStyle}
          >
            <option value="">Selecteer Eventtype</option>
            <option value="Workshop">Workshop</option>
            <option value="Inspiratiesessie">Inspiratiesessie</option>
            <option value="Academy">Academy</option>
            <option value="Masterclass">Masterclass</option>
            <option value="Stuutje met...">Stuutje met...</option>
            <option value="Curieuze dinsdag">Curieuze dinsdag</option>
          </select>
          {errors.type && <p className="text-red-600 mt-1">{errors.type}</p>}
        </div>

        {/** Titel */}
        <div>
          <input
            type="text"
            name="titel"
            placeholder="Eventtitel"
            value={formData.titel}
            onChange={handleChange}
            className={inputStyle}
          />
          {errors.titel && <p className="text-red-600 mt-1">{errors.titel}</p>}
        </div>

        {/** Organisator */}
        <div>
          <select
            name="organisator"
            value={formData.organisator}
            onChange={handleChange}
            className={inputStyle}
          >
            <option value="">Selecteer Organisator</option>
            <option value="Flanders Make">Flanders Make</option>
            <option value="Sirris">Sirris</option>
            <option value="Howest">Howest</option>
            <option value="VIVES">VIVES</option>
            <option value="KU Leuven">KU Leuven</option>
            <option value="UGent">UGent</option>
            <option value="Unizo">Unizo</option>
            <option value="Agoria">Agoria</option>
            <option value="Voka">Voka</option>
            <option value="POM">POM</option>
            <option value="TUA">TUA</option>
          </select>
          {errors.organisator && (
            <p className="text-red-600 mt-1">{errors.organisator}</p>
          )}
        </div>

        {/** URL */}
        <div>
          <input
            type="text"
            name="url"
            placeholder="URL"
            value={formData.url}
            onChange={handleChange}
            className={inputStyle}
          />
          {errors.url && <p className="text-red-600 mt-1">{errors.url}</p>}
        </div>

        {/** Locatie */}
        <div>
          <input
            type="text"
            name="location"
            placeholder="Locatie"
            value={formData.location}
            onChange={handleChange}
            className={inputStyle}
          />
          {errors.location && (
            <p className="text-red-600 mt-1">{errors.location}</p>
          )}
        </div>

        {/** Submit button */}
        <button
          type="submit"
          disabled={loading}
          className={`bg-[#552a87] text-white w-full py-3 rounded-lg transition cursor-pointer ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#46206f]"
          }`}
        >
          {loading ? "Versturen..." : "Versturen"}
        </button>
      </form>
    </div>
  );
}
