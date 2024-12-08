import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css'
import Navbar from './Components/NavBar/Navbar'
import Content from './Components/Content/Content'
import Login from './Components/Login/Login';
import SignUp from './Components/Login/SignUp';
import AddContent from './Components/Content/AddContent/AddContent';
import Editprofile from './Components/ViewProfile/MyContent/Edit profile/Editprofile';

function App() {

  return (
    <Router>
      
       <Routes>
      
      <Route path="/" element={ <Content/>}/>
      <Route path="/login"  element={<Login/>}/>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/addContent" element={<AddContent/>} />
      <Route path="/editProfile" element={<Editprofile/>} />
     
       </Routes>
     
    
    
    </Router>
    
  )
}

export default App
