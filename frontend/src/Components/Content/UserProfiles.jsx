import React from 'react'
import PropTypes from 'prop-types'
import {axiosInstance, getImageUrl} from '../../helper/axiosConfig';
import { Link } from 'react-router-dom';
const SkeletonLoaderProfile = () => (
  <div className="skeleton-wrapper">
    <div className="skeleton-card profiles">
      <div className="skeleton-image"></div>
    </div>
    
  </div>
);
function UserProfiles({Profiles, limitProfile, setLimitProfile}) {
  return (
    <div>
        <div className="UserProfiles">User Profiles</div>
      <div className="container">
        <div className="ofprofiles">
        {Profiles.length > 0 ? (
          Profiles.slice(0, limitProfile).map((profile) => (
            <div key={profile.id} className="content profiles">
              <div className="image">
             <Link to={`/viewProfile/${profile.id}`}>   <img
                  src={`${getImageUrl}/userProfile/${profile.id}/ProfileImage`}
                  alt={profile.nickName || 'Post Image'}
                  onError={(e) => (e.target.src = FALLBACK_IMAGE)}
                /></Link>
              </div>
              <div className='contentInfo'>
                <div className='info'>
                <p>{profile.nickName}</p>
                <p>{profile.artistType}</p>
                </div>
           
             
              </div>
             
              
            </div>
          ))
        ) : (
          [...Array(6)].map((_, index) => <SkeletonLoaderProfile key={index} />)
        )}
       
       </div>
      </div>
      <div className="viewMore">
        <button   disabled={Profiles.length <= limitProfile} 
        onClick={()=>setLimitProfile((prev) => prev + 3)} >viewMore</button>
        </div>
    </div>
  )
}


export default UserProfiles

