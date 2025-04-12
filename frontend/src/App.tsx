import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Users from "./components/Users";
import Appointment from "./components/Appointment";
import Doctors from "./components/Doctors";
import Article from "./components/News";
import AnimatedNavbar from "./components/Navbar";

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        {/* Top Dashboard Cards */}
        <Dashboard />

        {/* Navigation Panel (Below Dashboard) */}
        <AnimatedNavbar />

        {/* Page Content Based on Routes */}
        <div className="content p-4">
          <Routes>
            <Route path="/users" element={<Users />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/article" element={<Article />} />
            <Route path="/" element={<div>Please select a menu option.</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

// src/App.tsx
// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import CreateUser from "./components/CreateUser";
// import UserList from "./components/UserList";
// import UpdateUser from "./components/UpdateUser";
// import DeleteUser from "./components/DeleteUser";

// const App: React.FC = () => {
//   return (
//     <Router>
//       <div style={{ padding: "20px" }}>
//         <h1>CRUD Operations with React and Firebase</h1>
//         <nav>
//           <ul
//             style={{
//               listStyleType: "none",
//               padding: 0,
//               display: "flex",
//               gap: "10px",
//             }}
//           >
//             <li>
//               <Link to="/">User List</Link>
//             </li>
//             <li>
//               <Link to="/create">Create User</Link>
//             </li>
//             <li>
//               <Link to="/update">Update User</Link>
//             </li>
//             <li>
//               <Link to="/delete">Delete User</Link>
//             </li>
//           </ul>
//         </nav>
//         <hr />
//         <Routes>
//           <Route path="/" element={<UserList />} />
//           <Route path="/create" element={<CreateUser />} />
//           <Route path="/update" element={<UpdateUser />} />
//           <Route path="/delete" element={<DeleteUser />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;
