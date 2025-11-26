import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE!,
  process.env.MYSQL_USER!,
  process.env.MYSQL_PASSWORD!,
  {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
  }
);

const User = sequelize.define('User', {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  // add other fields as needed
});

export default User;
