import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../context/Context';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Importing icons

const View = () => {
    const { id } = useParams();
    const [post, setPost] = useState({});
    const { user } = useContext(Context);
    const navigate = useNavigate();
    const publicFolder = "http://localhost:5000/images/";

    useEffect(() => {
        const getPost = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
                setPost(res.data);
            } catch (err) {
                console.error("Failed to fetch post:", err);
                // Handle error, e.g., navigate to home or show a message
            }
        };
        getPost();
    }, [id]);

    const handleDelete = async () => {
        try {
            // Ensure the user trying to delete is the owner of the post
            if (user && post.username === user.username) {
                await axios.delete(`http://localhost:5000/api/posts/${id}`, {
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

    // Fallback image if post.photo is null or empty
    const displayImage = post.photo ? publicFolder + post.photo : "https://via.placeholder.com/900x500?text=No+Image+Available";


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
                        {/* <Link to={`/edit/${post._id}`} className="icon edit-icon"><FaEdit /></Link> */}
                        {/* NOTE: Edit functionality is not fully implemented in provided code, just the icon */}
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