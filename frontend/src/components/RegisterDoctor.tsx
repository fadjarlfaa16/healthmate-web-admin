import React, { useState } from "react";
import axios from "axios";

interface Doctor {
  fullname: string;
  age: number;
  based: string;
  contact: string;
  specialist: string;
  appointmentCount?: number;
  profile?: string;
}

interface Props {
  onClose: () => void;
  onSuccess: (doctor: Doctor & { id: string }) => void;
}

const API_BASE_URL = "http://localhost:5000/api/doctors";

const RegisterDoctor: React.FC<Props> = ({ onClose, onSuccess }) => {
  const [newDoctor, setNewDoctor] = useState<Omit<Doctor, "id">>({
    fullname: "",
    age: 0,
    based: "",
    contact: "",
    specialist: "",
  });
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewDoctor((prev) => ({
      ...prev,
      [name]: name === "age" ? parseInt(value) || 0 : value,
    }));
  };

  const beforeUploadValidation = (file: File) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    const maxSize = 1 * 1024 * 1024; // 1MB

    if (!allowedTypes.includes(file.type)) {
      throw new Error("Hanya menerima file JPG/PNG/WEBP");
    }
    if (file.size > maxSize) {
      throw new Error("Ukuran file maksimal 2MB");
    }
  };

  const handleProfileUpload = async (file: File) => {
    beforeUploadValidation(file);
    try {
      const signedUrlResponse = await axios.post(
        `${API_BASE_URL}/upload-profile`,
        {
          fileName: file.name,
          fileType: file.type,
        }
      );

      const { uploadUrl, token, publicUrl } = signedUrlResponse.data.data;

      await axios.put(uploadUrl, file, {
        headers: {
          "Content-Type": file.type,
          Authorization: `Bearer ${token}`,
        },
      });

      return publicUrl;
    } catch (error) {
      console.error("Upload error:", error);
      throw new Error("Failed to Upload Profile");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    let profileUrl = "";
    try {
      if (profileFile) {
        profileUrl = await handleProfileUpload(profileFile);
      }

      const doctorWithProfile = {
        ...newDoctor,
        profile: profileUrl,
      };

      const response = await axios.post(API_BASE_URL, doctorWithProfile);
      onSuccess(response.data);
      onClose();
    } catch (err) {
      setError("Failed to create doctor");
      console.error("Error creating doctor:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white rounded shadow-lg p-6 z-10 w-full lg:max-w-[80%] md:max-w-[60%] max-w-[90%]">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Register New Doctor
        </h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 text-center">
              Profile Picture
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfileFile(e.target.files?.[0] || null)}
              className="w-full px-3 py-2 text-center border border-gray-300 rounded-md"
            />
            {profileFile && (
              <div className="mt-2 text-center">
                <img
                  src={URL.createObjectURL(profileFile)}
                  alt="Preview"
                  className="h-20 w-20 object-cover rounded"
                />
              </div>
            )}
          </div>

          <input
            type="text"
            name="fullname"
            value={newDoctor.fullname}
            onChange={handleInputChange}
            placeholder="Full Name"
            required
            disabled={isLoading}
            className="w-full mb-2 px-3 py-2 border rounded-md"
          />
          <input
            type="number"
            name="age"
            value={newDoctor.age || ""}
            onChange={handleInputChange}
            placeholder="Age"
            required
            disabled={isLoading}
            className="w-full mb-2 px-3 py-2 border rounded-md"
          />
          <input
            type="text"
            name="specialist"
            value={newDoctor.specialist}
            onChange={handleInputChange}
            placeholder="Specialist"
            required
            disabled={isLoading}
            className="w-full mb-2 px-3 py-2 border rounded-md"
          />
          <input
            type="text"
            name="based"
            value={newDoctor.based}
            onChange={handleInputChange}
            placeholder="Based Location"
            required
            disabled={isLoading}
            className="w-full mb-2 px-3 py-2 border rounded-md"
          />
          <input
            type="text"
            name="contact"
            value={newDoctor.contact}
            onChange={handleInputChange}
            placeholder="Contact"
            required
            disabled={isLoading}
            className="w-full mb-2 px-3 py-2 border rounded-md"
          />

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-center bg-gray-300 hover:bg-gray-400 text-gray-800 rounded"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-center bg-blue-500 hover:bg-blue-600 text-white rounded"
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register Doctor"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterDoctor;
