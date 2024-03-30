import express, { Router } from 'express';
import chatController from '../controllers/chat.controller';

const chatRoute: Router = express.Router();

chatRoute.post('/', chatController.chat);

export default chatRoute;
