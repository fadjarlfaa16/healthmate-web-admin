const Dashboard = () => {
  const stats = [
    { title: "Total Users", count: 120 },
    { title: "Total Appointments", count: 45 },
    { title: "Total Doctors", count: 10 },
  ];

  return (
    <>
    
      <h2 className="title text-center text-4xl py-5 font-bold text-black">
        HealthMate Admin Panel
      </h2>
      <div className="flex justify-center px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white shadow-2xl rounded-xl p-6 text-center border border-gray-100 hover:scale-105 transition-transform duration-300"
            >
              <h3 className="text-lg font-medium text-gray-600">{stat.title}</h3>
              <p className="text-4xl font-extrabold text-gray-900 mt-2">
                {stat.count}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
