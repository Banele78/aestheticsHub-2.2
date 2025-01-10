import React, { useContext, useEffect, useState } from 'react'
import "./content.css"
import Navbar from '../NavBar/Navbar'
import {axiosInstance, getImageUrl} from '../../helper/axiosConfig';
import { UserProfileContext } from '../../helper/UserProfileContext';
import { Link, useNavigate } from 'react-router-dom';
import UserProfiles from './UserProfiles';
import Posts from './Posts';
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

function Content() {
  const [Profiles, setProfiles] = useState([]);
 const [contentByLikes, setContentByLikes] = useState([]);
  const [contentByDate, setContentByDate] = useState([]);
  const [loadingContent, setLoadingContent] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all'); // Added state to track the selected category
  const [limit, setLimit] = useState(8); // Limit for displayed content
  const [limitProfile, setLimitProfile] = useState(6);
  const [limitDate, setLimitDate] = useState(8);
  const navigate = useNavigate();
   const { userProfile,loading, setLoading} = useContext(UserProfileContext);

  // Throttle function to limit how often the scroll handler is triggered
  const throttle = (func, delay) => {
    let lastCall = 0;
    return (...args) => {
      const now = new Date().getTime();
      if (now - lastCall >= delay) {
        func(...args);
        lastCall = now;
      }
    };
  };

  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollableHeight = document.documentElement.scrollHeight;
      const scrolled = window.innerHeight + window.scrollY;

      // Only trigger if scrolled to the bottom and not already loading
      if (scrolled >= scrollableHeight - 50 && !loadingContent) {
        setLoadingContent(true);
        handleLoadMore();
      }
    }, 200);  // Throttle the scroll event handler to run at most once every 500ms

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchmove', handleScroll);  // Ensure touch events trigger it

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    };
  }, [loadingContent]); // Depend on loadingContent state

  const handleLoadMore = () => {
    setTimeout(() => {
      setLimitDate((prevLimit) => prevLimit + 8);
      setLoadingContent(false);
    }, 1000);  // Simulate a delay (replace with API fetch)
  };

  const categories = [
    { value: "all", label: "All" },
    { value: "painter", label: "Drawing/Paintings" },
    { value: "musician", label: "Musicians" },
    { value: "Fashion", label: "Fashion" },
    { value: "author", label: "Books/Writing" },
    { value: "Photographer", label: "Photographers" },
  ];
  const FALLBACK_IMAGE = './fallback.png';

  useEffect(() => {
    // Fetch posts based on selected category
    setLoadingContent(true); // Ensure loading is true before the request
    const fetchPosts = async () => {
   
      try {
      
        const response = await axiosInstance.get(`/${selectedCategory}/posts`, { withCredentials: true });

        const userProfiles = await axiosInstance.get(`/${selectedCategory}/getAllProfiles`, { withCredentials: true });
        setProfiles(userProfiles.data);
        console.log(response.data);

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
       setLoadingContent(false);
       
      }
    };
    
    if (!loading) {
      //setLoading(true);
      fetchPosts();
    }
  }, [selectedCategory, userProfile]); // Fetch posts when the selected category changes

  if (loading) {
    return <div className="spinner-wrapper">
    <div className="spinner"></div>
  </div>; // Display loading message while fetching
  }
  return (
    <div className='contentP'>
     
     
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

    
     
    </div>
  )
}

export default Content
