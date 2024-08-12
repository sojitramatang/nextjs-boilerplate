import { Sequelize } from 'sequelize'
import mysql2 from 'mysql2'

const sequelize = new Sequelize(process.env.database , process.env.username, process.env.password, {
  host: process.env.host || 'localhost',
  dialect: process.env.dialect || 'mysql',
  dialectModule: mysql2
});

sequelize.sync()

export default sequelize