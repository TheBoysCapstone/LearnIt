import React from "react";
import Card from "./card.js";

const categories = [
  {
    category: "IT/Software",
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

const Categories = ({ handler }) => {
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
          />
        ))}
      </div>
    </>
  );
};

export default Categories;
