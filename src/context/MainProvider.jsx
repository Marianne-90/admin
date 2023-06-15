import { useState } from "react";
import { MainContext } from "./MainContext";

export const MainProvider = ({ children }) => {
  const authStatus = sessionStorage.getItem("status")
    ? JSON.parse(sessionStorage.getItem("status"))
    : false;

  const userName = sessionStorage.getItem("user")
    ? JSON.parse(sessionStorage.getItem("user"))
    : "";

    const idUser = sessionStorage.getItem("id")
    ? JSON.parse(sessionStorage.getItem("id"))
    : "";

  const [auth, setAuth] = useState(authStatus);
  const [mainUrl, setMainUrl] = useState("http://localhost/solaz/");
  const [loading, setLoading] = useState(false);
  const [miniLoadingp, setMiniLoadingp] = useState(false);
  const [usuario, setUsuario] = useState(userName);
  const [id, setId] = useState(idUser);

  sessionStorage.setItem("status", JSON.stringify(auth));
  sessionStorage.setItem("user", JSON.stringify(usuario));
  sessionStorage.setItem("id", JSON.stringify(id));

  return (
    <MainContext.Provider
      value={{
        auth,
        setAuth,
        mainUrl,
        loading,
        setLoading,
        miniLoadingp,
        setMiniLoadingp,
        usuario,
        setUsuario,
        id, 
        setId
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
