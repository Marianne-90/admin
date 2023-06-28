import { useContext, useState, useEffect } from "react";
import { RoutesDictionary } from "./RoutesDictionary";
import { MainContext } from "../../../context/MainContext";
import Swal from "sweetalert2";
import { BlogContext } from "../../../context/blogContext/BlogContext";
import { CategoryElement } from "./CategoryElement";
import { AddCategory } from "./AddCategory";

export const Settings = () => {
  const { mainUrl, usuario, id } = useContext(MainContext);
  const { categories, setCategories, loading, setLoading } =
    useContext(BlogContext);
  const [name, setName] = useState({ user: "", password: "" });
  const [addCategory, setAddCategory] = useState(false);

  const getName = async () => {
    return fetch(`${mainUrl}blog/name/${usuario}`)
      .then((response) => response.json())
      .then((data) => {
        setName({ ...name, user: data.message });
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
        await Promise.all([getCategories(), getName()]);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onSubmitName = async (e) => {
    e.preventDefault();

    if (name.user.length == 0 || name.password.length == 0) {
      Swal.fire("ERROR", "LONGITUD INCORRECTA EN UNO O VARIOS CAMPOS", "error");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("user", usuario);
    formData.append("newName", name.user);
    formData.append("password", name.password);

    try {
      const response = await fetch(`${mainUrl}blog/name`, {
        method: "POST",
        body: formData,
        mode: "cors", // activa la política de cors
      });

      const data = await response.json();
      Swal.fire("Solicitud Enviada", data.message);
      setName({ ...name, password: "" });
      setLoading(false);
    } catch (error) {
      Swal.fire("ERROR", "Ha ocurrido un error con la solicitud", "error");
      console.log("Ha ocurrido un error:", error);
      setLoading(false);
    }
  };

  const onChangeName = (e) => {
    let element = e.target.name;
    let value = e.target.value;
    let newName = { ...name };
    newName[element] = value;
    setName(newName);
  };

  if (loading) {
    return (
      <div className="loaderContent">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <section className="blogSettings">
      <div className="blogSubNavbar">
        <RoutesDictionary routes="blog ajustes-del-blog" />
        <div className="buttons">.</div>
      </div>
        <h1 className="blogTitle">Ajustes del Blog</h1>
      <div className="content">
        <div className="userName">
          <h2 className="blogSubTitle">Cambiar nombre de público</h2>
          <form action="POST">
            <div className="inputContainerFlex">
              <div className="block">
                <p>Usuario</p>
                <input
                  type="text"
                  name="user"
                  value={name.user}
                  onChange={onChangeName}
                  maxLength={80}
                />
              </div>
              <div className="block">
                <p>Contraseña</p>
                <input
                  type="password"
                  value={name.password}
                  name="password"
                  onChange={onChangeName}
                  required={true}
                />
              </div>
            </div>
            <button onClick={onSubmitName}>Cambiar</button>
          </form>
        </div>
        <div className="categories">
          <h2 className="blogSubTitle">Categorías</h2>
          {categories.map((element, index) => (
            <div className="category" key={element.categoria_id}>
              <CategoryElement {...element} index={index} id={id} />
            </div>
          ))}
          {addCategory && <AddCategory />}
          <button
            onClick={() => setAddCategory(!addCategory)}
            className={addCategory ? "cancel" : "add"}
          >
            {addCategory ? "cancelar" : "añadir categoría"}
          </button>
        </div>
      </div>
    </section>
  );
};
