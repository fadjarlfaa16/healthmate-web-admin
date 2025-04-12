import express from "express";
import { getAllAppointmentController } from "../controllers/appointmentController";

const router = express.Router();

router.get("/appointment", getAllAppointmentController);

export default router;
