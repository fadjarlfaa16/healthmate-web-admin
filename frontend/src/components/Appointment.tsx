import { useState, useEffect } from "react";
import axios from "axios";
const Appointment = () => {
  // Example appointment data

  interface Timestamp {
    _seconds: number;
    _nanoseconds: number;
  }

  interface Appointment {
    id: string;
    based: string;
    contact: string;
    createdAt: Timestamp;
    date: string;
    doctorId: string;
    userId: string;
    doctorName: string;
    specialist: string;
    time: string;
    isApproved?: boolean;
  }

  const formatDate = (timestamp: Timestamp | undefined): string => {
    if (!timestamp || typeof timestamp._seconds !== "number") return "-";
    return new Date(timestamp._seconds * 1000).toLocaleString();
  };

  const [appointment, setAppointment] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [SelectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await axios.get<Appointment[]>(
          "http://localhost:5000/api/appointment"
        );
        setAppointment(response.data);
      } catch (err) {
        setError("Error fetching Appointments");
      } finally {
        setLoading(false);
      }
    };
    fetchAppointment();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAppointment = appointment.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(appointment.length / itemsPerPage);

  // const handleActionClick = (e: appointments) => {
  //   setSelectedAppointment(e);
  //   setShowConfirmation(true);
  // };

  // // Confirm the action
  // const handleConfirmAction = () => {
  //   console.log(`Confirmed action for doctor: ${selectedDoctor?.fullname}`);
  //   setShowConfirmation(false);
  //   setSelectedDoctor(null);
  // };

  // // Cancel the action
  // const handleCancelAction = () => {
  //   setShowConfirmation(false);
  //   setSelectedDoctor(null);
  // };
  return (
    <>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 ">Timestamp</th>
              <th className="px-4 py-2 ">Doctor</th>
              <th className="px-4 py-2 ">Patient</th>
              <th className="px-4 py-2 ">Specialist</th>
              <th className="px-4 py-2 ">Based</th>
              <th className="px-4 py-2 ">Schedule</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentAppointment.map((e) => (
              <tr key={e.id}>
                <td className="px-4 py-2  text-center">
                  {formatDate(e.createdAt)}
                </td>
                <td className="px-4 py-2  text-center">{e.doctorName}</td>
                <td className="px-4 py-2  text-center">{e.userId}</td>
                <td className="px-4 py-2  text-center">{e.doctorName}</td>
                <td className="px-4 py-2  text-center">{e.date}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    // onClick={() => handleActionClick(e)}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded align-middle content-center"
                  >
                    Delete Doctor
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Appointment;
