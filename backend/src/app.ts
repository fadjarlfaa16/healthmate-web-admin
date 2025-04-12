import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import articleRoutes from "./routes/articleRoutes";
import doctorRoutes from "./routes/doctorRoutes";
import appointmentRoutes from "./routes/appointmentRoutes";

// const punycode = require("punycode");

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Enable CORS for all routes
app.use(cors());
app.use(cors(corsOptions));

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Mount routes under /api
app.use("/api", userRoutes);
app.use("/api", articleRoutes);
app.use("/api", doctorRoutes);
app.use("/api", appointmentRoutes);

export default app;
