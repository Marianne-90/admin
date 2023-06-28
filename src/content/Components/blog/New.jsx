import { useContext, useEffect } from "react";
import { BlogContext } from "../../../context/blogContext/BlogContext";
import { MainContext } from "../../../context/MainContext";
import { useNavigate } from "react-router-dom";
import { RoutesDictionary } from "./RoutesDictionary";
import DOMPurify from "dompurify";
import Swal from "sweetalert2";
import { EditionElement } from "./EditionElement";

export const New = () => {
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

  const { mainUrl, id, usuario } = useContext(MainContext);

  const cleanBlog = () => {
    if (pageBlock != "new") {
      setPageBlock("new");
      setContent("");
      setTitle("");
      setCategory("");
      setMeta("");
      setImagen(null);
      setPreviewImage(null);
    }
  };

  const getName = async () => {
    return fetch(`${mainUrl}blog/name/${usuario}`)
      .then((response) => response.json())
      .then((data) => {
        setName(data.message);
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
      try {
        await Promise.all([getCategories(), getName()]);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    cleanBlog();
    fetchData();
  }, []);

  const handleSave = async (state) => {
    const cleanedContent = DOMPurify.sanitize(content);
    setContent(cleanedContent);

    setLoading(true);
    const formData = new FormData();
    formData.append("usuario_id", id);
    formData.append("categoria_id", category);
    formData.append("titlulo", title);
    formData.append("metadatos", meta);
    formData.append("estado", state);
    formData.append("content", cleanedContent);
    formData.append("img", imagen);

    try {
      const response = await fetch(`${mainUrl}blog/saveblog`, {
        method: "POST",
        body: formData,
        mode: "cors", // activa la política de cors
      });

      const data = await response.json();
      Swal.fire("Solicitud Enviada", data.message);
      setLoading(false);
      setContent("");
      setTitle("");
      setCategory([]);
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

  const handleDeleteBlog = () => {
    Swal.fire({
      title: "Estas Segurx?",
      text: "Esta acción no se podrá revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, elimiar!",
    }).then((result) => {
      if (result.isConfirmed) {
        setContent("");
        setTitle("");
        setCategory("");
        setMeta("");
        setImagen(null);
        setPreviewImage(null);

        Swal.fire("Eliminado!", "Tu blog se ha eliminado", "success");
      }
    });
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
        <RoutesDictionary routes="blog nuevo editar" />
        <div className="buttons">
          <button onClick={() => navigate("/blog/prev")} className="VP">
            Vista Previa
          </button>
          <button className="save" onClick={() => handleSave("activo")}>
            Publicar
          </button>
          <button className="borrador" onClick={() => handleSave("inactivo")}>
            Guardar Borrador
          </button>
          <button className="cancel" onClick={handleDeleteBlog}>
            Borrar
          </button>
        </div>
      </div>
      <h1 className="blogTitle">Crear Nueva Entrada</h1>
      <EditionElement />
    </section>
  );
};
