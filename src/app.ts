import express from "express";

import authRoutes from "./routes/auth.routes";
import subjectRoutes from "./routes/subject.routes";
import taskRoutes from "./routes/task.routes";
import sessionRoutes from "./routes/session.routes";

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/sessions", sessionRoutes);

import mongoose from "mongoose";

app.get("/", (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  const statusMap = ["Disconnected", "Connected", "Connecting", "Disconnecting"];
  
  res.json({ 
    message: "Welcome to Study Planner API!",
    status: "Running",
    db_status: statusMap[dbStatus] || "Unknown",
    docs: "/api/auth/register"
  });
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

