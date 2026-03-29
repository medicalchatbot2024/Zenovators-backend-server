const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: '.env.local' });
const { ConvexHttpClient } = require('convex/browser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Convex Client
const convexUrl = process.env.CONVEX_URL;
if (!convexUrl) {
  console.warn("WARNING: CONVEX_URL is not set in environment variables (.env.local).");
}
const convex = new ConvexHttpClient(convexUrl || "https://placeholder-url.convex.cloud");

// POST router to receive data and store in convex
app.post('/api/data', async (req, res) => {
  try {
    const { heartrate, spo2, resprate, temperature } = req.body;
    
    if (heartrate === undefined && spo2 === undefined && resprate === undefined && temperature === undefined) {
      return res.status(400).json({ error: "No health data provided in request body" });
    }

    // Call the Convex mutation ("data:store" -> data.js, store action)
    const resultId = await convex.mutation("data:store", { 
      heartrate: heartrate != null ? Number(heartrate) : undefined,
      spo2: spo2 != null ? Number(spo2) : undefined,
      resprate: resprate != null ? Number(resprate) : undefined,
      temperature: temperature != null ? Number(temperature) : undefined,
    });

    res.status(201).json({ 
      success: true, 
      message: "Data stored in Convex",
      id: resultId 
    });
  } catch (error) {
    console.error("Error storing data:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
