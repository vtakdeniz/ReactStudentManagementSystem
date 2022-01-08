import './App.css';
import Header from './components/Header';
import { useState } from 'react';
import Students from './components/Students';
import Lectures from './components/Lectures';
import Teachers from './components/Teachers';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

function App() {

  const [showStudents, setShowStudents] = useState(true)
  const [showLectures, setShowLectures] = useState(false)
  const [showTeachers, setShowTeachers] = useState(false)

  function onStudentClick(){
    setShowStudents(true);
    setShowLectures(false);
    setShowTeachers(false);
  }

  function onLectureClick(){
    setShowStudents(false);
    setShowLectures(true);
    setShowTeachers(false);
  }

  function onTeacherClick(){
    setShowStudents(false);
    setShowLectures(false);
    setShowTeachers(true);
  }

  return (
    <div className="container">
      <Router>
          <Header title="Student management system" 
              onStudentClick={onStudentClick} onTeacherClick={onTeacherClick}
              onLectureClick={onLectureClick}/>
          <Routes>
            <Route path="/students/*" element={
              <Students/>  
            }/>

            <Route path="/lectures/*" element={
              <Lectures/>  
            }/>

            <Route path="/teachers/*" element={
              <Teachers/>  
            }/>

          </Routes>
      </Router>
      
    </div>
  );
}

export default App;
