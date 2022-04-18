import React, { useState, useEffect } from "react";
import axios from "axios";
import Menu from "../Components/menu.js";
import CourseForm from "../Components/course-form.js";
import Categories from "../Components/course-categories.js";
import Courses from "../Components/courses.js";
import Course from "../Components/course.js";
import Main from '../Components/main.js'

const User = ({ user, setRedirect, setUser }) => {
  const [component, setComponent] = useState("Main");
  const [category, setCategory] = useState("");
  const [courseID, setCourseID] = useState("");

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
        <Categories handler={setComponent} setCategory={setCategory} />
      </>
    );
  } else if (component === "courses") {
    return (
      <>
        <Menu handler={setComponent} />
        <Courses
          user={user}
          category={category}
          handler={setComponent}
          setCourseID={setCourseID}
        />
      </>
    );
  } else if (component === "course") {
    return (
      <>
        <Menu handler={setComponent} />
        <Course user={user} courseID={courseID} setComponent={setComponent} />
      </>
    );
  } else if(component==="Main"){
    return (
      <>
        <Menu handler={setComponent} />
        <Main user={user}/>
      </>
    )
  }else{
    return (
      <>
      </>
    )
  }
};

export default User;
