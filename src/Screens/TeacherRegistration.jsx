import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import './StudentRegistration.css';

const TeacherRegistration = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "teachers"), {
        firstName,
        lastName,
        email,
        password,
        gender
      });
      navigate("/teachers");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="registration-container">
      <h1>Register New Teacher</h1>
      <form onSubmit={handleRegistration}>
        <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <input type="text" placeholder="Gender (male/female)" value={gender} onChange={(e) => setGender(e.target.value)} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default TeacherRegistration;
