import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const UnauthorizedLogin = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.user ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};

export default UnauthorizedLogin;
