// src/components/DeleteUser.tsx
import React, { useState } from "react";
import axios from "axios";

const DeleteUser: React.FC = () => {
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`);
      setMessage(`User ${userId} deleted successfully!`);
    } catch (error) {
      setMessage("Error deleting user");
    }
  };

  return (
    <div>
      <h2>Delete User</h2>
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={handleDelete}>Delete User</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DeleteUser;
