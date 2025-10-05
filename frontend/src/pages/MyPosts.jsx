import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import { Context } from '../context/Context';

const MyPosts = () => {
    const [posts, setPosts] = useState([]);
    const { user } = useContext(Context);

    useEffect(() => {
        const fetchUserPosts = async () => {
            if (user) {
                try {
                    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts?user=${user.username}`);
                    setPosts(res.data);
                } catch (err) {
                    console.error("Failed to fetch your posts:", err);
                }
            }
        };
        fetchUserPosts();
    }, [user]);

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