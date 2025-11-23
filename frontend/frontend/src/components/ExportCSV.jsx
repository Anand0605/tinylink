import React from "react";

export default function ExportCSV({ data }) {
  const handleExport = () => {
    const csvRows = [];
    const headers = Object.keys(data[0] || {});

    csvRows.push(headers.join(","));

    data.forEach((row) => {
      const values = headers.map((h) => `"${row[h] || ""}"`);
      csvRows.push(values.join(","));
    });

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "links.csv";
    a.click();
  };

  return (
    <button
      onClick={handleExport}
      className="bg-green-600 text-white px-3 py-1 rounded shadow hover:bg-green-700"
    >
      Export CSV
    </button>
  );
}
