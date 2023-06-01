import { Navigate, Routes, Route } from "react-router-dom";
import { HomePage } from "../Components/HomePage";

export const ContentRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="home" element={<HomePage />} />
      <Route path="/*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
