import React, { useState, useEffect } from "react";
import LinksTable from "./LinksTable";
import Pagination from "./Pagination";
import ExportCSV from "./ExportCSV";
import SkeletonLoader from "./SkeletonLoader";

export default function ManageLinks() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Fetch links
  useEffect(() => {
    setTimeout(() => {
      fetch("/api/links") // your backend
        .then((res) => res.json())
        .then((data) => {
          setLinks(data);
          setLoading(false);
        });
    }, 1000);
  }, []);

  // Pagination logic
  const start = (currentPage - 1) * pageSize;
  const paginatedLinks = links.slice(start, start + pageSize);

  const totalPages = Math.ceil(links.length / pageSize);

  return (
    <div className="p-4">

      {/* EXPORT BUTTON */}
      <div className="flex justify-end mb-3">
        <ExportCSV data={links} />
      </div>

      {/* TABLE OR LOADER */}
      {loading ? (
        <SkeletonLoader rows={5} />
      ) : (
        <LinksTable
          links={paginatedLinks}
          onDelete={(code) =>
            setLinks(links.filter((l) => l.code !== code))
          }
          onEdit={(link) => console.log("Edit:", link)}
        />
      )}

      {/* PAGINATION */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(p) => {
          if (p >= 1 && p <= totalPages) setCurrentPage(p);
        }}
      />
    </div>
  );
}
