import React, { useContext, useEffect, useState } from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom'
import axios from 'axios';
import ViewProfile from '../ViewProfile/ViewProfile'
import { UserProfileContext } from '../../helper/UserProfileContext';

function Navbar() {

  const [login, setLogin] = useState(false);
  const [open, setOpen] = useState(false);
 

  const { userProfile, loading, error,isAuthenticated } = useContext(UserProfileContext);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto'; // Reset scroll on unmount
    };
  }, [open]);

  
  return (
    <div>
      
     <div className="navbar">
     <img src="./Group 6.png" className='logo mobile'/>  
     <div className="search">
     <input type="text" placeholder="e.g wedding dress"/>
     </div>
     <div className="icons mobile">
     <img src="./Group 23.png"/>
    <Link to="/addContent"> <img src="./PlusCircle.png" /></Link>
     {isAuthenticated ?  
              <img src={`http://localhost:8080/api/userProfile/${userProfile.id}/ProfileImage`} alt="profile" 
              onClick={() => setOpen(prev => !prev)}
              className="user"/>
            
       :
     <Link to="/login"> <img src="./user.png" className='user'/></Link> 
     }
     </div>

     

     <div className="bottom-bar">
   
  
    <img src="./Group 6.png" className="logo" />
      <img src="./Group 23.png" />
      <Link to="/addContent"><img src="./PlusCircle.png" /></Link>
      {isAuthenticated ? (
        <img src={`http://localhost:8080/api/userProfile/${userProfile.id}/ProfileImage`} alt="profile" 
        onClick={() => setOpen(prev => !prev)}
        className="user"/>
      ) : (
        <Link to="/login">
          <img src="./user.png" className="user" />
        </Link>
      )}
   
  </div>
     </div>



     {open && <ViewProfile open={open}  setOpen={setOpen}/>}
    </div>
  )
}

export default Navbar
