import React, {useState} from 'react'


const Signup = () =>{
    const[signupInfo, setSignupInfo]=useState({username:'', email:'', password:''})
    const[warning, setWarning] = useState("");

    const handleChange = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        setSignupInfo({...signupInfo, [field]: value});
        console.log(signupInfo);
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        setWarning("")
        if(signupInfo.username && signupInfo.email && signupInfo.password){

            //code that will send signUpInfo object to the server goes here

            setSignupInfo({username: '', email:'', password: ''})
        }
        else{
            setWarning("All fields need to be filled out")
        }
    }
    return(
        <>
            <h4>Create an account</h4>
            <form className="form">
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
                <button type="submit" className="btn btn-signup"  onClick={handleSubmit}>Register</button>
            </form>
            
            
        </>
    )
}

export default Signup