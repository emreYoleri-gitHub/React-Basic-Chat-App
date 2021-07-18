import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import db, { auth, provider } from "./firebase";
import whatsappLogo from "./logo.png";

const SignIn = () => {
  const [dataUsers] = useCollectionData(db.collection("users"));
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((user) => {
        let findUser = dataUsers?.find((u) => u.email === user.user.email);
        if (findUser) {
        } else {
          db.collection("users").add({
            name: user.user.displayName,
            email: user.user.email,
            photoURL: user.user.photoURL,
          });
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="container">
      <div className="text-center">
        <div
          className="col-12  mt-5  p-3"
          style={{
            width: "20rem",
            margin: "0 auto",
            borderRadius: "20px",
            background: "#422ebC",
          }}
        >
          <img src={whatsappLogo} height="150" className="my-3" alt="" />
          <h2 className="my-3 d-block" style={{ color: "white" }}>
            Chat App With React
          </h2>
          <button className="btn btn-success my-3" onClick={signIn}>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
