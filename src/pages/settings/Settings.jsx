import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SideBar } from '../../components/sidebar/SideBar'
import './settings.css'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { useContext, useState } from 'react'
import Context from '../../context/Context'
import axios from 'axios'

export const Settings = () => {
    const { user, dispatch } = useContext(Context);
    const [ file, setFile ] = useState();
    const [ username, setUsername ] = useState();
    const [ email, setEmail ] = useState();
    const [ password, setPassword ] = useState();
    const [ success, setSuccess ] = useState(false);
    const PF = "http://localhost:5000/images/"

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const updatedUser = {
            userId: user._id,
            username,
            email,
            password,
        }
        if(file){
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            updatedUser.profilePic = filename;
            try {
                await axios.put("/upload", data);
                setSuccess(true);
            } catch (error) {
                setSuccess(false);
            }
        }
        try {
            await axios.put("/users/"+user._id, updatedUser);    
            setSuccess(true);
        } catch (error) {
            console.log("404 error")
        }
    }

    const handleDelete = async() => {
        if(window.confirm("삭제하시겠습니까?")){
            try {
                await axios.delete("/users/"+user._id);
                alert(`${user.username}, ${user._id}가 삭제되었습니다.`)
                dispatch({type:"LOGOUT" });
                window.location.replace("/");
            } catch (error) {
            
            }

        } else {
            return false;
        }
      }

  return (
    <div className='settings'>
        <div className="settingsWrapper">
            <div className="settingsTitle">
                <span className="settingsUpdateTitle">Update Your Account</span>
                <span className="settingsDeleteTitle" onClick={handleDelete}>Delete Your Account</span>
            </div>
            <form className="settingsForm" onSubmit={handleSubmit}>
                <label>Profile Picture</label>
                <div className="settingsPP">
                    <img src={file ? URL.createObjectURL(file) : PF+user.profilePic} alt="" 
                    className='profileImg'/>
                    <label htmlFor="fileInput">
                        <FontAwesomeIcon icon={faUser} />
                    </label>
                    <input type="file" id="fileInput" 
                    style={{display:"none"}} onChange={event=>setFile(event.target.files[0])}/>
                </div>
                <label>Username</label>
                <input type="text" placeholder={user.username}
                    onChange={event=>setUsername(event.target.value)}/>
                <label>Email</label>
                <input type="text" placeholder={user.email}
                    onChange={event=>setEmail(event.target.value)}/>
                <label>Password</label>
                <input type="password" placeholder="password"
                    onChange={event=>setPassword(event.target.value)}/>
                <button className="settingsSubmit" type="submit">Submit</button>
                {success && <span style={{color:"green", textAlign:"center", marginTop:"15px"}}> Profile updated success </span> }
            </form>
        </div>
        <SideBar />
    </div> 
  )
}
