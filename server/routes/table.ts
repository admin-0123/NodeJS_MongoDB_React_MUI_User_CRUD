import * as express from 'express';
import TableController from '../controllers/TableController';

const router: express.Router = express.Router();

// Methods and Controllers
router.get('/table', TableController.get);
router.post('/table', TableController.create);
router.put('/table', TableController.update);
router.delete('/table', TableController.deleteOne);
router.delete('/table/all', TableController.deleteAll);

export default router;