// src/services/user.service.ts

import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User, UserCreationAttributes } from '../models/user';

export class UserService {
    private readonly _saltRounds = 12;
    private readonly _jwtSecret = '0.rfyj3n9nzh';

    static get userAttributes() {
        return ['id', 'email'];
    }
    private static _user: any;
    static get user() {
        return UserService._user;
    }

    register({ email, password }: UserCreationAttributes) {
        return bcrypt.hash(password, this._saltRounds)
            .then(hash => {
                return User.create({ email, password: hash })
                    .then((user: any) => this.getUserById(user.id));
            });
    }

    login({ email, password }: UserCreationAttributes) {
        return User.findOne({ where: { email } }).then((user: { id: number; password: string }) => {
            const { id, password: passwordUser } = user;
            return bcrypt.compare(password, passwordUser)
                .then((result: boolean) => {
                    if (result) {
                        return { token: jwt.sign({ id, email }, this._jwtSecret) };
                    } else {
                        return {error: "Bad password"}
                    }
                })
        });
    }

    verifyToken(token: string) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, this._jwtSecret, (err, decoded) => {
                if (err) {
                    resolve(false);
                    return;
                }

                UserService._user = User.findByPk(decoded.id);
                resolve(true);
                return;
            });
        }) as Promise<boolean>;
    }

    getUserById(id: number) {
        return User.findByPk(id, {
            attributes: UserService.userAttributes
        })
    }
}