import React, {useState} from 'react'
import Login from "./Components/Login.js"
import Signup from "./Components/Signup.js"
import User from "./Components/User.js"


function App() {
  const[screen, setScreen] = useState("signup")
  const[user, setUser] = useState()

  const toggleScreen = (value) => {
    //console.log(value)
    setScreen(value);
  }

  if(screen==="signup"){
    return (
    <div className="container">
      <Signup setRedirect={setScreen}/>
      <button onClick={()=>toggleScreen("login")} className="btn-nav">Login</button>
    </div>
  );
  }else if(screen==="login"){
     return (
    <div className="container">
      <Login setRedirect={setScreen} setUser = {setUser}/>
      <button onClick={()=>toggleScreen("signup")} className="btn-nav">Signup</button>
    </div>
     );
  }
  else if(screen==="user"){
    return (
   <div className="container">
     <User user={user}/>
   </div>
    );
 }else if(screen==="loginerror"){
  return (
 <div className="container">
   <h1>Log in Error</h1>
   <button onClick={()=>setScreen("login")}>Go Back to Login Page</button>
 </div>
  );
}
  
}

export default App;
