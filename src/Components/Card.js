import React, { useState } from 'react'
import logo from "./images/logo.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// https://i.pinimg.com/originals/7e/c1/11/7ec111864f7539dce5362ccf235b61a4.png this is logo link
function Card({ item, setmusic, isplaying, setisPlaying, playlist, iconhide, playlistsection }) {


  // this is for finding suggestions from backend


  const [playlistsongs, setPlaylist] = useState(item)
  const host = "https://promusic-backend.onrender.com"
  function toTitleCase(str) {
    const titleCase = str
      .toLowerCase()
      .split(' ')
      .map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');

    return titleCase;
  }

  const playPause = (song) => {
    setisPlaying(!isplaying)
    if (isplaying === false) {
      const storedRecentSongs = JSON.parse(localStorage.getItem('recentSongs') || '[]');
      if (storedRecentSongs.length > 0) {
        const isObjectNotInLocalStorage = (itemName, objectProperty, objectValue) => {
          const itemsFromLocalStorage = JSON.parse(localStorage.getItem(itemName));

          // If there are no items in local storage, or the object is not in the array, return true
          if (!itemsFromLocalStorage || !itemsFromLocalStorage.some(item => item[objectProperty] === objectValue)) {
            const findSong = JSON.parse(localStorage.getItem('recentSongs') || '[]')
            if (findSong.length < 16) {
              findSong.push(song)
              localStorage.setItem('recentSongs', JSON.stringify(findSong));
            }
            else {
              findSong.shift();
              findSong.push(song);
              localStorage.setItem('recentSongs', JSON.stringify(findSong));
            }
            return true;
          }
          return false;
        }
        isObjectNotInLocalStorage("recentSongs", "songname", song.songname)
      }
      else {
        localStorage.setItem('recentSongs', JSON.stringify([song]));
      }

      // this is for suggestions
      const suggestions = JSON.parse(localStorage.getItem('suggestions') || '[]');
      if (suggestions.length > 0) {
        const isObjectNotInLocalStorage = (itemName, objectProperty, objectValue) => {
          const itemsFromLocalStorage = JSON.parse(localStorage.getItem(itemName));

          // If there are no items in local storage, or the object is not in the array, return true
          if (!itemsFromLocalStorage || !itemsFromLocalStorage.some(item => item[objectProperty] === objectValue)) {
            const findArtists = JSON.parse(localStorage.getItem('suggestions') || '[]')
            if (findArtists.length < 8) {
              findArtists.push(song.artists[0])
              findArtists.push(song.artists[1])
              localStorage.setItem('suggestions', JSON.stringify(findArtists));
            }
            else {
              findArtists.shift();
              findArtists.shift();
              findArtists.push(song.artists[0]);
              findArtists.push(song.artists[1]);
              localStorage.setItem('suggestions', JSON.stringify(findArtists));
            }
            // console.log("not there");
            return true;
          }
          return false;
        }
        isObjectNotInLocalStorage("suggestions", "artists", song.artists)
      }
      else {
        localStorage.setItem('suggestions', JSON.stringify([song.artists[0]]));
      }

    }
  }




  const addToPlaylist = async () => {
    try {
      // Send a POST request to the server to add the new song to the database
      const response = await fetch(`${host}/playlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ songname: item.songname, audio: item.audio, movie: item.movie, artists: item.artists })
      });

      if (!response.ok) {
        throw new Error('Already in Playlist');
      }
      else {
        toast.success("successfully added to the playlist")
      }
    } catch (error) {
      // console.log(error);
      toast.error(error.message);
    }
  }

  const deleteFromPlaylist = async (id) => {
    // console.log(item._id);
    const response = await fetch(`${host}/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application-json",
        "auth-token": localStorage.getItem('token')
      }

    })
    await response.json();

    const newPlaylist = playlistsongs.length >= 0 ? playlistsongs.filter((playlistsongs) => {
      return playlistsongs._id !== id;
    }) : playlistsongs
    setPlaylist(newPlaylist)
  }


  return (
    <div className="card mx-2 my-2" style={{ width: "9.1rem", border: "0px" }} onClick={() => setmusic(item, playlistsongs, playlistsection)}>
      <img className="card-img-top" src={logo} style={{ height: "7rem", boxShadow: "0px 0px 1rem rgb(151, 149, 149)", objectFit: "cover" }} alt="" />
      <p className="card-title text-center" style={{ fontSize: "1rem", padding: "0", margin: "0" }}>{item ? toTitleCase(item.songname.length >= 15 ? item.songname.slice(0, 15) + "..." : item.songname) : "song"}</p>
      <div className="slider">
        <div className="artists">
      {item ? item.artists.map((artists, id) => {
        return (
          <p key={id} className="card-title text-center" style={{ fontSize: "1rem", padding: "0", margin: "0" }}>{item ? toTitleCase(artists)+" , " : "artists"}</p>
        )
      }) : ""}
        </div>
      </div>
      <div className='hoverplay'>
        {isplaying ? <i className="far fa-2x fa-pause-circle" onClick={playPause} disabled={playlistsongs.length === 0}></i> : <i className="far fa-2x fa-play-circle" onClick={() => playPause(item)} disabled={playlistsongs.length === 0}></i>}
      </div>
      {iconhide === undefined ?
        <div className="hovertoadd">
          {playlist ? <i className="fa-solid fa-trash" onClick={() => deleteFromPlaylist(item._id)}></i> : <i className="fa-solid fa-heart" onClick={addToPlaylist}></i>}
        </div>
        : ""}
      <ToastContainer position='bottom-right' theme="colored" />
    </div>
  )
}

export default Card