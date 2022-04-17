import React, { useState } from "react";

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
    name: "Courses Created",
    description: "number of courses completed by the user",
    tag: "completed",
  },
];
const Main = () => {
  const [numCourses, setNumCourses] = useState({
    created: 0,
    saved: 0,
    completed: 0,
  });

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
