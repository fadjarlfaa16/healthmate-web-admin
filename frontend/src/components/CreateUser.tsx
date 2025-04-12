// src/components/CreateUser.tsx
import { useState } from "react";
import axios from "axios";

interface User {
  id: string;
  name: string;
  email: string;
}

const CreateUser = () => {
  const [user, setUser] = useState<User>({ id: "", name: "", email: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Call your backend endpoint
      const response = await axios.post(
        "http://localhost:5000/api/users",
        user
      );
      setMessage("User created successfully!");
      console.log("Created user:", response.data);
    } catch (error) {
      setMessage("Error creating user");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="User ID"
            value={user.id}
            onChange={(e) => setUser({ ...user, id: e.target.value })}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div>
          <button type="submit">Create User</button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateUser;
