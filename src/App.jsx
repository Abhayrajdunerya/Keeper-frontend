import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Keeper from './components/Keeper'
import NoteState from './context/notes/NoteState'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


const App = () => {
  return (
    <div>
      <NoteState>
        <Router>
          <Header />
          <Routes>
            {/*---- Rout 1 ----*/}
            <Route exact path="/" element={<Home />} />
            {/*---- Rout 2 ----*/}
            <Route exact path="/login" element={<Login />} />
            {/*---- Rout 3 ----*/}
            <Route exact path="/register" element={<Register />} />
            {/*---- Rout 4 ----*/}
            <Route exact path="/notes" element={<Keeper />}
            />
          </Routes>
          <Footer />
        </Router>
      </NoteState>
    </div>
  )
}

export default App