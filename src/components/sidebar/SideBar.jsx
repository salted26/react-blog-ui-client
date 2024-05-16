import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareFacebook, faSquareTwitter, faSquareInstagram } from '@fortawesome/free-brands-svg-icons'
import './sidebar.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../config/api'

export const SideBar = () => {
    const [ cats, setCats ] = useState([]);

    useEffect(()=>{
        const getCats = async () =>{
            const res = await api.get("/categories");
            setCats(res.data);
        }
        getCats();
    }, [])
  return (
    <div className='sideBar'>
        <div className='sidebarItem'>
            <div className='sidebarTitle'>
                ABOUT ME
            </div>
            <img src="https://images.pexels.com/photos/3323682/pexels-photo-3323682.jpeg" alt="" />
            <p>
            Sed non fermentum velit. Sed dictum tortor tristique augue tempus lacinia. Morbi a dapibus risus. Nunc eget justo ipsum. Suspendisse potenti. Integer bibendum venenatis semper.
            </p>
        </div>
        <div className='sidebarItem'>
            <div className='sidebarTitle'>
                CATEGORIES
            </div>
            <ul className="sidebarList">
                {cats.map((c, index)=>(
                    <li className="sidebarListItem" key={index}>
                        <Link to={`/?cat=${c.name}`} className='link'>{c.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
        <div className="sidebarItem">
            <div className="sidebarTitle">FOLLOW US</div>
            <div className="sidebarSocial">
                <FontAwesomeIcon icon={faSquareFacebook} size='xl' className='icon'/>
                <FontAwesomeIcon icon={faSquareTwitter} size='xl' className='icon'/>
                <FontAwesomeIcon icon={faSquareInstagram} size='xl' className='icon'/>
            </div>
        </div>
    </div>
  )
}
