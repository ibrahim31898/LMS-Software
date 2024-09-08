import { Route, Routes } from "react-router-dom";
import Home from "./Screens/Home";
import Signup from "./Screens/Signup";
import Login from "./Screens/Login";
import StudentRegistration from "./Screens/StudentRegistration";
import TeacherRegistration from "./Screens/TeacherRegistration";
import TeacherList from "./Screens/TeacherList";
import SubjectAdd from "./Screens/SubjectAdd";
import SubjectList from "./Screens/SubjectList";
import Sidebar from "./Screens/Sidebar";
import AddSyllabus from "./Screens/AddSyllabus";
import SyllabusList from "./Screens/SyllabusList";
import './App.css';
import { useState, useEffect } from "react";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div className="app">
      {isAuthenticated && <Sidebar setIsAuthenticated={setIsAuthenticated} />} {/* Pass setIsAuthenticated */}
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          </>
        ) : (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<StudentRegistration />} />
            <Route path="/teacher-list" element={<TeacherList />} />
            <Route path="/teacher-register" element={<TeacherRegistration />} />
            <Route path="/subject-add" element={<SubjectAdd />} />
            <Route path="/subject-list" element={<SubjectList />} />
            <Route path="/add-syllabus" element={<AddSyllabus />} />
            <Route path="/syllabus-list" element={<SyllabusList />} />
          </>
        )}
      </Routes>
    </div>
  );
};

export default App;
