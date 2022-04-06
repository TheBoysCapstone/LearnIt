import React, {useState} from 'react'
import axios from 'axios'


const Signup = ({setRedirect/*redirect is a function from the App.js file which takes in the name of the screen to redirect to as its parameter*/}) =>{
    const[signupInfo, setSignupInfo]=useState({username:'', email:'', password:''})
    const[warning, setWarning] = useState("");

    //save user info into the signupInfo object
    const handleChange = (e) => {
        //retrieve and save the name of the input field
        const field = e.target.name;
        //retrieve and save the current value of the input field
        const value = e.target.value;
        //save the data from above into the signup object
        setSignupInfo({...signupInfo, [field]: value});
        console.log(signupInfo);
    }

    //use the info collected from the user to make a server request
    const handleSubmit = (e) =>{
        //prevent the browser from navigating away when the signup button is clicked
        e.preventDefault();
        //clear screen warnings if there is any 
        setWarning("")
        //check if all of the input fields have been filled out 
        if(signupInfo.username && signupInfo.email && signupInfo.password){

            //code that sends signUpInfo object to the server 
            axios({
                method: "POST",
                //data to send to server int he form of an object
                data: {
                  username: signupInfo.username,
                  password: signupInfo.password,
                  email: signupInfo.email
                },
                withCredentials: true,
                //address of the express server
                url: "http://localhost:8080/register",
              })
              //this executes after the server responds
              .then((res) => {
                  //res.data.error is true when a user with the specified username already exists; console.log(res.data) for more details
                  if(res.data.error){
                      //passing the error message into the setWarning function will tell the user to try another username
                      setWarning(res.data.message)
                      //this will execute if there were no errors
                  }else{
                      //redirect to login page
                      console.log(res.data.redirectTo)
                      setRedirect(res.data.redirectTo)
                  }
              });

            setSignupInfo({username: '', email:'', password: ''})
        }
        else{
            setWarning("All fields need to be filled out")
        }
    }
    return(
        <div className="container">
            <h4>Create an account</h4>
            <form>
                <div>
                    <h4 className="warning">{warning}</h4>
                </div>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type='text' id='username' name='username' size="30"  value={signupInfo.username} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor='email' >Email</label>
                    <input type='email' id='email' name='email' size="30" value={signupInfo.email} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type='password' id='password' name='password' size="30" value={signupInfo.password} onChange={handleChange}/>
                </div>
                <button type="submit" className="green-btn group-btn"  onClick={handleSubmit}>Register</button>
                <button onClick={() => setRedirect("login")} className="red-btn group-btn">Login</button>
            </form>
        </div>
    )
}

export default Signup