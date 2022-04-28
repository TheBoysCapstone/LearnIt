import React, { useState, useEffect, Profiler } from "react";
import axios from "axios";
import Menu from "../Components/menu.js";
import CourseForm from "../Components/course-form.js";
import Categories from "../Components/course-categories.js";
import Main from "../Components/main.js";
import Forum from "../Components/forum.js";

const User = ({ user, setRedirect }) => {
  const components = {
    mainPage: () => <Main user={user} />,
    newCourse: CourseForm,
    joinCourse: Categories,
    forum: Forum,
    userProfile: "doesn't exist yet",
  };

  const [componentName, setComponentName] = useState("mainPage");

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
    if (componentName === "logout") {
      handleLogout();
    }
  }, [componentName]);

  if (componentName === "newCourse") {
    return (
      <>
        <Menu handler={setComponentName} user={user} />
        <CourseForm user={user} />
      </>
    );
  } else if (componentName === "joinCourse") {
    return (
      <>
        <Menu handler={setComponentName} user={user} />
        <Categories user={user} />
      </>
    );
  } else if (componentName === "mainPage") {
    return (
      <>
        <Menu handler={setComponentName} user={user} />
        <Main user={user} />
      </>
    );
  } else if (componentName === "forum") {
    return (
      <>
        <Menu handler={setComponentName} user={user} />
        <Forum user={user} />
      </>
    );
  } else {
    return (
      <>
        <Menu handler={setComponentName} user={user} />
      </>
    );
  }
};

export default User;
