// src/models/time.ts

import { Model, DataTypes, Optional } from 'sequelize'
import { sequelize } from '../instances/sequelize'
import { User } from '../models/user';

// We recommend you declare an interface for the attributes, for stricter typechecking
interface TimeAttributes {
    id: number;
    startDate: Date;
    endDate: Date;
    userID: number;
  }

// Some fields are optional when calling UserModel.create() or UserModel.build()
export interface TimeCreationAttributes extends Optional<TimeAttributes, "id" | "endDate"> {}

// We need to declare an interface for our model that is basically what our class would be
interface TimeInstance
extends Model<TimeAttributes, TimeCreationAttributes>,
    TimeAttributes {}

export const Time = sequelize.define<TimeInstance>("Time", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    startDate: {
        type: DataTypes.DATE,
    },
    endDate: {
        type: DataTypes.DATE,
    },
    userID: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        }
  }
}, {
    tableName: "Time"
});

// User.hasMany(Time)

async function doStuff() {
    const instance = await Time.findByPk(1, {
      rejectOnEmpty: true,
    });
}