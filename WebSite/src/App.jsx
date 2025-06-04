import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Components/Pages/Home'
import Services from './Components/Pages/Services'
import Technologies from './Components/Pages/Technologies'
import Work from './Components/Pages/Work'
import Blog from './Components/Pages/Blog'
import AboutUs from './Components/Pages/AboutUs'
import Contact from './Components/Pages/Contact'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/services" element={<Services/>} />
        <Route path="/technologies" element={<Technologies/>} />
        <Route path="/work" element={<Work/>} />
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/blog" element={<Blog/>} />
        <Route path="/contact" element={<Contact/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
