import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ post }) => {
    const publicFolder = "http://localhost:5000/images/";

    // A default image if the post doesn't have one
    const postImage = post.photo
        ? publicFolder + post.photo
        : "https://via.placeholder.com/320x220?text=No+Image"; // Placeholder for consistency

    return (
        <div className="card">
            <Link to={`/post/${post._id}`}>
                <img src={postImage} alt={post.title} className="card-img" />
            </Link>
            <div className="card-content">
                <Link to={`/post/${post._id}`}>
                    <h3 className="card-title">{post.title}</h3>
                </Link>
                <span className="card-date">{new Date(post.createdAt).toDateString()}</span>
                <p className="card-desc">
                    {post.desc}
                </p>
            </div>
        </div>
    );
};

export default Card;