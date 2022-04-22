import React, { useState, useEffect } from "react";

import axios from "axios";
import Course from "./course";

const courseSettings = {
  saved: { color: "info", buttonText: "Continue course" },
  completed: { color: "danger", buttonText: "Retake course" },
  all: { color: "success", buttonText: "Start course" },
};

const Courses = ({ user, query }) => {
  const [courses, setCourses] = useState([]);
  const [showCourse, setShowCourse] = useState(false);
  const [courseID, setCourseID] = useState("");
  const [message, setMessage] = useState("Loading...");

  console.log(query)
  useEffect(() => {
    axios({
      method: "GET",
      url: query,
      withCredentials: true,
    }).then((res) => {
      if (res.data && res.data.success) {
        if (res.data.course.length <= 0) {
          setMessage("No courses exist in this category");
        } else {
          console.log(res.data.course);
          setCourses(res.data.course);
        }
      } else {
        setMessage("Could not load courses... Please try again");
      }
    });
  }, []);

  const clickHandler = (e, index) => {
    let courseID = courses[index]._id;
    setShowCourse(true);
    setCourseID(courseID);
  };

  if (courses.length > 0 && !showCourse) {
    return (
      <>
        <h3>Courses</h3>
        {courses.map((course, index) => (
          <div className="card other" key={index}>
            <h1>{course.title}</h1>
            <div>
              <p>{`Created by: ${course.userID.username}`}</p>
            </div>
            <div>
              <p>{`Created at: ${new Date(
                course.createdAt
              ).toDateString()}`}</p>
            </div>

            <button
              className={courseSettings[course.status].color}
              onClick={(e) => clickHandler(e, index)}
            >
              {courseSettings[course.status].buttonText}
            </button>
          </div>
        ))}
      </>
    );
  } else if (showCourse) {
    return <Course user={user} courseID={courseID} />;
  } else {
    return <h3>{message}</h3>;
  }
};

export default Courses;
