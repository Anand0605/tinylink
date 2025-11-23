import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

app.use(cors());
app.use(express.json());

// Basic test route
app.get("/healthz", (req, res) => {
  res.status(200).json({ ok: true, version: "1.0" });
});

// Import routes
import linkRoutes from "./src/routes/linkRoutes.js";

// Use routes
app.use("/", linkRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
