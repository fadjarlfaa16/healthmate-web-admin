import express from "express";
import multer from "multer";
import {
  getAllDoctorsController,
  getDoctorController,
  createDoctorController,
  updateDoctorController,
  deleteDoctorController,
  uploadDoctorImageController,
} from "../controllers/doctorController";

const router = express.Router();
const upload = multer();

// GET all doctors
router.get("/doctors", getAllDoctorsController);

// GET single doctor
router.get("/doctors/:id", getDoctorController);

// POST create new doctor
router.post("/doctors", upload.single("profile"), createDoctorController);
router.post("/doctors/upload-profile", uploadDoctorImageController);

// PUT update doctor
router.put("/doctors/:id", updateDoctorController);

// DELETE doctor
router.delete("/doctors/:id", deleteDoctorController);

export default router;
