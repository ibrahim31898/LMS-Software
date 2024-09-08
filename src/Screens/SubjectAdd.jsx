/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import './SubjectAdd.css';

const SubjectAdd = () => {
  const [subjectName, setSubjectName] = useState("");
  const [classNumber, setClassNumber] = useState(1);
  const [course, setCourse] = useState("");
  const navigate = useNavigate();

  const handleAddSubject = async (e) => {
    e.preventDefault();
    try {
      const newSubject = { subjectName, classNumber, course };
      await addDoc(collection(db, "subjects"), newSubject);

      // Store in local storage
      const storedSubjects = JSON.parse(localStorage.getItem("subjects")) || [];
      localStorage.setItem("subjects", JSON.stringify([...storedSubjects, newSubject]));

      navigate("/subject-list");
    } catch (error) {
      console.error("Error adding subject: ", error);
    }
  };

  return (
    <div className="subject-add-container">
      <h1>Add New Subject</h1>
      <form onSubmit={handleAddSubject}>
        <input
          type="text"
          placeholder="Enter Your Subject Name"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Enter Your Class"
          value={classNumber}
          onChange={(e) => setClassNumber(e.target.value)}
          min="1"
          required
        />
        <div className="radio-group">
          <h3>Course Select:</h3>
          <label>
            <input
              type="radio"
              name="course"
              value="Accounting"
              onChange={(e) => setCourse(e.target.value)}
              required
            />
            Accounting
          </label>
          <label>
            <input
              type="radio"
              name="course"
              value="General Science"
              onChange={(e) => setCourse(e.target.value)}
            />
            General Science
          </label>
          <label>
            <input
              type="radio"
              name="course"
              value="Pre-Engineering"
              onChange={(e) => setCourse(e.target.value)}
            />
            Pre-Engineering
          </label>
        </div>
        <button type="submit">Add Subject</button>
      </form>
    </div>
  );
};

export default SubjectAdd;
