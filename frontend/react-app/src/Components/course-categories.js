import React, { useState } from "react";
import Card from "./card.js";
import Courses from "./courses.js";

const categories = [
  {
    category: "Software",
    description: "Anything IT/Software related",
    color: "success",
  },
  {
    category: "Business",
    description: "Business, accounting, marketing",
    color: "info",
  },
  {
    category: "Management",
    description: "Business management, project management, etc.",
    color: "warning",
  },
  {
    category: "Science",
    description: "Physics, Math, Biology and anything else science related",
    color: "danger",
  },
  {
    category: "Engineering",
    description: "Civil, computer, electrical",
    color: "success",
  },
  {
    category: "Other",
    description: "Anything that is not part the other categories",
    color: "danger",
  },
];

const Categories = ({ user }) => {
  const [showCourses, setShowCourses] = useState(false);
  const [category, setCategory] = useState("");
  const handleClick = (category) => {
    setShowCourses(true);
    setCategory(category)
  };

  if (!showCourses) {
    return (
      <>
        <div className="container high-width">
          <h3>Course Categories</h3>
          {categories.map((course, index) => (
            <Card
              key={index}
              title={course.category}
              color={course.color}
              description={course.description}
              handler={()=>handleClick(course.category)}
            />
          ))}
        </div>
      </>
    );
  } else {
    return <Courses user={user} category={category} />;
  }
};

export default Categories;
