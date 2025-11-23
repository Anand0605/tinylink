import { useEffect, useState } from "react";
import React from "react";
import { fetchLinks, deleteLink } from "../api";

import AddLinkForm from "../components/AddLinkForm";
import LinksTable from "../components/LinksTable";

import Pagination from "../components/Pagination";
import ExportCSV from "../components/ExportCSV";
import SkeletonLoader from "../components/SkeletonLoader";

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const limit = 5;

  async function load() {
    setLoading(true);
    const data = await fetchLinks();
    setLinks(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  // 🔍 Search
  const filtered = links.filter(
    (l) =>
      l.code.toLowerCase().includes(search.toLowerCase()) ||
      l.url.toLowerCase().includes(search.toLowerCase())
  );

  // 📄 Pagination
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  return (
    <div className="p-8 max-w-5xl mx-auto">

      <h1 className="text-2xl font-bold mb-4">TinyLink Dashboard</h1>

      {/* ⭐ YOUR ORIGINAL CODE — unchanged */}
      <AddLinkForm refresh={load} />

      {/* 🔍 Search + Export */}
      <div className="flex flex-col md:flex-row justify-between mt-4 gap-3">
        <input
          type="text"
          placeholder="Search links..."
          className="border px-3 py-2 rounded w-full md:w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <ExportCSV data={filtered} />
      </div>

      {/* ⬇ YOUR ORIGINAL TABLE — kept as is */}
      <div className="mt-6">
        {loading ? (
          <SkeletonLoader />
        ) : (
          <LinksTable
            links={paginated}
            onDelete={async (code) => {
              await deleteLink(code);
              load();
            }}
          />
        )}
      </div>

      {/* Pagination */}
      {!loading && (
        <Pagination
          total={filtered.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      )}
    </div>
  );
}
