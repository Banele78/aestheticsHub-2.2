import React, { useContext, useEffect, useState } from 'react'

import Posts from '../Posts';
import { Link, useParams } from 'react-router-dom';
import { UserProfileContext } from '../../../helper/UserProfileContext';
import {axiosInstance, getImageUrl} from '../../../helper/axiosConfig';
import Navbar from '../../NavBar/Navbar';
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

function ViewUserProfile() {
  const [limit, setLimit] = useState();
  
      //const { userProfile, loading, error, postsUpdate, setPostsUpdate} = useContext(UserProfileContext);
      const [posts, setPosts] = useState( []);
       const [open, setOpen] = useState(null);

       const { userProfileId } = useParams();
       console.log(userProfileId); // This will log the `userProfile.id`
 const { userProfile,loading, setLoading} = useContext(UserProfileContext);
       const [userProfiles, setUserProfiles] = useState({});
      
          useEffect(() => {
              // Lock scroll when a comment section is open
              document.body.style.overflow = open ? 'hidden' : 'auto';
              return () => {
                document.body.style.overflow = 'auto'; // Reset scroll on unmount
              };
            }, [open]);
  
          
  
            const FALLBACK_IMAGE = './fallback.png';

            useEffect(() => {
              const fetchPosts = async () => {
                try {
                  const response = await axiosInstance.get(`/${userProfileId}/getUserProfiles`, { withCredentials: true });
                  setPosts(response.data.posts);
                  setUserProfiles(response.data);
                  console.log("posts :" , response.data.posts)
                } catch (error) {
                  console.error('Error fetching posts:', error);
                }
              };
              fetchPosts();
            }, [userProfileId]);
            
  return (
   
    <div className='MyContent'>
     
    <div className="container small" style={{gap:'0px'}}>
           <div className="ofprofiles" style={{gap:'20px', justifyContent: 'left'}}>
          
               <div className="content profiles " style={{cursor: 'default', marginTop: "10px", gap:'0'}}>
                 <div className="image">
                   <img
                     src={`${getImageUrl}/userProfile/${userProfiles.id}/ProfileImage`}
                     alt={userProfiles.nickName || 'Post Image'}
                     onError={(e) => (e.target.src = FALLBACK_IMAGE)}
                   />
                 </div>
                 <div className='contentInfo'>
                   <div className='info'>
                   <p>{userProfiles.nickName}</p>
                   <p>{userProfiles.artistType}</p><br/>
                   
                   </div>
                  
                 </div>  
                 
               </div>
               { userProfileId ==userProfile.id &&
                 <Link to="/editProfile"><div className='editProfile show'>Edit profile</div></Link> 
               }
               </div>
               <p className='bio'>{userProfiles.bio}</p>
               { userProfileId ==userProfile.id &&
                <Link to="/editProfile"><div className='editProfile hide'>Edit profile</div></Link> 
               }
              
         </div>
        
         

         
         <Posts content={posts} setContent={setPosts} limit={limit} setLimit={setLimit} userProfile={userProfile} className="big"/>
         

  </div>
  )
}


export default ViewUserProfile

