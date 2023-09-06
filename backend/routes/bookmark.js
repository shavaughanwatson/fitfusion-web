const express = require('express');
const router = express.Router();
const bookmarkController = require('../controllers/bookmarkController');
const authController = require('../controllers/authController');

router.use(authController.authenticateToken); // Middleware for authentication

router.post('/', bookmarkController.createBookmark);
router.get('/', bookmarkController.getAllBookmarks);
router.get('/:id', bookmarkController.getBookmarkById);
router.delete('/:id', bookmarkController.deleteBookmark);

module.exports = router;
