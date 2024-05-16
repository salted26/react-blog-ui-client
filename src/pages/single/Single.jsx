import { SideBar } from '../../components/sidebar/SideBar'
import { SinglePost } from '../../components/singlePost/SinglePost'
import './single.css'

export const Single = () => {
  return (
    <div className='single'>
        {/* post */}
        <SinglePost />
        <SideBar />
    </div>
  )
}
