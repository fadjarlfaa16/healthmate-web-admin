// src/components/UpdateUser.tsx
import React, { useState } from "react";
import axios from "axios";

interface User {
  id: string;
  name: string;
  email: string;
}

const UpdateUser = () => {
  const [user, setUser] = useState<User>({ id: "", name: "", email: "" });
  const [message, setMessage] = useState("");

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/users/${user.id}`, {
        name: user.name,
        email: user.email,
      });
      setMessage("User updated successfully!");
    } catch (error) {
      setMessage("Error updating user");
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <h2>Update User</h2>
      <input
        type="text"
        placeholder="User ID"
        value={user.id}
        onChange={(e) => setUser({ ...user, id: e.target.value })}
      />
      <input
        type="text"
        placeholder="Name"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <button type="submit">Update User</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default UpdateUser;
