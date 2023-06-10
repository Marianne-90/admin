import { Navigate, Routes, Route } from "react-router-dom";
import { HomePage, SideNavbar, TopNavBar, Blog, PageSettings, UserSettings, } from "../Components";
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
      <Route path="blog/*" element={<Blog />} />
      <Route path="page" element={<PageSettings />} />
      <Route path="user" element={<UserSettings />} />
      <Route path="/*" element={<Navigate to="/home" />} />
    </Routes>
    </section>
    </div>
  );
};
