import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ post }) => {
    const imageUrl = post.photo
        ? `${process.env.REACT_APP_API_URL}/images/${post.photo}`
        : "https://via.placeholder.com/320x220?text=No+Image";

    const formattedDate = post.createdAt
        ? new Date(post.createdAt).toDateString()
        : '';

    return (
        <div className="card">
            <Link to={`/post/${post._id}`}>
                <img src={imageUrl} alt={post.title} className="card-img" />
            </Link>
            <div className="card-content">
                <Link to={`/post/${post._id}`}>
                    <h3 className="card-title">{post.title}</h3>
                </Link>
                <span className="card-date">{formattedDate}</span>
                <p className="card-desc">{post.desc}</p>
            </div>
        </div>
    );
};

export default Card;