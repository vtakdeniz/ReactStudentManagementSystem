import './App.css';
import Header from './components/Header';
import { useState } from 'react';
import Students from './components/Students';
import Lectures from './components/Lectures';
import Teachers from './components/Teachers';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useSelector , useDispatch} from 'react-redux';
import { incrementLectureCount, incrementStudentCount, incrementTeacherCount, zeroLectureCount, zeroStudentCount, zeroTeacherCount } from './actions';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
      async function setHeaderCounters(){
        dispatch(zeroStudentCount())
        dispatch(zeroLectureCount())
        dispatch(zeroTeacherCount())
        let responseT= await fetch('https://localhost:5001/api/Teacher');
        let dataT=await responseT.json();
        dataT.forEach(element => {
          dispatch(incrementTeacherCount())
        });

        let responseS= await fetch('https://localhost:5001/api/Student');
        let dataS=await responseS.json();
        dataS.forEach(element => {
          dispatch(incrementStudentCount())
        });

        let responseL= await fetch('https://localhost:5001/api/Lecture');
        let dataL=await responseL.json();
        dataL.forEach(element => {
          dispatch(incrementLectureCount())
        });
    
      }
      setHeaderCounters();
  }, [])

  const [showStudents, setShowStudents] = useState(true)
  const [showLectures, setShowLectures] = useState(false)
  const [showTeachers, setShowTeachers] = useState(false)

  let counter=useSelector(state=>state.counter);

  const dispatch = useDispatch();

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
