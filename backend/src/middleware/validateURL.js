export function validateURL(req, res, next) {
  try {
    new URL(req.body.url);
    next();
  } catch {
    return res.status(400).json({ error: "Invalid URL format" });
  }
}
