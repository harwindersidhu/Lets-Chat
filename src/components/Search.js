import React from "react";

const Search = () => {
  return (
    <div className="search">
      <div className="search-form">
        <input type="text" placeholder="find a user" />
      </div>
      <div className="user-chat">
        <img src="https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
        <div className="user-chat-info">
          <span>Dad</span>
        </div>
      </div>
    </div>
  );
}

export default Search;