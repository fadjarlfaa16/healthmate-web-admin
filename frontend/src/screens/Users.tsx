import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../components/Pagination";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

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
    <div className="relative p-4 w-full max-w-7xl mx-auto">
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <div className="w-full overflow-x-auto">
          <div className="flex justify-center">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-extrabold w-[10%] text-center">
                    Profile
                  </TableHead>
                  <TableHead className="font-extrabold w-[20%] text-center">
                    User ID
                  </TableHead>
                  <TableHead className="font-extrabold w-[15%] text-center">
                    Fullname
                  </TableHead>
                  <TableHead className="font-extrabold w-[10%] text-center">
                    Email
                  </TableHead>
                  <TableHead className="font-extrabold w-[20%] text-center">
                    Account Created
                  </TableHead>
                  <TableHead className="font-extrabold w-[20%] text-center">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className=" text-center">User Profile</TableCell>
                    <TableCell className="text-center">{user.id}</TableCell>
                    <TableCell className="text-center">
                      {user.profile.fullname}
                    </TableCell>
                    <TableCell className="text-center">{user.email}</TableCell>
                    <TableCell className="text-center">
                      {formatDate(user.accountCreated)}
                    </TableCell>
                    <TableCell className="text-center">
                      {formatDate(user.accountCreated)}
                    </TableCell>
                  </TableRow>
                ))}
                ;
              </TableBody>
            </Table>
          </div>
        </div>
        <Pagination
          currentPage={currentPage}
          totalItems={users.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>

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
