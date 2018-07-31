import dotenv from 'dotenv';

dotenv.config();

const config = {
  db: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    url: process.env.DATABASE_URL,
  },
  test: {
      username: process.env.TEST_DB_USER,
      password: process.env.TEST_DB_PASS,
      name: process.env.TEST_DB_NAME,
      host: process.env.TEST_DB_HOST,
  },
  jwtSecret: process.env.JWT_KEY,

  mail: {
    smtpConfig: {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'fortestingprojects2018@gmail.com',
        pass: 'fortests@gmail.com',
      },
    },
  },

};
export default config;
