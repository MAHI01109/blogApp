import express from 'express'
import { postBlogs, getAllBlogs, getUserBlogs, getLatestBlogs, getPopularBlogs, getBlogBYslugId, getHotBlogs } from '../controllers/blogs.controller.js';
import { isAuthenticated } from '../middleware/auth.middleware.js';
import { createCategory, getBlogCategory } from '../controllers/common.controller.js';
import { upload } from '../middleware/multerFileUpload.middleware.js';

const router = express.Router();

router.route('/all-blogs').get(getAllBlogs);
router.route('/latest-blogs').get(getLatestBlogs);
router.route('/popular-blogs').get(getPopularBlogs);
router.route('/single-blog/:id').get(getBlogBYslugId);
router.route('/hot-blogs').get(getHotBlogs);

// common routes for blogs
router.route('/category').get(getBlogCategory);


//Protected Routes
router.route('/create-new').post(isAuthenticated,upload.single("thumbnailsImage"),postBlogs);
router.route('/user-blogs').get(isAuthenticated, getUserBlogs);


export default router

