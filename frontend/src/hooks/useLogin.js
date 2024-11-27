import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {

   const [error,setError] = useState(null);
   const [isLoading,setIsLoading] = useState(null);
   const {dispatch} = useAuthContext();
   const apiUrl = process.env.REACT_APP_API_URL;

   const login = async (email,password) => {
      
      setIsLoading(true);
      setError(null);

      const res = await fetch(`${apiUrl}/api/user/login`, {
         method:'POST',
         headers:{'Content-Type':'application/json'},
         body:JSON.stringify({email,password})
      });

      const data = await res.json();

      if(!res.ok) {
         setIsLoading(false);
         setError(data.error);
      } else {
         //saving user to local storage
         localStorage.setItem('user', JSON.stringify(data));

         //updating the auth context
         dispatch({type:'LOGIN', payload:data});

         setIsLoading(false);
      }
   }

   return { login, isLoading, error };
}
