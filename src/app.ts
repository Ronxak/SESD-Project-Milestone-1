import express from "express";
import path from "path";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import subjectRoutes from "./routes/subject.routes";
import taskRoutes from "./routes/task.routes";
import sessionRoutes from "./routes/session.routes";

import mongoose from "mongoose";

const app = express();

app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, "../public")));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/sessions", sessionRoutes);

app.get("/api/health", (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  const statusMap = ["Disconnected", "Connected", "Connecting", "Disconnecting"];
  
  res.json({ 
    message: "Welcome to Study Planner API!",
    status: "Running",
    db_status: statusMap[dbStatus] || "Unknown"
  });
});

// SPA fallback — only for non-API routes
app.use((req, res, next) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).json({ message: "API endpoint not found" });
  }
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Global Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "production" ? {} : err.message 
  });
});

export default app;
