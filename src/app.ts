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

export default app;

