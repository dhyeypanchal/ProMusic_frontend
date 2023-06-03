import React, { useState, useContext } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import MusicContext from '../context/music/musicContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Navbar() {
  const navigate = useNavigate()
  const { getSongs, getPlaylistSongs } = useContext(MusicContext)
  // const props = context;
  // console.log(props);
  const location = useLocation()
  // const [search, setSearch] = useState()

  // const handleClick = (e) => {
  //   e.preventDefault()
  //   props.getSongs(search);
  // }

  // useEffect(()=>{
  //   // console.log("hello");
  //   // if (location.pathname==="/") {
  //   //   // getSongs(" ")
  //   // }
  //   // else if(location.pathname==="/playlist"){
  //   //   // getPlaylistSongs(" ")
  //   // }
  //   // setSearch("")
  // },[location.pathname])
  // const handleChange = (e) => {
  //   setSearch(e.target.value)
  // }
  const [search, setSearch] = useState("")
  // const host = "http://localhost:5000"

  // const getSongs = async (query) => {
  //   // API Call
  //   const response = await fetch(`${host}/music/search?search=${query}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-type": "application-json",
  //       "auth-token": localStorage.getItem('token')
  //     }
  //   })
  //   const json = await response.json();
  //   console.log(json);
  //   // setSearchSongs(json)
  // }

  // useEffect(() => {
  //   // if (location.pathname === "/playlist") {
  //   //   getPlaylistSongs("")
  //   // }
  //   // else if (location.pathname === "/") {
  //   //   getSongs("")
  //   // }
  //   // setSearch("")
  // }, [location.pathname])

  function handleChange(e) {
    setSearch(e.target.value)
    if (location.pathname === "/playlist") {
      console.log("playlist");
      getPlaylistSongs(e.target.value)
    }
    else if (location.pathname === "/") {
      console.log("music");
      console.log(e.target.value);
      getSongs(e.target.value)
    }
  }

  function handleClick(e) {
    e.preventDefault();
    // getSongs(search)
    // if (location.pathname === "/playlist") {
    //   getPlaylistSongs(search)
    // }
    if (location.pathname === "/") {
      getSongs(search)
    }
    setSearch("")
  }

  function hamburgerClick(e) {
    e.preventDefault()
    const search = document.getElementById("search")
    // search.classList.add("togglesearch")
    if (search.style.visibility !== "hidden") {
      search.style.visibility = "hidden";
    }
    else {
      search.style.visibility = "visible";
    }
  }

  function handleLogout(e) {
    e.preventDefault()
    setSearch("")
    getSongs("")
    localStorage.removeItem("token")
    toast.success("Successfully Logged Out");
    navigate("/login")
  }

  return (
    <>
      <nav id="navbar" className={`${location.pathname === "/login" ? "d-none" : ""} ${location.pathname === "/signup" ? "d-none" : ""}`}>
        <div id="logo">
          <i className="fa-sharp fa-solid fa-music"></i>
          <span>ProMusic</span>
        </div>
        <ul>
          <li className="item"><Link to="/" className={`home ${location.pathname === "/" ? "active border-bottom" : ""}`}>Home</Link></li>
          <li className="item"><Link to="/playlist" className={`${location.pathname === "/playlist" ? "active border-bottom" : ""}`}>Playlist</Link></li>
          <li className="item"><Link to="/contact" className={`${location.pathname === "/contact" ? "active border-bottom" : ""}`}>Contact</Link></li>
        </ul>
        <div className={`searchicon ${location.pathname === "/contact" ? "invisible" : ""} ${location.pathname === "/playlist" ? "invisible" : ""}`}>
          <i className="fa-solid fa-bars" onClick={hamburgerClick}></i>
        </div>
        <form id="search" className={`togglesearch form-inline my-2 my-lg-0 d-flex ${location.pathname === "/contact" ? "d-none" : ""} ${location.pathname === "/playlist" ? "d-none" : ""}`}>
          <input className="form-control mr-sm-2 mx-1" type="search" placeholder="🔍 Search" aria-label="Search" value={search} onChange={handleChange} />
          <button className="button btnhover" type="submit" onClick={handleClick}>Search</button>
          <button className="btnhover button2" style={{ marginLeft: "1rem" }} onClick={handleLogout}>Logout</button>
        </form>
        <div className={`item playlist ${location.pathname === "/playlist" ? "" : "d-none"}`}><span><h3 style={{ margin: "0", padding: "0", paddingLeft: "15.8rem", cursor: "pointer" }}>Playlist</h3></span></div>
        <div className={`item contact ${location.pathname === "/contact" ? "" : "d-none"}`}><h3 style={{ margin: "0", padding: "0", paddingLeft: "12.6rem", cursor: "pointer" }}>Contact Us</h3></div>
      </nav>
      <ToastContainer position='bottom-right' theme="colored" />
      <Outlet />
    </>
  )
}

export default Navbar;