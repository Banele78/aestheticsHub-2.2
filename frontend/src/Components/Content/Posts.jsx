import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Comments from '../comments/Comments';
import {axiosInstance, getImageUrl} from '../../helper/axiosConfig';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import CommentIcon from '@mui/icons-material/Comment';
import { Link } from 'react-router-dom';
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
function Posts({content, setContent, limit, setLimit , userProfile, className}) {
    const [open, setOpen] = useState(null);

    useEffect(() => {
        // Lock scroll when a comment section is open
        document.body.style.overflow = open ? 'hidden' : 'auto';
        return () => {
          document.body.style.overflow = 'auto'; // Reset scroll on unmount
        };
      }, [open]);

    const Like = async (postId) => {
        try {
          // Make the POST request to like/unlike the post
          await axiosInstance.post(`/${userProfile.id}/like`, { postId });
      
          // Update the `content` state optimistically by toggling the like state
          setContent((prevContent) => 
            prevContent.map((post) =>
              post.id === postId
                ? { ...post, likedByUser: !post.likedByUser } // Toggle the like status of the post
                : post
            )
          );
        
        } catch (error) {
          console.error('Error liking post:', error);
        }
      };
  return (
    <div>
       <div className={`container ${className}`}>
      {
        content.length > 0 ? (
            content.slice(0, limit).map((post) => (
            <div key={post.id} className="content">
              <div className="image">
                <img
                  src={`${getImageUrl}/posts/${post.id}/image`}
                  alt={post.artname || 'Post Image'}
                  onError={(e) => (e.target.src = FALLBACK_IMAGE)}
                /> 
                <p><span className='nickName'><Link to={`/viewProfile/${post.userProfile.id}`}>
                {post.userProfile.id == userProfile.id ? "Me" : post.userProfile.nickName }</Link><br/>
                <span className='arttistType'>{post.artistType}</span></span><br/> <br/>
                {post.caption}</p>
              </div>
              <div className='contentInfo'>
                <div className='info'>
                <p>{post.artName || post.artname}</p>
                <p className='date'>
  {new Date(post.createdDate).toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })}
</p>
                </div>
              <div className="icon">
                
                 { post.likedByUser ? ( 
                    <FavoriteIcon className='IconColor' onClick={() => Like(post.id)}/>  
                  ) : ( 
                    <FavoriteBorderOutlinedIcon className='IconColor' onClick={() => Like(post.id)}/>
                  )
                  }
                <CommentIcon className='IconColor'
                  onClick={() => setOpen(open === post.id ? null : post.id)}
                />
              </div>
              </div>
              {open === post.id && <Comments open={open} setOpen={setOpen} />}
            </div>
          ))
        ) : (
          [...Array(8)].map((_, index) => <SkeletonLoader key={index} />)
        )}
      
      </div>

    </div>
  )
}

export default Posts

