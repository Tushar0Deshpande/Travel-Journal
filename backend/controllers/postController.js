const Post = require('../models/Post');

exports.createPost = async (req, res) => {
    try {
        const newPost = new Post(req.body);
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json("Post not found!");
        }

        if (post.username !== req.body.username) {
            return res.status(401).json("You can update only your post!");
        }

        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json("Post not found!");
        }

        if (post.username !== req.body.username) {
            return res.status(401).json("You can delete only your post!");
        }

        await post.deleteOne();
        res.status(200).json("Post has been deleted.");
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json("Post not found!");
        }
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getAllPosts = async (req, res) => {
    const { user: username } = req.query;
    try {
        const query = username ? { username } : {};
        const posts = await Post.find(query).sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
};