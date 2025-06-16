import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./screens/Dashboard";
import Users from "./screens/Users";
import Appointment from "./screens/Appointment";
import Doctors from "./screens/Doctors";
import Article from "./screens/News";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
// import { Menu } from "lucide-react";

const App = () => {
  return (
    <Router>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 p-4 overflow-auto">
          <SidebarTrigger />
          <Routes>
            {/* <Route path="/" element={<Dashboard />} /> */}
            <Route path="/users" element={<Users />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/article" element={<Article />} />
          </Routes>
        </main>
      </SidebarProvider>
    </Router>
  );
};

export default App;

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Dashboard from "@/screens/Dashboard";
// import Users from "@/screens/Users";
// import Appointment from "@/screens/Appointment";
// import Doctors from "@/screens/Doctors";
// import Article from "@/screens/News";
// // import AppLayout from "@/layout/AppLayout";
// import "@/global.css";

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route
//           path="/"
//           element={
//             // <AppLayout>
//             <Dashboard />
//             // </AppLayout>
//           }
//         />
//         <Route
//           path="/users"
//           element={
//             // <AppLayout>
//             <Users />
//             // </AppLayout>
//           }
//         />
//         <Route
//           path="/appointment"
//           element={
//             // <AppLayout>
//             <Appointment />
//             // </AppLayout>
//           }
//         />
//         <Route
//           path="/doctors"
//           element={
//             // <AppLayout>
//             <Doctors />
//             // </AppLayout>
//           }
//         />
//         <Route
//           path="/article"
//           element={
//             // <AppLayout>
//             <Article />
//             // </AppLayout>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

// import React, { useState } from "react";
// import {
//   BarChart,
//   Bar,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   AreaChart,
//   Area,
// } from "recharts";
// import {
//   Home,
//   Calendar,
//   Users,
//   User,
//   Activity,
//   Settings,
//   LogOut,
//   Menu,
//   X,
//   Bell,
//   BarChart2,
//   Search,
// } from "lucide-react";

// // Data untuk contoh
// const visitorData = [
//   { date: "Jun 1", visitors: 120, prevVisitors: 80 },
//   { date: "Jun 3", visitors: 85, prevVisitors: 65 },
//   { date: "Jun 5", visitors: 70, prevVisitors: 50 },
//   { date: "Jun 7", visitors: 110, prevVisitors: 80 },
//   { date: "Jun 9", visitors: 130, prevVisitors: 90 },
//   { date: "Jun 11", visitors: 90, prevVisitors: 70 },
//   { date: "Jun 13", visitors: 80, prevVisitors: 60 },
//   { date: "Jun 15", visitors: 140, prevVisitors: 100 },
//   { date: "Jun 17", visitors: 100, prevVisitors: 70 },
//   { date: "Jun 19", visitors: 120, prevVisitors: 90 },
//   { date: "Jun 21", visitors: 160, prevVisitors: 110 },
//   { date: "Jun 23", visitors: 110, prevVisitors: 80 },
//   { date: "Jun 25", visitors: 140, prevVisitors: 100 },
//   { date: "Jun 27", visitors: 150, prevVisitors: 110 },
//   { date: "Jun 29", visitors: 130, prevVisitors: 90 },
// ];

// // Component: Sidebar
// const Sidebar = ({ isMobileSidebarOpen, toggleMobileSidebar }) => {
//   const [activeRoute, setActiveRoute] = useState("home");

//   const routes = [
//     { name: "Home", icon: <Home size={20} />, id: "home" },
//     { name: "Appointments", icon: <Calendar size={20} />, id: "appointments" },
//     { name: "Patients", icon: <Users size={20} />, id: "patients" },
//     { name: "Doctors", icon: <User size={20} />, id: "doctors" },
//     { name: "Analytics", icon: <Activity size={20} />, id: "analytics" },
//   ];

//   const bottomRoutes = [
//     { name: "Settings", icon: <Settings size={20} />, id: "settings" },
//     { name: "Log out", icon: <LogOut size={20} />, id: "logout" },
//   ];

//   return (
//     <>
//       {/* Desktop Sidebar */}
//       <div className="hidden md:flex md:flex-col md:w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
//         <div className="p-4 flex items-center space-x-2 border-b">
//           <div className="bg-blue-600 text-white p-1 rounded">
//             <Activity size={24} />
//           </div>
//           <span className="font-bold text-lg">MediCare</span>
//         </div>

//         <div className="p-3">
//           <div className="mb-6">
//             <p className="text-gray-400 text-xs uppercase mb-4 px-3">
//               Main Menu
//             </p>
//             {routes.map((route) => (
//               <button
//                 key={route.id}
//                 className={`flex items-center space-x-3 w-full p-3 rounded-lg mb-1 ${
//                   activeRoute === route.id
//                     ? "bg-blue-50 text-blue-600"
//                     : "text-gray-600 hover:bg-gray-100"
//                 }`}
//                 onClick={() => setActiveRoute(route.id)}
//               >
//                 {route.icon}
//                 <span>{route.name}</span>
//                 {route.id === "appointments" && (
//                   <span className="ml-auto bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
//                     3
//                   </span>
//                 )}
//               </button>
//             ))}
//           </div>

//           <div>
//             <p className="text-gray-400 text-xs uppercase mb-4 px-3">Other</p>
//             {bottomRoutes.map((route) => (
//               <button
//                 key={route.id}
//                 className={`flex items-center space-x-3 w-full p-3 rounded-lg mb-1 ${
//                   activeRoute === route.id
//                     ? "bg-blue-50 text-blue-600"
//                     : "text-gray-600 hover:bg-gray-100"
//                 }`}
//                 onClick={() => setActiveRoute(route.id)}
//               >
//                 {route.icon}
//                 <span>{route.name}</span>
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Mobile Sidebar */}
//       {isMobileSidebarOpen && (
//         <div className="md:hidden fixed inset-0 z-50 flex">
//           <div
//             className="fixed inset-0 bg-black bg-opacity-50"
//             onClick={toggleMobileSidebar}
//           ></div>
//           <div className="relative flex flex-col w-72 max-w-[80%] bg-white h-full z-10 shadow-xl">
//             <div className="p-4 flex items-center justify-between border-b">
//               <div className="flex items-center space-x-2">
//                 <div className="bg-blue-600 text-white p-1 rounded">
//                   <Activity size={24} />
//                 </div>
//                 <span className="font-bold text-lg">MediCare</span>
//               </div>
//               <button onClick={toggleMobileSidebar} className="text-gray-500">
//                 <X size={20} />
//               </button>
//             </div>

