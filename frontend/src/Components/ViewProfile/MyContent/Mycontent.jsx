import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { UserProfileContext } from '../../../helper/UserProfileContext';
import {getImageUrl} from '../../../helper/axiosConfig';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import CommentIcon from '@mui/icons-material/Comment';
import "./MyContent.css"
import { Link } from 'react-router-dom';
import Comments from '../../comments/Comments';
import Posts from '../../Content/Posts';
const SkeletonLoader = () => (
    <div className="skeleton-wrapper">
      <div className="skeleton-card">
        <div className="skeleton-image"></div>
      </div>
      <div className="skeleton-bottom">
        <div className="skeleton-text"></div>
        <div className="skeleton-icons">
          <div className="skeleton-icon"></div>
          <div className="skeleton-icon"></div>
        </div>
      </div>
    </div>
);
function Mycontent() {

    const [limit, setLimit] = useState();

    const { userProfile, loading, error, postsUpdate, setPostsUpdate} = useContext(UserProfileContext);
    const [posts, setPosts] = useState(userProfile.posts || []);
     const [open, setOpen] = useState(null);
    
        useEffect(() => {
            // Lock scroll when a comment section is open
            document.body.style.overflow = open ? 'hidden' : 'auto';
            return () => {
              document.body.style.overflow = 'auto'; // Reset scroll on unmount
            };
          }, [open]);

          useEffect(() => {
            if (userProfile.posts) {
              setPosts(userProfile.posts);
              
            }
          }, [userProfile.posts]);

          const FALLBACK_IMAGE = './fallback.png';

     
  return (
    <div className='MyContent'>
      <div className="container small" style={{gap:'0px'}}>
             <div className="ofprofiles" style={{gap:'20px', justifyContent: 'left'}}>
            
                 <div className="content profiles " style={{cursor: 'default', marginTop: "10px", gap:'0'}}>
                   <div className="image">
                     <img
                       src={`${getImageUrl}/userProfile/${userProfile.id}/ProfileImage`}
                       alt={userProfile.nickName || 'Post Image'}
                       onError={(e) => (e.target.src = FALLBACK_IMAGE)}
                     />
                   </div>
                   <div className='contentInfo'>
                     <div className='info'>
                     <p>{userProfile.nickName}</p>
                     <p>{userProfile.artistType}</p><br/>
                     
                     </div>
                    
                   </div>  
                   
                 </div>
                 <Link to="/editProfile"><div className='editProfile show'>Edit profile</div></Link> 
                 </div>
                 <p className='bio'>{userProfile.bio}</p>
                 <Link to="/editProfile"><div className='editProfile hide'>Edit profile</div></Link> 
           </div>
          
           

           
           <Posts content={posts} setContent={setPosts} limit={limit} setLimit={setLimit} userProfile={userProfile} className="big"/>
           

    </div>
  )
}


export default Mycontent

