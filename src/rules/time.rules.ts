// src/rules/user.rules.ts

import * as bcrypt from 'bcrypt';
import { check } from 'express-validator/check';
import { User } from '../models/user';

export const timeRules = {
  forRegister: [
    check('email')
      .isEmail().withMessage('Invalid email format')
      .custom(email => User.findOne({ where: { email } }).then((u: any) => !!!u)).withMessage('Email exists'),
    check('password')
      .isLength({ min: 8 }).withMessage('Invalid password'),
    check('confirmPassword')
      .custom((confirmPassword, { req }) => req.body.password === confirmPassword).withMessage('Passwords are different')
  ],
  forLogin: [
    check('email')
      .isEmail().withMessage('Invalid email format')
      .custom(email => User.findOne({ where: { email } }).then(u => !!u)).withMessage('Invalid email or password'),
    check('password')
      .custom((password, { req }) => {
        return User.findOne({ where: { email: req.body.email } })
          .then(u => bcrypt.compare(password, u.password));
      }).withMessage('Invalid email or password')
  ]
};