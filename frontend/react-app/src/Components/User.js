import React, {useState, useEffect} from 'react'
import axios from 'axios'

const User = ({user}) =>{
    
    //function that fires when the component loads
    useState(()=>{

    },[])
    return(
        <>
            <h2>Hi {user.username}. You are logged in</h2>
        </>
    )
}

export default User