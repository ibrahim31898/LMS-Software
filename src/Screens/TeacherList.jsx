/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import './Home.css';

const TeacherList = () => {
  const [teacherList, setTeacherList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "teachers"));
      const dataArr = [];
      querySnapshot.forEach((doc) => {
        dataArr.push({ id: doc.id, ...doc.data() });
      });
      setTeacherList(dataArr);
    };

    fetchData();
  }, []);

  const handleEdit = async (id) => {
    const newFirstName = prompt("Enter new first name:");
    const newLastName = prompt("Enter new last name:");
    const newEmail = prompt("Enter new email:");
    const newPassword = prompt("Enter new password:");
    const newGender = prompt("Enter new gender (male/female):");

    if (newFirstName && newLastName && newEmail && newPassword && newGender) {
      const docRef = doc(db, "teachers", id);
      await updateDoc(docRef, {
        firstName: newFirstName,
        lastName: newLastName,
        email: newEmail,
        password: newPassword,
        gender: newGender
      });

      setTeacherList(teacherList.map((data) =>
        data.id === id ? { id, firstName: newFirstName, lastName: newLastName, email: newEmail, password: newPassword, gender: newGender } : data
      ));
    }
  };

  const handleDelete = async (id) => {
    const docRef = doc(db, "teachers", id);
    await deleteDoc(docRef);
    setTeacherList(teacherList.filter((data) => data.id !== id));
  };

  return (
    <div className="home-container">
      <h1>Teacher List</h1>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {teacherList.map((data) => (
            <tr key={data.id}>
              <td>{data.firstName}</td>
              <td>{data.lastName}</td>
              <td>{data.email}</td>
              <td>{data.gender}</td>
              <td>
                <button onClick={() => handleEdit(data.id)}>Edit</button>
              </td>
              <td>
                <button onClick={() => handleDelete(data.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="register-button" onClick={() => navigate("/register-teacher")}>Register New Teacher</button>
    </div>
  );
};

export default TeacherList;
