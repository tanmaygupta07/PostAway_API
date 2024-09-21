import express from 'express';
import LikeController from './like.controller.js';

const likeRouter = express.Router();
const likeController = new LikeController();

likeRouter.get('/:postID', likeController.getAll);
likeRouter.get('/toggle/:postID', likeController.toggle);

export default likeRouter;