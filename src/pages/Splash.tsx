import React from "react";
import "./styles/SplashStyles.scss";
import { useNavigate } from "react-router-dom";

const Splash = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    setInterval(() => {
      navigate("login");
    }, 2000);
  }, []);

  return (
    <div className="splash-container">
      <h1>SOCIAL</h1>
    </div>
  );
};

export default Splash;
