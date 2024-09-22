import express from 'express';
import userRouter from './src/features/user/user.routes.js';
import postRouter from './src/features/post/post.routes.js';
import commentRouter from './src/features/comment/comment.routes.js';
import likeRouter from './src/features/like/like.routes.js';
import { ApplicationError } from './src/errorHandler/applicationError.js';
import dotenv from 'dotenv';
import loggerMiddleware from './src/middleware/logger.Middleware.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(loggerMiddleware);

app.use('/api', userRouter);
app.use('/api/posts', postRouter)
app.use('/api/comments', commentRouter);
app.use('/api/likes', likeRouter);

app.use((err, req, res, next) => {
    console.log(err);

    if (err instanceof ApplicationError) {
        return res.status(err.code).send(err.message)
    }

    return res.status(500).send("Something went wrong please try again later!");
})

export default app;