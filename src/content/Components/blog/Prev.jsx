import { useNavigate, useLocation } from "react-router-dom";
import HTMLReactParser from "html-react-parser";
import { useContext } from "react";
import { BlogContext } from "../../../context/blogContext/BlogContext";
import { RoutesDictionary } from "./RoutesDictionary";

export const Prev = () => {
  const { content, title, previewImage, pageBlock } = useContext(BlogContext);
  const navigate = useNavigate();

  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  const handleNavigate = () => {
    if (pageBlock == "edit") {
      navigate(`/blog/${pageBlock}?id=${id}&load=true`);
    } else navigate(`/blog/${pageBlock}?load=true`);
  };

  return (
    <section className="prevView">
      <div className="blogSubNavbar">
        <RoutesDictionary routes="blog nuevo ver" />
        <div className="buttons">
          <button onClick={handleNavigate} className="edit">
            Editar
          </button>
        </div>
      </div>
      <div className="content">
        <h1>{title}</h1>
        <h6>por: Marianne Garrido</h6>
        <div className="prevImageContainer">
          <img src={previewImage} alt={title} />
        </div>
        <section className="body">{HTMLReactParser(content)}</section>
      </div>
    </section>
  );
};
