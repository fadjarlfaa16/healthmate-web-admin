import { useEffect, useState } from "react";
import axios from "axios";
import { DataTable, Column } from "../components/Table";
import Pagination from "../components/Pagination";

interface Profile {
  fullname?: string;
  domicle?: string;
  age?: number;
  imagePath?: string;
}

interface User {
  id: string;
  email: string;
  password: string;
  profile: Profile;
  accountCreated: number;
}

const formatDate = (ms?: number): string =>
  typeof ms === "number" ? new Date(ms).toLocaleString() : "-";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const itemsPerPage = 10;

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get<User[]>(
          "http://localhost:5000/api/users"
        );
        setUsers(data);
      } catch {
        setError("Error fetching users");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleActionClick = (user: User) => {
    setSelectedUser(user);
    setShowConfirmation(true);
  };

  const handleConfirmAction = async () => {
    if (!selectedUser) return;
    try {
      await axios.delete(`http://localhost:5000/api/users/${selectedUser.id}`);
      setUsers((prev) => prev.filter((u) => u.id !== selectedUser.id));
      setShowConfirmation(false);
      setSelectedUser(null);
    } catch {
      setError("Failed to delete user");
    }
  };

  const handleCancelAction = () => {
    setShowConfirmation(false);
    setSelectedUser(null);
  };

  const columns: Column<User>[] = [
    {
      header: "Profile",
      render: (u) => (
        <img
          src={u.profile.imagePath}
          alt={u.profile.fullname}
          className="w-8 h-8 rounded-full mx-auto object-cover"
        />
      ),
      className: "w-[10%]",
    },
    { header: "User ID", accessor: "id", className: "w-[20%]" },
    {
      header: "Fullname",
      render: (u) => u.profile.fullname || "-",
      className: "w-[15%]",
    },
    { header: "Email", accessor: "email", className: "w-[20%]" },
    {
      header: "Account Created",
      render: (u) => formatDate(u.accountCreated),
      className: "w-[20%]",
    },
  ];

  return (
    <div className="relative p-4 w-full max-w-7xl mx-auto">
      <h1 className="text-xl font-semibold mb-5">Users List</h1>

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded-md">
          {error}
        </div>
      )}

      <DataTable<User>
        columns={columns}
        data={currentUsers}
        loading={loading}
        noDataText="No users found."
        renderActions={(u) => (
          <button
            onClick={() => handleActionClick(u)}
            className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded"
          >
            Delete
          </button>
        )}
      />

      <Pagination
        currentPage={currentPage}
        totalItems={users.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />

      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="bg-white rounded-lg shadow-xl p-6 z-10 w-96">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Confirm Deletion
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to delete the account "{selectedUser?.email}
              "? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCancelAction}
                className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAction}
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
