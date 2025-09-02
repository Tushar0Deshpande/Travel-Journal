const Post = require('../models/Post');

// CREATE POST
exports.createPost = async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
};

// UPDATE POST
exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            const updatedPost = await Post.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );
            res.status(200).json(updatedPost);
        } else {
            res.status(401).json("You can update only your post!");
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

// DELETE POST
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            await post.deleteOne();
            res.status(200).json("Post has been deleted.");
        } else {
            res.status(401).json("You can delete only your post!");
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

// GET A SINGLE POST
exports.getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
};

// GET ALL POSTS (PUBLIC FEED) OR BY USER
exports.getAllPosts = async (req, res) => {
    const username = req.query.user;
    try {
        let posts;
        if (username) {
            // If a username is in the query, find posts by that user
            posts = await Post.find({ username }).sort({ createdAt: -1 });
        } else {
            // If no username, find all posts from all users for the public feed
            posts = await Post.find().sort({ createdAt: -1 });
        }
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
};