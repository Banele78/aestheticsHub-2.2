import React, { useEffect, useState } from 'react'
import "./viewProfile.css"
import { Link } from 'react-router-dom'
import axios from 'axios';

function ViewProfile({open, setOpen}) {

  const [content, setContent] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/getUserProfile")
      .then((response) => {
        setContent(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <div className="viewP">
    <div className="profile">
    <div className="scroll-content">
      <div className="image">
      <img src="./back.png" alt="back" onClick={() => setOpen(prev => !prev)}/>
      </div>
      
      <div  className="account">
        <h1>Your account</h1>
        <div className="profilePic">
        <Link to="/editProfile"> <img src={`http://localhost:8080/api/userProfile/${content.id}/ProfileImage`} alt="profile"/> </Link>
        </div>
      
        <h1>{content.nickName} </h1>
        <h2>{content.artistType} </h2>
        <div className="Stars">
        <img src="./Star.png" alt="profile"/>
        <img src="./Star.png" alt="profile"/>
        <img src="./Star.png" alt="profile"/>
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
