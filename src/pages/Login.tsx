import React from "react";
import "./styles/LoginStyles.scss";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [name, setName] = React.useState<string>("");
  const [room, setRoom] = React.useState<string>("");

  const navigate = useNavigate();

  const HandleLogin: Function = () => {
    if (name.length > 2) {
      if (room.length > 2) {
        navigate("/chatroom", {
          state: {
            name,
            room,
          },
        });
      } else {
        alert("Provide a proper Room!");
      }
    } else {
      alert("Provide a proper Name!");
    }
  };

  return (
    <div className="login-container">
      <div className="header">
        <h1>LOG INTO</h1>
        <h1>SOCIAL</h1>
      </div>
      <div
        onKeyDown={(e) => e.key === "Enter" && HandleLogin()}
        className="inputs"
      >
        <input
          onChange={(e) => setName(e.target.value)}
          defaultValue={name}
          type="text"
          placeholder="Enter Your Name"
        />
        <input
          onChange={(e) => setRoom(e.target.value)}
          defaultValue={room}
          type="text"
          placeholder="Enter Room ID"
        />
      </div>
      <div className="button">
        <button onClick={() => HandleLogin()}>Login</button>
      </div>
    </div>
  );
};

export default Login;
