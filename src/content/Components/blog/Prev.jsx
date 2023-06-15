import { useNavigate } from "react-router-dom";
import HTMLReactParser from "html-react-parser";
import { useContext } from "react";
import { BlogContext } from "../../../context/blogContext/BlogContext";
import { RoutesDictionary } from "./RoutesDictionary";

export const Prev = () => {
  const {
    content,
    title,
    category,
    meta,
    imagen,
    previewImage,
  } = useContext(BlogContext);
  const navigate = useNavigate();

  return (
    <section className="prevView">
      <div className="blogSubNavbar">
        <RoutesDictionary routes="blog nuevo ver" />
        <div className="buttons">
          <button onClick={() => navigate("/blog/new")} className="edit">Editar</button>
        </div>
      </div>
      <div className="content">
        <h1>{title}</h1>
        <h6>por: Marianne Garrido</h6>
        <div className="prevImageContainer">
          <img src={previewImage} alt={title} />
        </div>
        <section className="body">
        {HTMLReactParser(content)}
        </section>
      </div>
    </section>
  );
};
