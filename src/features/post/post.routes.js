import express from 'express';
import PostController from './post.controller.js';
import { upload } from '../../middleware/fileUploadMidleware.js';
import jwtAuth from '../../middleware/jwt.Middleware.js';

const postRouter = express.Router();
const postController = new PostController();

postRouter.get('/all', postController.getAll);
postRouter.get('/:id', postController.getByID);
postRouter.get('/', jwtAuth, postController.getByUser);
postRouter.post('/', jwtAuth, upload.single('image'), postController.addPost);
postRouter.delete('/:postID', jwtAuth, postController.delete);
postRouter.put('/:id', jwtAuth, upload.single('image'), postController.update);


export default postRouter;