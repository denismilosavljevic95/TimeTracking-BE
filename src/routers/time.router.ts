// src/routers/time.router.ts

import { Router, Request, Response } from 'express';
import { matchedData } from 'express-validator/filter';
import { validationResult } from 'express-validator/check';
import { timeRules } from '../rules/time.rules';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

const timeRouter = Router();
const userService = new UserService();

timeRouter.get('/time', [], (req: Request, res: Response) => {
    return res.status(200).json({"key": "value"});
});

timeRouter.post('/time', [], (req: Request, res: Response) => {
    return res.status(200).json({"key": "value"});
});

timeRouter.patch('/time', [], (req: Request, res: Response) => {
    return res.status(200).json({"key": "value"});
});

export default timeRouter;