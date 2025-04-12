import React, { useState, useEffect } from "react";
import axios from "axios";

interface Doctor {
  id: string;
  fullname: string;
  age: number;
  based: string;
  contact: string;
  specialist: string;
  appointmentCount?: number;
  profile?: string;
}

const API_BASE_URL = "http://localhost:5000/api/doctors"; // Make sure this matches your backend URL

const Doctors = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [profileFile, setProfileFile] = useState<File | null>(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [editedDoctor, setEditedDoctor] = useState<Partial<Doctor> | null>(
    null
  );
  const [newDoctor, setNewDoctor] = useState<Omit<Doctor, "id">>({
    fullname: "",
    age: 0,
    based: "",
    contact: "",
    specialist: "",
    appointmentCount: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const itemsPerPage = 10;

  // Fetch doctors from API
  const fetchDoctors = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_BASE_URL);
      setDoctors(response.data);
    } catch (err) {
      setError("Failed to fetch doctors");
      console.error("Error fetching doctors:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDoctors = doctors.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(doctors.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleActionClick = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setShowConfirmation(true);
  };

  const handleEditClick = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setEditedDoctor({ ...doctor });
    setShowEditModal(true);
  };

  const handleConfirmAction = async () => {
    if (selectedDoctor?.id) {
      setIsLoading(true);
      try {
        await axios.delete(`${API_BASE_URL}/${selectedDoctor.id}`);
        setDoctors(doctors.filter((d) => d.id !== selectedDoctor.id));
        setShowConfirmation(false);
        setSelectedDoctor(null);
      } catch (err) {
        setError("Failed to delete doctor");
        console.error("Error deleting doctor:", err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCancelAction = () => {
    setShowConfirmation(false);
    setSelectedDoctor(null);
  };

  const handleRegistrationClick = () => {
    setShowRegistration(true);
  };

  const handleCloseRegistration = () => {
    setShowRegistration(false);
    setNewDoctor({
      fullname: "",
      age: 0,
      based: "",
      contact: "",
      specialist: "",
    });
    setError(null);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditedDoctor(null);
    setError(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewDoctor((prev) => ({
      ...prev,
      [name]: name === "age" ? parseInt(value) || 0 : value,
    }));
  };

  const beforeUploadValidation = (file: File) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    const maxSize = 1 * 1024 * 1024; // 2MB

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
      // Fetch to supabase
      const signedUrlResponse = await axios.post(
        "http://localhost:5000/api/doctors/upload-profile",
        {
          fileName: file.name,
          fileType: file.type,
        }
      );

      const { uploadUrl, token, publicUrl } = signedUrlResponse.data.data;

      // Upload Image to Supabase
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

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editedDoctor) {
      setEditedDoctor({
        ...editedDoctor,
        [name]: name === "age" ? parseInt(value) || 0 : value,
      });
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
      // const response = await axios.post(API_BASE_URL, newDoctor);
      const response = await axios.post(API_BASE_URL, doctorWithProfile);

      setDoctors([...doctors, response.data]);
      handleCloseRegistration();
      // setProfileFile(null);
    } catch (err) {
      setError("Failed to create doctor");
      console.error("Error creating doctor:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editedDoctor || !selectedDoctor?.id) return;

    setIsLoading(true);
    setError(null);
    try {
      await axios.put(`${API_BASE_URL}/${selectedDoctor.id}`, editedDoctor);
      const updatedDoctors = doctors.map((doc) =>
        doc.id === selectedDoctor.id ? { ...doc, ...editedDoctor } : doc
      );
      setDoctors(updatedDoctors);
      handleCloseEditModal();
    } catch (err) {
      setError("Failed to update doctor");
      console.error("Error updating doctor:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="text-white text-xl">Loading...</div>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}

      <div className="overflow-x-auto">
        <div className="flex justify-evenly items-center mb-4">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-lg">
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>

          <button
            onClick={handleRegistrationClick}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
            disabled={isLoading}
          >
            Regist Doctor
          </button>
        </div>

        <table className="min-w-full text-white">
          <thead className="bg-black">
            <tr>
              <th className="px-4 py-2 border-b border-gray-700">ID</th>
              <th className="px-4 py-2 border-b border-gray-700">Fullname</th>
              <th className="px-4 py-2 border-b border-gray-700">Age</th>
              <th className="px-4 py-2 border-b border-gray-700">Specialist</th>
              <th className="px-4 py-2 border-b border-gray-700">Based</th>
              <th className="px-4 py-2 border-b border-gray-700">Contact</th>
              <th className="px-4 py-2 border-b border-gray-700">
                Appointment Count
              </th>
              <th className="px-4 py-2 border-b border-gray-700">Action</th>
            </tr>
          </thead>
          <tbody className="text-black">
            {currentDoctors.map((doctor) => (
              <tr key={doctor.id}>
                <td className="px-4 py-2 border border-gray-700 text-center">
                  {doctor.id}
                </td>
                <td className="px-4 py-2 border border-gray-700 text-center">
                  {doctor.fullname}
                </td>
                <td className="px-4 py-2 border border-gray-700 text-center">
                  {doctor.age}
                </td>
                <td className="px-4 py-2 border border-gray-700 text-center">
                  {doctor.specialist}
                </td>
                <td className="px-4 py-2 border border-gray-700 text-center">
                  {doctor.based}
                </td>
                <td className="px-4 py-2 border border-gray-700 text-center">
                  {doctor.contact}
                </td>
                <td className="px-4 py-2 border border-gray-700 text-center">
                  {doctor.appointmentCount || 0}
                </td>
                <td className="px-4 py-2 border border-gray-700 text-center space-x-2">
                  <button
                    onClick={() => handleEditClick(doctor)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded"
                    disabled={isLoading}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleActionClick(doctor)}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                    disabled={isLoading}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-4 flex justify-center">
            <nav className="inline-flex">
              {Array.from({ length: totalPages }, (_, index) => {
                const pageNumber = index + 1;
                return (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`px-3 py-1 mx-1 border border-gray-700 rounded ${
                      currentPage === pageNumber
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    disabled={isLoading}
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </nav>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="bg-white rounded shadow-lg p-6 z-10">
            <p className="mb-4 text-gray-800">
              Are you sure you want to delete this account named "
              {selectedDoctor?.fullname}"?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancelAction}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded"
                disabled={isLoading}
              >
                No
              </button>
              <button
                onClick={handleConfirmAction}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                disabled={isLoading}
              >
                {isLoading ? "Deleting..." : "Yes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Registration Modal */}
      {showRegistration && (
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
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Profile Picture
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setProfileFile(e.target.files?.[0] || null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />

                {/* Tampilkan preview gambar */}
                {profileFile && (
                  <div className="mt-2">
                    <img
                      src={URL.createObjectURL(profileFile)}
                      alt="Preview"
                      className="h-20 w-20 object-cover rounded"
                    />
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="fullname"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  value={newDoctor.fullname}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="age"
                >
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={newDoctor.age || ""}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="specialist"
                >
                  Specialist
                </label>
                <input
                  type="text"
                  id="specialist"
                  name="specialist"
                  value={newDoctor.specialist}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="based"
                >
                  Based Location
                </label>
                <input
                  type="text"
                  id="based"
                  name="based"
                  value={newDoctor.based}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="contact"
                >
                  Contact
                </label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  value={newDoctor.contact}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={handleCloseRegistration}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                  disabled={isLoading}
                >
                  {isLoading ? "Registering..." : "Register Doctor"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Doctor Modal */}
      {showEditModal && selectedDoctor && editedDoctor && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="bg-white rounded shadow-lg p-6 z-10 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Edit Doctor
            </h2>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                {error}
              </div>
            )}
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="edit-fullname"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="edit-fullname"
                  name="fullname"
                  value={editedDoctor.fullname || ""}
                  onChange={handleEditInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="edit-age"
                >
                  Age
                </label>
                <input
                  type="number"
                  id="edit-age"
                  name="age"
                  value={editedDoctor.age || ""}
                  onChange={handleEditInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="edit-specialist"
                >
                  Specialist
                </label>
                <input
                  type="text"
                  id="edit-specialist"
                  name="specialist"
                  value={editedDoctor.specialist || ""}
                  onChange={handleEditInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="edit-based"
                >
                  Based Location
                </label>
                <input
                  type="text"
                  id="edit-based"
                  name="based"
                  value={editedDoctor.based || ""}
                  onChange={handleEditInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="edit-contact"
                >
                  Contact
                </label>
                <input
                  type="text"
                  id="edit-contact"
                  name="contact"
                  value={editedDoctor.contact || ""}
                  onChange={handleEditInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={handleCloseEditModal}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                  disabled={isLoading}
                >
                  {isLoading ? "Updating..." : "Update Doctor"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Doctors;
