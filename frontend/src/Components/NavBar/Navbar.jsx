import React, { useEffect, useState } from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom'
import axios from 'axios';
import ViewProfile from '../ViewProfile/ViewProfile'

function Navbar() {

  const [login, setLogin] = useState(false);
  const [open, setOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto'; // Reset scroll on unmount
    };
  }, [open]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api', {
          // Necessary for sending cookies
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.status === 200) {
          setIsAuthenticated(true);
          console.log('User is authenticated:', response.data);
        } else {
          setIsAuthenticated(false);
          console.warn('Unexpected response status:', response.status);
        }
      } catch (error) {
        setIsAuthenticated(false);
        if (error.response) {
          console.error('Authentication failed with server response:', error.response);
        } else {
          console.error('Authentication request failed:', error.message);
        }
      }
    };
  
    checkAuth();
  }, []);
  

  return (
    <div>
      
     <div className="navbar">
     <img src="./Group 6.png" className='logo'/>
     
     <div className="search">
     <input type="text" placeholder="e.g wedding dress"/>
     </div>
     
     <div className="icons">
     <img src="./Group 23.png"/>
    <Link to="/addContent"> <img src="./PlusCircle.png" /></Link>

     {isAuthenticated ?  <img src="./Ellipse 2.png" onClick={() => setOpen(prev => !prev)}/>  :
     <Link to="/login"> <img src="./user.png" className='user'/></Link> 
     }
     
     
    
     </div>
     </div>
     {open && <ViewProfile open={open}  setOpen={setOpen}/>}
    </div>
  )
}

export default Navbar
