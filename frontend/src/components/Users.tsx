import { useEffect, useState } from "react";
import axios from "axios";

interface Profile {
  fullname?: string;
  domicle?: string;
  age?: number;
  imagePath?: string;
}

interface Timestamp {
  _seconds: number;
  _nanoseconds: number;
}

interface User {
  id: string;
  email: string;
  password: string;
  profile: Profile;
  accountCreated: Timestamp;
}

const formatDate = (timestamp: Timestamp | undefined): string => {
  if (!timestamp || typeof timestamp._seconds !== "number") return "-";
  return new Date(timestamp._seconds * 1000).toLocaleString();
};

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>(
          "http://localhost:5000/api/users"
        );
        setUsers(response.data);
      } catch (err) {
        setError("Error fetching users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleActionClick = (user: User) => {
    setSelectedUser(user);
    setShowConfirmation(true);
  };

  const handleConfirmAction = () => {
    console.log(`Confirmed action for user: ${selectedUser?.email}`);
    setShowConfirmation(false);
    setSelectedUser(null);
  };

  const handleCancelAction = () => {
    setShowConfirmation(false);
    setSelectedUser(null);
  };

  if (loading) return <div className="text-center mt-10">Loading users...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="relative">
      <div className="overflow-x-auto">
        <table className="min-w-full text-white">
          <thead className="bg-black">
            <tr>
              <th className="px-4 py-2 border-b border-gray-700">ID</th>
              <th className="px-4 py-2 border-b border-gray-700">Username</th>
              <th className="px-4 py-2 border-b border-gray-700">Email</th>
              <th className="px-4 py-2 border-b border-gray-700">Password</th>
              <th className="px-4 py-2 border-b border-gray-700">
                Account Created
              </th>
              <th className="px-4 py-2 border-b border-gray-700">Action</th>
            </tr>
          </thead>
          <tbody className="text-black">
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-4 py-2 border border-gray-700 text-center">
                  {user.id}
                </td>
                <td className="px-4 py-2 border border-gray-700 text-center">
                  {user.profile?.fullname ?? "-"}
                </td>
                <td className="px-4 py-2 border border-gray-700 text-center">
                  {user.email}
                </td>
                <td className="px-4 py-2 border border-gray-700 text-center">
                  {user.password}
                </td>
                <td className="px-4 py-2 border border-gray-700 text-center">
                  {formatDate(user.accountCreated)}
                </td>
                <td className="px-4 py-2 border border-gray-700 text-center">
                  <button
                    onClick={() => handleActionClick(user)}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded align-middle content-center"
                  >
                    Delete User
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
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </nav>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="bg-white rounded shadow-lg p-6 z-10">
            <p className="mb-4 text-gray-800">
              Are you sure you want to delete this account named "
              {selectedUser?.email}"?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancelAction}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded"
              >
                No
              </button>
              <button
                onClick={handleConfirmAction}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
