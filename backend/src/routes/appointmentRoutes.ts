import express from "express";
import {
  getAllAppointmentController,
  updateAppointmentController,
} from "../controllers/appointmentController";

const router = express.Router();

router.get("/appointment", getAllAppointmentController);
router.put("/appointment/:id", updateAppointmentController);

export default router;
