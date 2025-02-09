import { Navigate, Outlet } from "react-router";
import useAuthStore from "../../store/auth.store";

const PublicRoute = () => {
  const { isAuth } = useAuthStore();
  return isAuth ? <Navigate to="/" replace /> : <Outlet />;
};

const PrivateRoute = () => {
  const { isAuth } = useAuthStore();
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};

const VerificationRoute = () => {
  const { isAuth } = useAuthStore();
  const registerToken = localStorage.getItem("registerToken");

  if (isAuth) return <Navigate to="/" replace />;
  if (!registerToken) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export { PublicRoute, PrivateRoute, VerificationRoute };
