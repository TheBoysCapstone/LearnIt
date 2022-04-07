import React, { useState, useEffect } from "react";
import axios from "axios";
import Categories from "../Components/course-categories.js";

const User = ({ user, setRedirect, setUser }) => {
  const [component, setComponent] = useState("");
  const handleLogout = () => {
    axios({
      method: "POST",
      data: {},
      url: `http://localhost:8080/${user._id}/logout`,
      withCredentials: true,
    }).then((res) => {
      if (res.data && res.data.success) {
        setRedirect("login");
      }
    });
  };

  useEffect(() => {
    if (component === "Logout") {
      handleLogout();
    }
  }, [component]);

  if (component === "New Course") {
    console.log("Hello");
    return (
      <>
        <Menu handler={setComponent} />
        <CourseForm user={user} />
      </>
    );
  } else if (component === "Join Course") {
    return (
      <>
        <Menu handler={setComponent} />
        <Categories handler={setComponent} />
      </>
    );
  } else {
    return (
      <>
        <Menu handler={setComponent} />
      </>
    );
  }
};

const CourseForm = ({ user }) => {
  const [course, setCourse] = useState({
    title: "",
    topic: "",
    content: "",
    question: "",
  });
  const [answers, setAnswers] = useState([{ answer: "", isCorrect: false }]);

  const handleSubmit = () => {
    let payload = course;
    payload.answers = answers;
    console.log(payload);
    axios({
      method: "POST",
      data: { ...payload },
      url: `http://localhost:8080/${user._id}/create-course`,
      withCredentials: true,
    }).then((res) => {
      if (res.data && res.data.success) {
        //TODO: implement redirect
        console.log(res.data);
      }
    });
  };

  const handleCourseChange = (e) => {
    const [field, value] = [e.target.name, e.target.value];

    setCourse({ ...course, [field]: value });

    console.log(course);
  };

  const handleAnswersChange = (e, index) => {
    //console.log(e)
    const field = e.target.name;
    let temp = answers;

    if (field === "isCorrect") {
      let isCorrect = e.target.checked;
      temp[index][field] = isCorrect;
    } else {
      const value = e.target.value;
      temp[index][field] = value;
    }

    setAnswers([...temp]);
    console.log(answers);
  };

  const addAnswerField = () => {
    setAnswers([...answers, { answer: "", isCorrect: false }]);
  };

  const removeAnswerField = (e, index) => {
    let ansArr = answers;
    ansArr.splice(index, 1);
    setAnswers([...ansArr]);
    console.log(answers);
  };
  return (
    <div className="container medium-width">
      <h3>Create a course</h3>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          value={course.title}
          onChange={handleCourseChange}
        />
      </div>
      <div>
        <div>
          <label htmlFor="topics">Topics</label>
          <select name="topics" onChange={handleCourseChange}>
            <option value="default">Choose topic</option>
            <option value="it/software">IT/Software</option>
            <option value="business">Business</option>
            <option value="management">Management</option>
            <option value="science">Science</option>
            <option value="engineering">Engineering</option>
            <option value="other">other</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="content">Course Content</label>
        <textarea
          name="content"
          value={course.content}
          onChange={handleCourseChange}
        ></textarea>
      </div>
      <div>
        <label htmlFor="question">Question</label>
        <input
          type="text"
          name="question"
          value={course.question}
          onChange={handleCourseChange}
        />
      </div>

      {answers.map((answer, index) => (
        <div key={index} className="answer-form">
          <input
            type="text"
            name="answer"
            placeholder="answer"
            value={answers[index].answer}
            onChange={(e) => handleAnswersChange(e, index)}
          />
          <input
            type="checkbox"
            name="isCorrect"
            onChange={(e) => handleAnswersChange(e, index)}
          />
          <button
            className="red-btn"
            onClick={(e) => removeAnswerField(e, index)}
          >
            remove
          </button>
        </div>
      ))}
      <button className="blue-btn" onClick={addAnswerField}>
        Add Question
      </button>
      <button className="green-btn" onClick={handleSubmit}>
        Submit Course
      </button>
    </div>
  );
};

const Menu = ({ handler }) => {
  const menuItems = [
    { title: "Main", subtitle: "Your personal page" },
    { title: "New Course", subtitle: "Teach others" },
    { title: "Join Course", subtitle: "Start learning" },
    { title: "Forum", subtitle: "Talk about it" },
    { title: "Profile", subtitle: "Edit personal info" },
    { title: "Logout", subtitle: "Take a break" },
  ];

  const [activeId, setActiveId] = useState(0);
  const handleClick = (e, id) => {
    e.stopPropagation();

    setActiveId(id);

    handler(e.target.getAttribute("data-location"));
  };
  return (
    <div className="sidenav">
      <ul>
        {menuItems.map((value, index) => (
          <div key={index} onClick={(e) => handleClick(e, index)}>
            <li
              className={index === activeId ? "active" : ""}
              data-location={value.title}
            >
              <strong>{value.title}</strong>
              <small>{value.subtitle}</small>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default User;
