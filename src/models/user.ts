// src/models/user.ts

import { Model, DataTypes, Optional } from 'sequelize'
import { sequelize } from '../instances/sequelize'

export interface UserViewModel {
    id: number
    email: string
}

// We recommend you declare an interface for the attributes, for stricter typechecking
interface UserAttributes {
    id: number;
    email: string;
    password: string;
  }

// Some fields are optional when calling UserModel.create() or UserModel.build()
export interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

// We need to declare an interface for our model that is basically what our class would be
interface UserInstance
extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {}

export const User = sequelize.define<UserInstance>("User", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    email: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
}, {
    tableName: "User"
});

async function doStuff() {
    const instance = await User.findByPk(1, {
      rejectOnEmpty: true,
    });
}