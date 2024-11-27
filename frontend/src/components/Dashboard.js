import React from 'react'
import { useState,useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import '../styles/Startups.css'

const Startups = () => {

   const [investPref,setInvestPref] = useState(null);
   const [businesses,setBusi] = useState(null);
   const [connections,setConnections] = useState(null);
   const [loading, setLoading] = useState(true);
   const {user} = useAuthContext();
   const apiUrl = process.env.REACT_APP_API_URL;

   useEffect(() => {
      const fetchInvestPref = async () => {
          const res = await fetch(`${apiUrl}/api/investor`,{
              headers: {
                'Authorization':`Bearer ${user.token}`
              }
          });
          const investPref = await res.json();
  
          if(investPref) setInvestPref(investPref);
          setLoading(false);
      }

      const fetchBusinesses = async () => {
         const res = await fetch(`${apiUrl}/api/founder`,{
            headers: {
               'Authorization':`Bearer ${user.token}`
            }
         });
         const businesses = await res.json();

         if(businesses) setBusi(businesses);
      }

      const fetchConnections = async () => {
         const res = await fetch(`${apiUrl}/api/connections`,{
            headers: {
               'Authorization':`Bearer ${user.token}`
            }
         });
         const connections = await res.json();

         if(connections) setConnections(connections);
      }
  
      fetchInvestPref();
      fetchBusinesses();
      fetchConnections();
   }, [user,apiUrl]);

   if (loading) {
      return (
         <div className="no-pref"> <h1>Loading...</h1> </div>
      );
   }

   if(!investPref) {
      return (
         <div className="no-pref"> <h1>Select your preferences to discover matching startups.</h1> </div>
      )
   }

   const filteredBusi = (businesses || [])
      .filter(business => investPref.industry.includes(business.industry))
      .filter(business => investPref.investmentStage.includes(business.investmentStage))
      .filter(business => investPref.productionStage.includes(business.productionStage))
      .filter(business => investPref.customerGroup.includes(business.customerGroup));

   if(filteredBusi.length===0) {
      return (
         <div className="no-pref"> <h1>No Startups Available for Selected Preferences.</h1>
         </div>
      )
   }

   const connectionStatus = (founderEmail) => {
      if(!connections) return 'Connect';

      const connection = connections.find(conn => conn.founderEmail === founderEmail && conn.investorEmail === user.email);
      if(!connection) return 'Connect';
      return connection.status;
   }

   const handleConnect = async (business) => {

      const res = await fetch(`${apiUrl}/api/connections`,{
         method:'POST',
         headers: {
            'Content-Type':'application/json',
            'Authorization':`Bearer ${user.token}`
         },
         body: JSON.stringify({founderName:business.founderName,investorEmail:user.email,founderEmail:business.founderEmail})
      });
      const connection = await res.json();
      
      if(connection) {
         setConnections([...connections,connection]);
         alert('Connection Request Sent')
      } else {
         alert('Error in sending Connect Request');
      }

    };

   return (
      <div className="startups-container">
         {filteredBusi.map(business => (
         <div key={business._id} className="startup-card">

            <h2>{business.startupName.toUpperCase()}</h2>

            <p>FOUNDER  <span>{business.founderName}</span> </p>

            <p>INDUSTRY  <span>{business.industry}</span> </p>

            <p>INVESTMENT STAGE  <span>{business.investmentStage}</span> </p>

            <p>PRODUCTION STAGE  <span>{business.productionStage}</span> </p>

            <p>CUSTOMER GROUP  <span>{business.customerGroup}</span> </p>

            <div className="btns">
               <button>More Info</button>
               <button 
               onClick={(e) => handleConnect(business)} 
               disabled={connectionStatus(business.founderEmail) !== 'Connect'} >
               { connectionStatus(business.founderEmail) }
               </button>
            </div>

         </div>
         ))}
      </div>
   )
}

export default Startups