import { useContext, useState, useEffect } from "react";
import { RoutesDictionary } from "./RoutesDictionary";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../../../context/MainContext";
import Swal from "sweetalert2";
import { BlogContext } from "../../../context/blogContext/BlogContext";
import { CategoryElement } from "./CategoryElement";


export const Settings = () => {
  const { mainUrl, usuario, id } = useContext(MainContext);
  const { categories, setCategories } = useContext(BlogContext);

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState({ user: "", password: "" });
 
  const navigate = useNavigate();

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
    <section className="prevView">
      <div className="blogSubNavbar">
        <RoutesDictionary routes="blog ajustes-del-blog" />
        <div className="buttons">.</div>
      </div>
      <div className="content">
        <h1>Ajustes del Blog</h1>
        <div className="userName">
          <p>Cambiar nombre de público</p>
          <form action="POST">
            <input
              type="text"
              name="user"
              value={name.user}
              onChange={onChangeName}
              maxLength={80}
            />
            <input
              type="password"
              value={name.password}
              name="password"
              onChange={onChangeName}
              required={true}
            />
            <button onClick={onSubmitName}>Cambiar</button>
          </form>
        </div>
        <div className="categories">
          {categories.map((element, index) => (
            <div className="category" key={element.categoria_id}>
              <CategoryElement {...element} index={index}/>
            </div>
          ))}
          <button>Añadir</button>
        </div>
      </div>
    </section>
  );
};
