/* eslint-disable no-unused-vars */
// src/Screens/AddSyllabus.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import './AddSyllabus.css';

const AddSyllabus = () => {
  const [subjectName, setSubjectName] = useState("");
  const [className, setClassName] = useState("");
  const [course, setCourse] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pdfFile) {
      alert("Please upload a PDF file.");
      return;
    }

    // Save syllabus data to Firestore
    try {
      const syllabusRef = collection(db, "syllabus");
      const docRef = await addDoc(syllabusRef, {
        subjectName,
        className,
        course,
        pdfFileName: pdfFile.name,
        // pdfFile: pdfFile.name, // Handle file uploads separately if needed
      });

      // Save data to local storage
      localStorage.setItem("syllabus", JSON.stringify({
        id: docRef.id,
        subjectName,
        className,
        course,
        pdfFileName: pdfFile.name,
      }));

      alert("Syllabus added successfully!");
      navigate("/syllabus-list");
    } catch (error) {
      console.error("Error adding syllabus: ", error);
    }
  };

  return (
    <div className="add-syllabus-container">
      <h2>Add New Syllabus</h2>
      <form onSubmit={handleSubmit} className="add-syllabus-form">
        <label>
          Subject Name:
          <input
            type="text"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            required
          />
        </label>
        <label>
          Class:
          <input
            type="text"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            required
          />
        </label>
        <label>
          Course:
          <select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            required
          >
            <option value="">Select a course</option>
            <option value="Accounting">Accounting</option>
            <option value="General Science">General Science</option>
            <option value="Pre-Engineering">Pre-Engineering</option>
          </select>
        </label>
        <label>
          Upload PDF:
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            required
          />
        </label>
        <button type="submit">Add Syllabus</button>
      </form>
    </div>
  );
};

export default AddSyllabus;
