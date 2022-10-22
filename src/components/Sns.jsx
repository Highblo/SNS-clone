import { useEffect, useState } from "react";

import { SignOut } from "./SignOut";
import { auth, db } from "../firebase";
import { SendMessage } from "./SendMessage";

export const Sns = () => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    db.collection("messages")
      .orderBy("createdAt")
      .limit(50)
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);
  return (
    <div>
      <SignOut />
      <div className="msgs">
        {messages.map(({id, text, photoURL, uid}) => (
          <div>
            <div 
              key={id} 
              className={`msg ${uid === auth.currentUser.uid ? "send" : "received"}`}>
              <img src={photoURL} alt="" />
              <p>{text}</p>
            </div>
          </div>
        ))}
      </div>
      <SendMessage />
    </div>
  );
};