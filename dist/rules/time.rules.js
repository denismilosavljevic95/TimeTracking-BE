"use strict";
// src/rules/user.rules.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeRules = void 0;
const bcrypt = __importStar(require("bcrypt"));
const check_1 = require("express-validator/check");
const user_1 = require("../models/user");
exports.timeRules = {
    forRegister: [
        (0, check_1.check)('email')
            .isEmail().withMessage('Invalid email format')
            .custom(email => user_1.User.findOne({ where: { email } }).then((u) => !!!u)).withMessage('Email exists'),
        (0, check_1.check)('password')
            .isLength({ min: 8 }).withMessage('Invalid password'),
        (0, check_1.check)('confirmPassword')
            .custom((confirmPassword, { req }) => req.body.password === confirmPassword).withMessage('Passwords are different')
    ],
    forLogin: [
        (0, check_1.check)('email')
            .isEmail().withMessage('Invalid email format')
            .custom(email => user_1.User.findOne({ where: { email } }).then(u => !!u)).withMessage('Invalid email or password'),
        (0, check_1.check)('password')
            .custom((password, { req }) => {
            return user_1.User.findOne({ where: { email: req.body.email } })
                .then(u => bcrypt.compare(password, u.password));
        }).withMessage('Invalid email or password')
    ]
};
//# sourceMappingURL=time.rules.js.map