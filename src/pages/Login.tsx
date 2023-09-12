import React from "react";
import "./styles/LoginStyles.scss";

const Login = () => {
  const [name, setName] = React.useState<string>("");
  const [room, setRoom] = React.useState<string>("");

  const HandleLogin = () => {
    if (name.length > 2) {
      if (room.length > 2) {
        console.log("Login successful")
      } else {
        alert("Provide a proper Room!");
      }
    } else {
      alert("Provide a proper name!");
    }
  };

  return (
    <div className="login-container">
      <div className="header">
        <h2>LOG INTO</h2>
        <h2>SOCIAL</h2>
      </div>
      <div className="inputs">
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
