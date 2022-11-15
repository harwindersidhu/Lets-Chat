import React from "react";
import Cam from "../img/cam.png"
import Add from "../img/add.png"
import More from "../img/more.png"
import Messages from "./Messages";

const Chat = () => {
  return (
    <div className="chat">
      <div className="chat-info">
        <span>Jane</span>
        <div className="chat-icons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      <Messages />
    </div>
  );
}

export default Chat;