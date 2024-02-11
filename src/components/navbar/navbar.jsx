import React, { useEffect, useState } from 'react'
import './navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars,faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate,Navigate } from 'react-router-dom'
import { auth,onAuthStateChanged,signOut } from '../../firebase/firebaseConfig'
import logo from '../../assets/Logo.png'
export default function Navbar() {
  const [user, setUser] = useState(false);
  const [signupDisplay, setSignupdisplay] = useState({
    display : 'block'
  })
  const [profileDisplay, setProfiledisplay] = useState({
    display : 'none'
  })
  const [dashboardDisplay, setDashboarddisplay] = useState({
    display : 'none'
  })
  const [icon, setIcon] = useState(faBars);
  const [active, setActive] = useState('nav');
  function menuIcon(){
    if(icon == faBars){
      setIcon(faXmark)
      active == 'nav' ? setActive('nav active') : setActive('nav');
    }
    else{
      setIcon(faBars)
      active == 'nav' ? setActive('nav active') : setActive('nav');
    }
  }
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          console.log(uid);
          setUser(true)
          setSignupdisplay({
            display : 'none'
          })
          setProfiledisplay({
            display : 'block'
          })
          setDashboarddisplay({
            display : 'block'
          })
        } else {
            console.log('user not login');
            setUser(false)
            setSignupdisplay({
              display : 'block'
            })
            setProfiledisplay({
              display : 'none'
            })
            setDashboarddisplay({
              display : 'none'
            })
        }
      });
},[])
  return (
        <div className='navbar'>
          <div className='logo'>
          <Link to={'/'}><img src={logo} alt="" /></Link>
          </div>
            <nav className={active}>
                <a className='home'><Link to={'/'}>Home</Link></a>
                <a style={dashboardDisplay}><Link to={'/dashboard'}>Dashboard</Link></a>
                <a style={signupDisplay}><Link to={'/signup'}>Signup</Link></a>
                <a style={profileDisplay}><Link to={'/profile'}>Profile</Link></a>
            </nav>
            <div className='icon'>
            <span onClick={menuIcon}><FontAwesomeIcon icon={icon} /></span>
          </div>
        </div>
  )
}
