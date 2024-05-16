import './write.css'
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from 'axios';
import { useContext, useState } from 'react';
import Context from '../../context/Context';

export const Write = () => {
    const [ title, setTitle ] = useState("");
    const [ desc, setDesc ] = useState("");
    const [ file, setFile ] = useState("");
    const { user } = useContext(Context);

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const newPost={
            username:user.username,
            title,
            desc,
            file
        }
        if(file){
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            newPost.photo = filename;
            try {
                await axios.post("/upload", data);
            } catch (error) {
                
            }
        }
        try {
            const res = await axios.post("/posts", newPost);    
            window.location.replace("/post/"+res.data._id);
        } catch (error) {
            
        }
        
    }

  return (
    <div className="write">
        {file && (
            <img src={URL.createObjectURL(file)} 
            alt="" 
            className='writeImg'/>
        )}
        <form className="writeForm" onSubmit={handleSubmit}>
            <div className="writeFormGroup">
                <label htmlFor="fileInput">
                    <FontAwesomeIcon icon={faPlus} />
                </label>
                <input type="file" id="fileInput" 
                style={{display:"none"}} onChange={event=>setFile(event.target.files[0])}/>
                <input type="text" placeholder="Title" className='writeInput' autoFocus={true} 
                onChange={event=>setTitle(event.target.value)}/>
            </div>
            <div className="writeFormGroup">
                <textarea placeholder='Tell your story...' type="text" className='writeInput writeText'
                onChange={event=>setDesc(event.target.value)}>
                        
                </textarea>
            </div>
            <button className='writeSubmit' type="submit">pulish</button>
        </form>
    </div>
  )
}
