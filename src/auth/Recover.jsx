import { useNavigate } from "react-router-dom";

export const Recover = () => {
  const navigate = useNavigate();
  return (
    <section id="recover">
      <form>
      <p className="login">Recover</p>
        <label>
          <input type="mail" 
          required="required"/>
          <span>Correo</span>
        </label>
        <button type="submit">Enviar correo</button>
        <a onClick={() => navigate("/auth/login")}>Ingresar</a>
      </form>
    </section>
  );
};
