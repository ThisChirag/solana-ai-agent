import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function AuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/");
    }
  }, []);

  return <div>Loading...</div>;
}