//             <div className="p-3 overflow-y-auto">
//               <div className="mb-6">
//                 <p className="text-gray-400 text-xs uppercase mb-4 px-3">
//                   Main Menu
//                 </p>
//                 {routes.map((route) => (
//                   <button
//                     key={route.id}
//                     className={`flex items-center space-x-3 w-full p-3 rounded-lg mb-1 ${
//                       activeRoute === route.id
//                         ? "bg-blue-50 text-blue-600"
//                         : "text-gray-600 hover:bg-gray-100"
//                     }`}
//                     onClick={() => {
//                       setActiveRoute(route.id);
//                       toggleMobileSidebar();
//                     }}
//                   >
//                     {route.icon}
//                     <span>{route.name}</span>
//                     {route.id === "appointments" && (
//                       <span className="ml-auto bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
//                         3
//                       </span>
//                     )}
//                   </button>
//                 ))}
//               </div>

//               <div>
//                 <p className="text-gray-400 text-xs uppercase mb-4 px-3">
//                   Other
//                 </p>
//                 {bottomRoutes.map((route) => (
//                   <button
//                     key={route.id}
//                     className={`flex items-center space-x-3 w-full p-3 rounded-lg mb-1 ${
//                       activeRoute === route.id
//                         ? "bg-blue-50 text-blue-600"
//                         : "text-gray-600 hover:bg-gray-100"
//                     }`}
//                     onClick={() => {
//                       setActiveRoute(route.id);
//                       toggleMobileSidebar();
//                     }}
//                   >
//                     {route.icon}
//                     <span>{route.name}</span>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// // Component: StatCard
// const StatCard = ({
//   title,
//   value,
//   trend,
//   trendValue,
//   description,
//   descColor = "text-gray-500",
//   icon,
// }) => {
//   return (
//     <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
//       <div className="flex justify-between items-start mb-4">
//         <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
//         <div
//           className={`flex items-center px-2 py-1 rounded ${
//             trend === "up"
//               ? "bg-green-50 text-green-600"
//               : trend === "down"
//               ? "bg-red-50 text-red-500"
//               : "bg-blue-50 text-blue-600"
//           }`}
//         >
//           {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {trendValue}
//         </div>
//       </div>
//       <div className="flex items-end space-x-1 mb-2">
//         <h2 className="text-2xl font-bold">{value}</h2>
//         {icon && <span className="mb-1">{icon}</span>}
//       </div>
//       <p className={`text-sm ${descColor}`}>{description}</p>
//     </div>
//   );
// };

