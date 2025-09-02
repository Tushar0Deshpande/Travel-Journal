// src/pages/Home.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/Card';

const Home = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchAllPosts = async () => {
            try {
                // This fetch call has NO username, so it gets all posts from everyone
                const res = await axios.get("http://localhost:5000/api/posts");
                setPosts(res.data);
            } catch (err) {
                console.error("Failed to fetch posts:", err);
            }
        };
        fetchAllPosts();
    }, []); // Empty dependency array means this runs once on component mount

    return (
        <div className="container">
            <h1 className="home-title">Discover Travel Journals</h1>
            <div className="posts-grid">
                {posts.length > 0 ? (
                    posts.map(p => <Card key={p._id} post={p} />)
                ) : (
                    <p className="no-posts-message">No journals have been posted yet. Be the first!</p>
                )}
            </div>
        </div>
    );
};

export default Home;