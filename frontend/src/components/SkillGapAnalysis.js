import React from 'react'
import '../styles/Blogs.css'
import { useState,useEffect } from 'react'
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

const Blogs = () => {
   
   const [blogs,setBlogs] = useState(null);
   const {user} = useAuthContext();
   const navigate = useNavigate();
   const apiUrl = process.env.REACT_APP_API_URL;

   useEffect(()=>{
      const fetchBlogs = async () => {
         const res = await fetch(`${apiUrl}/api/blogs`,{
            headers: {
               'Authorization':`Bearer ${user.token}`
            }
         });

         const blogs = await res.json();

         if(blogs) {
            setBlogs(blogs);
         } else {
            alert('No Blogs Found');
         }
      }

      fetchBlogs();
   },[user,apiUrl])

   const handleBlogClick = (id) => {
      navigate(`/blogs/${id}`);
   };

   //console.log(blogs);

   if(!blogs) {
      return (
         <div className="loading">
            <h1>Loading...</h1>
         </div>
      )
   }

   return (
      <div className="all-blogs">
         <h1>LATEST BLOGS</h1>
         <div className="blogs-container">
            {blogs.map(blog => (
               <div key={blog._id} className="blog-card" onClick={() => handleBlogClick(blog._id)}>
                  <div><h2>{blog.title}</h2></div>
                  <p>By {blog.author}</p>
               </div>
            ))}
         </div>
      </div>
   )
}

export default Blogs