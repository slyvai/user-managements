import {Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import EditUser from './pages/EditUser'
import './styles/Home.css'
import './styles/Modal.css'
import './styles/Edit.css'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path ="/:userId" element={<EditUser />} />
      </Routes>
    </>
  )
}

export default App
