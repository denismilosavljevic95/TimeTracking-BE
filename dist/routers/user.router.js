"use strict";
// src/routers/user.router.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const filter_1 = require("express-validator/filter");
const check_1 = require("express-validator/check");
const user_rules_1 = require("../rules/user.rules");
const user_service_1 = require("../services/user.service");
const user_1 = require("../models/user");
exports.userRouter = (0, express_1.Router)();
const userService = new user_service_1.UserService();
exports.userRouter.post('/register', user_rules_1.userRules.forRegister, (req, res) => {
    const email = req.body.email;
    const tester = user_1.User.findOne({ where: { email } }).then((u) => {
        console.log('tester', u);
        return !!!u;
    });
    const errors = (0, check_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors.array());
    }
    const payload = (0, filter_1.matchedData)(req);
    const user = userService.register(payload);
    return user.then(u => res.json(u));
});
exports.userRouter.post('/login', user_rules_1.userRules.forLogin, (req, res) => {
    const errors = (0, check_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors.array());
    }
    const payload = (0, filter_1.matchedData)(req);
    const token = userService.login(payload);
    return token.then(t => res.json(t));
});
//# sourceMappingURL=user.router.js.map