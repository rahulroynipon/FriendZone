import { useEffect } from "react";
import { useLocation } from "react-router";

const useRouteExit = (targetPath, callback) => {
  const location = useLocation();

  useEffect(() => {
    const handleUnload = (event) => {
      callback();
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);

      if (location.pathname === targetPath) {
        callback();
      }
    };
  }, [location.pathname, targetPath]);

  return null;
};

export default useRouteExit;
