import React, { useEffect, useState } from 'react'
import "./content.css"
import Navbar from '../NavBar/Navbar'
import Comments from '../comments/Comments';
import axios from 'axios';

function Content() {
  const [open, setOpen] = useState(null);
  const [likedPosts, setLikedPosts] = useState([]);
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);

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
        <ul>
            <li>All</li>
            <li>Singer/Rappers</li>
            <li>Fashion</li>
            <li>Drawing/Paintings</li>
            <li>Books/writing</li>
            <li>Photographers</li>
        </ul>
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
              <div className="icon">
                <img
                  src={post.likedByUser ? './back.png' : './Heart.png'}
                  alt="Heart"
                  onClick={() => Like(post.id)}
                  loading="lazy"
                />
                <img
                  src="./ChatFill.png"
                  alt="Chat"
                  onClick={() => setOpen(open === post.id ? null : post.id)}
                />
                <img src="./SendFill.png" alt="Send" />
              </div>
              {open === post.id && <Comments open={open} setOpen={setOpen} />}
            </div>
          ))
        ) : (
          <p>No posts available.</p>
        )}

        {/* Start of most viewed*/}
       
        {/* Start of recently viewed*/}
        <div className="recentView">

        <div className="view">Recently uploaded</div>

        <div className="container2">
         <div className="content">
         <div className="icon">
            <img src="./Heart.png"/>
            <img src="./ChatFill.png"/>
            <img src="./SendFill.png"/>
            </div>
        </div>

    <div className="content">
   
             <img src="./art/photographers (5).png"/>        
            <div className="icon">
            <img src="./Heart.png"/>
            <img src="./ChatFill.png"/>
            <img src="./SendFill.png"/>
            </div>
    
   </div>

   <div className="content">
   <img src="./art/photographers (4).png"/>
   <div className="icon">
            <img src="./Heart.png"/>
            <img src="./ChatFill.png"/>
            <img src="./SendFill.png"/>
            </div>
</div>
<div className="content">
<img src="./art/photographers (6).png"/>
<div className="icon">
            <img src="./Heart.png"/>
            <img src="./ChatFill.png"/>
            <img src="./SendFill.png"/>
            </div>
</div>

   </div>
 
   </div>
      </div>
 
    </div>
  )
}

export default Content
