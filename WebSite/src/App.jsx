import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Components/Home'
import Services from './Components/Services'
import Technologies from './Components/Technologies'
import Work from './Components/Work'
import Blog from './Components/Blog'
import AboutUs from './Components/AboutUs'
import Contact from './Components/Contact'

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
