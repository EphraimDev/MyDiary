import dotenv from 'dotenv';

dotenv.config();

const config = {
  env: process.env.NODE_ENV,
  db: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    url: process.env.DATABASE_URL,
  },
  test: {
      username: process.env.TEST_DB_USER,
      host: process.env.TEST_DB_HOST,
      database: process.env.TEST_DB_NAME,
      password: process.env.TEST_DB_PASS,
      port: process.env.PORT
  },
  jwtSecret: process.env.JWT_KEY,

  mail: {
    smtpConfig: {
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    },
  },

};
export default config;
