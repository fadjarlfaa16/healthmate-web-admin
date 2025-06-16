import React, { useEffect, useState } from "react";
import axios from "axios";
import RegisterDoctor from "../components/RegisterDoctor";
import SearchBar from "../components/SearchBar";
import DeleteModal from "../components/DeleteModal";
import EditModal from "../components/EditModal";
import Pagination from "../components/Pagination";

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

const API_BASE_URL = "http://localhost:5000/api/doctors";

const Doctors = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [showRegistration, setShowRegistration] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedDoctor, setEditedDoctor] = useState<Partial<Doctor> | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const itemsPerPage = 10;

  const fetchDoctors = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(API_BASE_URL);
      setDoctors(response.data);
    } catch (err) {
      setError("Failed to fetch doctors");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter((doctor) => {
    const query = searchTerm.toLowerCase();
    return (
      doctor.fullname.toLowerCase().includes(query) ||
      doctor.specialist.toLowerCase().includes(query) ||
      doctor.based.toLowerCase().includes(query) ||
      doctor.age.toString().includes(query)
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDoctors = filteredDoctors.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (page: number) => setCurrentPage(page);
  const handleRegistrationClick = () => setShowRegistration(true);
  const handleCloseRegistration = () => setShowRegistration(false);

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
    if (!selectedDoctor?.id) return;
    setIsLoading(true);
    try {
      await axios.delete(`${API_BASE_URL}/${selectedDoctor.id}`);
      setDoctors(doctors.filter((d) => d.id !== selectedDoctor.id));
      setShowConfirmation(false);
      setSelectedDoctor(null);
    } catch (err) {
      setError("Failed to delete doctor");
    } finally {
      setIsLoading(false);
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

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editedDoctor || !selectedDoctor?.id) return;
    setIsLoading(true);
    try {
      await axios.put(`${API_BASE_URL}/${selectedDoctor.id}`, editedDoctor);
      const updated = doctors.map((doc) =>
        doc.id === selectedDoctor.id ? { ...doc, ...editedDoctor } : doc
      );
      setDoctors(updated);
      setShowEditModal(false);
    } catch (err) {
      setError("Failed to update doctor");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}

      <div className="overflow-x-auto">
        <div className="flex justify-evenly items-center mb-4">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <button
            onClick={handleRegistrationClick}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 text-center px-4 rounded-lg transition-colors duration-200"
            disabled={isLoading}
          >
            Regist Doctor
          </button>
        </div>

        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-center">Profile</th>
                <th className="px-4 py-2 text-center">Fullname</th>
                <th className="px-4 py-2 text-center">Age</th>
                <th className="px-4 py-2 text-center">Specialist</th>
                <th className="px-4 py-2 text-center">Based</th>
                <th className="px-4 py-2 text-center">Contact</th>
                <th className="px-4 py-2 text-center">Appointment Count</th>
                <th className="px-4 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-black divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="text-center py-4">
                    <span className="text-blue-500 font-medium text-lg">
                      Loading...
                    </span>
                  </td>
                </tr>
              ) : (
                currentDoctors.map((doctor) => (
                  <tr key={doctor.id}>
                    <td className="px-4 py-2 text-center">
                      <img
                        src={doctor.profile}
                        className="rounded-full border-2 w-[50px] h-[50px]"
                      />
                    </td>
                    <td className="px-4 py-2 text-center">{doctor.fullname}</td>
                    <td className="px-4 py-2 text-center">{doctor.age}</td>
                    <td className="px-4 py-2 text-center">
                      {doctor.specialist}
                    </td>
                    <td className="px-4 py-2 text-center">{doctor.based}</td>
                    <td className="px-4 py-2 text-center">{doctor.contact}</td>
                    <td className="px-4 py-2 text-center">
                      {doctor.appointmentCount || 0}
                    </td>
                    <td className="px-4 py-2 text-center space-x-2">
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
                ))
              )}
            </tbody>
          </table>

          <Pagination
            currentPage={currentPage}
            totalItems={filteredDoctors.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      <DeleteModal
        name={selectedDoctor?.fullname || ""}
        isOpen={showConfirmation}
        isLoading={isLoading}
        onCancel={() => setShowConfirmation(false)}
        onConfirm={handleConfirmAction}
      />

      {showRegistration && (
        <RegisterDoctor
          onClose={handleCloseRegistration}
          onSuccess={(newDoc) => setDoctors([...doctors, newDoc])}
        />
      )}

      <EditModal
        doctor={editedDoctor as Doctor}
        isOpen={showEditModal}
        isLoading={isLoading}
        onChange={handleEditInputChange}
        onCancel={() => setShowEditModal(false)}
        onSubmit={handleEditSubmit}
      />
    </div>
  );
};

export default Doctors;
