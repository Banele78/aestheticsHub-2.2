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

function Content() {
  const [open, setOpen] = useState(null);
  const [likedPosts, setLikedPosts] = useState([]);
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { value: "all", label: "All" },
    { value: "singer-rappers", label: "Singer/Rappers" },
    { value: "fashion", label: "Fashion" },
    { value: "drawing-paintings", label: "Drawing/Paintings" },
    { value: "books-writing", label: "Books/Writing" },
    { value: "photographers", label: "Photographers" },
  ];

  // const [content, setContent] = useState([
  //   "photographer",
  //   "photographers",
  //   "drawings",
  //   "photographers (1)",
  //   "photographers (2)"
  // ]);

  const FALLBACK_IMAGE = './fallback.png';

  useEffect(() => {
    // Lock scroll when a comment section is open
    document.body.style.overflow = open ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto'; // Reset scroll on unmount
    };
  }, [open]);

  useEffect(() => {
    // Fetch posts from API
    axios.get('http://localhost:8080/api/posts')
      .then((response) => {
        // const posts = response.data.map((post) => ({
        //   ...post,
        //   likedByUser: likedPosts.includes(post.id),
        // }));
       setContent(response.data);
        setLoading(false);
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
        setLoading(false);
      });
  }, [likedPosts]);

  const Like = async (postId) => {
    try {
      await axios.post('http://localhost:8080/api/like', { postId });

      // Toggle the liked state
      setLikedPosts((prevLikedPosts) =>
        prevLikedPosts.includes(postId)
          ? prevLikedPosts.filter((id) => id !== postId) // Remove from liked
          : [...prevLikedPosts, postId] // Add to liked
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
  <select className="styled-dropdown">
    {categories.map((category) => (
      <option key={category.value} value={category.value}>
        {category.label}
      </option>
    ))}
  </select>
</div>


      <div className="view">Most Popular</div>

      <div className="container">
        {content.length > 0 ? (
          content.map((post) => (
            <div key={post.id} className="content">
              <div className="image">
                <img
                  src={`http://localhost:8080/api/posts/${post.id}/image`}
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


{/* {content.map((picture, index) => (
            <div key={index} className="content">
              <div className='image'>
             <img src={`./art/${picture}.png`}/>
          </div>
            <div className="icon">
            <FavoriteBorderOutlinedIcon className='IconColor' onClick={() => Like(post.id)}/>
          
           
            <CommentIcon className='IconColor' onClick={() => setOpen(prev => !prev)}/>
           
            <img src="./SendFill.png" alt="Send" />
            </div>
            </div>
          ))} */}



       

      
      </div>
     
    </div>
  )
}

export default Content
