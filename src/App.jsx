import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/home/home';
import Login from './pages/login/login';
import Signup from './pages/signup/signup';
import Navbar from './components/navbar/navbar';
import Layout from './components/layout/layout';
import Dashboard from './components/dashboard/dashboard';
import { auth,onAuthStateChanged} from './firebase/firebaseConfig'
import { useEffect, useState } from 'react';
import Profile from './pages/profile/profile';
import UserAllBlogs from './pages/userAllBlogs/userAllBlogs';
function App() {
  const [user, setUser] = useState(false)
  const [loader, setLoader] = useState(true)
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          // console.log(uid);
          setUser(true)
          setLoader(false)
        } else {
            console.log('user not login');
            setUser(false)
            setLoader(false)
        }
      });
},[])
  return (
    <div>
      {
        loader ? 
        <div className='loader'><img width={'100px'} src={'https://i.gifer.com/ZZ5H.gif'} alt="" /></div> 
        :
        <div>
            <header>
        <Navbar/>
      </header>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Blogging-Website-ReactJS' element={<Home/>}/>
        <Route path='/allblogs' element={<Home/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/login' element={user ? <Navigate to={'/dashboard'}/>:<Login/>}/>
        <Route path='/signup' element={user ? <Navigate to={'/dashboard'}/>:<Signup/>}/>
        <Route path='/dashboard' element={user ? <Dashboard/>: <Navigate to={'/login'}/>}/>
        <Route path='/profile' element={user ? <Profile/> : <Navigate to={'/login'}/>}/>
        <Route path='/yourallblogs' element={user ? <UserAllBlogs/> : <Navigate to={'/login'}/>}/>
      </Routes>
        </div>
      }
  </div>
  );
}

export default App;
