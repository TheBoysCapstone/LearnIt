import React, { useState, useEffect } from "react";
import axios from "axios";
import Login from "./Components/Login.js";
import Signup from "./Components/Signup.js";
import User from "./Components/User.js";

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

  const toggleScreen = (value) => {
    //console.log(value)
    setScreen(value);
  };

  if (screen === "signup") {
    return (
      <div className="container signup-form">
        <Signup setRedirect={setScreen} />
        <button onClick={() => toggleScreen("login")} className="red-btn group-btn">
          Login
        </button>
      </div>
    );
  } else if (screen === "login") {
    return (
      <div className="container login-form">
        <Login setRedirect={setScreen} setUser={setUser} />
        <button onClick={() => toggleScreen("signup")} className="red-btn group-btn">
          Signup
        </button>
      </div>
    );
  } else if (screen === "user") {
    return (
      <div>
        <User user={user} setRedirect={setScreen} setUser={setUser} />
      </div>
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
