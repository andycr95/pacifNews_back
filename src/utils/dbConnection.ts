import { Sequelize } from 'sequelize';
import { ORACLE_DB, ORACLE_USER, ORACLE_HOST, ORACLE_PASSWORD } from './config';

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(ORACLE_DB, ORACLE_USER, ORACLE_PASSWORD, {
  host: ORACLE_HOST,
  dialect: 'oracle'
});

async function connection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

export default connection;