/* eslint-disable no-unused-vars */
// src/Screens/SyllabusList.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import './SyllabusList.css';

const SyllabusList = () => {
  const [syllabi, setSyllabi] = useState([]);

  useEffect(() => {
    const fetchSyllabi = async () => {
      try {
        const syllabusRef = collection(db, "syllabus");
        const snapshot = await getDocs(syllabusRef);
        const syllabiList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setSyllabi(syllabiList);
      } catch (error) {
        console.error("Error fetching syllabi: ", error);
      }
    };

    fetchSyllabi();
  }, []);

  return (
    <div className="syllabus-list-container">
      <h2>Syllabus List</h2>
      <table className="syllabus-list-table">
        <thead>
          <tr>
            <th>Subject Name</th>
            <th>Class</th>
            <th>Course</th>
            <th>PDF</th>
          </tr>
        </thead>
        <tbody>
          {syllabi.map(syllabus => (
            <tr key={syllabus.id}>
              <td>{syllabus.subjectName}</td>
              <td>{syllabus.className}</td>
              <td>{syllabus.course}</td>
              <td>
                <a
                  href={`/path/to/pdf/${syllabus.pdfFileName}`} // Adjust the path based on your storage solution
                  download
                >
                  Download
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/add-syllabus" className="add-syllabus-button">Add New Syllabus</Link>
    </div>
  );
};

export default SyllabusList;
