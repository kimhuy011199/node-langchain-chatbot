import express, { Router } from 'express';
import chatRoute from './chat.route';

const router: Router = express.Router();

router.use('/chat', chatRoute);

export default router;
