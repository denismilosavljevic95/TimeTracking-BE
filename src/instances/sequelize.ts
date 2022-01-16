// src/instances/sequelize.ts

import { Sequelize } from 'sequelize';

const db = 'TimeTracking';
const username = 'root';
const password = 'root';

export const sequelize = new Sequelize(db, username, password, {
  dialect: "mysql",
  port: 3306,
});

sequelize.authenticate().then(() => {
    sequelize.sync().then(() => console.log('uspesno'))
   })
   .catch(err => {
    console.error('ERROR - Unable to connect to the database:', err)
   })