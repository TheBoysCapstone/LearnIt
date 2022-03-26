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
            <CourseForm user = {user}/>
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


const CourseForm = ({user}) => {
    

    const[course, setCourse] = useState({title:"", topic: "", content: "", question: ""})
    const [answers, setAnswers] = useState([{answer: "", isCorrect: false}])

    const handleSubmit = () => {
        let payload = course
        payload.answers = answers
        axios({
            method: "POST",
            data:{...payload},
            url:`http://localhost:8080/${user._id}/create-course`,
            withCredentials: true,
        })
        .then((res)=>{
            if(res.data && res.data.success){
                //TODO: implement redirect 
                console.log(res.data)
            }
                

        })
    }

    const handleCourseChange = (e) => {
        const[field, value] = [e.target.name, e.target.value]
        
            setCourse({...course, [field]: value})
            
        //console.log(course)
    }

    const handleAnswersChange = (e, index) => {
        //console.log(e)
        const field = e.target.name
        let temp = answers;
    
        if(field==="isCorrect"){
           let isCorrect = e.target.checked
           temp[index][field] = isCorrect;
        }
        else{
            const value = e.target.value
            temp[index][field] = value;
        }
        
        
        
        setAnswers([...temp])
        console.log(answers)
    }

    const addAnswerField = () => {
        setAnswers([...answers, {answer: "", isCorrect: false}])
    }
    return (
        <div>
            <div>
                <label htmlFor="title">Title</label>
                <input type='text' name='title' value={course.title} onChange={handleCourseChange}/>
            </div>
            <div>
                <label htmlFor="topic">Topic</label>
                <input type='text' name='topic' value={course.topic} onChange={handleCourseChange}/>
            </div>
            <div>
                <label htmlFor="content">Course Content</label>
                <textarea name="content" value={course.content}  onChange={handleCourseChange}></textarea>
            </div>
            <div>
                <label htmlFor="question">Question</label>
                <input type='text' name='question' value={course.question}  onChange={handleCourseChange}/>
            </div>
            
            {
                
                answers.map((answer, index)=> 
                    <div key={index}>
                        <input type='text' name='answer' placeholder='answer' onChange={(e)=>handleAnswersChange(e, index)}/>
                        <input type='checkbox' name='isCorrect'  onChange={(e)=>handleAnswersChange(e, index)}/>
                        <button onClick={addAnswerField}>add</button>
                    </div>)
            }
            <button onClick={handleSubmit} className="btn btn-create">Submit Course</button>
        </div>
        
    )
}

export default User