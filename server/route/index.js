import express from 'express';
import users from './users';
import entries from './entries';

const router = express.Router();

router.use(users);
router.use(entries);

export default router;