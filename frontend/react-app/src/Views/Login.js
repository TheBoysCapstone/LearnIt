import React, {useState} from 'react'
import axios from 'axios'

const Login = ({setRedirect, setUser}) =>{
    const[loginInfo, setLoginInfo] = useState({username:'', password: ''})
    const[warning, setWarning] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setWarning('');

        if(loginInfo.username && loginInfo.password){
            //code that sends loginInfo to the server goes here
            axios({
                method: "POST",
                //data to send to server in the form of an object
                data: {
                  username: loginInfo.username,
                  password: loginInfo.password,
                },
                withCredentials: true,
                //address of the express server
                url: "http://localhost:8080/login",
              })
              //this executes after the server responds
              .then((res) => {
                  //res.data.error is true when a user with the specified username already exists; console.log(res.data) for more details
                  if(!res.data.user){
                      //passing the error message into the setWarning function will tell the user to try another username
                      setRedirect("loginerror")
                      //this will execute if there were no errors
                  }else{
                      //redirect to login page
                      setUser(res.data.user)
                      setRedirect(res.data.redirectTo)
                  }
              });
            setLoginInfo({username:'', password: ''})
        }else{
            setWarning("All fields need to be completed")
        }
    }

    const handleChange = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        setLoginInfo({...loginInfo, [field]: value})
    }
    return(
        <div className="container medium-width">
            <h3 className="login">Login to continue</h3>
            <form>
                <div>
                    <h4 className="warning">{warning}</h4>
                </div>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type='text' id='username' name='username' size="30" value={loginInfo.username} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type='password' id='password' name='password' size="30" value={loginInfo.password} onChange={handleChange}/>
                </div>
                <button type="submit" className="green-btn group-btn" onClick={handleSubmit}>Login</button>
                <button onClick={() => setRedirect("signup")} className="red-btn group-btn">Signup</button>
            </form>
        </div>
    )
}

export default Login