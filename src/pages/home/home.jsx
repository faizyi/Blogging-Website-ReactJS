import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/layout'
import './home.css'
import { auth,  onAuthStateChanged, db, getDocs, collection ,onSnapshot,where} from '../../firebase/firebaseConfig'
import userProfile from '../../assets/user-profile-removebg-preview.png'
import { Link } from 'react-router-dom'
export default function Home() {
  const [allBlogs, setAllBlogs] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setLoader(true)
    const fetchData = async () => {
      setLoader(true)
      const querySnapshot = await getDocs(collection(db, 'allBlogs'));
      const allBlogs = [];
      querySnapshot.forEach((doc) => {
        allBlogs.push({ id: doc.id, ...doc.data() });
      });
      setAllBlogs(allBlogs)
      setLoader(false)
    }

    fetchData();
  }, []);
  return (
    <div className='home-container'>

        {/* <div className='home'>
            <Layout/>
        </div> */}

        <div className='all-blogs-heading'>
        <div className='heading'>
          <h1>All Blogs</h1>
      </div>
      </div>


        {/* allBlog */}
        {
          loader ? <div className='loader'><img width={'100px'} src={'https://i.gifer.com/ZZ5H.gif'} alt="" /></div> :
          // <div>
            <div className='all'>
        {allBlogs.map(item => (
        <div className='all-blogs-container'>
        <div className='all-blogs'>
            <div className='all-blog-content'>
              <div className='all-blog-user-img'>
                <div className='all-blog-img'>
                <img src={item.blogImg} alt="" />
                <h1>{item.blogTitle}.</h1>
                </div>
                <div className='currUser-container'>
                  <div className='publish-time'>
                    <p><span>Published </span>{item.blogDate}</p>
                  </div>
                <div className='currUser-data'>
                <div className='currUser-pic'>
                        <img  src={userProfile} alt="" />
                    </div>
                    <div className='currUser-name'>
                        <h2>{item.currUserName}</h2>
                    </div>
                    <div className='currUser-email'>
                        <p>{item.currUserEmail}</p>
                    </div>
                </div>
                </div>
              </div>
              <div className='all-blog-des'>
                <p>{item.blogDes.slice(0,500)}....<Link>more</Link></p>
              </div>
            </div>
          </div>
        </div>
          ))}
          </div>
          // </div>
        }
        


    </div>
  )
}
