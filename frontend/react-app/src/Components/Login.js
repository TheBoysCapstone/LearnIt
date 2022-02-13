import React, {useState} from 'react'

const Login = () =>{
    const[loginInfo, setLoginInfo] = useState({username:'', password: ''})
    const[warning, setWarning] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setWarning('');

        if(loginInfo.username && loginInfo.password){
            //code that sends loginInfo to the server goes here

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
        <>
            <h4>Login to continue</h4>
            <form className="form">
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
                <button type="submit" className="btn btn-login" onClick={handleSubmit}>Login</button>
            </form>
            
            
        </>
    )
}

export default Login