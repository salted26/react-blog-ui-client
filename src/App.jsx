import './App.css' 
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { TopBar } from './components/topbar/TopBar'
import { Home } from './pages/home/Home'
import { Login } from './pages/login/Login'
import { Register } from './pages/register/Register'
import { Settings } from './pages/settings/Settings'
import { Single } from './pages/single/Single'
import { Write } from './pages/write/Write'
import { useContext } from 'react'
import { Context } from './context/Context'

function App() {
  const {user} = useContext(Context);
  return (
    <>
    <BrowserRouter>
      <TopBar element={user}/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/register" element={user? <Home /> : <Register />} />
        <Route path="/settings" element={user? <Settings /> : <Register />} />
        <Route path="/post/:postId" element={<Single />} />
        <Route path="/write" element={user? <Write /> : <Login />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
