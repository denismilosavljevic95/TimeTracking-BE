// src/index.ts

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { userRouter } from './routers/user.router';
import { tokenGuard } from './middlewares/token-guard';

const app = express();
const port = 4001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/', userRouter);

// Unprotected Get
app.get('/', (req, res, next) => {
    res.json('Hello World');
});

app.use(tokenGuard());

// Protected Get
app.get('/some-protected-resource', (req, res, next) => {
    res.json('Protected Hello World');
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});