import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import articleRoutes from "./routes/articleRoutes";
import doctorRoutes from "./routes/doctorRoutes";
import appointmentRoutes from "./routes/appointmentRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors());
app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use("/api", userRoutes);
app.use("/api", articleRoutes);
app.use("/api", doctorRoutes);
app.use("/api", appointmentRoutes);
app.use("/api", dashboardRoutes);

export default app;
