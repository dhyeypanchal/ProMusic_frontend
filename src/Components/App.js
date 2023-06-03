import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Music from './Music';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from "./Signup"
import Playlist from './Playlist';
import Navbar from './Navbar';
import Contact from './Contact'; 
import MusicState from '../context/music/MusicState';

function App() {
  return (
    <MusicState>{/*this is compulsory to write if we use context*/}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navbar />}>
            <Route index element={<Music />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/playlist' element={<Playlist />} />
            <Route path='/contact' element={<Contact />} />
          </Route>
        </Routes>
      </BrowserRouter>{/*this is compulsory to write if we use context*/}
    </MusicState>
  );
}

export default App;
