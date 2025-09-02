// src/App.jsx

import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Create from './pages/Create';
import View from './pages/View';
import MyPosts from './pages/MyPosts'; // Import the new page
import { Context } from './context/Context';

function App() {
  const { user } = useContext(Context);

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Home is now public for everyone */}
        <Route path="/" element={<Home />} />
        
        {/* Login/Register routes redirect home if user is already logged in */}
        <Route path="/register" element={user ? <Home /> : <Register />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        
        {/* Protected routes that require a user to be logged in */}
        <Route path="/create" element={user ? <Create /> : <Login />} />
        <Route path="/myposts" element={user ? <MyPosts /> : <Login />} />
        
        {/* View post is public */}
        <Route path="/post/:id" element={<View />} />
      </Routes>
    </Router>
  );
}

export default App;