import React, { useEffect, useState } from 'react'
import './profile.css'
import { auth,signOut,onAuthStateChanged,db,doc,getDoc,ref,uploadBytesResumable,storage,getDownloadURL,setDoc, addDoc, collection } from '../../firebase/firebaseConfig'
import { Link, NavLink, Navigate, useNavigate } from 'react-router-dom';
import userProfile from '../../assets/user-profile-removebg-preview.png'
export default function Profile() {
    const [userData, setUsersData] = useState('');
    const [image, setImage] = useState('');
    const [userId, setUserId] = useState();
    const [loader, setLoader] = useState(false);
    

    useEffect(()=>{
      async function fetchUserData() {
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const uid = user.uid;
            setUserId(uid)
          }
        });
      }
      fetchUserData()  
    },[])



    function handle(e){
      setLoader(true);
        const file = e.target.files[0]
        const profile = e.target.files[0].name
        setImage(file);
        const imageRef = ref(storage, `UsersProfile/${profile}`);
        const uploadTask = uploadBytesResumable(imageRef, file);

        uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              setLoader(true)
              break;
            case 'running':
              setLoader(true)
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log(downloadURL);
            setLoader(false)
            try {
              const docRef = await setDoc(doc(db, 'usersProfile',userId), {
                profile : downloadURL,
              });
            } catch (e) {
              console.error("Error adding document: ", e);
            }

            try {
              const docRef = await addDoc(collection(db, `allUsersProfile/${userId}/allProfile`), {
                profile : downloadURL,
              });
              window.location.reload()
            } catch (e) {
              console.error("Error adding document: ", e);
            }
          })
        })
    }
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
          setLoader(true)
            if (user) {
              const uId = user.uid;
            async function fetchUserData(){
                // console.log(uId);
                const docRef = doc(db, "users", uId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const getUsersData = docSnap.data();
                    setUsersData(getUsersData)
                    setLoader(false)
                  } else {
                    console.log("No such document!");
                  }

                const currUserImg = doc(db, "usersProfile", uId);
                const userImg = await getDoc(currUserImg);
                if (userImg.exists()) {
                    const getUsersImg = userImg.data().profile;
                    setImage(getUsersImg);
                    setLoader(false)
                    // window.location.reload()
                    // console.log(getUsersImg.profile);
                  } else {
                    console.log("No such document!");
                  }
            }
            fetchUserData()
        }
          });
    },[])
    const navigate = useNavigate();
    function logout(){
    signOut(auth).then(() => {
      navigate('/login')
    }).catch((error) => {
      console.log(error);
    });
    }
  return (
    <div className='profile-container'>
        <div className='profile'>
        <div className='heading'>
            <h1>Profile</h1>
        </div>
        </div>
      {
        loader ? <div className='loader'><img width={'100px'} src={'https://i.gifer.com/ZZ5H.gif'} alt="" /></div> : 
        <div>

            {
                typeof userData.main == 'undefined'? (
                    <div className='user-container'>
                    <div className='user-profile'>
                    <div className='user-pic'>
                      {
                        image ? (<label htmlFor="profile"><img  src={image}/></label>) : (
                          <label htmlFor="profile"><img width={'10px'} src={userProfile ? 'https://i.stack.imgur.com/ATB3o.gif' : {userProfile}} alt="" /></label>
                        )
                      }
                        <input id='profile' onChange={handle} type="file"  accept="image/jpeg, image/png, image/jpg" />
                    </div>
                    <div className='user-name'>
                        <h2>{userData.Name}</h2>
                    </div>
                    <div className='user-email'>
                        <p>{userData.Email}</p>
                    </div>
                    <div className='logout-btn'>
                        <button onClick={logout}>Log Out</button>
                    </div>
                    <div className='yourblogs-btn'>
                        <button><NavLink to={'/yourallblogs'}>Your Blogs</NavLink></button>
                    </div>
                    </div>
        </div>
                ) :
                ('')
            }
        </div>
      }
    </div>
  )
}
