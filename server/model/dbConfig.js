import pg from 'pg';
import config from '../config/index';

// Create configurations for database
const dataConfig = {
  database: config.db.database,
  host: config.db.host,
  user: config.db.username,
  password: config.db.password,
  port: 5432,
};

const testConfig = {
  database: 'mydiary_test',
  host: 'localhost',
  user: 'postgres',
  password: ''
};

const pool = (process.env.NODE_ENV === 'test') ? new pg.Pool(testConfig) : new pg.Pool(dataConfig);

export default pool;