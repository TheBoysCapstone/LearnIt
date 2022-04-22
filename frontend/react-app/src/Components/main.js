import React, { useState, useEffect } from "react";
import axios from "axios";
import Courses from "./courses";

const Main = ({ user }) => {
  const options = [
    {
      name: "Courses Created",
      description: "number of courses created by the user",
      tag: "created",
      url: "/get-created-courses",
    },
    {
      name: "Courses Saved",
      description: "number of courses in which the user is enrolled",
      tag: "saved",
      url: "/get-saved-courses",
    },
    {
      name: "Courses Completed",
      description: "number of courses completed by the user",
      tag: "completed",
      url: "/get-completed-courses",
    },
  ];
  const [numCourses, setNumCourses] = useState({
    created: 0,
    saved: 0,
    completed: 0,
  });
  const [showCourses, setShowCourses] = useState(false);
  const [uri, setUri] = useState("");

  useEffect(() => {
    const url = `http://localhost:8080/${user._id}/main`;
    axios({
      method: "GET",
      url: url,
      withCredentials: true,
    }).then((res) => {
      if (res.data && res.data.success) {
        setNumCourses({
          created: res.data.created,
          saved: res.data.saved,
          completed: res.data.completed,
        });
      }
    });
  }, []);

  const handleClick = (value) => {
    setUri(value.url);
    setShowCourses(true);
  };

  const handleGoBack = () => {
    setShowCourses(false);
  };

  if (!showCourses) {
    return (
      <>
        <div className="main-options-container">
          {options.map((option, index) => (
            <div
              key={index}
              className="main-options high-width"
              onClick={() => {
                handleClick(option);
              }}
            >
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
  } else {
    return (
      <>
        <Courses
          user={user}
          query={`http://localhost:8080/${user._id}${uri}`}
        />
      </>
    );
  }
};

export default Main;
