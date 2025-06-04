import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Components/Home'
import Teacher from './Components/Teacher'
import Student from './Components/Student'
import Classrooms from './Components/Classrooms'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/classrooms" element={<Classrooms/>} />
        <Route path="/teachers" element={<Teacher/>} />
        <Route path="/students" element={<Student/>} /> 
      </Routes>
    </Router>
  )
}

export default App
