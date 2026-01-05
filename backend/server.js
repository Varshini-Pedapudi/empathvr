const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// In-memory feedback store
let feedbacks = [];

// Serve frontend files
app.use(express.static(path.join(__dirname, "..")));

// Home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../front.html"));
});

// GET feedbacks
app.get("/api/feedback", (req, res) => {
  res.status(200).json(feedbacks);
});

// POST feedback
app.post("/api/feedback", (req, res) => {
  const { feedback } = req.body;

  if (!feedback || feedback.trim() === "") {
    return res.status(400).json({ error: "Feedback required" });
  }

  feedbacks.push(feedback);
  res.status(201).json({ message: "Feedback saved" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
