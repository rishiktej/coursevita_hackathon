import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminDashboard from "./components/Admin/Adashboard";

function App() {
  return (
    <>
      <Router>
        <div className="min-h-screen bg-blue-100 flex items-center justify-center">
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
