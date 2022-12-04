import React, { useContext, useState } from "react";
import { collection, query, where, getDocs, getDoc, updateDoc, serverTimestamp, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const { currentUser } = useContext(AuthContext);


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

  const handleSelect = async () => {
    //check whether the group exists, if not create
    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      
      //.exists() is a firebase function 
      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        // create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId+".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
          },
          [combinedId+".date"]: serverTimestamp()
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId+".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          [combinedId+".date"]: serverTimestamp()
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername("");
  }

  return (
    <div className="search">
      <div className="search-form">
        <input type="text" placeholder="Find a user" onKeyDown={handleKey} onChange={(e) => setUsername(e.target.value)} value={username} />
      </div>
      {error && <span>User not found!</span>}
      {user && <div className="user-chat" onClick={handleSelect}>
        <img src={user.photoURL} alt="" />
        <div className="user-chat-info">
          <span>{user.displayName}</span>
        </div>
      </div>}
    </div>
  );
}

export default Search;