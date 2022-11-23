import React from "react";
import {signOut} from "firebase/auth";
import { auth } from "../firebase";

const Navbar = () => {
  return (
    <div className="navbar">
      <span className="logo">Chat App</span>
      <div className="user">
        <img src="https://images.pexels.com/photos/103123/pexels-photo-103123.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
        <span>Harwinder</span>
        <button onClick={() => signOut(auth)}>logout</button>
      </div>
    </div>
  );
}

export default Navbar;