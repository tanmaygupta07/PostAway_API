import express from 'express';
import userRouter from './src/features/user/user.routes.js';

const app = express();

app.use(express.json());

app.use('/api', userRouter);

export default app;