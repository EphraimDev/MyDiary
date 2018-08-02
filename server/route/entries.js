import express from 'express';
import validate from '../middlewares/validators/entries';
import entries from '../controller/entries';
import auth from '../middlewares/auth';

const router = express.Router();

router.use(auth.authorize);
router.get('/entries', entries.getAllEntries);
router.get('/entries/:entryId', entries.getSingleEntry);
router.put('/entries/:entryId',validate.entry ,entries.modifyDiaryEntry);
router.post('/entries', validate.entry, entries.createDiaryEntry);
router.delete('/entries/:entryId', entries.deleteDiaryEntry);

export default router;
