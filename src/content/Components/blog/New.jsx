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
    blogElements,
    setBlogElements,

    loading,
    setLoading,
    setCategories,
    pageBlock,
    setPageBlock,
  } = useContext(BlogContext);

  const { mainUrl, id, usuario } = useContext(MainContext);

  const cleanBlog = () => {
    if (pageBlock != "new") {
      setPageBlock("new");

      let clean = { ...blogElements };

      clean["imagen"] = null;
      clean["previewImage"] = null;
      clean["content"] = "";
      clean["title"] = "";
      clean["category"] = "";
      clean["meta"] = "";
      return clean;
    }
    return blogElements;
  };

  const getName = async () => {
    try {
      const response = await fetch(`${mainUrl}blog/name/${usuario}`);
      const data = await response.json();
      return { autor: data.message };
    } catch (error) {
      console.error(error);
      return { autor: "" };
    }
  };

  const getCategories = async () => {
    return fetch(`${mainUrl}blog/categories`)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => console.error(error));
  };


  //*! esto de aquí es porque como blog es un objeto hace cosas raras y no se actualiza el use state a tiempo

  const setBlog = async () => {
    const date = new Date();
    const formattedDate = date.toISOString().split("T")[0];

    let data = await cleanBlog();
    let name = await getName();

    let obj = { ...data, ...name, date: formattedDate };

    setBlogElements(obj);
  };


  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        await Promise.all([getCategories(), setBlog()]);

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleSave = async (state) => {
    const cleanedContent = DOMPurify.sanitize(blogElements.content);
    setLoading(true);

    const formData = new FormData();
    formData.append("usuario_id", id);
    formData.append("categoria_id", blogElements.category);
    formData.append("titlulo", blogElements.title);
    formData.append("metadatos", blogElements.meta);
    formData.append("estado", state);
    formData.append("content", cleanedContent);
    formData.append("img", blogElements.imagen);

    try {
      const response = await fetch(`${mainUrl}blog/saveblog`, {
        method: "POST",
        body: formData,
        mode: "cors", // activa la política de cors
      });

      const data = await response.json();
      Swal.fire("Solicitud Enviada", data.message);

      setLoading(false);

      let obj = { ...blogElements };
      obj["content"] = "";
      obj["title"] = "";
      obj["category"] = "";
      obj["meta"] = "";
      obj["date"] = "";
      obj["previewImage"] = null;
      obj["imagen"] = null;

      setBlogElements(obj);

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
      confirmButtonText: "Sí, eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        let obj = { ...blogElements };
        obj["content"] = "";
        obj["title"] = "";
        obj["category"] = "";
        obj["meta"] = "";
        obj["date"] = "";
        obj["previewImage"] = null;
        obj["imagen"] = null;

        setBlogElements(obj);

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
