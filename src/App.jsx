import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RegistrationForm from "./pages/RegistrationForm";
import RegistrationTable from "./pages/RegistrationTable";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />

        <Route path="/register" element={<RegistrationForm />} />

        <Route path="/registrations" element={<RegistrationTable />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;