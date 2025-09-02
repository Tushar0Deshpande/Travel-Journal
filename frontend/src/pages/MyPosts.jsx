    // src/pages/MyPosts.jsx

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import { Context } from '../context/Context';

const MyPosts = () => {
    const [posts, setPosts] = useState([]);
    const { user } = useContext(Context);

    useEffect(() => {
        const fetchUserPosts = async () => {
            // This fetch call includes the username to get only the user's posts
            if (user) {
                try {
                    const res = await axios.get(`http://localhost:5000/api/posts?user=${user.username}`);
                    setPosts(res.data);
                } catch (err) {
                    console.error("Failed to fetch your posts:", err);
                }
            }
        };
        fetchUserPosts();
    }, [user]); // Dependency on user is crucial here

    return (
        <div className="container">
            <h1 className="home-title">My Travel Journals</h1>
            <div className="posts-grid">
                {posts.length > 0 ? (
                    posts.map(p => <Card key={p._id} post={p} />)
                ) : (
                    <p className="no-posts-message">You haven't created any journals yet. Let's change that!</p>
                )}
            </div>
        </div>
    );
};

export default MyPosts;