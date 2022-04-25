import React, { useState, useEffect } from "react";
import axios from "axios";

const MyCourses = ({ user }) => {
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = () => {
    axios({
      method: "GET",
      url: `http://localhost:8080/${user._id}/get-created-courses`,
      withCredentials: true,
    }).then((res) => {
      if (res.data && res.data.success) {
          console.log("Hello ", res.data.success)
        if (res.data.courses.length <= 0) {
          setCourses([]);
          setMessage("No courses exist in this category");
        } else {
          console.log(res.data.courses);
          setCourses([...res.data.courses]);
        }
      } else {
        setMessage("Could not load courses... Please try again");
      }
    });
  };

  const handleConfirm = (id) => {
    console.log(user._id);
    let url = `http://localhost:8080/${user._id}/delete-course`;
    axios({
      method: "POST",
      url: url,
      data: { id: id },
      withCredentials: true,
    }).then((res) => {
      if (res.data && res.data.success) {
        loadCourses();
      }
    });
  };

  if (courses.length !== 0) {
    return (
      <>
        <div className="medium-width my-courses-container">
          <h3>My Courses</h3>
          {courses.map((course, index) => (
            <div key={index} className="my-course-container">
              <div className="my-course-desc">
                <div>
                  <strong>{course.title}</strong>
                </div>
                <div>
                  <small>
                    Created at: {new Date(course.createdAt).toDateString()}
                  </small>
                </div>
              </div>
              <div>
                <ButtonGroup courseID={course._id} handler={handleConfirm} />
              </div>
            </div>
          ))}
        </div>
      </>
    );
  } else {
    return (
      <>
        <h3>{message}</h3>
      </>
    );
  }
};
const ButtonGroup = ({ courseID, handler }) => {
  const [toggleButtons, setToggleButtons] = useState(false);

  const handleConfirm = () => {
    handler(courseID);
    setToggleButtons(false);
  };
  const handleDelete = () => {
    setToggleButtons(true);
  };

  const handleCancel = () => {
    setToggleButtons(false);
  };
  return (
    <>
      {toggleButtons ? (
        <div className="my-course-btn-group">
          <button className="success" onClick={() => handleConfirm(courseID)}>
            Confirm
          </button>
          <button className="warning" onClick={() => handleCancel()}>
            Cancel
          </button>
        </div>
      ) : (
        <button className="danger" onClick={() => handleDelete()}>
          Delete
        </button>
      )}
    </>
  );
};
export default MyCourses;
