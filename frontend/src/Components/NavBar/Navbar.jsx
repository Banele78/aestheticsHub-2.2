import React, { useContext, useEffect, useState } from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom'
import axios from 'axios';
import ViewProfile from '../ViewProfile/ViewProfile'

import {axiosInstance, getImageUrl} from '../../helper/axiosConfig';
import { UserContext } from '../../helper/UserContext';
import { UserProfileContext } from '../../helper/UserProfileContext';

function Navbar() {

  const [login, setLogin] = useState(false);
  const [open, setOpen] = useState(false);
 
  const { userProfile, loading, error, isAuthenticated } = useContext(UserProfileContext);

  

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto'; // Reset scroll on unmount
    };
  }, [open]);

  
  return (
    <div className='str'>
      
     <div className="navbar">
   <Link to="/">  <img src="/Group 6.png" className='logo mobile'/>  </Link>
     <div className="search">
     <input type="text" placeholder="e.g wedding dress"/>
     </div>
     <div className="icons mobile">
     <img src="/Group 23.png"/>
    <Link to="/addContent"> <img src="/PlusCircle.png" /></Link>
     {isAuthenticated ?  
              <img src={`${getImageUrl}/userProfile/${1}/ProfileImage`} alt="profile" 
              onClick={() => setOpen(prev => !prev)}
              className="user"/>
            
       :
     <Link to="/login"> <img src="/user.png" className='user'/></Link> 
     }
     </div>

     

     <div className="bottom-bar">
   
  
   <Link to="/"><img src="/Group 6.png" className="logo" /></Link> 
      <img src="/Group 23.png" />
      <Link to="/addContent"><img src="/PlusCircle.png" /></Link>
      {isAuthenticated ? (
        <img src={`${getImageUrl}/userProfile/${userProfile.id}/ProfileImage`} alt="profile" 
        onClick={() => setOpen(prev => !prev)}
        className="user"/>
      ) : (
        <Link to="/login">
          <img src="/user.png" className="user" />
        </Link>
      )}
   
  </div>
     </div>



     {open && <ViewProfile open={open}  setOpen={setOpen}/>}
    </div>
  )
}

export default Navbar
