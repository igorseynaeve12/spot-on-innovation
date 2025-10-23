import React, { useState, useEffect } from "react";

const CsvAutoPagination = () => {
  const csvUrl =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQPpD08m9PTbqsR3S_PuldWZ5byATqhlZTgZtAmCgfzbubHxyWk1ysJi6c9R2V3ZdYuj0Uk6ejzATwh/pub?gid=2144244328&single=true&output=csv";

  const rowsPerPage = 5;
  const autoNextSeconds = 5;

  const [rows, setRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch(csvUrl)
      .then((res) => res.text())
      .then((csvText) => {
        const data = csvText
          .trim()
          .split("\n")
          .map((r) => r.split(","))
          .slice(1); // skip header
        setRows(data);
      });
  }, []);

  useEffect(() => {
    if (rows.length === 0) return;

    const totalPages = Math.ceil(rows.length / rowsPerPage);
    const timer = setInterval(() => {
      setCurrentPage((prev) => (prev % totalPages) + 1);
    }, autoNextSeconds * 1000);

    return () => clearInterval(timer);
  }, [rows]);

  const totalPages = Math.ceil(rows.length / rowsPerPage);
  const start = (currentPage - 1) * rowsPerPage;
  const pageRows = rows.slice(start, start + rowsPerPage);

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {pageRows.map((row, index) => (
          <li
            key={index}
            style={{
              background: "#f0f8ff",
              margin: "5px 0",
              padding: "10px 15px",
              borderLeft: "5px solid #007ACC",
              borderRadius: "5px",
            }}
          >
            {row.join(" | ")}
          </li>
        ))}
      </ul>

      <div style={{ textAlign: "center", marginTop: "10px" }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            style={{
              margin: "0 3px",
              padding: "5px 10px",
              border: "none",
              backgroundColor: currentPage === i + 1 ? "#005A9E" : "#007ACC",
              color: "white",
              borderRadius: "3px",
              cursor: "pointer",
            }}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CsvAutoPagination;
