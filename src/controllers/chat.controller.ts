import { NextFunction, Request, Response } from 'express';
import chatService from '../services/chat.service';
import { ChatInputInterface } from '../shared/interface/ChatInput';

const chat = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stream = await chatService.chat(req.body as ChatInputInterface);

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    for await (const chunk of stream) {
      const event = {
        data: chunk,
      };
      res.write(`data: ${JSON.stringify(event)}\n\n`);
      res.flushHeaders();
    }
    return res.end();
  } catch (error) {
    next(error);
  }
};

const chatController = {
  chat,
};

export default chatController;
