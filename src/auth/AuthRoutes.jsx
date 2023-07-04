import { Navigate, Routes, Route } from "react-router-dom";
import { Auth } from "./Auth";
import { Recover } from "./Recover";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="login" element={<Auth />} />
      <Route path="recover" element={<Recover />} />
      {/* <Route path="/*" element={<Navigate to="/login" />} /> */}
    </Routes>
  );
};
