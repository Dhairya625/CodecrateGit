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

const Todo = sequelize.define('Todo', {
  title: { type: DataTypes.STRING, allowNull: false },
  completed: { type: DataTypes.BOOLEAN, defaultValue: false },
});

export default Todo; 