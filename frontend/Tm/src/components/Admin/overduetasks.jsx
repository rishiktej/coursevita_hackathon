import React, { useState, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const OverdueTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:8000/admin/alltasks");
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = await response.json();

        // Filter tasks to get only overdue tasks
        const now = new Date();
        const overdueTasks = data.filter((task) => {
          const dueDate = new Date(task.dueDate);
          return dueDate < now && task.status !== "Completed"; // Filter out completed tasks
        });

        setTasks(overdueTasks);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Overdue Tasks</h1>
      {tasks.length === 0 ? (
        <p>No overdue tasks found.</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li key={task._id} className="bg-white shadow-lg rounded-lg p-4">
              <h2 className="text-xl font-semibold">
                {task.title || "No Title"}
              </h2>
              <p className="text-gray-600">
                {task.description || "No Description"}
              </p>
              <p className="text-red-600">
                Due Date: {new Date(task.dueDate).toLocaleDateString()}
              </p>
              <p
                className={`font-bold ${
                  task.status === "In Progress"
                    ? "text-yellow-500"
                    : "text-gray-500"
                }`}
              >
                Status: {task.status}
              </p>
              {/* Circular Progress Bar */}
              <div className="mt-4 w-20 h-20">
                <CircularProgressbar
                  value={task.progress || 0}
                  text={`${task.progress || 0}%`}
                  styles={{
                    path: {
                      stroke: task.progress < 100 ? "#4dbd74" : "#00ff00",
                      strokeLinecap: "round",
                      transition: "stroke-dashoffset 0.5s ease 0s",
                    },
                    text: {
                      fill: "#f88",
                      fontSize: "16px",
                      dominantBaseline: "middle",
                    },
                    trail: {
                      stroke: "#d6d6d6",
                      strokeLinecap: "round",
                    },
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OverdueTasks;
