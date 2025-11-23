import React from "react";

export default function LinksTable({ links, onDelete, onEdit }) {

  // Copy URL to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied!");
  };

  return (
    <div className="mt-6 w-full">

      {/* DESKTOP TABLE */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse rounded-lg overflow-hidden shadow-md">
          <thead>
            <tr className="bg-indigo-600 text-white text-left">
              <th className="p-3">Code</th>
              <th className="p-3">Target URL</th>
              <th className="p-3">Clicks</th>
              <th className="p-3">Last Clicked</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {links.map((l, idx) => (
              <tr
                key={l.code}
                className={`border-b hover:bg-indigo-50 transition ${
                  idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="p-3 font-semibold text-indigo-700">{l.code}</td>

                <td className="p-3 max-w-xs truncate">
                  <a
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    {l.url}
                  </a>
                </td>

                <td className="p-3">{l.clicks}</td>

                <td className="p-3">{l.last_clicked || "—"}</td>

                {/* ACTION BUTTONS */}
                <td className="p-3 space-x-2 text-center">
                  <button
                    onClick={() => copyToClipboard(l.url)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-2 py-1 rounded"
                  >
                    Copy
                  </button>

                  <a
                    href={`/${l.code}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
                  >
                    Open
                  </a>

                  <button
                    onClick={() => onEdit(l)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(l.code)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARD VIEW */}
      <div className="grid gap-4 md:hidden mt-4">
        {links.map((l) => (
          <div
            key={l.code}
            className="bg-white shadow-md border rounded p-4"
          >
            <p className="text-lg font-bold text-indigo-700">{l.code}</p>

            <p className="mt-1 text-blue-600 underline break-all">
              <a href={l.url} target="_blank" rel="noopener noreferrer">
                {l.url}
              </a>
            </p>

            <p className="text-gray-600 mt-2 text-sm">Clicks: {l.clicks}</p>
            <p className="text-gray-600 text-sm">
              Last Click: {l.last_clicked || "—"}
            </p>

            {/* MOBILE BUTTONS */}
            <div className="flex flex-wrap gap-2 mt-3">
              <button
                onClick={() => copyToClipboard(l.url)}
                className="bg-gray-200 px-3 py-1 rounded"
              >
                Copy
              </button>

              <a
                href={`/${l.code}`}
                target="_blank"
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Open
              </a>

              <button
                onClick={() => onEdit(l)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => onDelete(l.code)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
