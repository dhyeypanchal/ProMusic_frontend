import React, { useRef } from 'react'
import "./css/bottom.css"

function Audiobar({ songs, currentsong, isplaying, setisPlaying, audioElem, setCurrentSong, nowtime, totaltime, playlistsongs, showhide }) {
  const clickRef = useRef()

  const playPause = () => {
    if (songs.length > 0 && currentsong !== "") {
      setisPlaying(!isplaying)
    }
    if (songs.length === 0 && isplaying === true) {
      setisPlaying(!isplaying)
    }
  }


  // this is not working now
  const checkWidth = (e) => {
    let width = clickRef.current.clientWidth; // gives total width of this parent div tag.
    const offset = e.nativeEvent.offsetX; // this gives movement of width in x direction of child
    const divprogress = offset / width * 100;
    audioElem.current.currentTime = divprogress / 100 * currentsong.length

  }


  let seekbar = document.getElementsByClassName("seekbar")[0];
  const skipBack = () => {
    if (songs.length > 0 && currentsong !== "") {
      // above if condition is proper or not that i will check that it will not produce any error.
      if (songs.length === 1) {
        audioElem.current.currentTime = 0;
      }
      const index = songs.findIndex(x => x.songname === currentsong.songname)
      if (index === 0) {
        setCurrentSong(songs[songs.length - 1])
      }
      else {
        setCurrentSong(songs[index - 1])
      }
      if (index ===-1) {
        setCurrentSong(songs[0]) // this is needed for backup
      }
      setisPlaying(true)
      seekbar.style.width = 0;
      // console.log(index);
    }
  }

  // console.log(currentsong);
  const skipNext = () => {
    if (songs.length > 0 && currentsong !== "") {
      if (songs.length === 1) {
        audioElem.current.currentTime = 0;
      }
      // console.log(playlistsongs.length);
      const index = songs.findIndex(x => x.songname === currentsong.songname)
      if (index === songs.length - 1) {
        setCurrentSong(songs[0])
      }
      else {
        setCurrentSong(songs[index + 1])
      }
      // if (index ===-1) {
      //   setCurrentSong(songs[0]) // this is not needed first only for backup 
      // }
      setisPlaying(true)
      seekbar.style.width = 0;
    }
  }

  // this is useful for converting text to capital every first letter of word.
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


  function formatTime(nowtime) {
    var minutes = Math.floor(nowtime / 60);
    var secondsLeft = nowtime % 60;
    var result = "";

    if (minutes < 10) {
      result += "0";
    }
    result += minutes.toString() + ":";

    if (secondsLeft < 10) {
      result += "0";
    }
    result += secondsLeft.toString();
    return result;
  }

  return (
    <>

      {showhide ?
        <div className='d-flex justify-content-center'>
          <div className="bottom">
            <div className="range" style={{ width: "82%", height: "0.3rem", backgroundColor: "white", borderRadius: "0.2rem", textAlign: "center", cursor: "pointer" }} ref={clickRef} onClick={checkWidth}>
              <div className="seekbar" style={{ width: `${currentsong ? currentsong.progress + "%" : "0%"}`, height: "0.3rem", backgroundColor: "#cc00ff", borderRadius: "0.2rem" }} ><div></div></div>
            </div>
            {/* <input type="range" name="range" id="myProgressBar" min="0" max="100" height="1px" onChange={handleChange}/> here some updation must be done. */}
            <div className="icons">
              <i className="fas fa-3x fa-step-backward" id="previous" onClick={skipBack}></i>
              {isplaying ? <i className="far fa-3x fa-pause-circle" id="masterPlay" onClick={playPause}></i> : <i className="far fa-3x fa-play-circle" id="masterPlay" onClick={playPause}></i>}
              <i className="fas fa-3x fa-step-forward" id="next" onClick={skipNext}></i>
            </div>
            <div id='mastersongname'>{currentsong !== "" ? toTitleCase(currentsong.songname) : "Select Song"}</div>
            {/* <div className="slider">
              <div className="artists">
                {currentsong!=="" ? currentsong.artists.map((artists) => {
                  return (
                    <p className="card-title text-center" style={{ fontSize: "1rem", padding: "0", margin: "0" }}>{currentsong ? toTitleCase(artists) + " , " : "artists"}</p>
                  )
                }) : ""}
              </div> 
            </div> */}
            <div className="currenttime">
              <div>{formatTime(Math.round(nowtime)) !== "NaN:NaN" ? formatTime(Math.round(songs.length !== 0 ? nowtime : "00")) : "00:00"}</div>
            </div>
            <div className="totaltime">
              <div>{formatTime(Math.round(totaltime)) !== "NaN:NaN" ? formatTime(Math.round(songs.length !== 0 ? totaltime : "00")) : "00:00"}</div>
            </div>
          </div>
        </div> : ""
      }
    </>
  )
}

export default Audiobar