const sequelize = require("sequelize");

const db = new sequelize(process.env.POSTGRES_URL);

const User = db.define("User", {
  name: sequelize.STRING,
  email: sequelize.STRING,
  password: sequelize.STRING,
});

db.sync({
  force: true,
});

module.exports = User;
