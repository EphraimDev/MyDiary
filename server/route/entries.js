import express from 'express';
import validate from '../middlewares/validators/entries';
import entries from '../controller/entries';
import auth from '../middlewares/auth';

const router = express.Router();

router.use(auth.authorize);
router.get('/entries', entries.getAllEntries);
router.get('/entries/:entryId', entries.getSingleEntry);
router.put('/entries/:entryId',validate.createEntry ,entries.modifyDiaryEntry);
router.post('/entries', validate.createEntry, entries.createDiaryEntry);

export default router;
