import { Navigate, Routes, Route } from "react-router-dom";
import { HomePage, SideNavbar, TopNavBar } from "../Components";
import "../content.css"

export const ContentRoutes = () => {
  return (
    <div className="ContentRoutes">
    <TopNavBar/>
    <SideNavbar/>
    <section>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="home" element={<HomePage />} />
      <Route path="/*" element={<Navigate to="/home" />} />
    </Routes>
    </section>
    </div>
  );
};
