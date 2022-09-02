import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/Context";

function Protected({ children }) {
  const navigate = useNavigate();

  const { user } = useContext(Context);

  useEffect(() => {

    if (!user?.token) {
      navigate("/login", { replace: true });
    }
  }, [navigate, user]);

  return children;
}

export default Protected;