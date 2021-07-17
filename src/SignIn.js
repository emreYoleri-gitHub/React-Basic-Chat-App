import React from "react";
import { auth, provider } from "./firebase";

const SignIn = () => {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((error) => console.log(error));
  };
  return (
    <div>
      <button className="btn btn-success" onClick={signIn}>
        Sign in with Google
      </button>
    </div>
  );
};

export default SignIn;
