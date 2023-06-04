import React, { useEffect, useState, useRef, useContext } from 'react'
import Audiobar from './Audiobar';
import Card from './Card';
import { useNavigate } from 'react-router-dom';
import MusicContext from '../context/music/musicContext'

function PlaylistMusicItems({ playlist }) {
    const { getUser, name, getSuggestions, suggestions } = useContext(MusicContext)
    getUser()
    const [songs, setSongs] = useState([])
    const [playlistsongs, setPlaylistSongs] = useState([])
    // this is for passing to the audiobar components
    const [nowtime, setnowtime] = useState()
    const [totaltime, settotaltime] = useState()
    const [currentsong, setCurrentSong] = useState("")
    const [showhide, setshowhide] = useState(false) //if i do false so audiobar disapear at first time


    const setmusic = (music, playlistsongs,playlistsection) => {
        // console.log(playlistsection);
        if (playlistsection) {       
            // console.log("hello");
            setshowhide(true)
            // setSongs(playlistsongs) //after changing this search functionality works
            setPlaylistSongs(playlistsongs)
            setCurrentSong(music)
        }
        else{
            setCurrentSong(music)
            setshowhide(true)
            // console.log("else");
        }
    }

    let greeting = "Have a good day";
    let now = new Date().getHours();
    const [time, settime] = useState(now)
    const findTime = () => {
        const newTime = new Date().getHours();
        settime(newTime)
    }
    setInterval(findTime, 1000);
    if (time < 12) {
        greeting = "Good Morning"
    }
    else if (time >= 12 && time <= 17) {
        greeting = "Good Afternoon"
    }
    else if (time > 17 && time <= 20) {
        greeting = "Good Evening"
    }
    else {
        greeting = "Good Night"
    }



    const host = "https://promusic-backend.onrender.com"

    const navigate = useNavigate();
    useEffect(() => {
        // above is for suggetions section
        const suggestions1 = JSON.parse(localStorage.getItem('suggestions') || '[]');
        const [artist1, artist2, artist3, artist4, artist5] = suggestions1;
        getSuggestions(artist1, artist2, artist3, artist4, artist5)


        const getSongs = async () => {
            // API Call
            const response = await fetch(`${host}/playlist`, {
                method: "GET",
                headers: {
                    "Content-type": "application-json",
                    "auth-token": localStorage.getItem('token')
                }
            })
            const json = await response.json();
            // if (searchResult.length === 0 && location.pathname==="/playlist") {
            setSongs(json)
            // }
            // else {
            // setSongs(searchResult)
            // console.log("hello");
            // }
            // setSongs(json)
            // console.log(json);
            // json.map((item)=>{ 
            //     return (
            //     setCurrentSong((prevItem)=>{
            //         return [...prevItem,item.audio];
            //     })
            //     )
            // })
        }
        if (localStorage.getItem("token")) {
            getSongs();
        }
        else {
            navigate("/")
        }
        // eslint-disable-next-line
    }, [playlistsongs,songs]) // i did change this to searchResult for working search functionality, now from songs to playlistsongs

    const [isplaying, setisPlaying] = useState(false)

    const audioElem = useRef()
    useEffect(() => {
        if (isplaying) {
            audioElem.current.play()
        }
        else {
            audioElem.current.pause()
        }
    })

    const onPlaying = () => {
        const duration = audioElem.current.duration; // this will give a duration of the song
        const ct = audioElem.current.currentTime; // this will give the current time of the song is completed.
        // console.log(duration, ct);
        setCurrentSong({ ...currentsong, "progress": ct / duration * 100, "length": duration })
        setnowtime(audioElem.current.currentTime)
        settotaltime(audioElem.current.duration)
    }



    return (
        <div>
            <div className={`${showhide ? "scroll" : "scrollmore"}`}>
                <h1 className='container' style={{ fontSize: "2rem" }}> Welcome {name}</h1>
                <h2 className='container' style={{ color: "#c67dc6", fontSize: "1.8rem" }}>{greeting}</h2>
                <div className="container">
                    <hr />
                </div>
                <div className="scrollcard">
                    <div className='musicItem container' style={{ overflowY: "none" }}>
                        {songs.length >0 ? songs.map((item, id) => { // here i change length >=0 to >0
                            return (
                                <Card key={id} item={item} setmusic={setmusic} isplaying={isplaying} setisPlaying={setisPlaying} playlist={playlist} songs={songs} playlistsection="true"/> // by this we show particular amount of song but the problem is previous and next button work for all the song and that is okay
                            )
                        }) : <h3 style={{ color: "grey", fontSize: "1.5rem" }}>No Songs in Playlist</h3>}
                    </div>
                </div>
                <h2 className='container' style={{ paddingTop: "1rem", color: "#c67dc6", fontSize: "1.8rem" }}>Songs You May Like</h2>
                <div className="container">
                    <hr />
                </div>
                <div className='musicItem container' style={{ overflowY: "none" }}>
                    {suggestions.length > 0 ? suggestions.map((item, id) => {
                        return (
                            <Card key={id} item={item} setmusic={setmusic} isplaying={isplaying} setisPlaying={setisPlaying} songs={songs} playlist={playlist} iconhide="true"/>
                        )
                    }) : <h3 style={{ color: "grey" }} className='container'>You Haven't Play Any Song Till Now</h3>}
                </div>
            </div>
            <audio src={currentsong ? currentsong.audio : ``} ref={audioElem} onTimeUpdate={onPlaying} /> {/* this onTimeUpdate function run everytime as time goes*/}
            <Audiobar songs={songs} currentsong={currentsong} isplaying={isplaying} setisPlaying={setisPlaying} audioElem={audioElem} setCurrentSong={setCurrentSong} nowtime={nowtime} totaltime={totaltime} playlistsongs={playlistsongs} showhide={showhide} />
        </div>
    )
}

export default PlaylistMusicItems