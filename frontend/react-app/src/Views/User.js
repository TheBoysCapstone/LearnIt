import React, { useState, useEffect } from "react";
import axios from "axios";
import Menu from "../Components/menu.js";
import CourseForm from "../Components/course-form.js";
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

export default User;
