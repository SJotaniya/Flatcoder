import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Components/User Pages/Home'
import Services from './Components/User Pages/Services'
import Technologies from './Components/User Pages/Technologies'
import Work from './Components/User Pages/Work'
import Blog from './Components/User Pages/Blog'
import AboutUs from './Components/User Pages/AboutUs'
import Contact from './Components/User Pages/Contact'

import Login from './Components/Admin Pages/Login'
import Dashboard from './Components/Admin Pages/Dashboard'
import AddBlog from './Components/Admin Pages/AddBlog'
import EditBlog from './Components/Admin Pages/ViewBlogs'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* User Pages */}
        <Route path="/" element={<Home/>} />
        <Route path="/services" element={<Services/>} />
        <Route path="/technologies" element={<Technologies/>} />
        <Route path="/work" element={<Work/>} />
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/blog" element={<Blog/>} />
        <Route path="/contact" element={<Contact/>} />

        {/* Admin Pages */}
        <Route path="/adminLogin" element={<Login/>} />
        <Route path="/adminDashboard" element={<Dashboard/>} />
        <Route path="/addBlog" element={<AddBlog/>} />
        <Route path="/viewBlogs" element={<EditBlog/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
