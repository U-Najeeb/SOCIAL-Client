import ChatRoom from "./pages/ChatRoom";
import Login from "./pages/Login";
import Splash from "./pages/Splash";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chatroom" element={<ChatRoom />} />
      </Routes>
    </>
  );
}

export default App;
