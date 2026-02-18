// Remove static import
// import app from "../server/app";

export default async function handler(req: any, res: any) {
  console.log(`[API] Incoming request: ${req.method} ${req.url}`);
  try {
    const app = (await import("../server/app")).default;
    return app(req, res);
  } catch (err: any) {
    console.error("[CRITICAL] Request handler crashed:", err);
    res.statusCode = 200; // Return 200 to see error in tool
    res.end(`DEBUG_ERROR: ${err.message}\nSTACK: ${err.stack}`);
  }
}
