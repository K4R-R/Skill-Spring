import {BrowserRouter,Routes,Route,Navigate } from 'react-router-dom';
import { Navbar, Login, Signup, Dashboard, Invitations,Blogs,MyBlogs,AddBlog,FullBlog,Startups,Messages,Profile } from './components';
import { useAuthContext } from './hooks/useAuthContext';
import { useState,useEffect } from 'react';

function App() {

  const {user} = useAuthContext();
  
  const [role,setRole] = useState('');
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setRole(user.role);
    }
    setLoading(false);
  }, [user]);

  if(loading) {
    return (
      <div className="App">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='*' element={<Navigate to={'/login'} />} />
        </Routes>
      </BrowserRouter>
    </div>
    );
  }

  //console.log(role);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/profile' element={<Profile />} />
          {role === 'Founder' && <Route path='/invitations' element={<Invitations />} />}
          {role !== 'Guest' && <Route path='/myblogs' element={<MyBlogs />} />}
          {role !== 'Guest' && <Route path='/myblogs/add' element={<AddBlog />} />}
          {role === 'Investor' && <Route path='/startups' element={<Startups />} />}
          {role === 'Guest' && <Route path='/startupinfo' element={<Blogs />} />}
          {role !== 'Guest' && <Route path='/messages' element={<Messages />} />}
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/blogs/:id' element={<FullBlog />} />
          <Route path='*' element={<Navigate to={'/dashboard'} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
