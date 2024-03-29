import { Routes, Route, Navigate } from "react-router-dom";
import { AuthRoutes } from "../auth/AuthRoutes";
import { useContext } from "react";
import { MainContext } from "../context/MainContext";
import { ContentRoutes } from "../content/routes/ContentRoutes"
import { PLoading } from "../content/PLoading";

export const AppRouter = () => {
  const { auth, loading } = useContext(MainContext);

  return (
    <Routes>
      {
      auth ? <Route path="/*" element={loading? <PLoading/>:<ContentRoutes />}/>
      : <Route path='/*' element={loading? <PLoading/>:<AuthRoutes />} />
      }
      <Route path='/*' element={<Navigate to='/' />} />
    </Routes>
  );
};
