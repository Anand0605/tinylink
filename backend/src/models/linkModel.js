import { pool } from "../config/db.js";

export async function createLink(code, url) {
  const query = `
      INSERT INTO links(code, url) 
      VALUES($1, $2)
      RETURNING *;
  `;
  const result = await pool.query(query, [code, url]);
  return result.rows[0];
}

export async function findLinkByCode(code) {
  const result = await pool.query("SELECT * FROM links WHERE code=$1", [code]);
  return result.rows[0];
}

export async function incrementClicks(code) {
  await pool.query(
    `UPDATE links SET clicks = clicks + 1, last_clicked = NOW() WHERE code=$1`,
    [code]
  );
}

export async function getAllLinks() {
  const result = await pool.query("SELECT * FROM links ORDER BY created_at DESC");
  return result.rows;
}

export async function deleteLink(code) {
  await pool.query("DELETE FROM links WHERE code=$1", [code]);
}
