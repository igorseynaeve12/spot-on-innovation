import { useState } from "react";
import Forms from "./Forms";
import USERS from "../data/users.json";

const LoginWrapper = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const user = USERS.find(
      (u) =>
        u.username === loginData.username && u.password === loginData.password
    );

    if (user) {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("❌ Onjuiste gebruikersnaam of wachtwoord");
    }
  };

  if (isLoggedIn) return <Forms></Forms>;

  return (
    <div className="flex items-center justify-center">
      <div className="tk-din-arabic max-w-xs mx-auto mt-20 p-6 bg-white shadow-lg rounded-xl">
        <h2 className="tk-din-arabic text-3xl text-center font-semibold mb-4">
          Inloggen
        </h2>
        <form onSubmit={handleLoginSubmit} className="space-y-3">
          <input
            type="text"
            name="username"
            placeholder="Gebruikersnaam"
            onChange={handleLoginChange}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#552a87]"
          />
          <input
            type="password"
            name="password"
            placeholder="Wachtwoord"
            onChange={handleLoginChange}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#552a87]"
          />
          <button
            type="submit"
            className="bg-[#552a87] text-white w-full py-2 rounded-lg hover:bg-[#46206f] transition"
          >
            Inloggen
          </button>
        </form>

        {error && (
          <p className="text-red-600 text-center font-medium mt-2">{error}</p>
        )}
      </div>
    </div>
  );
};

export default LoginWrapper;
