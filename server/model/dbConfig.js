import pg from 'pg';
import dotenv from 'dotenv';

// Configure dotenv
dotenv.config();

// Create configurations for database
const dataConfig = {
  database: 'MyDiary',
  host: process.env.DB_HOST,
  user: 'andela',
  password: process.env.DB_PASSWORD,
  port: 5432,
};

const testConfig = {
  database: process.env.TEST_DB_NAME,
  host: process.env.TEST_DB_HOST,
  user: process.env.TEST_DB_USER,
  password: process.env.TEST_DB_PASS,
  port: 5432,
};

const pool = (process.env.NODE_ENV === 'test') ? new pg.Pool(testConfig) : new pg.Pool(dataConfig);

export default pool;