// // Component: ChartCard
// const ChartCard = ({
//   title,
//   subtitle,
//   children,
//   filters = [],
//   activeFilter,
//   setActiveFilter,
// }) => {
//   return (
//     <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
//       <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
//         <div>
//           <h3 className="font-bold text-gray-800">{title}</h3>
//           <p className="text-sm text-gray-500">{subtitle}</p>
//         </div>

//         {filters.length > 0 && (
//           <div className="flex space-x-2 mt-3 md:mt-0">
//             {filters.map((filter) => (
//               <button
//                 key={filter}
//                 className={`px-3 py-1 text-sm rounded-lg ${
//                   activeFilter === filter
//                     ? "bg-blue-600 text-white"
//                     : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//                 }`}
//                 onClick={() => setActiveFilter(filter)}
//               >
//                 {filter}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>

//       <div className="h-64">{children}</div>
//     </div>
//   );
// };

// // Component: Header
// const Header = ({ toggleMobileSidebar }) => {
//   return (
//     <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
//       <div className="flex items-center justify-between p-4">
//         <div className="flex items-center space-x-3">
//           <button
//             className="md:hidden text-gray-500 hover:text-gray-700"
//             onClick={toggleMobileSidebar}
//           >
//             <Menu size={24} />
//           </button>
//           <h1 className="text-xl font-bold">Dashboard</h1>
//         </div>

//         <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2 w-64">
//           <Search size={18} className="text-gray-400 mr-2" />
//           <input
//             type="text"
//             placeholder="Search..."
//             className="bg-transparent border-none outline-none text-sm w-full"
//           />
//         </div>

//         <div className="flex items-center space-x-4">
//           <button className="relative text-gray-500 hover:text-gray-700">
//             <Bell size={20} />
//             <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
//               3
//             </span>
//           </button>

//           <div className="flex items-center space-x-2">
//             <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
//               MD
//             </div>
//             <span className="hidden md:inline text-sm font-medium">
//               Dr. Jane
//             </span>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// const Dashboard = () => {
//   const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
//   const [visitorFilter, setVisitorFilter] = useState("Last 3 months");

//   const toggleMobileSidebar = () => {
//     setIsMobileSidebarOpen(!isMobileSidebarOpen);
//   };

//   return (
//     <div className="flex h-screen bg-gray-50">
//       <Sidebar
//         isMobileSidebarOpen={isMobileSidebarOpen}
//         toggleMobileSidebar={toggleMobileSidebar}
//       />

//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header toggleMobileSidebar={toggleMobileSidebar} />

//         <main className="flex-1 overflow-y-auto p-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//             <StatCard
//               title="Total Revenue"
//               value="$1,250.00"
//               trend="up"
//               trendValue="+12.5%"
//               description="Trending up this month"
//             />
//             <StatCard
//               title="New Patients"
//               value="1,234"
//               trend="down"
//               trendValue="-20%"
//               description="Acquisition needs attention"
//               descColor="text-red-500"
//             />
//             <StatCard
//               title="Active Accounts"
//               value="45,678"
//               trend="up"
//               trendValue="+12.5%"
//               description="Strong user retention"
//             />
//             <StatCard
//               title="Growth Rate"
//               value="4.5%"
//               trend="up"
//               trendValue="+4.5%"
//               description="Meets growth projections"
//             />
//           </div>

