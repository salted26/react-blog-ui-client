import { useEffect, useState } from 'react'
import { Header } from '../../components/header/Header'
import { Posts } from '../../components/posts/Posts'
import { SideBar } from '../../components/sidebar/SideBar'
import './home.css'
import { useLocation } from 'react-router-dom'
import api from '../../config/api'

export const Home = () => {
  const [ posts, setPosts ] = useState([]);
  const {search} = useLocation();

  useEffect(()=>{
    const fetchData = async() => {
      const res = await api.get('/posts'+search)
      setPosts(res.data);
    }
    fetchData()
  }, [search])

  return (
    <>
      <Header />
      <div className='home'>
        <Posts posts={posts} />
        <SideBar />
      </div>
    </>
  )
}
