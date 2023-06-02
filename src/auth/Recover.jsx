import { useNavigate } from "react-router-dom";

export const Recover = () => {
  const navigate = useNavigate();
  return (
    <section id="recover">
      <form>
        <label>
          correo
          <input type="text" />
        </label>
        <button type="submit" >Recuperar Contraseña</button>
      </form>
      <a onClick={() => navigate("/auth/login")}>volver</a>
    </section>
  );
};
