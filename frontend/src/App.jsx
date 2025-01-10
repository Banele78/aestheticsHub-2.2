import { useContext, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useLocation } from 'react-router-dom';
import './App.css'
import Navbar from './Components/NavBar/Navbar'
import Content from './Components/Content/Content'
import Login from './Components/Login/Login';
import SignUp from './Components/Login/SignUp';
import AddContent from './Components/Content/AddContent/AddContent';
import EditProfile from './Components/ViewProfile/MyContent/Edit profile/Editprofile';
import { UserProfileContext, UserProfileProvider } from './helper/UserProfileContext';
import { UserProvider } from './helper/UserContext';
import ProtectedRoute from './ProtectedRoute';
import MyContent from './Components/ViewProfile/MyContent/Mycontent';
import ViewProfile from './Components/ViewProfile/ViewProfile';
import ViewUserProfile from './Components/Content/UserProfile/ViewUserProfile';


function App() {
  return (
    <Router>
      <UserProvider>
        <UserProfileProvider>
          <Layout />
        </UserProfileProvider>
      </UserProvider>
    </Router>
  );
}

function Layout() {
  const location = useLocation();
  
  // Define routes to exclude Navbar
  const noNavbarRoutes = ['/login', '/signup', '/addContent', '/editProfile'];

  return (
    <>
      {!noNavbarRoutes.includes(location.pathname) && <Navbar />}
      <div className='App'>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        
        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Content />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addContent"
          element={
            <ProtectedRoute>
              <AddContent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editProfile"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />
       

<Route
          path="/viewProfile/:userProfileId"
          element={
            <ProtectedRoute>
              <ViewUserProfile />
            </ProtectedRoute>
          }
        />
        
      </Routes>
      </div>
    </>
  );
}

export default App;