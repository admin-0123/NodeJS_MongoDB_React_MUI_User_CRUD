import * as express from 'express';
import tableRouter from './table';

const router: express.Router = express.Router();

// Table Router
router.use('/', tableRouter);

export default router;