import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Context } from '../context/Context';
import { useNavigate } from 'react-router-dom';
// Import a simple plus icon for the file input
import { FaPlusCircle } from 'react-icons/fa';


const Create = () => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [file, setFile] = useState(null);
    const { user } = useContext(Context);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            username: user.username,
            title,
            desc,
        };

        if (file) {
            const data = new FormData();
            const filename = Date.now() + "_" + file.name; // Added underscore for better filename
            data.append("name", filename);
            data.append("file", file);
            newPost.photo = filename;
            try {
                // IMPORTANT: Ensure your backend's multer setup saves files to the 'images' folder
                // and that the 'images' folder is served statically.
                await axios.post("http://localhost:5000/api/upload", data);
            } catch (err) {
                 console.error("Image upload failed:", err);
                 // Optionally, you might want to show an error message to the user here
            }
        }

        try {
            const res = await axios.post("http://localhost:5000/api/posts", newPost);
            navigate(`/post/${res.data._id}`);
        } catch (err) {
             console.error("Post creation failed:", err);
             // Optionally, show an error message for post creation
        }
    };

    return (
        <div className="create-post-container">
            <h2>Create New Journal Entry</h2>
            {file && (
                 <img src={URL.createObjectURL(file)} alt="Preview" className="create-post-image-preview"/>
            )}
            <form onSubmit={handleSubmit}>
                <div className="create-post-form-group">
                    <label htmlFor="fileInput" className="file-input-label">
                        <FaPlusCircle /> Add Image
                    </label>
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: 'none' }}
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                </div>
                 <div className="create-post-form-group">
                    <input
                        type="text"
                        placeholder="Title your adventure..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <div className="create-post-form-group">
                    <textarea
                        placeholder="Tell your story of this journey..."
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        required
                        className="form-textarea"
                    ></textarea>
                </div>
                <button type="submit" className="form-button create-post-button">
                    Publish Journey
                </button>
            </form>
        </div>
    );
};

export default Create;