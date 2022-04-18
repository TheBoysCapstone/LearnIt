import React, { useState, useEffect } from "react";
import axios from "axios";

const options = [
  {
    name: "Courses Created",
    description: "number of courses created by the user",
    tag: "created",
  },
  {
    name: "Courses Saved",
    description: "number of courses in which the user is enrolled",
    tag: "saved",
  },
  {
    name: "Courses Completed",
    description: "number of courses completed by the user",
    tag: "completed",
  },
];
const Main = ({ user }) => {
  const [numCourses, setNumCourses] = useState({
    created: 0,
    saved: 0,
    completed: 0,
  });

  useEffect(() => {
    const url = `http://localhost:8080/${user._id}/main`;
    axios({
      method: "GET",
      url: url,
      withCredentials: true,
    }).then((res) => {
      if (res.data && res.data.success) {
        console.log(res.data);
        setNumCourses({
          created: res.data.created,
          saved: res.data.saved,
          completed: res.data.completed,
        });
      }
    });
  }, []);

  return (
    <>
      <div className="main-options-container">
        {options.map((option, index) => (
          <div key={index} className="main-options high-width">
            <div>
              <p>
                <strong>{option.name}</strong>
              </p>
              <p>
                <small>{option.description}</small>
              </p>
            </div>
            <div className="course-number">{numCourses[option.tag]}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Main;
