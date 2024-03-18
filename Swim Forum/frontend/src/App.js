import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FilterBar from "./components/FilterBar";
import DisplayPosts from './pages/DisplayPosts';
import './App.css';
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import CreatePost from "./pages/CreatePost";
import Calendar from "./pages/Calendar";
import Logout from "./pages/Logout";
import './components/axios';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/create_account' element={<CreateAccount />} />
        <Route path='/OnTheRoof' element={<DisplayPosts />} />
        <Route path='/filter' element={<FilterBar />} />
        <Route path='create_post' element={<CreatePost />} />
        <Route path='/calendar' element={<Calendar />} />
        <Route path='logout' element={<Logout/>}/>
      </Routes>
    </Router>
  );
}

export default App;