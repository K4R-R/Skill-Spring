import React from 'react';
import '../styles/Dashboard.css';
import { useAuthContext } from '../hooks/useAuthContext';
import FounderDash from './FounderDash';
import InvestorDash from './InvestorDash';
import GuestDash from './GuestDash';


const Dashboard = () => {

   const {user} = useAuthContext();
   
   return (
      <div className='dashboard'>

         {user.role==='Founder' && <FounderDash />}
         {user.role==='Investor' && <InvestorDash />}
         {user.role==='Guest' && <GuestDash />}
      </div>
      
   )
}

export default Dashboard