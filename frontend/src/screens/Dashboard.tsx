import { useEffect, useState } from "react";
import axios from "axios";
import { DonutChart } from "../components/DonutChart";
import LineCharts from "@/components/LineChart";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAppointments: 0,
    totalDoctors: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/dashboard/stats"
        );
        setStats(response.data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statItems = [
    { title: "Total Users", count: stats.totalUsers },
    { title: "Total Appointments", count: stats.totalAppointments },
    { title: "Total Doctors", count: stats.totalDoctors },
  ];

  return (
    <>
      {/* <h2 className="title text-center text-4xl py-5 font-bold text-black">
        HealthMate Admin Panel
      </h2>
      <div className="flex justify-center px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {statItems.map((stat, index) => (
            <div
              key={index}
              className="bg-white shadow-2xl rounded-xl p-6 text-center border border-gray-100 hover:scale-105 transition-transform duration-300"
            >
              <h3 className="text-lg font-medium text-gray-600">
                {stat.title}
              </h3>
              <p className="text-4xl font-extrabold text-gray-900 mt-2">
                {loading ? "..." : stat.count}
              </p>
            </div>
          ))}
        </div>
      </div> */}
      <div className="flex w-[1000px] items-center ">
        <div className="w-[500px]">
          <h1 className="ml-10 text-2xl font-bold">User Total</h1>
          <DonutChart></DonutChart>
        </div>

        <div className="w-[500px]">
          <h1 className="text-2xl font-bold">User Total</h1>
          <LineCharts></LineCharts>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { SectionCards } from "@/components/dashboard/section-cards";
// import { ChartAreaInteractive } from "@/components/dashboard/chart-area-interactive";
// import { DataTable } from "@/components/dashboard/data-table";
// import data from "./data.json";

// const Dashboard = () => {
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalAppointments: 0,
//     totalDoctors: 0,
//   });

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/dashboard/stats"
//         );
//         setStats(response.data);
//       } catch (error) {
//         console.error("Failed to fetch dashboard stats", error);
//       }
//     };
//     fetchStats();
//   }, []);

//   return (
//     <>
//       <SectionCards stats={stats} />
//       <div className="px-4 lg:px-6">
//         <ChartAreaInteractive />
//       </div>
//       <DataTable data={data} />
//     </>
//   );
// };

// export default Dashboard;
