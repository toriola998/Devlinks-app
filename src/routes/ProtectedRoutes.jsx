import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
   const isAuthenticated = sessionStorage.getItem("token");
   const navigate = useNavigate();

   useEffect(() => {
      if (!isAuthenticated) {
         navigate("/", { replace: true });
      } else return;
   }, [isAuthenticated, navigate]);

   return children ? children : <Outlet />;
};

export default ProtectedRoutes;
