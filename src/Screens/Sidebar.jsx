import React from "react";
import { NavLink } from "react-router-dom";
import './Sidebar.css';
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

const Sidebar = ({ setIsAuthenticated }) => {
  const handleLogout = async () => {
    try {
      // Sign out from Firebase Authentication
      await signOut(auth);
      
      // Remove user data from localStorage
      localStorage.removeItem("user");
      
      // Update state to reflect user is not authenticated
      setIsAuthenticated(false);
      
      // Redirect to the signup/login page
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <div className="sidebar">
      <h2>LMS System (Learning Management System)</h2>
      <NavLink to="/home">Student List</NavLink>
      <NavLink to="/register">Register Student</NavLink>
      <NavLink to="/teacher-register">Register Teacher</NavLink>
      <NavLink to="/teacher-list">Teacher List</NavLink>
      <NavLink to="/subject-add">Add Subject</NavLink>
      <NavLink to="/subject-list">Subject List</NavLink>
      <NavLink to="/add-syllabus">Add Syllabus</NavLink>
      <NavLink to="/syllabus-list">Syllabus List</NavLink>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Sidebar;
