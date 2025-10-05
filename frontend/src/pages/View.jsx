import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../context/Context';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const View = () => {
    const { id } = useParams();
    const [post, setPost] = useState({});
    const { user } = useContext(Context);
    const navigate = useNavigate();
    const publicFolder = `${import.meta.env.VITE_API_URL}/images/`;

    useEffect(() => {
        const getPost = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts/${id}`);
                setPost(res.data);
            } catch (err) {
                console.error("Failed to fetch post:", err);
            }
        };
        getPost();
    }, [id]);

    const handleDelete = async () => {
        try {
            if (user && post.username === user.username) {
                await axios.delete(`${import.meta.env.VITE_API_URL}/api/posts/${id}`, {
                    data: { username: user.username },
                });
                navigate('/');
            } else {
                alert("You are not authorized to delete this post.");
            }
        } catch (err) {
            console.error("Failed to delete post:", err);
        }
    };

    return (
        <div className="view-post-container">
            {post.photo ? (
                <img src={publicFolder + post.photo} alt={post.title} className="view-post-image" />
            ) : (
                <img src="https://via.placeholder.com/900x500?text=No+Image+Available" alt="Default" className="view-post-image" />
            )}

            <div className="view-post-header">
                <h1 className="view-post-title">{post.title}</h1>
                {post.username === user?.username && (
                    <div className="view-post-actions">
                        <span onClick={handleDelete} className="icon delete-icon"><FaTrashAlt /></span>
                    </div>
                )}
            </div>
            <div className="view-post-meta">
                <span className="view-post-author">Author: <b>{post.username}</b></span>
                <span>{new Date(post.createdAt).toDateString()}</span>
            </div>
            <p className="view-post-description">{post.desc}</p>
        </div>
    );
};

export default View;