import React, { useState, useEffect } from "react";
import axios from "axios";
import Login from "./Views/Login.js";
import Signup from "./Views/Signup.js";
import User from "./Views/User.js";
import Logo from "./Components/logo.js"

function App() {
  const [screen, setScreen] = useState("signup");
  const [user, setUser] = useState();

  //fires when the component is loaded
  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      //address of the express server
      url: "http://localhost:8080/",
    }).then((res) => {
      if (res.data.user) setUser(res.data.user);
      setScreen(res.data.redirectTo);
      console.log(res.data);
    });
  }, []);


  if (screen === "signup") {
    return (
      <>
        <Logo />
        <Signup setRedirect={setScreen} />
      </>
    );
  } else if (screen === "login") {
    return (
        <>
          <Logo />
          <Login setRedirect={setScreen} setUser={setUser} />
        </>
    );
  } else if (screen === "user") {
    return (
        <>
          <Logo />
          <User user={user} setRedirect={setScreen} setUser={setUser} />
        </>
        

    );
  } else if (screen === "loginerror") {
    return (
      <div className="container">
        <h1>Log in Error</h1>
        <button onClick={() => setScreen("login")}>
          Go Back to Login Page
        </button>
      </div>
    );
  }
}

export default App;
