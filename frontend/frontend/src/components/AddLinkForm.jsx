import { useState } from "react";
import React from "react";
import { createLink } from "../api";

export default function AddLinkForm({ refresh }) {
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErr("");

    const result = await createLink({ url, code });

    if (result.error) setErr(result.error);
    else {
      setUrl("");
      setCode("");
      refresh();
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-lg">
      <input
        className="border p-2 mr-2"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <input
        className="border p-2 mr-2"
        placeholder="Custom Code (6-8 chars)"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        required
      />
      <button
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Adding..." : "Add"}
      </button>
      {err && <p className="text-red-500 mt-2">{err}</p>}
    </form>
  );
}
