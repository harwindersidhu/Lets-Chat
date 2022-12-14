import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = (props) => {

  const { currentUser } = useContext(AuthContext);
  const { userData } = useContext(ChatContext);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({behavior: "smooth"})
  }, [props.message])

  return (
    <div ref={ref}
      className={`message ${props.message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="message-info">
        <img
          src={
            props.message.senderId === currentUser.uid
              ? currentUser.photoURL
              : userData.user.photoURL
          }
          alt=""
        />
        <span>just now</span>
      </div>
      <div className="message-content">
        <p>{props.message.text}</p>
        {props.message.img && <img
          src={props.message.img}
          alt=""
        />}
      </div>
    </div>
  );
}

export default Message;