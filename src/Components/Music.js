import React from 'react'
import "./css/music.css"
import "./css/navbar.css"
import MusicItems from './MusicItems'
import { useNavigate } from 'react-router-dom'

function Music() {
  const navigate = useNavigate();
  if (!localStorage.getItem("token")) {
    navigate("/login")
  }
  return (
    <div className="body">
      <MusicItems/>
    </div>
  )
}

export default Music
