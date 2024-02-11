import React, { useEffect, useState } from 'react'
import './userAllBlogs.css'
import { auth, onAuthStateChanged, db, getDocs, collection, onSnapshot } from '../../firebase/firebaseConfig'
// import userProfile from '../../assets/user-profile.jpeg'
// import blogimg from '../../assets/apple-vision-pro-release-dezeen_dezeen_2364_hero-852x479.webp'
export default function UserAllBlogs() {
  const [userAllBlogs, setUserAllBlogs] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          setLoader(true)
          const userId = user.uid;
          const querySnapshot = await getDocs(collection(db, `usersBlogs/${userId}/blogs`));
          const userBlogs = [];
          querySnapshot.forEach((doc) => {
            userBlogs.push({ id: doc.id, ...doc.data() });
          });
          setUserAllBlogs(userBlogs);
          setLoader(false)
        }
      });
    };

    fetchData();
  }, []);
  // console.log(userAllBlog);
  return (
    <div className='userAllBlogs-container'>

      <div className='userAllBlogs'>
        <div className='heading'>
          <h1>Your Blogs</h1>
        </div>
      </div>
      {
        loader ? <div className='loader'><img width={'100px'} src={'https://i.gifer.com/ZZ5H.gif'} alt="" /></div> :
          <div>
            {userAllBlogs.map(item => (

              <div key={item.id} className='allblogs-container'>
                <div className='all-blogs'>
                  <div className='blog-content'>
                    <div className='blog-img'>
                      <img src={item.blogImg} alt="" />
                      <h1>{item.blogTitle}</h1>
                    </div>
                    <div className='blog-des'>
                      <p>{item.blogDes}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
      }

    </div>
  )
}
