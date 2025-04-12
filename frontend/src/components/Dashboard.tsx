const Dashboard = () => {
  const stats = [
    { title: "Total Users", count: 120 },
    { title: "Total Appointments", count: 45 },
    { title: "Total Doctors", count: 10 },
  ];

  return (
    <>
      <h2 className="title text-center text-4xl py-5">HealtMate Admin Panel</h2>
      <div className="card flex justify-center ">
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 text-center"
            >
              <h3 className="text-xl font-semibold text-gray-700">
                {stat.title}
              </h3>
              <p className="text-3xl font-bold text-black mt-2">{stat.count}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
