import { useEffect } from "react";
import useAuthStore from "../../store/auth.store";

const GetAuth = () => {
  const getAuth = useAuthStore((state) => state.getAuth);

  useEffect(() => {
    getAuth();
  }, []);

  return null;
};

export default GetAuth;
