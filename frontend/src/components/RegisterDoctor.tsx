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
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) {
      throw new Error("Hanya JPG/PNG/WEBP");
    }
    if (file.size > 2 * 1024 * 1024) {
      throw new Error("Maksimal 2MB");
    }
  };

  const handleProfileUpload = async (file: File) => {
    beforeUploadValidation(file);
    const { data } = await axios.post(`${API_BASE_URL}/upload-profile`, {
      fileName: file.name,
      fileType: file.type,
    });
    const { uploadUrl, token, publicUrl } = data.data;
    await axios.put(uploadUrl, file, {
      headers: { "Content-Type": file.type, Authorization: `Bearer ${token}` },
    });
    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      let profileUrl = "";
      if (profileFile) {
        profileUrl = await handleProfileUpload(profileFile);
      }
      const payload = { ...newDoctor, profile: profileUrl };
      const res = await axios.post(API_BASE_URL, payload);
      onSuccess(res.data);
      onClose();
    } catch (err) {
      setError("Gagal mendaftarkan dokter");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />
      <div className="bg-white rounded-lg shadow-lg p-6 z-10 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
          Register New Doctor
        </h2>
        {error && (
          <div className="bg-red-100 text-red-700 px-3 py-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {/* Profile Upload */}
          <div className="sm:col-span-2">
            <label className="block text-gray-700 text-sm mb-1">
              Profile Picture
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfileFile(e.target.files?.[0] || null)}
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
                         file:rounded-md file:border-0
                         file:text-sm file:font-semibold
                         file:bg-gray-100 file:text-gray-700
                         hover:file:bg-gray-200"
              disabled={isLoading}
            />
            {profileFile && (
              <div className="mt-2 flex justify-center">
                <img
                  src={URL.createObjectURL(profileFile)}
                  alt="Preview"
                  className="h-20 w-20 rounded-full object-cover border"
                />
              </div>
            )}
          </div>

          {/* Fullname */}
          <div>
            <label className="block text-gray-700 text-sm mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              value={newDoctor.fullname}
              onChange={handleInputChange}
              required
              disabled={isLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md
                         text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-gray-700 text-sm mb-1">Age</label>
            <input
              type="number"
              name="age"
              value={newDoctor.age || ""}
              onChange={handleInputChange}
              required
              disabled={isLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md
                         text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Specialist */}
          <div>
            <label className="block text-gray-700 text-sm mb-1">
              Specialist
            </label>
            <input
              type="text"
              name="specialist"
              value={newDoctor.specialist}
              onChange={handleInputChange}
              required
              disabled={isLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md
                         text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Based Location */}
          <div>
            <label className="block text-gray-700 text-sm mb-1">
              Based Location
            </label>
            <input
              type="text"
              name="based"
              value={newDoctor.based}
              onChange={handleInputChange}
              required
              disabled={isLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md
                         text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Contact */}
          <div className="sm:col-span-2">
            <label className="block text-gray-700 text-sm mb-1">Contact</label>
            <input
              type="text"
              name="contact"
              value={newDoctor.contact}
              onChange={handleInputChange}
              required
              disabled={isLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md
                         text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Buttons */}
          <div className="sm:col-span-2 flex justify-end space-x-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm transition"
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
