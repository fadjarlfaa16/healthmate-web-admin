import { useState, useEffect } from "react";
import axios from "axios";
import { DataTable, Column } from "../components/Table";
import Pagination from "../components/Pagination";

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
  userName?: string;
  doctorName: string;
  specialist: string;
  time: string;
  isApproved?: boolean;
  status: string;
}

const formatDate = (ts?: Timestamp): string =>
  ts ? new Date(ts._seconds * 1000).toLocaleString() : "-";

const Appointment = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get<Appointment[]>(
          "http://localhost:5000/api/appointment"
        );
        setAppointments(data);
      } catch {
        setError("Error fetching appointments");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleStatusChange = async (
    appt: Appointment,
    newStatus: "accepted" | "rejected"
  ) => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:5000/api/appointment/${appt.id}`, {
        status: newStatus,
      });
      setAppointments((prev) =>
        prev.map((a) => (a.id === appt.id ? { ...a, status: newStatus } : a))
      );
    } catch {
      setError("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const current = appointments.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(appointments.length / itemsPerPage);

  const columns: Column<Appointment>[] = [
    {
      header: "Timestamp",
      render: (r) => formatDate(r.createdAt),
    },
    {
      header: "Doctor",
      accessor: "doctorName",
    },
    {
      header: "Patient",
      accessor: "userName",
    },
    {
      header: "Specialist",
      accessor: "specialist",
    },
    {
      header: "Date",
      accessor: "date",
    },
    {
      header: "Status",
      render: (r) => <span className="capitalize">{r.status}</span>,
    },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Appointment Schedule</h1>

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded-md">
          {error}
        </div>
      )}

      <DataTable<Appointment>
        columns={columns}
        data={current}
        loading={loading}
        noDataText="No appointments found."
        renderActions={(r) =>
          r.status === "pending" ? (
            <div className="flex justify-center space-x-2">
              <button
                onClick={() => handleStatusChange(r, "accepted")}
                disabled={loading}
                className="px-3 py-1 rounded-md text-sm bg-green-600 hover:bg-green-700 text-white transition"
              >
                Accept
              </button>
              <button
                onClick={() => handleStatusChange(r, "rejected")}
                disabled={loading}
                className="px-3 py-1 rounded-md text-sm bg-red-600 hover:bg-red-700 text-white transition"
              >
                Reject
              </button>
            </div>
          ) : (
            <span className="text-gray-500">—</span>
          )
        }
      />

      <Pagination
        currentPage={currentPage}
        totalItems={appointments.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Appointment;
