import React from "react";

const Chats = () => {
  return (
    <div className="chats">
      <div className="user-chat">
        <img src="https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
        <div className="user-chat-info">
          <span>Dad</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="user-chat">
        <img src="https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
        <div className="user-chat-info">
          <span>Mom</span>
          <p>Good night</p>
        </div>
      </div>
      <div className="user-chat">
        <img src="https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
        <div className="user-chat-info">
          <span>Brother</span>
          <p>Where are you?</p>
        </div>
      </div>
      <div className="user-chat">
        <img src="https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
        <div className="user-chat-info">
          <span>Aunt</span>
          <p>Hello</p>
        </div>
      </div>
    </div>
  );
}

export default Chats;