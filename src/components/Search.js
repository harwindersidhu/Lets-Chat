import React, { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  const handleSearch = async () => {
    const userQuery = query(collection(db, "users"), where("displayName", "==", username));
    try {
      const querySnapshot = await getDocs(userQuery);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setError(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  }

  return (
    <div className="search">
      <div className="search-form">
        <input type="text" placeholder="Find a user" onKeyDown={handleKey} onChange={(e) => setUsername(e.target.value)} />
      </div>
      {error && <span>User not found!</span>}
      {user && <div className="user-chat">
        <img src={user.photoURL} alt="" />
        <div className="user-chat-info">
          <span>{user.displayName}</span>
        </div>
      </div>}
    </div>
  );
}

export default Search;