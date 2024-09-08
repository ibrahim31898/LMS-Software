/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import './Login.css';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Check if user exists in Firestore
      const querySnapshot = await getDocs(collection(db, "users"));
      let userFound = false;
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.email === email) {
          userFound = true;
          return;
        }
      });

      // Check against Firebase Auth
      await signInWithEmailAndPassword(auth, email, password);

      // Check in LocalStorage
      const localUser = JSON.parse(localStorage.getItem("user"));
      if (localUser && localUser.email === email) {
        setIsAuthenticated(true);
        navigate("/home");
      } else if (!userFound) {
        throw new Error("User not found");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a href="/">Sign Up</a></p>
    </div>
  );
};

export default Login;
