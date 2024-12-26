import { useState } from 'react'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Home from './pages/Home'
import About from './pages/About'
import ArticleList from './pages/ArticleList'
import Article from './pages/Article'
import Navbar from './components/Navbar'
import Footer from './components/Footer'  //imported footer
import NotFound from './pages/NotFound'
import ProfilePage from  './pages/ProfilePage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div>
    <Navbar/>
      <div className="max-w-screen-md mx-auto pt-20">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/article-list" element={<ArticleList/>}/>
        <Route path="/article/:name" element={<Article/>}/>
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      </div>
      <Footer/> 
      </div>
      
    </Router>
  )
}

export default App
