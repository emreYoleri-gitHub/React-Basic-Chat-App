import React from "react";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Home from "./Home";
import SignIn from "./SignIn";
const App = () => {
  const [user] = useAuthState(auth);
  return <div>{user ? <Home user={user} /> : <SignIn />}</div>;
};

export default App;
