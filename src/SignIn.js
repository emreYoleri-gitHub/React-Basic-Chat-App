import React from "react";
import { auth, provider } from "./firebase";
import whatsappLogo from "./logo.png";

const SignIn = () => {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((error) => console.log(error));
  };
  return (
    <div className="container">
      <div className="text-center">
        <div
          className="col-12 bg-info mt-5 rounded-3 p-3"
          style={{ width: "20rem", margin: "0 auto" }}
        >
          <img src={whatsappLogo} height="150" />
          <h2>Chat App With React</h2>
          <button className="btn btn-success" onClick={signIn}>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
