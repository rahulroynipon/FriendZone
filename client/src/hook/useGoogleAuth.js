import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

const useGoogleAuth = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [action, setAction] = useState({
    isSuccess: false,
    isError: false,
    message: "",
  });

  useEffect(() => {
    const success = params.get("success");
    const error = params.get("error");
    const token = params.get("token");
    const message = params.get("message");

    const newAction = {
      isSuccess: success === "true",
      isError: error === "true",
      message: message,
    };

    setAction(newAction);

    if (token && token !== "null") {
      localStorage.setItem("token", token);

      navigate("/");
    }
  }, [params, navigate]);

  return action;
};

export default useGoogleAuth;
