import './header.css'

export const Header = () => {
  return (
    <div className='header'>
      <div className="headerTitles">
        <span className='headerTitleSm'>React &nbsp;&nbsp; & &nbsp;&nbsp; Node</span>
        <span className='headerTitleLg'>Blog</span>
      </div>
      <img className="headerImg" src="https://images.pexels.com/photos/286763/pexels-photo-286763.jpeg" alt="" />
    </div>
  )
}
