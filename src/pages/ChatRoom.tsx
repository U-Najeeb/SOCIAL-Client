import React from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import "./styles/ChatRoomStyles.scss";
import { FormatTimeAgo } from "../utils/DateFormatter";

const ChatRoom = () => {
  const location = useLocation();
  const { name, room } = location.state;

  const [activeUsers, setActiveUsers] = React.useState<number>(0);
  const [messageList, setMessageList] = React.useState<Array<any>>([]);
  const [message, setMessage] = React.useState<string>("");

  const socket = React.useRef<any>(null);

  // function ScrollToBottom() {
  //   window.scrollTo({
  //     top: document.body.scrollHeight,
  //     behavior: "smooth", // You can use 'auto' for immediate scrolling
  //   });
  // }

  const ScrollToBottom = () => {
    const scrollDelay = setInterval(() => {
      if (messageList.length > 5) {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }
      return clearInterval(scrollDelay);
    }, 100);
  };

  const SendMessage = () => {
    if (message?.length > 1) {
      const messageBody = {
        name,
        message,
        time: Date.now(),
      };
      socket.current.emit("messages", messageBody);
      setMessageList((prevState) => [...prevState, messageBody]);
      setMessage("");
      ScrollToBottom();
    } else {
      alert("Cannot send a empty message!");
    }
  };

  React.useEffect(() => {
    if (!socket.current) {
      socket.current = io("http://localhost:5000");

      socket.current.emit("join-room", room, name);

      socket.current.on("active-connections", (conns: number) => {
        setActiveUsers(conns);
      });

      socket.current.on("messages", (messageBody: string) => {
        setMessageList((prevState) => [...prevState, messageBody]);
        ScrollToBottom();
      });
    }

    // Clean up the socket connection when the component unmounts
    return () => {
      if (socket.current) {
        socket.current.disconnect();
        socket.current = null;
      }
    };
  }, [room]);

  // REQS
  // Handle the Joining and leaving of a Room on the backend. DONE
  // Handle the Size Reponse of the Room so it can be accurate. DONE
  // Handle Time sent to the MessageBody so it can be read on the front end properly. DONE
  // Work on the Live Status of the User/Connection.

  return (
    <>
      <div className="chatroom-container">
        {/* HEADER NAV */}
        <nav>
          <h3>
            Room {"->"} ({room})
          </h3>
          <h3>
            You {"->"} ({name})
          </h3>
          <h3>
            Online {"->"} ({activeUsers})
          </h3>
        </nav>

        {/* BODY */}
        <div className="chatBody">
          {/* CHAT PILL */}
          {messageList.length > 0 &&
            messageList.map((message, index) => {
              return (
                <div
                  key={message.time}
                  className={`chat-pill ${
                    message.name === name && "myMessage"
                  } ${index + 1 === messageList.length && " lastMessage"}`}
                >
                  <h5>{message.name}</h5>
                  <h4>{message.message}.</h4>
                  <h6>{FormatTimeAgo(message.time)}</h6>
                </div>
              );
            })}

          {/* INPUT BOX */}
          <div
            onKeyDown={(e) => e.key === "Enter" && SendMessage()}
            className="inputBox"
          >
            <input
              value={message}
              onChange={(e: any) => setMessage(e.target.value)}
              type="text"
              placeholder="Type youe message here ...."
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatRoom;
