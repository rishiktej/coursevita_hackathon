import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/admin/dashboard");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <h2 className="text-xl font-semibold mb-2">Users and Their Tasks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.userTasks.map((user) => (
          <div key={user.email} className="bg-white shadow-lg rounded-lg p-4">
            <h3 className="text-lg font-semibold">{user.username}</h3>
            <p className="text-gray-700">Email: {user.email}</p>
            <div className="mt-2">
              {user.tasksAssigned.map((task) => (
                <div
                  key={task.title}
                  className="border border-gray-300 rounded-md p-2 mb-2"
                >
                  <strong className="block text-md font-medium">
                    {task.title}
                  </strong>
                  <span
                    className={`text-sm ${
                      task.status === "Completed"
                        ? "text-green-500"
                        : "text-yellow-500"
                    }`}
                  >
                    Status: {task.status}
                  </span>
                  <p className="text-gray-600">{task.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
