import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { foxitClient } from "./_lib/foxitClient.js";
import { PDF_TEMPLATES } from "./_lib/templates.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

const router = express.Router();

router.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date(),
    env: {
      hasClientId: !!process.env.FOXIT_CLIENT_ID,
      hasClientSecret: !!process.env.FOXIT_CLIENT_SECRET,
      baseUrl: process.env.FOXIT_BASE_URL || 'DEFAULT (https://na1.fusion.foxit.com)'
    }
  });
});

router.post("/events", (req, res) => {
  const { eventType, message } = req.body;
  console.log(`[EVENT] ${eventType}: ${message}`);
  res.json({ status: "logged", timestamp: new Date() });
});

router.post("/generate", async (req, res) => {
  try {
    const { templateId, data, services } = req.body;
    console.log("Generating document for:", templateId, "Services:", services);

    const templateGen = PDF_TEMPLATES[templateId];
    const templateData = { ...data, hasWatermark: services?.includes('watermark') };

    let htmlContent = '';
    if (templateGen) {
      htmlContent = templateGen(templateData);
    } else {
      htmlContent = `<html><body><h1>${data.name || 'Agreement'}</h1><p>Template: ${templateId}</p></body></html>`;
    }

    const pdfBuffer = await foxitClient.generatePdfFromHtml(htmlContent);
    const base64Pdf = pdfBuffer.toString('base64');

    res.json({
      status: "success",
      message: "Document generated successfully",
      pdfBase64: base64Pdf
    });
  } catch (error) {
    console.error("Error generating document:", error);
    res.status(500).json({
      error: "Failed to generate document",
      details: error.message,
      stack: error.stack,
      axiosError: error.response?.data
    });
  }
});

router.post("/process", async (req, res) => {
  try {
    const { pdfBase64, services } = req.body;
    let processedBuffer = Buffer.from(pdfBase64, 'base64');

    if (services.includes('watermark')) {
      console.log("Applying Foxit Watermark Service...");
      processedBuffer = await foxitClient.applyWatermark(processedBuffer, "CONFIDENTIAL");
    }

    if (services.includes('linearize')) {
      console.log("Linearizing...");
      processedBuffer = await foxitClient.linearizePdf(processedBuffer);
    }

    res.json({
      status: "success",
      message: "Processing complete",
      pdfBase64: processedBuffer.toString('base64')
    });
  } catch (error) {
    console.error("Error processing document:", error);
    res.status(500).json({ error: "Failed to process document" });
  }
});

app.use("/api", router);
app.use("/", router);

export default function handler(req, res) {
  console.log(`[API] Incoming request: ${req.method} ${req.url}`);
  try {
    return app(req, res);
  } catch (err) {
    console.error("[CRITICAL] Request handler crashed:", err);
    res.statusCode = 500;
    res.end(`Internal Server Error: ${err.message}`);
  }
}
