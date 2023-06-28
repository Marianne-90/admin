import { useContext, useEffect, useState } from "react";
import { BlogContext } from "../../../context/blogContext/BlogContext";
import { MainContext } from "../../../context/MainContext";
import { useNavigate, useLocation } from "react-router-dom";
import { RoutesDictionary } from "./RoutesDictionary";
import DOMPurify from "dompurify";
import Swal from "sweetalert2";
import { EditionElement } from "./EditionElement";

export const Edit = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const load = new URLSearchParams(location.search).get("load");

  const navigate = useNavigate();

  const {
    content,
    setContent,
    title,
    setTitle,
    category,
    setCategory,
    meta,
    setMeta,
    setImagen,
    imagen,
    setPreviewImage,
    loading,
    setLoading,
    setName,
    setCategories,
    pageBlock,
    setPageBlock,
  } = useContext(BlogContext);

  const { mainUrl, id: userID } = useContext(MainContext);

  const [comments, setComments] = useState(0);

  const cleanBlog = () => {
    if (pageBlock != "edit") {
      setPageBlock("edit");
      setImagen(null);
      setPreviewImage(null);
    }
  };

  const getBlog = async () => {
    return fetch(`${mainUrl}blog/blog/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setContent(data.contenido);
        setTitle(data.titulo);
        setCategory(data.categoria_id);
        setMeta(data.meta);
        setName(data.autor);
        setComments(data.comentarios)
        if (data.imagen.length > 0) {
          setPreviewImage(`${mainUrl}img/${data.imagen}`);
        }
      })
      .catch((error) => console.error(error));
  };

  const getCategories = async () => {
    return fetch(`${mainUrl}blog/categories`)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([getCategories(), getBlog()]);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    if(load != "true"){
      cleanBlog();
      fetchData();
    }
  }, []);

  const handleSave = async (state) => {
    const cleanedContent = DOMPurify.sanitize(content);
    setContent(cleanedContent);
    setLoading(true);
    const formData = new FormData();
    formData.append("usuario_id", userID);
    formData.append("blog_id", id);
    formData.append("categoria_id", category);
    formData.append("titlulo", title);
    formData.append("metadatos", meta);
    formData.append("estado", state);
    formData.append("content", cleanedContent);
    formData.append("img", imagen);

    try {
      const response = await fetch(`${mainUrl}blog/updateBlog`, {
        method: "POST",
        body: formData,
        mode: "cors", // activa la política de cors
      });

      const data = await response.json();
      Swal.fire("Solicitud Enviada", data.message);
      setLoading(false);
      setContent("");
      setTitle("");
      setCategory("");
      setMeta("");
      setImagen(null);
      setPreviewImage(null);

      navigate("/blog/main");
    } catch (error) {
      Swal.fire("ERROR", "Ha ocurrido un error con la solicitud", "error");
      console.log("Ha ocurrido un error:", error);
      setLoading(false);
    }
  };

  const handleDeleteBlog = async () => {
    setLoading(true);

    let confirmation = false;

    await Swal.fire({
      title: "Estas Segurx?",
      text: "Se eliminará el blog y comentarios asociados, ESTA ACCIÓN NO SE PODRÁ REVERTIR",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, elimiar!",
    }).then((result) => {
      if (result.isConfirmed) {
        confirmation = true;
      }
    });

    if (confirmation) {
      const formData = new FormData();
      formData.append("usuario", userID);
      formData.append("id", id);

      try {
        const response = await fetch(`${mainUrl}blog/deleteBlog`, {
          method: "POST",
          body: formData,
          mode: "cors", // activa la política de cors
        });

        const data = await response.json();
        Swal.fire("Solicitud Enviada", data.message);

        setLoading(false);
        setContent("");
        setTitle("");
        setCategory("");
        setMeta("");
        setImagen(null);
        setPreviewImage(null);
  
        navigate("/blog/main");

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

  const handleComments = () => {
    navigate(`/blog/comments?id=${id}`);
  };

  if (loading) {
    return (
      <div className="loaderContent">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <section className="newBlog">
      <div className="blogSubNavbar">
        <RoutesDictionary routes="Página-Principal blogs editar" />
        <div className="buttons">
          <button onClick={() => navigate(`/blog/prev?id=${id}`)} className="VP">
            Vista Previa
          </button>
          <button className="save" onClick={() => handleSave("activo")}>
            Publicar
          </button>
          <button className="borrador" onClick={() => handleSave("inactivo")}>
            Guardar
          </button>
          <button className="cancel" onClick={handleDeleteBlog}>
            Borrar
          </button>
        </div>
      </div>
      <h1 className="blogTitle">Editar Blog</h1>
      <EditionElement />
      <div id="adminComments">

      <button onClick={handleComments}> Administrar {comments} comentarios</button>
      </div>
    </section>
  );
};
