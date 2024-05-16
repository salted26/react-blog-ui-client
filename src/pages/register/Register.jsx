import { Link } from 'react-router-dom'
import './register.css'
import { useState } from 'react';
import axios from 'axios';

export const Register = () => {
  const [ username, setUsername ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ error, setError ] = useState("");

  const handleSubmit= async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
      });  
      res.data && window.location.replace("/login");
    } catch (error) {
      setError(true);
    }
  }

  return (
    <div className='register'>
         <span className="registerTitle">Register</span>
        <form className="registerForm" onSubmit={handleSubmit}>
            <label>Username</label>
            <input type="text" className='registerInput' placeholder='Enter your username' 
            onChange={(event)=>setUsername(event.target.value)}/>
            <label>Email</label>
            <input type="text" className='registerInput' placeholder='Enter your email'
            onChange={(event)=>setEmail(event.target.value)}/>
            <label>Password</label>
            <input type="password" className='registerInput' placeholder='Enter your password'
            onChange={(event)=>setPassword(event.target.value)}/>
            <button className="registerButton" type="submit">Register</button>
        </form>
          <button className="registerloginButton" type="button">
            <Link to="/login" className='link'>Login</Link>
          </button>
          {error &&
            <span style={{color:"red"}}>Something went wrong!</span>
          }
    </div>
  )
}
