const router = require('express').Router();
const postController = require('../controllers/postController');

router.post("/", postController.createPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);
router.get("/:id", postController.getPost);
router.get("/", postController.getAllPosts);

module.exports = router;