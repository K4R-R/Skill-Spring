import React from 'react'
import '../styles/AddBlog.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const AddBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const {user} = useAuthContext();
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleAddBlog = async (e) => {
    e.preventDefault();
    const author = user.name;

    const res = await fetch(`${apiUrl}/api/blogs/add`,{
      method:'POST',
      body: JSON.stringify({title,author,content}),
      headers: {
         'Content-Type':'application/json',
         'Authorization':`Bearer ${user.token}`
      }
    });
   const blog = await res.json();

   if(blog) {
      alert('Blog added successfully');
      setTitle('');
      setContent('');
   } else {
      alert('Error in adding Blog')
   }
  };

  return (
    <div className="add-blog">
      <h1>Add a New Blog</h1>
      <form onSubmit={handleAddBlog}>
        <div>
          <input type="text" placeholder='Enter Blog Title' value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <textarea value={content} placeholder='Write Blog Content Here' onChange={(e) => setContent(e.target.value)} required ></textarea>
        </div>
        <button type="submit">Add Blog</button>
        <button type="button" onClick={() => navigate(-1) }>Cancel</button>
      </form>
    </div>
  );
}

export default AddBlog