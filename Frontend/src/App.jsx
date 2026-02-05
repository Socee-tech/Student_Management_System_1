import { Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Dashboard from "./components/admin/Dashboard";
import LecturerPortal from "./components/portals/lecturer";
import StudentPortal from "./components/portals/student";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Login />} />

        <Route path="/admin" element={<Dashboard />} />
        <Route path="/lecturer" element={<LecturerPortal />} />
        <Route path="/student" element={<StudentPortal />} />
      </Routes>
    </>
  );
}

export default App;
