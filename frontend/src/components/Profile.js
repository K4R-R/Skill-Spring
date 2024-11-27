import React from 'react'
import '../styles/Profile.css'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext';

const Profile = () => {
   
   const navigate = useNavigate();
   const {user} = useAuthContext();

  return (
    <div className="profile-container">
      <h1>PERSONAL INFORMATION</h1>
      <div className="info">
        <h2>NAME - {user.name}</h2>
        <h2>ROLE - {user.role}</h2>
        <h2>EMAIL - {user.email}</h2>
        <h2>CONTACT - {user.contact}</h2>
        <button onClick={() => navigate(-1)} className='btn'>Back</button>
      </div>
    </div>
  )
}

export default Profile