import { doc, onSnapshot } from "@firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import Message from "./Message";

const Messages = () => {

  const [messages, setMessages] = useState([]);
  const { userData } = useContext(ChatContext);
  console.log("Chat id: ", userData.chatId);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", userData.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    })

    return () => {
      unSub();
    }
  }, [userData.chatId]);

  console.log("Mess: ", messages);

  return (
    <div className="messages">
      {messages.map(m => (<Message message={m} key={m.id}/>))}
    </div>
  );
};

export default Messages;