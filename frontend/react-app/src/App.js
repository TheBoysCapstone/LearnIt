import React, {useState} from 'react'
import Login from "./Components/Login.js"
import Signup from "./Components/Signup.js"


function App() {
  const[screen, setScreen] = useState("signup")

  const toggleScreen = (value) => {
    //console.log(value)
    setScreen(value);
  }

  if(screen==="signup"){
    return (
    <div className="container">
      <Signup redirect={setScreen}/>
      <button onClick={()=>toggleScreen("login")} className="btn-nav">Login</button>
    </div>
  );
  }else if(screen==="login"){
     return (
    <div className="container">
      <Login />
      <button onClick={()=>toggleScreen("signup")} className="btn-nav">Signup</button>
    </div>
     );
  }
  
}

export default App;
