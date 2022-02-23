import React, {useState, useEffect} from 'react'
import axios from 'axios'

const User = ({user, setRedirect, setUser}) =>{
    
    const handleSubmit = () => {
        axios({
            method: "POST",
            data:{},
            url:`http://localhost:8080/${user._id}/logout`,
            withCredentials: true,
        })
        .then((res)=>{
            if(res.data && res.data.success){
                setRedirect("login")
            }
                

        })
    }
    return(
        <>
            <h2>Hi {user.username}. You are logged in</h2>
            <h2>{user.email}</h2>
            <button onClick={handleSubmit} className="btn btn-logout">Logout</button>
        </>
    )
}

export default User