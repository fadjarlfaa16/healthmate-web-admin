import express from "express";
import { getDashboardStatsController } from "../controllers/dashboardController";

const router = express.Router();

router.get("/dashboard/stats", getDashboardStatsController);

export default router;
