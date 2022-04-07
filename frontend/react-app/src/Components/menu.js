import React, {useState} from 'react'

const Menu = ({ handler }) => {
    const menuItems = [
      { title: "Main", subtitle: "Your personal page" },
      { title: "New Course", subtitle: "Teach others" },
      { title: "Join Course", subtitle: "Start learning" },
      { title: "Forum", subtitle: "Talk about it" },
      { title: "Profile", subtitle: "Edit personal info" },
      { title: "Logout", subtitle: "Take a break" },
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
                data-location={value.title}
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