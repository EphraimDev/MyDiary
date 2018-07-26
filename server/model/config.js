import { Pool } from 'pg';
import config from '../config';

const user = config.db.username;
const host = config.db.host;
const database = config.db.database;
const password = config.db.password;

const connectionString = `postgres://${user}:${password}@${host}:5432/${database}`;

const pool = (process.env.NODE_ENV === 'test') ? new Pool(config.test) : new Pool({connectionString});

export default pool;
