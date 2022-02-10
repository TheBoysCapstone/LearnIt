import React from 'react'

const Login = () =>{
    return(
        <>
            <h4>Login to continue</h4>
            <form className="form">
                
                <div>
                    <label htmlFor="username">Username</label>
                    <input type='text' id='username' name='username' size="30"/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type='text' id='password' name='password' size="30"/>
                </div>
                <button type="submit" className="btn btn-login">Login</button>
            </form>
            
            
        </>
    )
}

export default Login