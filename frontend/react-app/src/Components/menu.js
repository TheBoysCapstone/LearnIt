import React, {useState} from 'react'

const Menu = ({ handler, setCourseMode}) => {
    const menuItems = [
      { title: "Main", subtitle: "Your personal page", id: "mainPage"},
      { title: "New Course", subtitle: "Teach others", id: "newCourse"},
      { title: "Join Course", subtitle: "Start learning", id: "joinCourse" },
      { title: "Forum", subtitle: "Talk about it", id: "forum" },
      { title: "Profile", subtitle: "Edit personal info", id: "userProfile" },
      { title: "Logout", subtitle: "Take a break", id: "logout" },
    ];
  
    const [activeId, setActiveId] = useState(0);
    const handleClick = (e, id) => {
      e.stopPropagation();
  
      setActiveId(id);
  
      handler(e.target.getAttribute("data-location"));
    };
    return (
      <div className="sidenav">
        <ul>
          {menuItems.map((value, index) => (
            <div key={index} onClick={(e) => handleClick(e, index)}>
              <li
                className={index === activeId ? "active" : ""}
                data-location={value.id}
              >
                <strong>{value.title}</strong>
                <small>{value.subtitle}</small>
              </li>
            </div>
          ))}
        </ul>
      </div>
    );
  };

export default Menu