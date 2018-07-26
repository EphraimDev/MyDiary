import express from 'express';
import validate from '../helper/validation';
import entryController from '../controller/entries';

const router = express.Router();

router.get('/', entryController.welcome);
router.get('/entries', entryController.getAllEntries);
router.get('/entries/:entryId', entryController.getEntry);
router.post('/entries', validate.entryValidation, entryController.create);
router.put('/entries/:entryId', validate.entryValidation, entryController.update);
router.delete('/entries/:entryId', entryController.deleteEntry);

export default router;
