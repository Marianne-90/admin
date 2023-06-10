import { useNavigate } from "react-router-dom";
import HTMLReactParser from "html-react-parser";
import { useContext } from "react";
import { BlogContext } from "../../../context/blogContext/BlogContext";
import { RoutesDictionary } from "./RoutesDictionary";

export const Prev = () => {
  const { content } = useContext(BlogContext);
  const navigate = useNavigate();

  return (
    <section className="prevView">
      <div className="blogSubNavbar">
        <RoutesDictionary routes="blog nuevo ver" />
        <div className="buttons">
          <button onClick={() => navigate("/blog/new")} className="edit">Editar</button>
        </div>
      </div>
      <div className="content">{HTMLReactParser(content)}</div>
    </section>
  );
};
