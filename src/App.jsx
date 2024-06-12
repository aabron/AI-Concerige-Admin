import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import ProtectedRoute from "@/protectected route/ProtectedRoute";
import React, { useEffect } from "react";

function App() {

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     setIsAuthenticated(true);
  //   } else {
  //     setIsAuthenticated(false);
  //     redirect('/login');
  //   }
  // }, [setIsAuthenticated]);

  return (
    <Routes>
      <Route path="/dashboard/*" element={<ProtectedRoute redirect='/auth/sign-in'><Dashboard /></ProtectedRoute>} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
    </Routes>
  );
}

export default App;
