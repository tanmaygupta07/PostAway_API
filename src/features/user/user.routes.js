import express from 'express';
import UserController from './user.controller.js';
import jwtAuth from '../../middleware/jwt.Middleware.js';

const userRouter = express.Router();
const userController = new UserController();

userRouter.post('/signup', userController.signup);
userRouter.post('/signin', userController.signin);

export default userRouter;