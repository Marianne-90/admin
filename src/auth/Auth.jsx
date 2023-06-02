import "./auth.css";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { MainContext } from "../context/MainContext";

export const Auth = () => {
  const { setAuth, mainUrl, setLoading, usuario, setUsuario } =
    useContext(MainContext);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("usuario", usuario);
    formData.append("password", password);

    try {
      const response = await fetch(`${mainUrl}user/auth`, {
        method: "POST",
        body: formData,
        mode: "cors", // activa la política de cors
      });

      const data = await response.json();
      if (data.message == true) {
        setAuth(data.message);
      }
      setLoading(false);
    } catch (error) {
      console.log("Ha ocurrido un error:", error);
      setLoading(false);
    }
  };

  return (
    <div className="authConteiner">
      <div className="authElement">
        <form>
          <p className="login">Log in</p>
          <label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required="required"
            />
            <span>Usuario</span>
          </label>

          <label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required="required"
            />
            <span>Contraseña</span>
          </label>
          <button
            type="submit
            "
            onClick={handleSubmit}
          >
            Entrar
          </button>
          <a onClick={() => navigate("/auth/recover")}>olvidé mi contraseña</a>
        </form>
      </div>
    </div>
  );
};
