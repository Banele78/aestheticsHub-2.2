import React, { useContext, useEffect, useState } from 'react'
import "./viewProfile.css"
import { Link } from 'react-router-dom'
import axios from 'axios';
import { UserProfileContext } from '../../helper/UserProfileContext';
import {getImageUrl} from '../../helper/axiosConfig';

function ViewProfile({open, setOpen}) {
 
  const { userProfile, loading, error } = useContext(UserProfileContext);

  return (
    <div className="viewP">
    <div className="profile">
       <div className="image">
      <img src="/back.png" alt="back" onClick={() => setOpen(prev => !prev)}/>
      </div>
     <div className="scroll-content">
     
      
      <div  className="account">
        <h1>Your account</h1>
        <div className="profilePic">
        <Link to={`/viewProfile/${userProfile.id}`} onClick={() => setOpen(prev => !prev)}>  <img src={`${getImageUrl}/userProfile/${userProfile.id}/ProfileImage`} alt="profile"/> </Link>
        </div>
      
        <h1>{userProfile.nickName} </h1>
        <h2>{userProfile.artistType} </h2>
        <div className="Stars">
        <img src="/Star.png" alt="profile"/>
        <img src="/Star.png" alt="profile"/>
        <img src="/Star.png" alt="profile"/>
        </div>
        </div>
 
 
       <div className="settings">
        <p>Settings </p>
        <p>Account management  </p>
        <p>Web details </p>
        <p>Privacy and Data </p>
        <p>User permission </p>
        <p>Languages </p>
        <p>Support </p>
        <p>Terms of service </p>
        <p>Log out </p>
        

        </div> 
       
        </div>
    </div>

    </div>
  )
}

export default ViewProfile
