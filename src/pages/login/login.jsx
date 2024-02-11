import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../../components/navbar/navbar'
import { auth,signInWithEmailAndPassword} from '../../firebase/firebaseConfig'
export default function Login() {
    const [emailText, setEmailText] = useState('')
    const [passwordText, setPasswordText] = useState('');
    const [loader, setLoader] = useState(false);
    function email(e){
        setEmailText(e.target.value)
      }
      function password(e){
        setPasswordText(e.target.value)
      }
      const navigate = useNavigate();
      function login(event){
        event.preventDefault();;
        if(emailText == '' && passwordText == ''){
          return
        }else{
          setLoader(true)
          // event.preventDefault();
          signInWithEmailAndPassword(auth, emailText, passwordText)
          .then((userCredential) => {
            const user = userCredential.user;
            // console.log(user);
            setLoader(false)
            navigate('/dashboard')
          })
          .catch((error) => {
            Swal.fire("User not Found!");
            setLoader(false)
            setEmailText('')
            setPasswordText('')
          });
        }
      }
  return (
      <div className='container'>
        {
          loader ? <div className='loader'><img width={'100px'} src={'https://i.gifer.com/ZZ5H.gif'} alt="" /></div> :
          <div className='form'>
          <div className='heading'>
              <h1>Log In</h1>
          </div>
          <div className='input'>
              <form onSubmit={login}>
              <input required onChange={email} value={emailText} placeholder='Enter Your Email' type="email" /><br />
              <input required onChange={password} value={passwordText} placeholder='Enter Your Password' type="password" />
              <div className='btn'>
                  <button type='submit'>Login</button>
              </div>
              </form>
          </div>
          <div className='account'>
              <a>Not an Account? <Link to={'/signup'}>Signup</Link></a>
          </div>
      </div>
        }
    </div>
  )
}
