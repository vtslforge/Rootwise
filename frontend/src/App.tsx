import { Routes, Route, Navigate } from "react-router";
import SignUp from "./auth/SignUp";
import SignIn from "./auth/SignIn";
import AuthLayout from "./auth/AuthLayout";
import ProtectedRoute from "./auth/ProtectedRoute";
import Dashboard from "./Dashboard";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signup" replace />} />
      {/* Authentication routes */}
      <Route element={<AuthLayout />}>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Route>

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default App;
