import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [filter, setFilter] = useState("In Progress");

  useEffect(() => {
    const fetchUserTasks = async () => {
      try {
        const response = await fetch("http://localhost:8000/admins/dashboard");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
        console.log("result:", result);

        const allTasks = [];
        for (const user of result.userTasks) {
          const userTasks = await Promise.all(
            user.tasksAssigned.map(async (task) => {
              const taskId = task._id;
              const taskResponse = await fetch(
                `http://localhost:8000/admin/tasks/${taskId}`
              );
              if (!taskResponse.ok) {
                throw new Error(`HTTP error! Status: ${taskResponse.status}`);
              }
              const taskData = await taskResponse.json();
              return { ...taskData, username: task.assignedTo.username };
            })
          );
          allTasks.push(...userTasks);
        }
        setTasks(allTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchUserTasks();
  }, []);

  const filterTasks = (status) => {
    return tasks.filter((task) => task.status === status);
  };

  const filteredTasks = filterTasks(filter);

  const groupTasksByUsername = (tasks) => {
    return tasks.reduce((acc, task) => {
      (acc[task.username] = acc[task.username] || []).push(task);
      return acc;
    }, {});
  };

  const groupedTasks = groupTasksByUsername(filteredTasks);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`bg-gray-100 p-4 space-y-6 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full"
        } flex-shrink-0`}
      >
        <button
          className="text-xl font-bold mb-4 p-2 rounded-md bg-gray-300 hover:bg-gray-400"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <FaBars />
        </button>
        {isSidebarOpen && (
          <>
            <h2 className="text-xl font-semibold mb-4">Task Filters</h2>
            <ul>
              {["In Progress", "Completed", "Pending", "Overdue"].map(
                (status) => (
                  <li key={status}>
                    {status === "Overdue" ? (
                      <Link to="/overduetasks">
                        <button
                          className={`block w-full text-left p-2 rounded-md ${
                            filter === status
                              ? "bg-blue-300 text-white"
                              : "hover:bg-blue-200"
                          }`}
                          onClick={() => setFilter(status)}
                        >
                          {status}
                        </button>
                      </Link>
                    ) : (
                      <button
                        className={`block w-full text-left p-2 rounded-md ${
                          filter === status
                            ? "bg-blue-300 text-white"
                            : "hover:bg-blue-200"
                        }`}
                        onClick={() => setFilter(status)}
                      >
                        {status}
                      </button>
                    )}
                  </li>
                )
              )}
            </ul>
            <div className="mt-6">
              <Link to="/createTask">
                <button className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 w-full">
                  Create Task
                </button>
              </Link>
            </div>
          </>
        )}
      </aside>

      {/* Main Content */}
      <div
        className={`flex-1 p-4 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <button
          className="text-xl font-bold mb-4 p-2 rounded-md bg-gray-300 hover:bg-gray-400 md:hidden"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <FaBars />
        </button>
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <h2 className="text-xl font-semibold mb-2">Tasks - {filter}</h2>
        <div className="space-y-6">
          {Object.keys(groupedTasks).length > 0 ? (
            Object.keys(groupedTasks).map((username) => (
              <div key={username} className="mb-6">
                <h3 className="text-xl font-semibold mb-2">{username}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {groupedTasks[username].map((task) => (
                    <div
                      key={task._id}
                      className="bg-white shadow-lg rounded-lg p-4"
                    >
                      <h4 className="text-lg font-semibold">
                        {task.title || "No Title"}
                      </h4>
                      <p className="text-gray-600">
                        {task.description || "No Description"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div>No tasks found for this filter</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
