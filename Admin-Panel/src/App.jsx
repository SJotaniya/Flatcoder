import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Components/Pages/Login'
import Register from './Components/Pages/Register'
import Dashboard from './Components/Pages/Dashboard'
import AddBlog from './Components/Pages/AddBlog'
import ViewBlogs from './Components/Pages/ViewBlogs'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/addBlog' element={<AddBlog/>}/>
          <Route path='/viewBlogs' element={<ViewBlogs/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