//           <div className="mb-6">
//             <ChartCard
//               title="Total Visitors"
//               subtitle="Total for the last 3 months"
//               filters={["Last 3 months", "Last 30 days", "Last 7 days"]}
//               activeFilter={visitorFilter}
//               setActiveFilter={setVisitorFilter}
//             >
//               <ResponsiveContainer width="100%" height="100%">
//                 <AreaChart
//                   data={visitorData}
//                   margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
//                 >
//                   <defs>
//                     <linearGradient
//                       id="colorVisitors"
//                       x1="0"
//                       y1="0"
//                       x2="0"
//                       y2="1"
//                     >
//                       <stop offset="5%" stopColor="#6366F1" stopOpacity={0.4} />
//                       <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
//                     </linearGradient>
//                     <linearGradient
//                       id="colorPrevVisitors"
//                       x1="0"
//                       y1="0"
//                       x2="0"
//                       y2="1"
//                     >
//                       <stop offset="5%" stopColor="#6366F1" stopOpacity={0.1} />
//                       <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
//                     </linearGradient>
//                   </defs>
//                   <CartesianGrid
//                     strokeDasharray="3 3"
//                     vertical={false}
//                     opacity={0.1}
//                   />
//                   <XAxis
//                     dataKey="date"
//                     axisLine={false}
//                     tickLine={false}
//                     tick={{ fontSize: 12 }}
//                   />
//                   <YAxis hide={true} />
//                   <Tooltip
//                     contentStyle={{
//                       borderRadius: "8px",
//                       border: "none",
//                       boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
//                     }}
//                   />
//                   <Area
//                     type="monotone"
//                     dataKey="prevVisitors"
//                     stroke="#6366F1"
//                     strokeWidth={1}
//                     fillOpacity={1}
//                     fill="url(#colorPrevVisitors)"
//                   />
//                   <Area
//                     type="monotone"
//                     dataKey="visitors"
//                     stroke="#6366F1"
//                     strokeWidth={2}
//                     fillOpacity={1}
//                     fill="url(#colorVisitors)"
//                   />
//                 </AreaChart>
//               </ResponsiveContainer>
//             </ChartCard>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <ChartCard
//               title="Appointments Overview"
//               subtitle="Last 30 days of activity"
//             >
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart
//                   data={visitorData.slice(0, 7)}
//                   margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
//                 >
//                   <CartesianGrid
//                     strokeDasharray="3 3"
//                     vertical={false}
//                     opacity={0.1}
//                   />
//                   <XAxis dataKey="date" axisLine={false} tickLine={false} />
//                   <YAxis hide={true} />
//                   <Tooltip />
//                   <Bar
//                     dataKey="visitors"
//                     fill="#6366F1"
//                     radius={[4, 4, 0, 0]}
//                   />
//                 </BarChart>
//               </ResponsiveContainer>
//             </ChartCard>

//             <ChartCard
//               title="Patient Satisfaction"
//               subtitle="Rating trends over time"
//             >
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart
//                   data={visitorData}
//                   margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
//                 >
//                   <CartesianGrid
//                     strokeDasharray="3 3"
//                     vertical={false}
//                     opacity={0.1}
//                   />
//                   <XAxis
//                     dataKey="date"
//                     axisLine={false}
//                     tickLine={false}
//                     tick={{ fontSize: 12 }}
//                   />
//                   <YAxis hide={true} />
//                   <Tooltip />
//                   <Line
//                     type="monotone"
//                     dataKey="visitors"
//                     stroke="#6366F1"
//                     strokeWidth={2}
//                     dot={{
//                       stroke: "#6366F1",
//                       strokeWidth: 2,
//                       fill: "#fff",
//                       r: 4,
//                     }}
//                     activeDot={{ r: 6 }}
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             </ChartCard>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
