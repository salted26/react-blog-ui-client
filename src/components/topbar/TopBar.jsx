import { faSearchengin } from '@fortawesome/free-brands-svg-icons'
import './topbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { Context } from '../../context/Context'
import { useContext } from 'react'


export const TopBar = () => {
  const {user, dispatch} = useContext(Context);
  const PF = "http://localhost:5000/images/"

  const handleLogout = () =>{
    dispatch({type:"LOGOUT", });
    window.location.replace("/");
  }

  return (
    <div className='top'>
        <div className='topLeft'>

        </div>
        <div className='topCenter'>
            <ul className="topList">
                <li className='topListItem'>
                  <Link to="/" className='link'>HOME</Link>
                </li>
                <li className='topListItem'>
                  <Link to="/" className='link'>ABOUT</Link>
                </li>
                <li className='topListItem'>
                  <Link to="/" className='link'>CONTACT</Link>
                </li>
                <li className='topListItem'>
                  <Link to="/write" className='link'>WRITE</Link>
                </li>
                <li className='topListItem' onClick={handleLogout}>
                  {user && "LOGOUT"}
                </li>
            </ul>
        </div>
        <div className='topRight'>
          { 
            user ? (
              <Link to="/settings">
                {user.profilePic && (
                  <img src={PF + user.profilePic} alt="" className='topImg'/>
                )}
              </Link>
            ) : (
              <>
              <ul className='topList'>
                <li className='topListItem'>
                  <Link className='link' to="/login">LOGIN</Link>
                </li>
                <li className='topListItem'>
                  <Link className='link' to="/register">REGISTER</Link>
                </li>
              </ul>
              </>
            )
          }
            
            <FontAwesomeIcon icon={faSearchengin} size="2xl" />
        </div>
    </div>
  )
}
