import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <button onClick={() => setIsOpen(!isOpen)}>☰</button>

      <ul>
        <li>
          <NavLink to="/Overview">Overview</NavLink>
        </li>

        <li>
          <NavLink to="/Profile">Profile</NavLink>
        </li>

        <li>
          <NavLink to="/Availability">Availability</NavLink>
        </li>

        <li>
          <NavLink to="/Appointments">Appointments</NavLink>
        </li>
        <li>
          <NavLink to="/Transaction">Transaction</NavLink>
        </li>
        <li>
          <NavLink to="/Analytics">Analytics</NavLink>
        </li>
        <li>
          <NavLink to="/Settings">Settings</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
