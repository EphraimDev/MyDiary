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
  database: config.test.name,
  host: config.test.host,
  user: config.test.username,
  password: config.test.password
};

const pool = (process.env.NODE_ENV === 'test') ? new pg.Pool(testConfig) : new pg.Pool(dataConfig);

export default pool;