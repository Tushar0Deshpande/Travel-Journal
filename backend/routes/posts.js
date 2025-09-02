const router = require('express').Router();
const postController = require('../controllers/postController');

// CREATE POST
router.post("/", postController.createPost);

// UPDATE POST
router.put("/:id", postController.updatePost);

// DELETE POST
router.delete("/:id", postController.deletePost);

// GET POST
router.get("/:id", postController.getPost);

// GET ALL POSTS
router.get("/", postController.getAllPosts);

module.exports = router;