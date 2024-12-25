import React, { useEffect, useState } from 'react'
import "./content.css"
import Navbar from '../NavBar/Navbar'
import Comments from '../comments/Comments';
import axios from 'axios';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import CommentIcon from '@mui/icons-material/Comment';
import {axiosInstance, getImageUrl} from '../../helper/axiosConfig';

function Content() {
  const [open, setOpen] = useState(null);
  const [likedPosts, setLikedPosts] = useState([]);
  const [content, setContent] = useState([]);
  const [contentByLikes, setContentByLikes] = useState([]);
  const [contentByDate, setContentByDate] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all'); // Added state to track the selected category
  const [limit, setLimit] = useState(30); // Limit for displayed content

  const categories = [
    { value: "all", label: "All" },
    { value: "singer-rappers", label: "Singer/Rappers" },
    { value: "fashion", label: "Fashion" },
    { value: "painter", label: "Drawing/Paintings" },
    { value: "books-writing", label: "Books/Writing" },
    { value: "photographers", label: "Photographers" },
  ];

  

  const FALLBACK_IMAGE = './fallback.png';

  useEffect(() => {
    // Lock scroll when a comment section is open
    document.body.style.overflow = open ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto'; // Reset scroll on unmount
    };
  }, [open]);

  useEffect(() => {
    // Fetch posts based on selected category
    setLoading(true); // Ensure loading is true before the request
    const fetchPosts = async () => {
      try {
       
        const response = await axiosInstance.get(`/${selectedCategory}/posts`);

       // Sort by number of likes
    const ByLikes = [...response.data].sort((a, b) => b.likes.length - a.likes.length);

    // Sort by date
    const ByDate = [...response.data].sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
        setContentByLikes(ByLikes);
        setContentByDate(ByDate);
        //setContent(sortedPosts);
       
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, [selectedCategory]); // Fetch posts when the selected category changes

  const Like = async (postId) => {
    try {
      // Make the POST request to like/unlike the post
      await axiosInstance.post('/like', { postId });
  
      // Update the `content` state optimistically by toggling the like state
      setContentByLikes((prevContent) => 
        prevContent.map((post) =>
          post.id === postId
            ? { ...post, likedByUser: !post.likedByUser } // Toggle the like status of the post
            : post
        )
      );
      setContentByDate((prevContent) => 
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
  

  if (loading) {
    return <p>Loading...</p>; // Display loading message while fetching
  }
  return (
    <div>
      <Navbar/>
     
    
    

<div className="category">
  <select className="styled-dropdown"
   value={selectedCategory}
   onChange={(e) => setSelectedCategory(e.target.value)}>
    {categories.map((category) => (
      <option key={category.value} value={category.value}>
        {category.label}
      </option>
    ))}
  </select>
</div>

      <div className="view">Most Popular</div>

      <div className="container">
        {contentByLikes.length > 0 ? (
          contentByLikes.slice(0, limit).map((post) => (
            <div key={post.id} className="content">
              <div className="image">
                <img
                  src={`${getImageUrl}/posts/${post.id}/image`}
                  alt={post.artname || 'Post Image'}
                  onError={(e) => (e.target.src = FALLBACK_IMAGE)}
                />
              </div>
              <div className='contentInfo'>
                <div className='info'>
                <p>{post.artistType}</p>
                <p className='date'>
  {new Date(post.createdDate).toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })}
</p>
                </div>
           
              <div className="icon">
                  {post.likedByUser ? ( 
                    <FavoriteIcon className='IconColor' onClick={() => Like(post.id)}/>
                     
                  ) : ( 
                    <FavoriteBorderOutlinedIcon className='IconColor' onClick={() => Like(post.id)}/>
                  )}
               

                <CommentIcon className='IconColor'
                  onClick={() => setOpen(open === post.id ? null : post.id)}
                />
               
              </div>
              </div>
             
              {open === post.id && <Comments open={open} setOpen={setOpen} />}
            </div>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      
      </div>
     
    </div>
  )
}

export default Content
