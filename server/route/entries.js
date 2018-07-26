import express from 'express';
// import validate from '../middlewares/validators/user';
import entries from '../controller/entries';
import auth from '../middlewares/auth';

const router = express.Router();

router.use(auth.authorize);
router.get('/entries', entries.getAllEntries);
router.get('/entries/:entryId', entries.getSingleEntry);

export default router;
