import express from 'express';
import CommentController from './comment.controller.js';
import jwtAuth from '../../middleware/jwt.Middleware.js';

const commentRouter = express.Router();
const commentController = new CommentController();

commentRouter.get('/:postID', commentController.getAll);
commentRouter.post('/:postID', jwtAuth, commentController.add);
commentRouter.delete('/:commentID', jwtAuth, commentController.delete);
commentRouter.put('/:commentID', jwtAuth, commentController.update);

export default commentRouter;