import express from 'express';
import PostController from './post.controller.js';
import { upload } from '../../middleware/fileUploadMidleware.js';

const postRouter = express.Router();
const postController = new PostController();

postRouter.get('/all', postController.getAll);
postRouter.get('/:id', postController.getByID);
postRouter.post('/', postController.getByUser);
postRouter.post('/add', upload.single('image'), postController.addPost);
postRouter.post('/:postID', postController.delete);
postRouter.put('/update', upload.single('image'), postController.update);


export default postRouter;