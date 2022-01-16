// src/index.ts

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import Logger from './lib/logger';
import userRouter from './routers/user.router';
import timeRouter from './routers/time.router';
import { tokenGuard } from './middlewares/token-guard';

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Unprotected Get
app.use('/', userRouter);

app.use(tokenGuard());

// Protected Get
app.use('/', timeRouter);

app.listen(port, () => {
    Logger.info(`App is listening on port ${port}`);
});
