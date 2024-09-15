import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import TaskIcon from "@mui/icons-material/Task";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import AssessmentIcon from "@mui/icons-material/Assessment";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { ChevronDownIcon, Bars3Icon } from "@heroicons/react/24/outline";

export default function Sidebar({ isSidebarOpen, toggleSidebar }) {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <div className="relative">
      <Card
        className={`fixed top-0 left-0 h-[calc(100vh)] transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } w-80 p-4 shadow-xl shadow-blue-gray-900/5`}
      >
        <div className="flex items-center mb-2">
          {isSidebarOpen && (
            <Typography variant="h5" color="blue-gray">
              Sidebar
            </Typography>
          )}
          <button
            className={`ml-auto p-2 ${isSidebarOpen ? "block" : "hidden"}`}
            onClick={toggleSidebar}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
        <List className="flex flex-col gap-2">
          <ListItem>
            <ListItemPrefix>
              <PendingActionsIcon className="h-5 w-5" />
            </ListItemPrefix>
            In Progress Tasks
            <ListItemSuffix>
              <Chip
                value="14"
                size="sm"
                variant="ghost"
                color="blue-gray"
                className="rounded-full"
              />
            </ListItemSuffix>
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <AssignmentLateIcon className="h-5 w-5" />
            </ListItemPrefix>
            Over Due Tasks
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <TaskIcon className="h-5 w-5" />
            </ListItemPrefix>
            Completed Tasks
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <AssessmentIcon className="h-5 w-5" />
            </ListItemPrefix>
            Reports
          </ListItem>
        </List>
      </Card>

      {/* Hamburger Icon */}
      <button
        className={`fixed top-4 left-4 z-50 p-2 transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-0" : "opacity-100"
        }`}
        onClick={toggleSidebar}
      >
        <Bars3Icon className="h-6 w-6" />
      </button>
    </div>
  );
}
