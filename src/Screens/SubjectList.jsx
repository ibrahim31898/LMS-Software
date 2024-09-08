/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import './SubjectList.css';

const SubjectList = () => {
  const [subjectList, setSubjectList] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      const querySnapshot = await getDocs(collection(db, "subjects"));
      const subjects = [];
      querySnapshot.forEach((doc) => {
        subjects.push({ id: doc.id, ...doc.data() });
      });
      setSubjectList(subjects);
    };
    fetchSubjects();
  }, []);

  const handleEdit = async (id) => {
    const newSubjectName = prompt("Enter new subject name:");
    const newClass = prompt("Enter new class:");
    const newCourse = prompt("Enter new course (Accounting/General Science/Pre-Engineering):");

    if (newSubjectName && newClass && newCourse) {
      const docRef = doc(db, "subjects", id);
      await updateDoc(docRef, {
        subjectName: newSubjectName,
        classNumber: newClass,
        course: newCourse
      });

      setSubjectList(subjectList.map((subject) =>
        subject.id === id ? { id, subjectName: newSubjectName, classNumber: newClass, course: newCourse } : subject
      ));
    }
  };

  const handleDelete = async (id) => {
    const docRef = doc(db, "subjects", id);
    await deleteDoc(docRef);
    setSubjectList(subjectList.filter((subject) => subject.id !== id));
  };

  return (
    <div className="subject-list-container">
      <h1>Subject List</h1>
      <table>
        <thead>
          <tr>
            <th>Subject Name</th>
            <th>Class</th>
            <th>Course</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {subjectList.map((subject) => (
            <tr key={subject.id}>
              <td>{subject.subjectName}</td>
              <td>{subject.classNumber}</td>
              <td>{subject.course}</td>
              <td>
                <button onClick={() => handleEdit(subject.id)}>Edit</button>
              </td>
              <td>
                <button onClick={() => handleDelete(subject.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubjectList;
