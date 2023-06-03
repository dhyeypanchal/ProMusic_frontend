import { useState } from "react";
import MusicContext from "./musicContext";

const MusicState = (props) => {
    const host = "https://promusic-backend.onrender.com"
    const songsInitial = []
    const [searchResult, setSearchSongs] = useState(songsInitial)
    const [suggestions, setSuggestionSongs] = useState(songsInitial)
    const [name, setName] = useState("")

    const getSongs = async (query) => {
        // API Call
        const response = await fetch(`${host}/music/search?search=${query}`, {
            method: "GET",
            headers: {
                "Content-type": "application-json",
                "auth-token": localStorage.getItem('token')
            }
        })
        const json = await response.json();
        setSearchSongs(json)
    }
    const getPlaylistSongs = async (query) => {
        // API Call
        const response = await fetch(`${host}/playlist/search?search=${query}`, {
            method: "GET",
            headers: {
                "Content-type": "application-json",
                "auth-token": localStorage.getItem('token')
            }
        })
        const json = await response.json();
        setSearchSongs(json)
    }
    const getUser = async () => {
        // API Call
        const response = await fetch(`${host}/auth/getuser`, {
            method: "GET",
            headers: {
                "Content-type": "application-json",
                "auth-token": localStorage.getItem('token')
            }
        })
        const json = await response.json();
        setName(json.name)
    }
// for finding suggestions
    const getSuggestions = async (artist1,artist2,artist3,artist4,artist5) => {
        // API Call
        const response = await fetch(`${host}/suggetions?artist1=${artist1}&artist2=${artist2}&artist3=${artist3}&artist4=${artist4}&artist5=${artist5}`, {
            method: "GET",
            headers: {
                "Content-type": "application-json",
                "auth-token": localStorage.getItem('token')
            }
        })
        const json = await response.json();
        setSuggestionSongs(json)
    }



    return (
        <MusicContext.Provider value={{ searchResult, getSongs, getPlaylistSongs,name,getUser,getSuggestions,suggestions }}>
            {props.children}
        </MusicContext.Provider>
    )
}

export default MusicState;