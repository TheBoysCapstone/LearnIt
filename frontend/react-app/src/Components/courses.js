import React, { useState, useEffect } from "react";
import axios from "axios";

const Courses = ({ user, category, handler, setCourseID }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    let url = `http://localhost:8080/${user._id}/get-courses/${category}`;
    axios({
      method: "GET",
      url: url,
      withCredentials: true,
    }).then((res) => {
      if (res.data && res.data.success) {
        setCourses(res.data.course);
      }
    });
  }, []);

  const clickHandler = (e, index) => {
    let courseID = courses[index]._id;
    handler("course");
    setCourseID(courseID);
  };

  if (courses.length > 0) {
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
              <p>{`Created at: ${course.createdAt}`}</p>
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
  } else {
    return <h3>There are no courses here yet</h3>;
  }
};

export default Courses;
