import express from 'express';
import UserController from './user.controller.js';

const userRouter = express.Router();
const userController = new UserController();

userRouter.post('/signup', userController.signup);
userRouter.post('/signin', userController.signin);
userRouter.get('/', userController.getAll);
userRouter.get('/:userID', userController.get);

export default userRouter;