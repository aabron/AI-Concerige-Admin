import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import ProtectedRoute from "@/protectected route/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<ProtectedRoute redirect='/auth/sign-in'><Dashboard /></ProtectedRoute>} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
    </Routes>
  );
}

export default App;
