import { useEffect, useState } from "react";
import { fetchStats } from "../api";
import { useParams } from "react-router-dom";

export default function Stats() {
  const { code } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchStats(code).then(setData);
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold">Stats for {code}</h1>
      <p className="mt-4">URL: {data.url}</p>
      <p>Total Clicks: {data.clicks}</p>
      <p>Last Clicked: {data.last_clicked || "—"}</p>
    </div>
  );
}
