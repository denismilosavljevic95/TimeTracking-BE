"use strict";
// src/index.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const user_router_1 = require("./routers/user.router");
const token_guard_1 = require("./middlewares/token-guard");
const app = (0, express_1.default)();
const port = 4001;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use('/', user_router_1.userRouter);
// Unprotected Get
app.get('/', (req, res, next) => {
    res.json('Hello World');
});
app.use((0, token_guard_1.tokenGuard)());
// Protected Get
app.get('/some-protected-resource', (req, res, next) => {
    res.json('Protected Hello World');
});
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
//# sourceMappingURL=index.js.map