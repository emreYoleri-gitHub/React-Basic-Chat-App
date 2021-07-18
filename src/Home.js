import React, { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import db, { auth } from "./firebase";
import "./Home.css";

const Home = ({ user }) => {
  const [inpValue, setInpValue] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const [dataMessages] = useCollectionData(
    db.collection("messages").orderBy("time", "asc")
  );

  const messages = dataMessages?.filter(
    (m) => m.email === user.email || m.receiver === user.email
  );

  const [dataUsers] = useCollectionData(db.collection("users"));

  const users = dataUsers?.filter((u) => u.email !== user.email);

  const addMessage = async (e) => {
    e.preventDefault();
    await db.collection("messages").add({
      sender: user.displayName,
      receiver: currentUser.email,
      email: user.email,
      text: inpValue,
      time: new Date().getTime(),
    });
    setInpValue("");
  };

  return (
    <div id="container">
      <aside>
        <header>
          <h2>Peoples</h2>
        </header>
        <ul>
          {users?.map((user, i) => {
            return (
              <li
                className="d-flex align-items-center"
                key={i}
                onClick={() => setCurrentUser(user)}
              >
                <img src={user.photoURL} alt="" height="50" />
                <h1 style={{ fontSize: "23px", color: "white" }}>
                  {user.name}
                </h1>
              </li>
            );
          })}
          {users?.length ? null : (
            <h2 style={{ color: "white", textAlign: "center" }}>
              Kullanıcı Yok
            </h2>
          )}
        </ul>
        <div className="text-center mt-3">
          <button
            className="btn btn-outline-danger"
            onClick={() => auth.signOut()}
          >
            Sign Out
          </button>
        </div>
      </aside>
      <main>
        {currentUser ? (
          <>
            <header>
              <img src={currentUser.photoURL} height="50" alt="" />
              <div>
                <h2>{currentUser.name}</h2>
                <h3>{currentUser.email}</h3>
              </div>
            </header>
            <ul id="chat">
              {messages?.map((message, i) => {
                return (
                  <li
                    className={
                      message.email === user.email
                        ? `${
                            currentUser.email === message.receiver ? "me" : "no"
                          }`
                        : `
                        ${currentUser.email === message.email ? "you" : "no"}`
                    }
                    key={i}
                  >
                    <div className="entete">
                      <span
                        className={`status me-2 ${
                          message.email === user.email ? "blue" : "green"
                        }`}
                      ></span>
                      <h2>{message.sender}</h2>
                    </div>
                    <div className="triangle "></div>
                    <div className="message">{message.text}</div>
                  </li>
                );
              })}
            </ul>
            <footer>
              <form onSubmit={(e) => addMessage(e)}>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type message..."
                    value={inpValue}
                    onChange={(e) => setInpValue(e.target.value)}
                  />
                  <button className="btn btn-info" type="submit">
                    Send
                  </button>
                </div>
              </form>
            </footer>
          </>
        ) : (
          <div className="text-center mt-3">
            <p className="lead">Mesajlaşmaya başlamak için kullanıcı seçiniz</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
