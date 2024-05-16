import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './singlepost.css'
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { Link, useLocation } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Context } from '../../context/Context';

export const SinglePost = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [ post, setPost ] = useState({});
  const [ title, setTitle ] = useState("");
  const [ desc, setDesc ] = useState("");
  const [ updateMode, setUpdateMode ] = useState(false);
  const {user} = useContext(Context);
  const PF = "http://localhost:5000/images/"

  const handleDelete = async() => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: {username:user.username}});  
    } catch (error) {
      
    }
    window.location.replace("/");
  }

  const handleUpdate = async() => {
    try {
      await axios.put(`/posts/${post._id}`, {
          username: user.username,
            title, 
            desc,
      });
      setUpdateMode(false);
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    const getPost = async() =>{
      const res = await axios.get("/posts/"+path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    }
    getPost();
  }, [path])

  return (
    <div className='singlePost'>
      <div className="singlePostWrapper">
        {post.photo && (
          <img src={PF + post.photo} alt="" className="singlePostImg" />
        )} {
          updateMode ? (<input type="text" defaultValue={post.title} 
          className='singlePostTitleInput' onChange={(e)=>setTitle(e.target.value)}/>) : (
        <h1 className="singlePostTitle">
          {title}
          {post.username === user?.username && (
            <div className="singlePostEdit">
            <FontAwesomeIcon icon={faPenToSquare} className='link' onClick={()=>setUpdateMode(true)}/>
            <FontAwesomeIcon icon={faTrashCan} onClick={handleDelete}/>
          </div>  
          )}
        </h1>
        )}
        <div className="singlePostInfo">
          <span className='singlePostAuthor'>
            Author :  &nbsp;
            <Link to={`/?user=${post.username}`} className='link'><b>{post.username}</b></Link>
            </span>
          <span className='singlePostDate'>
            {new Date(post.updatedAt).toDateString()}
          </span>
        </div>
        { updateMode ? (<textarea className='singlePostDescInput' defaultValue={post.desc}
        onChange={(e)=>setDesc(e.target.value)} ></textarea>) : (
          <p className='singlePostDesc'>
            {desc}
          </p>  
        )}
        {updateMode && (<button className="singlePostButton" onClick={handleUpdate}>Update</button>)}
      </div>
    </div>
  )
}
