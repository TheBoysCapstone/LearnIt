import React, {useState, useEffect} from 'react'
import axios from 'axios'

const User = ({user, setRedirect, setUser}) =>{
    const [showCourseForm, setShowCourseForm] = useState(false)
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

    const handleCreateCourse = ()=>{
        setShowCourseForm(true)
    }

    if(showCourseForm){
        return(
            <CourseForm />
        )
    }
    else{
        return(
            <>
                <h2>Hi {user.username}. You are logged in</h2>
                <h2>{user.email}</h2>
                <button onClick={handleLogout} className="btn btn-logout">Logout</button>
                <button onClick={handleCreateCourse} className="btn btn-create">Create Course</button>
            </>
    
    )
}
}


const CourseForm = () => {
    const[question, setQuestion] = useState("")
    const[answers, setAnswers] = useState([{content: "", isCorrect: false}])

    const handleSubmit = () => {

    }

    const addAnswerField = () => {
        setAnswers([...answers, {content: "", isCorrect: false}])
    }
    return (
        <div>
            <div>
                <label htmlFor="title">Title</label>
                <input type='text' name='title'/>
            </div>
            <div>
                <label htmlFor="topic">Topic</label>
                <input type='text' name='topic'/>
            </div>
            <div>
                <label htmlFor="content">Course Content</label>
                <textarea name="content" ></textarea>
            </div>
            <div>
                <label htmlFor="question">Question</label>
                <input type='text' name='question'/>
            </div>
            
            {
                
                answers.map((answer, index)=> 
                    <div>
                        <input type='text' name='answer' placeholder='answer'/>
                        <input type='checkbox' name='correct'/>
                        <button onClick={addAnswerField}>add</button>
                    </div>)
            }
            <button onClick={handleSubmit} className="btn btn-create">Submit Course</button>
        </div>
        
    )
}

export default User