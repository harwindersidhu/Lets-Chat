import React, { useContext, useState } from "react";
import Img from "../img/img.png";
import Attach from "../img/attach.png";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from "@firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { userData } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          console.log("Error while sending picture: ", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
            await updateDoc(doc(db, "chats", userData.chatId), {
              //arrayUnion is method to update array in firebase
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL
              })
            })
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", userData.chatId), {
        //arrayUnion is method to update array in firebase
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now()
        })
      })
    }

    // Update userChats collection to show last message on sidebar chats
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [userData.chatId + ".lastMessage"]: {
        text
      },
      [userData.chatId + ".date"]: serverTimestamp()
    })
    await updateDoc(doc(db, "userChats", userData.user.uid), {
      [userData.chatId + ".lastMessage"]: {
        text
      },
      [userData.chatId + ".date"]: serverTimestamp()
    })

    setText("");
    setImg(null);
  };

  return (
    <div className="input">
      <input 
        type="text" 
        placeholder="Type something..." 
        onChange={e => setText(e.target.value)}
        value={text}  
      />
      <div className="send">
        <img src={Attach} alt="" />
        <input 
          type="file" 
          style={{display:"none"}} 
          id="file" 
          onChange={e => setImg(e.target.files[0])}  
        />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default Input;