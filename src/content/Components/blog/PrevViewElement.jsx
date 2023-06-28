import { useNavigate } from "react-router-dom";
import { BlogContext } from "../../../context/blogContext/BlogContext";
import { useState, useContext } from "react";

export const PrevViewElement = () => {
  const navigate = useNavigate();
  const { blogList } = useContext(BlogContext);

  const handleEditBlog = (id) => {
    navigate(`/blog/edit?id=${id}`);
  };

  const handleComments = (e, id) => {
    e.stopPropagation();
    navigate(`/blog/comments?id=${id}`);
  };

  return (
    <>
      {blogList.map((e, i) => (
        <div key={i}>
          <h3 className="blogSubTitle">{e.titulo}</h3>
          <div className="blogsContainer">
            {e.blogs.map((f, j) => (
              <div
                className="blogElement"
                onClick={() => handleEditBlog(f.id)}
                key={j}
              >
                <div className="block">
                  <div>
                    <p className="fecha">{f.fecha}</p>
                    <p className="autor">{f.autor}</p>
                    <p className="categoria">{f.categoria}</p>
                  </div>
                  <p className={f.estado}>{f.estado}</p>
                </div>
                <p className="titulo">{f.titulo}</p>
                <p className="prev">{f.contenido} ...</p>
                <div className="coments">
                  <p>Comentarios: {f.comentarios}</p>{" "}
                  <button onClick={(e) => handleComments(e, f.id)}>
                    Administrar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};
