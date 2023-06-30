import { BlogContext } from "../../../context/blogContext/BlogContext";
import { MainContext } from "../../../context/MainContext";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

export const CommentElement = () => {
  const { mainUrl, id: userId } = useContext(MainContext);
  const { comentsList, setComentsList } = useContext(BlogContext);

  const filter = new URLSearchParams(location.search).get("filter");
  const blog_id = new URLSearchParams(location.search).get("id");

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const getComments = async (order) => {
    return fetch(`${mainUrl}blog/comments/${order}`)
      .then((response) => response.json())
      .then((data) => {
        setComentsList(data);
      })
      .catch((error) => console.error(error));
  };

  const getCommentById = async (id) => {
    return fetch(`${mainUrl}blog/comment/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setComentsList(data);
      })
      .catch((error) => console.error(error));
  };

  const handleGoToBlog = (id) => {
    navigate(`/blog/prev?id=${id}`);
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();

    setLoading(true);

    let confirmation = false;

    await Swal.fire({
      title: "Estas Segurx?",
      text: "Esta acción no se podrá revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        confirmation = true;
      }
    });

    if (confirmation) {
      const formData = new FormData();
      formData.append("usuario", userId);
      formData.append("id", id);

      try {
        const response = await fetch(`${mainUrl}blog/comment/delete`, {
          method: "POST",
          body: formData,
          mode: "cors", // activa la política de cors
        });

        const data = await response.json();
        Swal.fire("Solicitud Enviada", data.message);

        if (filter != null) {
          getComments(filter);
        } else if (blog_id != null) {
          getCommentById(blog_id);
        } else {
          getComments("fecha-a");
        }

        setLoading(false);
      } catch (error) {
        Swal.fire("ERROR", "Ha ocurrido un error con la solicitud", "error");
        console.log("Ha ocurrido un error:", error);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loaderContent">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <>
      {comentsList.map((e, i) => (
        <div key={i} className="commentElement">
          <h3 className="blogSubTitle">Comentarios de: {e.titulo}</h3>

          {e.comentarios.map((f, j) => (
            <div key={j} onClick={() => handleGoToBlog(f.blog_id)}>
              <div className="text">
                <p>
                  <span>{f.fecha}</span> <small>{f.blog}</small>
                </p>
                <p>
                  <span>por: {f.nombre}</span> <small>{f.correo}</small>
                </p>
                <p>{f.contenido}</p>
              </div>
              <button onClick={(e) => handleDelete(e, f.comentario_id)}>
                Eliminar
              </button>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};
