import express from "express";
import {
  createLinkHandler,
  listLinks,
  getStats,
  deleteLinkHandler,
  redirectHandler,
} from "../controllers/linkController.js";
import { validateURL } from "../middleware/validateURL.js";

const router = express.Router();

router.post("/api/links", validateURL, createLinkHandler);
router.get("/api/links", listLinks);
router.get("/api/links/:code", getStats);
router.delete("/api/links/:code", deleteLinkHandler);

// Redirect route (302)
router.get("/:code", redirectHandler);

export default router;
