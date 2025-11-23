import {
  createLink,
  findLinkByCode,
  getAllLinks,
  deleteLink,
  incrementClicks,
} from "../models/linkModel.js";

export async function createLinkHandler(req, res) {
  try {
    const { url, code } = req.body;

    if (!/^[A-Za-z0-9]{6,8}$/.test(code)) {
      return res.status(400).json({ error: "Code must be 6-8 alphanumeric characters" });
    }

    const existing = await findLinkByCode(code);
    if (existing) return res.status(409).json({ error: "Code already exists" });

    const link = await createLink(code, url);
    res.status(201).json(link);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

export async function listLinks(req, res) {
  const links = await getAllLinks();
  res.json(links);
}

export async function getStats(req, res) {
  const link = await findLinkByCode(req.params.code);
  if (!link) return res.status(404).json({ error: "Not found" });
  res.json(link);
}

export async function deleteLinkHandler(req, res) {
  const link = await findLinkByCode(req.params.code);
  if (!link) return res.status(404).json({ error: "Not found" });

  await deleteLink(req.params.code);
  res.json({ success: true });
}

export async function redirectHandler(req, res) {
  const link = await findLinkByCode(req.params.code);
  if (!link) return res.status(404).json({ error: "Not found" });

  await incrementClicks(req.params.code);
  res.redirect(302, link.url);
}
