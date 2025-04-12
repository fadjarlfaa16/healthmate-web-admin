// src/controllers/doctorController.ts
import { Request, Response, NextFunction } from "express";
import {
  getAllDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from "../services/doctorService";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export const getAllDoctorsController = async (req: Request, res: Response) => {
  try {
    const doctors = await getAllDoctors();
    res.status(200).json(doctors);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getDoctorController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const doctor = await getDoctorById(id);
    if (doctor) {
      res.status(200).json(doctor);
    } else {
      res.status(404).json({ message: "Doctor not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
export const uploadDoctorImageController = async (
  req: Request,
  res: Response
) => {
  try {
    const { fileName, fileType } = req.body;

    const filePath = `doctors/${uuidv4()}-${fileName}`;

    const { data, error: uploadError } = await supabase.storage
      .from("img-profile")
      .createSignedUploadUrl(filePath);

    if (uploadError) throw uploadError;

    const publicUrl = supabase.storage
      .from("img-profile")
      .getPublicUrl(filePath).data.publicUrl;

    res.status(200).json({
      success: true,
      data: {
        uploadUrl: data?.signedUrl,
        token: data?.token,
        publicUrl,
      },
    });
  } catch (error: any) {
    console.error("Upload URL Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const createDoctorController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const doctorData = req.body;

    if (!doctorData.fullname || !doctorData.specialist) {
      res.status(400).json({
        success: false,
        error: "Fullname and Specialist Field must be filled",
      });
      return;
    }

    if (doctorData.profile && !isValidUrl(doctorData.profile)) {
      res.status(400).json({
        success: false,
        error: "URL not Valid",
      });
      return;
    }

    const doctor = await createDoctor(doctorData);

    res.status(201).json({
      success: true,
      data: doctor,
    });
  } catch (error: any) {
    console.error("[CONTROLLER ERROR]", error);
    res.status(500).json({
      success: false,
      error: error.message || "Internal server error",
    });
  }
};

// export const createDoctorController = async (req: Request, res: Response) => {
//   // try {
//   //   const doctorData = req.body;
//   //   const doctor = await createDoctor(doctorData);
//   //   res.status(201).json(doctor);
//   // } catch (error: any) {
//   //   res.status(500).json({ message: error.message });
//   // }

//   try {
//     const doctorData = req.body;

//     // Validasi data
//     if (!doctorData.fullname || !doctorData.specialist) {
//       return res.status(400).json({
//         success: false,
//         error: "Nama lengkap dan spesialisasi wajib diisi",
//       });
//     }

//     // Jika ada URL gambar, validasi format
//     if (doctorData.profile && !isValidUrl(doctorData.profile)) {
//       return res.status(400).json({
//         success: false,
//         error: "URL gambar profil tidak valid",
//       });
//     }

//     // Simpan ke Firestore
//     const doctor = await createDoctor(doctorData);

//     res.status(201).json({
//       success: true,
//       data: doctor,
//     });
//   } catch (error: any) {
//     console.error("[CONTROLLER ERROR]", error);
//     res.status(500).json({
//       success: false,
//       error: error.message || "Internal server error",
//     });
//   }
// };

export const updateDoctorController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    await updateDoctor(id, updateData);
    const updatedDoctor = await getDoctorById(id);
    res.status(200).json(updatedDoctor);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteDoctorController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteDoctor(id);
    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
