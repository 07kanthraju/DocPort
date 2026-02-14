import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <button onClick={() => setIsOpen(!isOpen)}>☰</button>

      <ul>
        <li>
          <NavLink to="/overview">Overview</NavLink>
        </li>

        <li>
          <NavLink to="/Profile">Profile</NavLink>
        </li>

        <li>
          <NavLink to="/Availabality">Availabality</NavLink>
        </li>

        <li>
          <NavLink to="/Appointments">Appointments</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
