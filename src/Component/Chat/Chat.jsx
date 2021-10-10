import React, { useEffect, useState } from "react";
import Logo from "../../Images/ChatBot.png";
import Close from "../../Images/closeIcon.png";
import socketIO from "socket.io-client";
import "./Chat.css";
import Messages from "../Messages/Messages";
import ReactScrollToBottom from "react-scroll-to-bottom";

let socket;
let isClicked = false;

const ENDPOINT = "http://localhost:4500";

let question = {
  ques: "Inside which HTML element do we put the JavaScript?",
  options: ["scripting", "script", "js", "javascript"],
};
let answer = "script";

const Chat = (props) => {
  let name = props.location.state.name;
  let email = props.location.state.email;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [id, setId] = useState("");

  useEffect(() => {
    socket = socketIO(ENDPOINT, { transports: ["websocket"] });
    socket.on("connect", () => {
      console.log("connected");
      setId(socket.id);
    });

    socket.emit("joined", { name: name, email: email });

    socket.on("welcome", (data) => {
      setMessages([...messages, data]);
      console.log(`${data.user}: ${data.message}`);
    });

    return () => {
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessages([...messages, data]);
    });
    return () => {
      socket.off();
    };
  }, [messages]);

  const send = () => {
    socket.emit("send", { message: message, id: id });
    setMessage("");
  };

  const handleClose=()=>{
    props.history.push("/");
  }

  return (
    <div className="chat-container">
      <div className="chatbox">
        <div className="chat-header">
          <div className="chat-logo">
            <img src={Logo} alt="" />
          </div>
          <div className="bot">Assessment Bot</div>
          <div className="close-logo" onClick={handleClose}>
            <i class="fas fa-times-circle"></i>
          </div>
        </div>
        <ReactScrollToBottom className="chats">
          {messages.map((item, i) => {
            return (
              <Messages
                user={item.id === id ? "" : item.user}
                message={item.message}
                key={i}
                isClicked={isClicked}
                property={item.id === id ? "right" : "left"}
                question={question}
                info={item.info ? item.info : ""}
                answer={answer}
              ></Messages>
            );
          })}
        </ReactScrollToBottom>
        <div className="compose">
          <input
            type="text"
            required
            placeholder="Message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          ></input>
          {message.length > 0 ? (
            <button className="send" onClick={send} style={{ opacity: 1 }}>
              Send
            </button>
          ) : (
            <button className="send" style={{ opacity: 0.5 }}>
              Send
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
