import express from 'express';
import CommentController from './comment.controller.js';

const commentRouter = express.Router();
const commentController = new CommentController();

commentRouter.get('/:postID', commentController.getAll);
commentRouter.post('/:postID', commentController.add);
commentRouter.delete('/:commentID', commentController.delete);
commentRouter.put('/:commentID', commentController.update);

export default commentRouter;