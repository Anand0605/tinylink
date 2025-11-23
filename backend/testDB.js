import { pool } from "./src/config/db.js";
import dotenv from "dotenv";
dotenv.config();

console.log("DATABASE_URL:", process.env.DATABASE_URL);

const test = async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("CONNECTED:", res.rows);
  } catch (err) {
    console.log("DB ERROR:", err);
  }
};

test();
