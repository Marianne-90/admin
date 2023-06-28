import { Navigate, Routes, Route } from "react-router-dom";
import { Coments, Main, New, Settings, BlogNavBar, View, Edit, Prev } from "./blog/index";
import "./styles/blog.css"
import { BlogProvider } from "../../context/blogContext/BlogProvider";
import { Borrar } from "./blog/Borrar";

export const Blog = () => {
  return (
    <div className="MainBlog">
      <BlogProvider> 
      <BlogNavBar />
      <section>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="main" element={<Main />} />
          <Route path="new" element={<New />} />
          <Route path="view" element={<View />} />
          <Route path="edit" element={<Edit />} />
          <Route path="prev" element={<Prev />} />
          <Route path="comments" element={<Coments />} />
          <Route path="settings" element={<Settings />} />
          <Route path="borrar" element={<Borrar />} />
          <Route path="/*" element={<Navigate to="/main" />} />
        </Routes>
      </section>
      </BlogProvider> 
    </div>
  );
};
