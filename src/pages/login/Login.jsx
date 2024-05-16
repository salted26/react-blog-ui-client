import { Link } from 'react-router-dom'
import './login.css'
import { useContext, useRef } from 'react';
import { Context } from '../../context/Context';
import api from '../../config/api';

export const Login = () => {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) =>{
    e.preventDefault();
    dispatch({type:"LOGIN_START"});
    try {
      const res = await api.post("/auth/login", {
        username:userRef.current.value,
        password:passwordRef.current.value,
      });
      dispatch({type:"LOGIN_SUCCESS", payload:res.data});
    } catch (error) {
      dispatch({type:"LOGIN_FAILURE"})
    }
  }

  return (
    <div className='login'>
        <span className="loginTitle">Login</span>
        <form className="loginForm" onSubmit={handleSubmit}>
            <label>Username</label>
            <input type="text" className='loginInput' placeholder='Enter your username'
            ref={userRef}/>
            <label>Password</label>
            <input type="password" className='loginInput' placeholder='Enter your password'
            ref={passwordRef}/>
            <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
        </form>
            <button className="loginregisterButton">
              <Link to="/register" className='link'>Register</Link>
            </button>
    </div>
  )
}