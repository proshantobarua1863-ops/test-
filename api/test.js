export default async function handler(req, res) {
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: "?url=https://site.com din" });

  const start = Date.now();
  try {
    const r = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
      signal: AbortSignal.timeout(9000),
    });
    const text = await r.text();
    res.status(200).json({
      ok: true,
      status: r.status,
      timeMs: Date.now() - start,
      length: text.length,
      preview: text.slice(0, 300),
    });
  } catch (e) {
    res.status(200).json({
      ok: false,
      error: String(e),
      cause: String(e.cause || ""),
      timeMs: Date.now() - start,
    });
  }
}
