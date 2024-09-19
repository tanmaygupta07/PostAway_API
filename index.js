import express from 'express';
import userRouter from './src/features/user/user.routes.js';
import postRouter from './src/features/post/post.routes.js';

const app = express();

app.use(express.json());

app.use('/api', userRouter);
app.use('/api/posts', postRouter)

export default app;