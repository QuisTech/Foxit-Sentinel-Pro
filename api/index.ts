import app from "../server/app";

export default function handler(req: any, res: any) {
  console.log(`[API] Incoming request: ${req.method} ${req.url}`);
  try {
    return app(req, res);
  } catch (err: any) {
    console.error("[CRITICAL] Request handler crashed:", err);
    res.statusCode = 500;
    res.end(`Internal Server Error: ${err.message}`);
  }
}
