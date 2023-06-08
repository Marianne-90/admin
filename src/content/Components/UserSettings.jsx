import { useContext, useState, useEffect } from "react";
import { MainContext } from "../../context/MainContext";
import { AiFillCaretRight } from "react-icons/ai";
import Swal from "sweetalert2";
import "./styles/userSettings.css";

export const UserSettings = () => {
  const { mainUrl, usuario, setUsuario } = useContext(MainContext);

  const [userName, setUserName] = useState({ user: "", password: "" });
  const [mail, setMail] = useState({ mail: "", password: "" });
  const [userPass, setPass] = useState({
    password: "",
    newpassword: "",
    passwordConfirmation: "",
  });

  const [loading, setLoading] = useState(false);

  const getData = () => {
    setLoading(true);
    fetch(`${mainUrl}user/mail/${usuario}`)
      .then((response) => response.json())
      .then((data) => {
        let getMail = { ...mail };
        getMail.mail = data.message;
        setMail(getMail);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getData();
  }, []);

  const handleOnChangeUser = (e) => {
    let name = e.target.name;
    let userObj = { ...userName };
    userObj[name] = e.target.value;
    setUserName(userObj);
  };

  const handleOnChangeMail = (e) => {
    let name = e.target.name;
    let mailObj = { ...mail };
    mailObj[name] = e.target.value;
    setMail(mailObj);
  };

  const handleOnChangePassword = (e) => {
    let name = e.target.name;
    let userObj = { ...userPass };
    userObj[name] = e.target.value;
    setPass(userObj);
  };

  const handleSubmitUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (userName.user == usuario) {
      Swal.fire(
        "Usuario no Válido",
        "Debe ser un usuario distinto al ya existente",
        "error"
      );
      setLoading(false);
      return;
    }
    if (userName.user.length < 5) {
      Swal.fire(
        "Usuario no Válido",
        "Debes escribir un nuevo usuario mayor a 5 caracteres",
        "error"
      );
      setLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append("user", usuario);
    formData.append("newUser", userName.user);
    formData.append("password", userName.password);

    try {
      const response = await fetch(`${mainUrl}user/changeuser`, {
        method: "POST",
        body: formData,
        mode: "cors",
      });

      const data = await response.json();

      Swal.fire("Usuario Actualizado", data.message, "success");
      setLoading(false);
      if (data.message == "Usuario Actualizado") setUsuario(userName.user);
      setUserName({ user: "", password: "" });
    } catch (error) {
      Swal.fire(
        "Usuario No Actualizado",
        "A ocurrido un error al tratar de actualizar",
        "error"
      );
      setLoading(false);
      console.log("Ha ocurrido un error:", error);
    }
  };

  const handleSubmitMail = async (e) => {
    setLoading(true);
    e.preventDefault();

    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!emailRegex.test(mail.mail)) {
      Swal.fire(
        "Correo no válido!",
        "El correo que haz ingresado no es válido",
        "error"
      );
      setLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append("user", usuario);
    formData.append("newMail", mail.mail);
    formData.append("password", mail.password);

    try {
      const response = await fetch(`${mainUrl}user/changeMail`, {
        method: "POST",
        body: formData,
        mode: "cors",
      });

      const data = await response.json();
      setLoading(false);
      Swal.fire("Correo Actualizado", data.message, "success");
      setMail({ mail: "", password: "" });
    } catch (error) {
      setLoading(false);
      Swal.fire(
        "Correo No Actualizado",
        "A ocurrido un error al actualizar el correo",
        "error"
      );
      console.log("Ha ocurrido un error:", error);
    }
  };

  const handleSubmitPass = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (userPass.newpassword.length < 5) {
      Swal.fire(
        "A ocurrido un error",
        "La contraseña debe ser mayor a 5 dígitos",
        "error"
      );
      setLoading(false);
      return;
    }

    if (userPass.newpassword == userPass.password) {
      Swal.fire(
        "A ocurrido un error",
        "La contraseña nueva debe ser distinta a la anterior",
        "error"
      );
      setLoading(false);
      return;
    }

    if (userPass.newpassword != userPass.passwordConfirmation) {
      Swal.fire("A ocurrido un error", "Contraseñas no coinciden", "error");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("user", usuario);
    formData.append("password", userPass.password);
    formData.append("newPassword", userPass.newpassword);
    formData.append("confirmation", userPass.passwordConfirmation);

    try {
      const response = await fetch(`${mainUrl}user/changepass`, {
        method: "POST",
        body: formData,
        mode: "cors",
      });

      const data = await response.json();

      Swal.fire("Contraseña Actualizada", data.message, "success");
      setLoading(false);
      setPass({
        password: "",
        newpassword: "",
        passwordConfirmation: "",
      });
    } catch (error) {
      Swal.fire(
        "Contraseña No Actualizada",
        "A ocurrido un error al intentar actualizar la contraseña",
        "error"
      );
      setLoading(false);
      console.log("Ha ocurrido un error:", error);
    }
  };

  if (loading) {
    return (
      <div className="userInfo">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="userInfo">
      <h1>
        <AiFillCaretRight /> Ajustes de Usuario
      </h1>
      <div className="userContainer">
        <form action="POST" onSubmit={handleSubmitUser}>
          <h2>
            Cambiar nombre de usuario <small> ({usuario}) </small>{" "}
          </h2>
          <p>Nombre de usuario</p>
          <input
            type="text"
            value={userName.user}
            name="user"
            onChange={handleOnChangeUser}
            required
          />
          <p>Contraseña</p>
          <input
            type="password"
            name="password"
            value={userName.password}
            onChange={handleOnChangeUser}
            required
          />
          <br />
          <button type="submit">Cambiar</button>
        </form>

        <form action="POST" onSubmit={handleSubmitPass}>
          <h2>Cambiar Contraseña</h2>
          <p>Contraseña</p>
          <input
            type="password"
            name="password"
            value={userPass.password}
            onChange={handleOnChangePassword}
            required
          />
          <div className="nuevaContraseña">
            <p>Contraseña Nueva </p>
            <input
              type="password"
              name="newpassword"
              value={userPass.newpassword}
              onChange={handleOnChangePassword}
              required
            />
            <p>Repetir Contraseña Nueva </p>
            <input
              type="password"
              name="passwordConfirmation"
              value={userPass.passwordConfirmation}
              onChange={handleOnChangePassword}
              required
            />
          </div>
          <button type="submit">Cambiar</button>
        </form>

        <form action="POST" onSubmit={handleSubmitMail}>
          <h2>Cambiar Correo</h2>
          <p>Correo</p>
          <input
            type="text"
            value={mail.mail}
            name="mail"
            onChange={handleOnChangeMail}
            required
          />
          <p>Contraseña</p>
          <input
            type="password"
            name="password"
            value={mail.password}
            onChange={handleOnChangeMail}
            required
          />
          <br />
          <button type="submit">Cambiar</button>
        </form>
      </div>
    </div>
  );
};
