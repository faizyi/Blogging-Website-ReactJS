import React, { useEffect, useRef, useState } from 'react'
import './dashboard.css'
import { db, setDoc, doc, onAuthStateChanged, auth, collection, addDoc, getDoc } from '../../firebase/firebaseConfig'
import { getStorage, storage, ref, uploadBytes, uploadBytesResumable, getDownloadURL } from '../../firebase/firebaseConfig'
import { useNavigate } from 'react-router-dom';
export default function Dashboard() {
  const [userId, setUserId] = useState();
  const [blogImg, setBlogImg] = useState('');
  const [blogPic, setBlogPic] = useState('');
  const [imgURL, setImgUrl] = useState('');
  const [blogTitle, setBlogTitle] = useState('');
  const [blogDes, setBlogDes] = useState('');
  const [currUserName, setCurrUserName] = useState();
  const [currUserEmail, setCurrUserEmail] = useState();
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  //Date
  const date = new Date()
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const currMonth = date.getMonth();
  const currentMonthName = monthNames[currMonth]
  const currDate = `${currentMonthName} ${date.getDate()}, ${date.getFullYear()}`
  useEffect(() => {
    async function fetchUserData() {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const uid = user.uid;
          const docRef = doc(db, "users", uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const getCurrUserData = docSnap.data();
            setCurrUserName(getCurrUserData.Name)
            setCurrUserEmail(getCurrUserData.Email)
            // setUsersData(getUsersData)
          } else {
            console.log("No such document!");
          }
          setUserId(uid)
        }
      });
    }
    fetchUserData()
  }, [])
  function publishBlog() {
    setLoader(true);
    // Storage
    const imageRef = ref(storage, `BlogImages/${blogImg}`);
    const uploadTask = uploadBytesResumable(imageRef, blogPic);

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

          // usersBlogs
          try {
            const docRef = await addDoc(collection(db, `usersBlogs/${userId}/blogs`), {
              blogImg: downloadURL,
              blogTitle: blogTitle,
              blogDes: blogDes,
              blogDate : currDate,
            });
            navigate('/userAllBlogs')
          } catch (e) {
            console.error("Error adding document: ", e);
          }

          // allBlogs
          try {
            const docRef = await addDoc(collection(db, 'allBlogs'), {
              blogImg: downloadURL,
              blogTitle: blogTitle,
              blogDes: blogDes,
              currUserName: currUserName,
              currUserEmail: currUserEmail,
              blogDate : currDate,
            });
            navigate('/userAllBlogs')
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        });
      }

    );

  }
  function handle(e) {
    setBlogImg(e.target.files[0].name)
    setBlogPic(e.target.files[0])
  }
  return (
    <div className='dashboard-container'>

      {
        loader ? <div className='loader'><img width={'100px'} src={'https://i.gifer.com/ZZ5H.gif'} alt="" /></div> :
        <div>
           <div className='dashboard'>
        <div className='heading'>
          <h1>Dashboard</h1>
        </div>
      </div>

      <div className='blog-container'>

        <div className='blog'>
          <div className='heading'>
            <h3>Create Blog</h3>
          </div>
          <div className='blog-input'>
            <div className='blog-img'>
              <label>Upload Blog Image.</label>
              <div className="image-upload-container">
                <input required onChange={handle} type="file" id="imageInput" accept="image/*" />
                {/* <label htmlFor="imageInput" className="upload-btn">Upload Blog Image</label> */}
              </div>
            </div>
            <div className='blog-title'>
              <label>Enter Blog Title.</label>
              <input required placeholder='Enter Blog Title' onChange={(e) => setBlogTitle(e.target.value)} value={blogTitle} type="text" />
            </div>
            <div className='blog-des'>
              <label>Enter Blog Description.</label>
              <textarea value={blogDes} onChange={(e) => setBlogDes(e.target.value)} required placeholder='Blog Description' name="" id="" cols="30" rows="5"></textarea>
            </div>
          </div>
          <div className='blog-btn'>
            <button onClick={publishBlog}>Publish Blog</button>
          </div>
        </div>

      </div>
        </div>
        
      }

     
    </div>
  )
}
