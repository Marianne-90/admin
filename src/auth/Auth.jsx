import "./auth.css";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { MainContext } from "../Context/MainContext";

export const Auth = () => {
  const { setAuth, mainUrl, setLoading, usuario, setUsuario} = useContext(MainContext);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('usuario', usuario);
    formData.append('password', password);

    try {
    const response = await fetch(`${mainUrl}user/auth`, {
      method: 'POST',
      body: formData,
      mode: 'cors', // activa la política de cors
    });

      const data = await response.json();
      if(data.message==true){
        setAuth(data.message)}
      setLoading(false);} 
      catch (error) {
        console.log("Ha ocurrido un error:", error);
        setLoading(false);
        // puedes hacer algo más aquí, como mostrar un mensaje de error al usuario
      }
  };


  return (
    <div className="authConteiner">
      <h2>Panel de Administrador</h2>
      <div className="authElement">
        <form>
          <label>
            usuario
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
          </label>

          <label>
            contraseña
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>


          <button type="submit
          " onClick={handleSubmit}>Entrar</button>
        </form>
        <a onClick={()=>navigate(('/auth/recover'))}>olvidé mi contraseña</a>
      </div>
    </div>
  );
};
