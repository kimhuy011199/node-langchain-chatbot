import { NextFunction, Request, Response } from 'express';
import chatService from '../services/chat.service';
import { ChatInputInterface } from '../shared/interface/ChatInput';

const chat = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await chatService.chat(req.body as ChatInputInterface);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const chatController = {
  chat,
};

export default chatController;
