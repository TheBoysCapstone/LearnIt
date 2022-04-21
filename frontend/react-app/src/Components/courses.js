import React, { useState, useEffect } from "react";

import axios from "axios";
import Course from "./course";
import CourseModes from "../Configs/courseModes"

const Courses = ({ user, category }) => {
  const [courses, setCourses] = useState([]);
  const [showCourse, setShowCourse] = useState(false);
  const [courseID, setCourseID] = useState("");
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    let url = `http://localhost:8080/${user._id}/get-courses/${category}`;
    axios({
      method: "GET",
      url: url,
      withCredentials: true,
    }).then((res) => {
      if (res.data && res.data.success) {
        if (res.data.course.length <= 0) {
          setMessage("No courses exist in this category");
        } else {
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
              className="green-btn"
              onClick={(e) => clickHandler(e, index)}
            >
              Start Course
            </button>
          </div>
        ))}
      </>
    );
  } else if (showCourse) {
    return <Course user={user} courseID={courseID}/>;
  } else {
    return <h3>{message}</h3>;
  }
};

export default Courses;
