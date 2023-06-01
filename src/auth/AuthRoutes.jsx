import { Navigate, Routes, Route } from "react-router-dom";
import { Auth } from "./Auth";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Auth />} />
      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
