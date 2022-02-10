import React, {useState} from 'react'


const Signup = () =>{
    const[signupInfo, setSignupInfo]=useState({username:'', email:'', password:''})

    const handleSignup = (e) => {

    }
    return(
        <>
            <h4>Create an account</h4>
            <form className="form">
                <div>
                    <label htmlFor="username">Username</label>
                    <input type='text' id='username' name='username' size="30"/>
                </div>
                <div>
                    <label htmlFor='email' >Email</label>
                    <input type='email' id='email' name='email' size="30"/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type='text' id='password' name='password' size="30"/>
                </div>
                <button type="submit" className="btn btn-signup">Register</button>
            </form>
            
            
        </>
    )
}

export default Signup