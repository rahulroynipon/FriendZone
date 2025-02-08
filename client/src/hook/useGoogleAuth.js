import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import useAuthStore from "../store/auth.store";

const useGoogleAuth = () => {
  const { getAuth } = useAuthStore();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [action, setAction] = useState({
    isSuccess: false,
    isError: false,
    message: "",
  });

  const fetchAuth = async () => {
    await getAuth();
    navigate("/");
  };

  useEffect(() => {
    const success = params.get("success") === "true";
    const error = params.get("error") === "true";
    const token = params.get("token");
    const message = params.get("message");

    const newAction = {
      isSuccess: success,
      isError: error,
      message: message || "",
    };

    setAction(newAction);

    if (token && token !== "null" && success) {
      localStorage.setItem("token", token);
      fetchAuth();
    }
  }, [params, navigate]);

  return action;
};

export default useGoogleAuth;
