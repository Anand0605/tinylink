import React from "react";

export default function SkeletonLoader({ rows = 5 }) {
  return (
    <table className="w-full border-collapse rounded-lg overflow-hidden shadow">
      <tbody>
        {Array.from({ length: rows }).map((_, i) => (
          <tr key={i} className="animate-pulse border-b">
            <td className="p-3">
              <div className="h-4 bg-gray-300 rounded w-20"></div>
            </td>
            <td className="p-3">
              <div className="h-4 bg-gray-300 rounded w-40"></div>
            </td>
            <td className="p-3">
              <div className="h-4 bg-gray-300 rounded w-10"></div>
            </td>
            <td className="p-3">
              <div className="h-4 bg-gray-300 rounded w-24"></div>
            </td>
            <td className="p-3">
              <div className="h-4 bg-gray-300 rounded w-16"></div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
