import React, { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import db, { auth } from "./firebase";
import "./Home.css";

const Home = ({ user }) => {
  const [inpValue, setinpValue] = useState("");
  const [messages] = useCollectionData(
    db.collection("messages").orderBy("time", "asc")
  );

  const addMessage = async (e) => {
    e.preventDefault();
    if (
      inpValue.length &&
      !inpValue.endsWith(" ") &&
      !inpValue.startsWith(" ")
    ) {
      await db.collection("messages").add({
        sender: user.displayName,
        email: user.email,
        message: inpValue,
        time: new Date().getTime(),
      });
      setinpValue("");
    }
  };
  return (
    <div>
      <div id="container">
        <main>
          <header>
            <button
              className="btn btn-outline-danger"
              onClick={() => auth.signOut()}
            >
              Sign Out
            </button>
          </header>
          <ul id="chat">
            {messages?.length ? (
              messages.map((m, i) => {
                return (
                  <li className={m.email === user.email ? "me" : "you"} key={i}>
                    <div className="entete">
                      <h2 style={{ color: "wheat" }}>{m.sender}</h2>
                      <span
                        className={`status ms-1 ${
                          m.email === user.email ? "blue" : "green"
                        }`}
                      ></span>
                    </div>
                    <div className="triangle"></div>
                    <div className="message">{m.message}</div>
                  </li>
                );
              })
            ) : (
              <h1 style={{ color: "white", textAlign: "center" }}>
                Sohbet Yok
              </h1>
            )}
          </ul>
          <footer>
            <div className="input-group">
              <form className="d-flex w-100" onSubmit={(e) => addMessage(e)}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Send messeage..."
                  value={inpValue}
                  onChange={(e) => setinpValue(e.target.value)}
                />
                <button className="btn btn-outline-primary ms-1" type="submit">
                  Send
                </button>
              </form>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Home;
