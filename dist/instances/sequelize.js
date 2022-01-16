"use strict";
// src/instances/sequelize.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const db = 'TimeTracking';
const username = 'root';
const password = 'root';
exports.sequelize = new sequelize_1.Sequelize(db, username, password, {
    dialect: "mysql",
    port: 3306,
});
exports.sequelize.authenticate().then(() => {
    exports.sequelize.sync().then(() => console.log('uspesno'));
})
    .catch(err => {
    console.error('ERROR - Unable to connect to the database:', err);
});
//# sourceMappingURL=sequelize.js.map