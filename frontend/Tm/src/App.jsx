import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminDashboard from "./components/Admin/Adashboard";
import CreateTask from "./components/Admin/Taskcreation";
import OverdueTasks from "./components/Admin/overduetasks";

function App() {
  return (
    <>
      <Router>
        <div className="min-h-screen bg-blue-100 flex items-center justify-center">
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/createTask" element={<CreateTask />} />
            <Route path="/overduetasks" element={<OverdueTasks />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
