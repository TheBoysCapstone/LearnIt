import React, {useState, useEffect} from 'react'
import axios from 'axios'

const User = ({user, setRedirect, setUser}) =>{
    
    const handleLogout = () => {
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


    const handleCreateCourse = () => {
        setRedirect("create-course")    
    }
    return(
        <>
            <h2>Hi {user.username}. You are logged in</h2>
            <h2>{user.email}</h2>
            <button onClick={handleLogout} className="btn btn-logout">Logout</button>
            <button onClick={handleCreateCourse} className="btn btn-create">Create Course</button>
        </>
    )
}

export default User