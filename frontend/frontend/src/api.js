export const API_BASE = import.meta.env.VITE_API_URL;

export async function fetchLinks() {
  const res = await fetch(`${API_BASE}/api/links`);
  return res.json();
}

export async function createLink(body) {
  const res = await fetch(`${API_BASE}/api/links`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.json();
}

export async function deleteLink(code) {
  return fetch(`${API_BASE}/api/links/${code}`, { method: "DELETE" });
}

export async function fetchStats(code) {
  const res = await fetch(`${API_BASE}/api/links/${code}`);
  return res.json();
}
