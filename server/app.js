import express from 'express'; // web application framework for nodejs
import logger from 'morgan'; // basically collects log from the server, such as request logs
import bodyParser from 'body-parser'; // extract the body portion of an incoming request

import router from './route/index';
import userRouter from './route/postgre/users';

const app = express();

// log requests to the console
app.use(logger('dev'));

// parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1', router);
app.use('/api/v1', userRouter);

// set environment port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`MyDiary app listening on port ${PORT}!`);
});

export default app;
