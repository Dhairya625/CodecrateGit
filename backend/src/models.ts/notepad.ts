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

const Notepad = sequelize.define('Notepad', {
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: true },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

export default Notepad;