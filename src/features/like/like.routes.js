import express from 'express';
import LikeController from './like.controller.js';
import jwtAuth from '../../middleware/jwt.Middleware.js';

const likeRouter = express.Router();
const likeController = new LikeController();

likeRouter.get('/:postID', likeController.getAll);
likeRouter.get('/toggle/:postID', jwtAuth, likeController.toggle);

export default likeRouter;