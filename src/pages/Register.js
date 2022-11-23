import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router";

const Register = () => {

  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    console.log("File: ", file);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Res: ", res);
      const storageRef = ref(storage, username);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          console.log("Error while uploading picture: ", error);
          setError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
            await updateProfile(res.user, {
              displayName: username,
              photoURL: downloadURL
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName: username,
              email,
              photoURL: downloadURL
            });
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          });
        }
      );

    } catch (error) {
      console.log("Error while registering: ", error);
      setError(true);
    }

  }

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <span className="logo">Chat App</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="display name" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <input type="file" id="file" style={{ display: "none" }} />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label>
          <button>Sign Up</button>
          {error && <span>Something went wrong.</span>}
        </form>
        <p>Do you have an account? Login</p>
      </div>
    </div>
  );
}

export default Register;