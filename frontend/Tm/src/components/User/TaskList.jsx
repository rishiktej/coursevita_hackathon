import React from "react";
import ProgressBar from "./ProgressBar"; // Adjust the import path as needed

const TaskList = ({ tasks, completedTasks }) => {
  const totalTasks = tasks.length;
  const completionPercentage = (completedTasks / totalTasks) * 100;

  return (
    <div>
      <div className="flex justify-between mt-8">
        <p className="text-sm font-semibold">
          <span>Milestones</span>
          <div className="inline-block relative ml-2">
            <span>
              {/* Tooltip icon (example, adjust as needed) */}
              <svg
                className="svg-inline--fa fa-question-circle fa-w-16 rtl:scale-x-[-1] hover:text-gray-600 cursor-pointer"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="question-circle"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                data-fa-i2svg=""
              >
                <path fill="currentColor" d="..."></path>
              </svg>
            </span>
          </div>
        </p>
        <div className="flex items-center gap-2 flex-shrink-0">
          <p className="text-xs font-medium text-gray-500">
            {completedTasks} / {totalTasks}
            <span className="px-2 text-gray-300">|</span>
            {completionPercentage}% completed
          </p>
          <ProgressBar percentage={completionPercentage} />
        </div>
      </div>
      <div className="grid gap-2 mt-2">
        {tasks.map((task, index) => (
          <a
            key={task.id}
            className={`flex gap-2 items-center justify-between p-2 rounded-md border ${
              task.completed ? "bg-gray-100" : "bg-gray-200"
            } hover:bg-primary-100 hover:border-primary-500 hover:text-primary-500 transition`}
            href={`/targets/${task.id}`}
          >
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold">{task.label}</p>
              <p className="max-w-[16ch] sm:max-w-[40ch] md:max-w-[32ch] lg:max-w-[56ch] 2xl:max-w-[64ch] truncate text-sm">
                {task.description}
              </p>
            </div>
            <div className="flex-shrink-0">
              {task.completed && (
                <span className="text-xs font-medium inline-flex items-center text-green-700 bg-green-100 px-1 py-0.5 rounded">
                  <span className="inline-flex">
                    <svg
                      className="if-svg-icon__baseline i-check-circle-solid text-green-600 if-w-16 if-h-16"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path fill="currentColor" d="..."></path>
                    </svg>
                  </span>
                  <span className="ms-1">Completed</span>
                </span>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
