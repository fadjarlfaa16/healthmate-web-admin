import React, { useEffect, useState } from "react";
import axios from "axios";
import RegisterDoctor from "../components/RegisterDoctor";
import SearchBar from "../components/SearchBar";
import DeleteModal from "../components/DeleteModal";
import EditModal from "../components/EditModal";
import { DataTable, Column } from "../components/Table";
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
      const { data } = await axios.get<Doctor[]>(API_BASE_URL);
      setDoctors(data);
    } catch {
      setError("Failed to fetch doctors");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const filtered = doctors.filter((d) => {
    const q = searchTerm.toLowerCase();
    return (
      d.fullname.toLowerCase().includes(q) ||
      d.specialist.toLowerCase().includes(q) ||
      d.based.toLowerCase().includes(q) ||
      d.age.toString().includes(q)
    );
  });

  const idxLast = currentPage * itemsPerPage;
  const idxFirst = idxLast - itemsPerPage;
  const currentDoctors = filtered.slice(idxFirst, idxLast);

  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleRegistrationClick = () => setShowRegistration(true);
  const handleCloseRegistration = () => setShowRegistration(false);
  const handleSuccessRegistration = (_newDoc: Doctor) => {
    fetchDoctors();
    handleCloseRegistration();
  };

  const handleActionClick = (d: Doctor) => {
    setSelectedDoctor(d);
    setShowConfirmation(true);
  };
  const handleConfirmDelete = async () => {
    if (!selectedDoctor) return;
    setIsLoading(true);
    try {
      await axios.delete(`${API_BASE_URL}/${selectedDoctor.id}`);
      setDoctors((prev) => prev.filter((doc) => doc.id !== selectedDoctor.id));
      setShowConfirmation(false);
      setSelectedDoctor(null);
    } catch {
      setError("Failed to delete doctor");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = (d: Doctor) => {
    setSelectedDoctor(d);
    setEditedDoctor(d);
    setShowEditModal(true);
  };
  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedDoctor((prev) =>
      prev
        ? {
            ...prev,
            [name]: name === "age" ? parseInt(value) || 0 : value,
          }
        : prev
    );
  };
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editedDoctor || !selectedDoctor) return;
    setIsLoading(true);
    try {
      await axios.put(`${API_BASE_URL}/${selectedDoctor.id}`, editedDoctor);
      setDoctors((prev) =>
        prev.map((doc) =>
          doc.id === selectedDoctor.id ? { ...doc, ...editedDoctor } : doc
        )
      );
      setShowEditModal(false);
      setSelectedDoctor(null);
    } catch {
      setError("Failed to update doctor");
    } finally {
      setIsLoading(false);
    }
  };

  const columns: Column<Doctor>[] = [
    {
      header: "Profile",
      render: (d) => (
        <img
          src={d.profile}
          alt={d.fullname}
          className="w-10 h-10 rounded-full mx-auto object-cover"
        />
      ),
      className: "w-[10%]",
    },
    { header: "Fullname", accessor: "fullname", className: "w-[20%]" },
    { header: "Age", accessor: "age", className: "w-[10%]" },
    {
      header: "Specialist",
      accessor: "specialist",
      className: "w-[20%]",
    },
    { header: "Based", accessor: "based", className: "w-[15%]" },
    { header: "Contact", accessor: "contact", className: "w-[15%]" },
  ];

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex items-center mb-4 gap-4">
        <h1 className="text-xl font-semibold">Doctor Management</h1>
        <div className="flex-1 justify-center">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </div>
        <button
          onClick={handleRegistrationClick}
          disabled={isLoading}
          className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white transition"
        >
          Register Doctor
        </button>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded-md">
          {error}
        </div>
      )}

      <DataTable<Doctor>
        columns={columns}
        data={currentDoctors}
        loading={isLoading}
        noDataText="No doctors found."
        renderActions={(d) => (
          <>
            <div className="flex justify-center space-x-2">
              <button
                onClick={() => handleEditClick(d)}
                disabled={isLoading}
                className="px-3 py-1 rounded-md text-sm bg-orange-400 hover:bg-orange-500 text-white transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleActionClick(d)}
                disabled={isLoading}
                className="px-3 py-1 rounded-md text-sm bg-red-600 hover:bg-red-700 text-white transition"
              >
                Remove
              </button>
            </div>
          </>
        )}
      />

      <Pagination
        currentPage={currentPage}
        totalItems={filtered.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />

      <DeleteModal
        name={selectedDoctor?.fullname || ""}
        isOpen={showConfirmation}
        isLoading={isLoading}
        onCancel={() => setShowConfirmation(false)}
        onConfirm={handleConfirmDelete}
      />

      {showRegistration && (
        <RegisterDoctor
          onClose={handleCloseRegistration}
          onSuccess={handleSuccessRegistration}
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
