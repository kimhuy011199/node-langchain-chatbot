import { Request, Response } from 'express';
import chatService from '../services/chat.service';

const chat = async (req: Request, res: Response) => {
  const data = await chatService.chat(req.body);
  res.json(data);
};

const chatController = {
  chat,
};

export default chatController;
