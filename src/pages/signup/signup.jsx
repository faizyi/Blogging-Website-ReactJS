import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { Link, useNavigate } from 'react-router-dom'
import './form.css'
import { auth, createUserWithEmailAndPassword, db, setDoc, doc, } from '../../firebase/firebaseConfig'
export default function Signup() {
  const [nameText, setNameText] = useState('')
  const [emailText, setEmailText] = useState('')
  const [passwordText, setPasswordText] = useState('');
  const [loader, setLoader] = useState(false);
  function email(e) {
    setEmailText(e.target.value)
  }
  function password(e) {
    setPasswordText(e.target.value)
  }
  function name(e) {
    setNameText(e.target.value)
  }
  const navigate = useNavigate();
  const signup = (event) => {
    event.preventDefault();;
    if (nameText == '' && emailText == '' && passwordText == '') {
      return
    } else {
      setLoader(true)
      createUserWithEmailAndPassword(auth, emailText, passwordText)
        .then(async (userCredential) => {
          const user = userCredential.user;
          console.log(user);
          try {
            const docRef = await setDoc(doc(db, "users", user.uid), {
              Name: nameText,
              Email: emailText,
              Password: passwordText,
              userId: user.uid
            });
            setLoader(false)
            navigate('/dashboard')
          } catch (e) {
            Swal.fire("Somthing Wrong!");
            setLoader(false)
            setNameText('')
            setEmailText('')
            setPasswordText('')
          }
        })
        .catch((error) => {
          Swal.fire("Somthing Wrong!");
          setLoader(false)
          setNameText('')
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
              <h1>Sign Up</h1>
            </div>
            <div className='input'>
              <form onSubmit={signup}>
                <input required onChange={name} value={nameText} placeholder='Enter Your Name' type="text" /><br />
                <input required onChange={email} value={emailText} placeholder='Enter Your Email' type="email" /><br />
                <input required onChange={password} value={passwordText} placeholder='Enter Your Password' type="password" />
                <div className='btn'>
                  <button type='submit'>Sign Up</button>
                </div>
              </form>
            </div>
            <div className='account'>
              <a>Have an Account?<Link to={'/login'}>Login</Link></a>
            </div>
          </div>
      }
    </div>
  )
}
